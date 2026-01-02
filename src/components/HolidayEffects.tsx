import { Holiday } from '@/hooks/useHoliday';

interface HolidayEffectsProps {
  holiday: Holiday;
}

export default function HolidayEffects({ holiday }: HolidayEffectsProps) {
  if (!holiday) return null;

  switch (holiday) {
    case 'christmas':
      return <Snowflakes />;
    case 'easter':
      return <EasterEggs />;
    case 'valentines':
      return <Hearts />;
    case 'newyear':
      return <Fireworks />;
    default:
      return null;
  }
}

// Statische Schneeflocken-Konfiguration um Re-Render zu vermeiden
const SNOWFLAKES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${(i * 5) % 100}%`,
  delay: `${(i * 0.25) % 5}s`,
  duration: `${3 + (i % 4)}s`,
  size: i % 2 === 0 ? 'text-lg' : 'text-sm',
}));

function Snowflakes() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
      {SNOWFLAKES.map((flake) => (
        <div
          key={flake.id}
          className={`absolute ${flake.size} animate-snowfall`}
          style={{
            left: flake.left,
            animationDelay: flake.delay,
            animationDuration: flake.duration,
          }}
        >
          ❄️
        </div>
      ))}
    </div>
  );
}

function EasterEggs() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
      {EASTER_ITEMS.map((item) => (
        <div
          key={item.id}
          className="absolute text-2xl animate-easter-bounce"
          style={{
            left: item.left,
            top: item.top,
            animationDelay: item.delay,
          }}
        >
          {item.emoji}
        </div>
      ))}
    </div>
  );
}

// Statische Konfigurationen, damit Streicheln/State-Updates Animationen nicht "neu würfeln"
const EASTER_ITEMS = Array.from({ length: 8 }, (_, i) => {
  const eggs = ['🥚', '🐣', '🐰', '🌷', '🌸'] as const;
  return {
    id: i,
    emoji: eggs[i % eggs.length],
    left: `${10 + ((i * 11) % 80)}%`,
    top: `${62 + ((i * 7) % 28)}%`,
    delay: `${(i * 0.25) % 2}s`,
  };
});

function Hearts() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
      {HEART_ITEMS.map((heart) => (
        <div
          key={heart.id}
          className={`absolute ${heart.size} animate-hearts-float`}
          style={{
            left: heart.left,
            animationDelay: heart.delay,
            animationDuration: heart.duration,
          }}
        >
          💕
        </div>
      ))}
    </div>
  );
}

const HEART_ITEMS = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  left: `${(i * 7) % 100}%`,
  delay: `${(i * 0.33) % 4}s`,
  duration: `${4 + ((i * 0.41) % 3)}s`,
  size: i % 5 === 0 ? 'text-xl' : 'text-sm',
}));

function Fireworks() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
      {FIREWORK_ITEMS.map((item) => (
        <div
          key={item.id}
          className="absolute text-2xl animate-firework-burst"
          style={{
            left: item.left,
            top: item.top,
            animationDelay: item.delay,
          }}
        >
          {item.emoji}
        </div>
      ))}
    </div>
  );
}

const FIREWORK_ITEMS = Array.from({ length: 12 }, (_, i) => {
  const sparks = ['✨', '🎆', '🎇', '⭐'] as const;
  return {
    id: i,
    emoji: sparks[i % sparks.length],
    left: `${(i * 9) % 100}%`,
    top: `${(i * 13) % 60}%`,
    delay: `${(i * 0.27) % 3}s`,
  };
});
