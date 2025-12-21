import { useState, useEffect, useCallback } from 'react';

export interface VisitStats {
  totalVisits: number;
  currentStreak: number;
  longestStreak: number;
  lastVisit: string | null;
  petCount: number;
  firstVisit: string | null;
}

const STORAGE_KEY = 'balu-visit-stats';

function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

function getYesterday(): string {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date.toISOString().split('T')[0];
}

function loadStats(): VisitStats {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load visit stats:', e);
  }
  return {
    totalVisits: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastVisit: null,
    petCount: 0,
    firstVisit: null,
  };
}

function saveStats(stats: VisitStats): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch (e) {
    console.error('Failed to save visit stats:', e);
  }
}

export function useVisitStats() {
  const [stats, setStats] = useState<VisitStats>(loadStats);
  const [isNewDay, setIsNewDay] = useState(false);

  // Beim ersten Laden: Besuch registrieren
  useEffect(() => {
    const today = getToday();
    const yesterday = getYesterday();
    
    setStats((prev) => {
      // Schon heute besucht?
      if (prev.lastVisit === today) {
        return prev;
      }

      setIsNewDay(true);
      setTimeout(() => setIsNewDay(false), 3000);

      let newStreak = 1;
      
      // Streak-Logik
      if (prev.lastVisit === yesterday) {
        // Gestern besucht → Streak fortsetzen
        newStreak = prev.currentStreak + 1;
      } else if (prev.lastVisit !== null) {
        // Mehr als 1 Tag Pause → Streak reset
        newStreak = 1;
      }

      const newStats: VisitStats = {
        ...prev,
        totalVisits: prev.totalVisits + 1,
        currentStreak: newStreak,
        longestStreak: Math.max(prev.longestStreak, newStreak),
        lastVisit: today,
        firstVisit: prev.firstVisit || today,
      };

      saveStats(newStats);
      return newStats;
    });
  }, []);

  // Pet-Counter erhöhen
  const incrementPetCount = useCallback(() => {
    setStats((prev) => {
      const newStats = {
        ...prev,
        petCount: prev.petCount + 1,
      };
      saveStats(newStats);
      return newStats;
    });
  }, []);

  // Tage seit erstem Besuch
  const daysSinceFirstVisit = stats.firstVisit
    ? Math.floor((Date.now() - new Date(stats.firstVisit).getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  return {
    stats,
    isNewDay,
    incrementPetCount,
    daysSinceFirstVisit,
  };
}
