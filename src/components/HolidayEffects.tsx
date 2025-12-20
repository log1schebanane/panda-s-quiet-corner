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

function Snowflakes() {
  const flakes = Array.from({ length: 20 }, (_, i) => ({
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    duration: `${3 + Math.random() * 4}s`,
    size: Math.random() > 0.5 ? 'text-lg' : 'text-sm',
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
      {flakes.map((flake, i) => (
        <div
          key={i}
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
  const eggs = ['🥚', '🐣', '🐰', '🌷', '🌸'];
  const items = Array.from({ length: 8 }, (_, i) => ({
    emoji: eggs[Math.floor(Math.random() * eggs.length)],
    left: `${10 + Math.random() * 80}%`,
    top: `${60 + Math.random() * 30}%`,
    delay: `${Math.random() * 2}s`,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
      {items.map((item, i) => (
        <div
          key={i}
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

function Hearts() {
  const hearts = Array.from({ length: 15 }, (_, i) => ({
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 4}s`,
    duration: `${4 + Math.random() * 3}s`,
    size: Math.random() > 0.6 ? 'text-xl' : 'text-sm',
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
      {hearts.map((heart, i) => (
        <div
          key={i}
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

function Fireworks() {
  const sparks = ['✨', '🎆', '🎇', '⭐'];
  const items = Array.from({ length: 12 }, (_, i) => ({
    emoji: sparks[Math.floor(Math.random() * sparks.length)],
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 60}%`,
    delay: `${Math.random() * 3}s`,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
      {items.map((item, i) => (
        <div
          key={i}
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
