import { X, Calendar, Flame, Heart, Trophy } from 'lucide-react';
import type { VisitStats } from '@/hooks/useVisitStats';

interface StatsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  stats: VisitStats;
  daysSinceFirstVisit: number;
}

export default function StatsPanel({ isOpen, onClose, stats, daysSinceFirstVisit }: StatsPanelProps) {
  if (!isOpen) return null;

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="relative bg-card/95 backdrop-blur-md rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-border/30 animate-scale-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
        >
          <X size={18} />
        </button>

        <h2 className="text-xl font-bold text-foreground mb-6 text-center">
          📊 Balu Statistik
        </h2>

        <div className="space-y-4">
          {/* Besuche */}
          <StatCard
            icon={<Calendar className="text-primary" size={20} />}
            label="Besuche gesamt"
            value={stats.totalVisits.toString()}
          />

          {/* Aktueller Streak */}
          <StatCard
            icon={<Flame className="text-orange-500" size={20} />}
            label="Aktueller Streak"
            value={`${stats.currentStreak} ${stats.currentStreak === 1 ? 'Tag' : 'Tage'}`}
            highlight={stats.currentStreak >= 7}
          />

          {/* Längster Streak */}
          <StatCard
            icon={<Trophy className="text-yellow-500" size={20} />}
            label="Längster Streak"
            value={`${stats.longestStreak} ${stats.longestStreak === 1 ? 'Tag' : 'Tage'}`}
          />

          {/* Streicheleinheiten */}
          <StatCard
            icon={<Heart className="text-pink-500" size={20} />}
            label="Streicheleinheiten"
            value={stats.petCount.toString()}
          />

          {/* Erste Begegnung */}
          <div className="bg-muted/30 rounded-xl p-3 text-center">
            <p className="text-xs text-muted-foreground">Erste Begegnung</p>
            <p className="text-sm font-medium text-foreground">
              {formatDate(stats.firstVisit)}
              {daysSinceFirstVisit > 0 && (
                <span className="text-muted-foreground ml-1">
                  (vor {daysSinceFirstVisit} {daysSinceFirstVisit === 1 ? 'Tag' : 'Tagen'})
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Streak-Belohnungen */}
        {stats.currentStreak >= 3 && (
          <div className="mt-4 p-3 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl text-center">
            <p className="text-sm font-medium text-foreground">
              {stats.currentStreak >= 30 && '🏆 Legendär! 30+ Tage Streak!'}
              {stats.currentStreak >= 14 && stats.currentStreak < 30 && '⭐ Fantastisch! 2 Wochen Streak!'}
              {stats.currentStreak >= 7 && stats.currentStreak < 14 && '🔥 Super! 1 Woche Streak!'}
              {stats.currentStreak >= 3 && stats.currentStreak < 7 && '✨ Toll! 3+ Tage Streak!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}

function StatCard({ icon, label, value, highlight }: StatCardProps) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl ${highlight ? 'bg-gradient-to-r from-orange-500/20 to-yellow-500/20' : 'bg-muted/30'}`}>
      <div className="w-10 h-10 rounded-full bg-background/50 flex items-center justify-center">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-lg font-bold text-foreground">{value}</p>
      </div>
      {highlight && <span className="text-xl">🔥</span>}
    </div>
  );
}
