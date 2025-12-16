type TimeOfDay = 'morning' | 'day' | 'evening' | 'night';

interface SpeechBubbleProps {
  timeOfDay: TimeOfDay;
}

const messages: Record<TimeOfDay, string[]> = {
  morning: [
    "Dzień dobry! ☀️",
    "Właśnie się budzę...",
    "Czas na śniadanie!",
    "Piękny poranek!",
  ],
  day: [
    "Jem bambus 🎋",
    "Odpoczywam sobie...",
    "Jaki piękny dzień!",
    "Myślę o Tobie 💭",
  ],
  evening: [
    "Dobry wieczór! 🌅",
    "Robi się ciemno...",
    "Czas na kolację!",
    "Zachód słońca jest piękny",
  ],
  night: [
    "Dobranoc! 🌙",
    "Śpię już... 💤",
    "Słodkich snów...",
    "Gwiazdy są piękne ✨",
  ],
};

function getRandomMessage(timeOfDay: TimeOfDay): string {
  const timeMessages = messages[timeOfDay];
  const randomIndex = Math.floor(Math.random() * timeMessages.length);
  return timeMessages[randomIndex];
}

export default function SpeechBubble({ timeOfDay }: SpeechBubbleProps) {
  const message = getRandomMessage(timeOfDay);

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
