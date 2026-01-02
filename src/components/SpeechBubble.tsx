import { Holiday } from '@/hooks/useHoliday';

type TimeOfDay = 'morning' | 'day' | 'evening' | 'night';

interface SpeechBubbleProps {
  timeOfDay: TimeOfDay;
  holiday?: Holiday;
  idleMessage?: string | null;
}

const messages: Record<TimeOfDay, string[]> = {
  morning: [
    "Hej! ☀️",
    "Budzę się...",
    "Śniadanko!",
    "Rano!",
  ],
  day: [
    "Bambus! 🎋",
    "Chilluje...",
    "Fajny dzień!",
    "Hej 💭",
  ],
  evening: [
    "Wieczór! 🌅",
    "Ciemnieje...",
    "Kolacyjka!",
    "Zachód ❤️",
  ],
  night: [
    "Dobranoc 🌙",
    "Śpię... 💤",
    "Pa pa...",
    "Gwiazdy! ✨",
  ],
};

const holidayMessages: Record<string, string[]> = {
  christmas: [
    "Święta! 🎄",
    "Ho ho! 🎅",
    "Śnieg! ❄️",
    "Prezenty! 🎁",
  ],
  easter: [
    "Wielkanoc! 🐰",
    "Jajka! 🥚",
    "Wiosna! 🌷",
    "Kurczak! 🐣",
  ],
  valentines: [
    "Kocham! 💕",
    "Serduszko! 💝",
    "Walentynki! 💗",
    "Buziaki! 🤗",
  ],
  newyear: [
    "Nowy rok! 🎆",
    "Nowe! ✨",
    "Bum bum! 🎇",
    "Sylwek! 🥳",
  ],
};

function getRandomMessage(timeOfDay: TimeOfDay, holiday?: Holiday): string {
  // Wenn Feiertag, zeige Feiertags-Nachrichten mit 60% Wahrscheinlichkeit
  if (holiday && Math.random() < 0.6) {
    const holidayMsgs = holidayMessages[holiday];
    if (holidayMsgs) {
      return holidayMsgs[Math.floor(Math.random() * holidayMsgs.length)];
    }
  }
  
  const timeMessages = messages[timeOfDay];
  return timeMessages[Math.floor(Math.random() * timeMessages.length)];
}

export default function SpeechBubble({ timeOfDay, holiday, idleMessage }: SpeechBubbleProps) {
  // Idle-Nachricht hat Priorität
  const message = idleMessage || getRandomMessage(timeOfDay, holiday);

  return (
    <div className="absolute bottom-[35%] left-1/2 -translate-x-1/2 z-10 animate-scale-in">
      <div className="relative bg-card/90 backdrop-blur-sm px-4 py-2 rounded-2xl border border-border/30 shadow-lg">
        <p className="text-foreground text-sm font-medium whitespace-nowrap">
          {message}
        </p>
        {/* Speech bubble tail */}
        <div 
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0"
          style={{
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderTop: '8px solid hsl(var(--card) / 0.9)',
          }}
        />
      </div>
    </div>
  );
}
