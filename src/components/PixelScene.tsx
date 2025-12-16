import { useState, useEffect, useCallback } from 'react';
import { Menu } from 'lucide-react';
import sceneMorning from '@/assets/scene-morning.png';
import sceneDay from '@/assets/scene-day.png';
import sceneEvening from '@/assets/scene-evening.png';
import sceneNight from '@/assets/scene-night.png';
import InfoBox from './InfoBox';
import SpeechBubble from './SpeechBubble';
import MenuPanel from './MenuPanel';

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

// ✨ Tutaj wpisz swoją osobistą wiadomość:
const INFO_TEXT = `Cześć Kochana! 🐼

Ta mała panda jest tylko dla Ciebie.
Mieszka w swojej dżungli i codziennie
czeka, żeby Cię zobaczyć.

Wpadaj kiedy tylko chcesz –
rano, w południe lub w nocy.
Balu zawsze tu jest.

Zrobione z wielką miłością dla Ciebie. ❤️`;

export default function PixelScene() {
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>(getTimeOfDay);
  const [showSurprise, setShowSurprise] = useState(false);
  const [tapped, setTapped] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOfDay(getTimeOfDay());
    }, 60000);

    setShowSurprise(shouldShowSurprise());

    return () => clearInterval(interval);
  }, []);

  const handleTap = useCallback(() => {
    if (!tapped && !showInfo && !showMenu) {
      setTapped(true);
      setTimeout(() => setTapped(false), 600);
    }
  }, [tapped, showInfo, showMenu]);

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
          alt="Balu the Panda"
          className={`
            w-full h-full object-cover pixel-perfect
            ${loaded ? 'animate-scene-fade' : 'opacity-0'}
            ${tapped ? 'animate-gentle-pulse' : 'animate-breathe'}
          `}
          onLoad={() => setLoaded(true)}
          draggable={false}
        />

        {/* Speech Bubble */}
        {loaded && <SpeechBubble timeOfDay={timeOfDay} />}

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

        {/* Menu Button - Modern Design */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(true);
          }}
          className="absolute top-4 right-4 w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/90 to-primary/70 backdrop-blur-sm shadow-lg flex items-center justify-center text-primary-foreground hover:scale-105 active:scale-95 transition-all duration-200 z-10"
          aria-label="Menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Menu Panel */}
      <MenuPanel 
        isOpen={showMenu}
        onClose={() => setShowMenu(false)}
        onShowMessage={() => setShowInfo(true)}
        timeOfDay={timeOfDay}
      />

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
