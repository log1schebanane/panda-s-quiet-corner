import { useState, useEffect, useCallback } from 'react';
import sceneMorning from '@/assets/scene-morning.png';
import sceneDay from '@/assets/scene-day.png';
import sceneEvening from '@/assets/scene-evening.png';
import sceneNight from '@/assets/scene-night.png';
import InfoBox from './InfoBox';

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

// ✨ Hier deinen persönlichen Text einfügen:
const INFO_TEXT = `Hallo meine Liebe! 🐼

Dieser kleine Panda ist nur für dich. 
Er lebt in seinem Dschungel und wartet 
jeden Tag darauf, dich zu sehen.

Schau einfach vorbei, wann immer du 
möchtest – morgens, mittags oder nachts. 
Er ist immer da.

Mit ganz viel Liebe für dich gemacht. ❤️`;

export default function PixelScene() {
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>(getTimeOfDay);
  const [showSurprise, setShowSurprise] = useState(false);
  const [tapped, setTapped] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOfDay(getTimeOfDay());
    }, 60000);

    setShowSurprise(shouldShowSurprise());

    return () => clearInterval(interval);
  }, []);

  const handleTap = useCallback(() => {
    if (!tapped && !showInfo) {
      setTapped(true);
      setTimeout(() => setTapped(false), 600);
    }
  }, [tapped, showInfo]);

  const currentScene = scenes[timeOfDay];
  const isNight = timeOfDay === 'night';

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-[hsl(var(--scene-border))]">
      {/* Scene container - 9:16 aspect ratio */}
      <div 
        className="relative overflow-hidden"
        style={{
          aspectRatio: '9/16',
          maxHeight: '100vh',
          maxWidth: 'calc(100vh * 9 / 16)',
          width: '100%',
        }}
        onClick={handleTap}
      >
        {/* Main scene image */}
        <img
          src={currentScene}
          alt=""
          className={`
            w-full h-full object-cover pixel-perfect
            ${loaded ? 'animate-scene-fade' : 'opacity-0'}
            ${tapped ? 'animate-gentle-pulse' : 'animate-breathe'}
          `}
          onLoad={() => setLoaded(true)}
          draggable={false}
        />

        {/* Fireflies overlay for night */}
        {isNight && <Fireflies />}

        {/* Rare surprise shimmer overlay */}
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

        {/* Info Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowInfo(true);
          }}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm border-2 border-border/50 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-all duration-300 hover:scale-110 z-10"
          aria-label="Info"
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 16v-4"/>
            <path d="M12 8h.01"/>
          </svg>
        </button>
      </div>

      {/* Info Box Overlay */}
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
