import { useState, useEffect, useCallback } from 'react';
import { Menu } from 'lucide-react';
import sceneMorning from '@/assets/scene-morning.png';
import sceneDay from '@/assets/scene-day.png';
import sceneEvening from '@/assets/scene-evening.png';
import sceneNight from '@/assets/scene-night.png';
import InfoBox from './InfoBox';
import SpeechBubble from './SpeechBubble';
import MenuPanel from './MenuPanel';
import HolidayEffects from './HolidayEffects';
import { getCurrentHoliday, getHolidayEmoji, type Holiday } from '@/hooks/useHoliday';
import { useIdleAnimation, getIdleMessage } from './IdleAnimation';

type TimeOfDay = 'morning' | 'day' | 'evening' | 'night';

const scenes: Record<TimeOfDay, string> = {
  morning: sceneMorning,
  day: sceneDay,
  evening: sceneEvening,
  night: sceneNight,
};

function getTimeOfDay(): TimeOfDay {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 11) return 'morning';
  if (hour >= 11 && hour < 17) return 'day';
  if (hour >= 17 && hour < 21) return 'evening';
  return 'night';
}

function shouldShowSurprise(): boolean {
  return Math.random() < 0.1;
}

const INFO_TEXT = `Prezent dla Ciebie 🐼
Das ist dein Geschenk zu Weihnachten od Kubi dla Juli.

Dieser kleine Panda ist nur für dich.
Er wohnt in seinem Dschungel und wartet jeden Tag darauf,
dich zu sehen 🤍

Komm vorbei wann immer du willst –
morgens, mittags oder nachts.
Balu ist immer hier.`;

export default function PixelScene() {
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>(getTimeOfDay);
  const [showSurprise, setShowSurprise] = useState(false);
  const [tapped, setTapped] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [petReaction, setPetReaction] = useState(false);
  const [holiday, setHoliday] = useState<Holiday>(getCurrentHoliday);
  const [isIdle, setIsIdle] = useState(true);
  const [petCount, setPetCount] = useState<number>(() => {
    const saved = localStorage.getItem('petCount');
    return saved ? parseInt(saved, 10) : 0;
  });
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOfDay(getTimeOfDay());
      setHoliday(getCurrentHoliday());
    }, 60000);

    setShowSurprise(shouldShowSurprise());
    return () => clearInterval(interval);
  }, []);

  // Idle-Timer: Nach 5 Sekunden ohne Interaktion wird Idle aktiviert
  useEffect(() => {
    setIsIdle(false);
    const idleTimer = setTimeout(() => setIsIdle(true), 5000);
    return () => clearTimeout(idleTimer);
  }, [tapped, petReaction]);

  const handlePet = useCallback(() => {
    setTapped(true);
    setPetReaction(true);
    setPetCount((prev) => {
      const next = prev + 1;
      localStorage.setItem('petCount', next.toString());
      return next;
    });

    setTimeout(() => setTapped(false), 600);
    setTimeout(() => setPetReaction(false), 900);
  }, []);

  // Idle Animation Hook
  const { idleState, idleImage } = useIdleAnimation(isIdle);
  const idleMessage = getIdleMessage(idleState);

  const currentScene = scenes[timeOfDay];
  const displayImage = idleImage || currentScene;
  const isNight = timeOfDay === 'night';

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-[hsl(var(--background))]">
      {/* Scene Container – Fullscreen */}
      <div className="relative w-full h-full overflow-hidden">
        {/* Scene Image with Idle Animation */}
        <img
          src={displayImage}
          alt="Balu the Panda"
          className={`
            w-full h-full object-cover pixel-perfect
            ${loaded ? 'animate-scene-fade' : 'opacity-0'}
            ${tapped ? 'animate-gentle-pulse' : idleState === 'normal' ? 'animate-breathe' : ''}
            ${idleImage ? 'animate-scale-in' : ''}
          `}
          onLoad={() => setLoaded(true)}
          draggable={false}
        />

        {/* Holiday Effects */}
        {holiday && <HolidayEffects holiday={holiday} />}

        {/* Holiday Badge */}
        {holiday && (
          <div className="absolute top-4 left-4 z-20 bg-card/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border/30 shadow-lg animate-scale-in">
            <span className="text-lg">{getHolidayEmoji(holiday)}</span>
          </div>
        )}

        {/* ❤️ Herz-Reaktion beim Streicheln */}
        {petReaction && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="text-4xl animate-scale-in select-none">❤️</div>
          </div>
        )}

        {/* Speech Bubble - show idle message or regular */}
        {loaded && (
          <SpeechBubble 
            timeOfDay={timeOfDay} 
            holiday={holiday} 
            idleMessage={idleMessage}
          />
        )}

        {/* Fireflies (Night only) */}
        {isNight && <Fireflies />}

        {/* Rare shimmer */}
        {showSurprise && (
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute w-2 h-2 rounded-full bg-accent animate-shimmer"
              style={{ top: '20%', left: '15%' }}
            />
            <div
              className="absolute w-1.5 h-1.5 rounded-full bg-accent animate-shimmer"
              style={{ top: '35%', right: '20%', animationDelay: '1s' }}
            />
          </div>
        )}

        {/* Menu Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(true);
          }}
          className="absolute top-4 right-4 w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/90 to-primary/70 backdrop-blur-sm shadow-lg flex items-center justify-center text-primary-foreground hover:scale-105 active:scale-95 transition-all duration-200 z-20"
          aria-label="Menu"
        >
          <Menu size={24} />
        </button>

        {/* Streichel-Button rechts mittig */}
        <button
          onClick={handlePet}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-white text-black p-3 rounded-full shadow-md flex items-center justify-center z-20 hover:bg-gray-100 transition"
          title={`Gestreichelt: ${petCount} mal`}
        >
          🐼 <span className="ml-1 text-sm font-bold">{petCount}</span>
        </button>
      </div>

      {/* Menu Panel */}
      <MenuPanel
        isOpen={showMenu}
        onClose={() => setShowMenu(false)}
        onShowMessage={() => setShowInfo(true)}
        timeOfDay={timeOfDay}
      />

      {/* Info Box */}
      <InfoBox
        isOpen={showInfo}
        onClose={() => setShowInfo(false)}
        text={INFO_TEXT}
        timeOfDay={timeOfDay}
      />
    </div>
  );
}

function Fireflies() {
  const fireflies = [
    { top: '25%', left: '10%', delay: '0s', size: 'w-1.5 h-1.5' },
    { top: '40%', right: '15%', delay: '1.5s', size: 'w-2 h-2' },
    { top: '60%', left: '20%', delay: '3s', size: 'w-1 h-1' },
    { top: '55%', right: '25%', delay: '2s', size: 'w-1.5 h-1.5' },
    { top: '75%', left: '30%', delay: '4s', size: 'w-1 h-1' },
    { top: '30%', left: '70%', delay: '0.5s', size: 'w-1.5 h-1.5' },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {fireflies.map((fly, i) => (
        <div
          key={i}
          className={`absolute ${fly.size} rounded-full animate-firefly`}
          style={{
            top: fly.top,
            left: fly.left,
            right: fly.right,
            animationDelay: fly.delay,
            background: 'hsl(var(--firefly))',
            boxShadow: '0 0 8px 4px hsl(var(--firefly-glow) / 0.5)',
          }}
        />
      ))}
    </div>
  );
}
