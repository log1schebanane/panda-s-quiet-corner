import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";

const roses = [
  // oben (kleiner „Fächer“)
  { id: 1, emoji: "🌹", delay: "0s", x: "50%", y: "18%", r: "-10deg" },
  { id: 2, emoji: "🌹", delay: "0.2s", x: "42%", y: "22%", r: "-18deg" },
  { id: 3, emoji: "🌹", delay: "0.35s", x: "58%", y: "22%", r: "6deg" },
  { id: 4, emoji: "🌹", delay: "0.5s", x: "35%", y: "30%", r: "-22deg" },
  { id: 5, emoji: "🌹", delay: "0.65s", x: "65%", y: "30%", r: "18deg" },
  // mitte
  { id: 6, emoji: "🌹", delay: "0.8s", x: "46%", y: "33%", r: "-8deg" },
  { id: 7, emoji: "🌹", delay: "1s", x: "54%", y: "33%", r: "8deg" },
  { id: 8, emoji: "🌹", delay: "1.1s", x: "40%", y: "40%", r: "-12deg" },
  { id: 9, emoji: "🌹", delay: "1.25s", x: "60%", y: "40%", r: "12deg" },
  // unten
  { id: 10, emoji: "🌹", delay: "1.35s", x: "50%", y: "44%", r: "0deg" },
];

const leaves = [
  { id: 1, emoji: "🌿", x: "32%", y: "38%", r: "-18deg" },
  { id: 2, emoji: "🍃", x: "68%", y: "38%", r: "22deg" },
  { id: 3, emoji: "🌿", x: "38%", y: "46%", r: "-10deg" },
  { id: 4, emoji: "🍃", x: "62%", y: "46%", r: "12deg" },
];

const stems = Array.from({ length: 7 }, (_, i) => ({
  id: i,
  x: `${40 + i * 3}%`,
  y: `${48 + (i % 2) * 3}%`,
  r: `${-10 + i * 3}deg`,
}));

const SPARKLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: `${10 + ((i * 17) % 80)}%`,
  top: `${12 + ((i * 23) % 76)}%`,
  delay: `${(i * 0.21) % 3}s`,
}));

export default function BlumenPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-pink-100 via-rose-50 to-pink-200 relative overflow-hidden">
      {/* Zurück-Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 z-20 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:scale-105 transition-transform"
        aria-label="Zurück"
      >
        <ArrowLeft className="text-rose-600" size={24} />
      </button>

      {/* Titel */}
      <div className="pt-20 pb-8 text-center relative z-10">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="text-rose-400" size={20} />
          <h1 className="text-3xl font-bold text-rose-700">Blumen für dich</h1>
          <Sparkles className="text-rose-400" size={20} />
        </div>
        <p className="text-rose-500 text-sm">Ein virtueller Rosenstrauß 💕</p>
      </div>

      {/* Rosenstrauß Container */}
      <div className="relative w-full h-[60vh] flex items-center justify-center">
        {/* Bouquet Group */}
        <div className="relative w-[320px] max-w-[90vw] h-[420px]">
          {/* Vase */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10">
            <div className="text-8xl select-none animate-subtle-float">🏺</div>
          </div>

          {/* Band */}
          <div className="absolute bottom-[92px] left-1/2 -translate-x-1/2 z-20">
            <div className="text-3xl select-none">🎀</div>
          </div>

          {/* Stiele */}
          {stems.map((s) => (
            <div
              key={s.id}
              className="absolute text-2xl select-none opacity-80"
              style={{
                left: s.x,
                top: s.y,
                transform: `translateX(-50%) rotate(${s.r})`,
              }}
            >
              🌿
            </div>
          ))}

          {/* Rosen */}
          {roses.map((rose) => (
            <div
              key={rose.id}
              className="absolute text-4xl select-none animate-rose-bloom"
              style={{
                left: rose.x,
                top: rose.y,
                transform: `translateX(-50%) rotate(${rose.r})`,
                animationDelay: rose.delay,
              }}
            >
              {rose.emoji}
            </div>
          ))}

          {/* Blätter */}
          {leaves.map((leaf) => (
            <div
              key={leaf.id}
              className="absolute text-2xl select-none opacity-70 animate-leaf-sway"
              style={{
                left: leaf.x,
                top: leaf.y,
                transform: `translateX(-50%) rotate(${leaf.r})`,
              }}
            >
              {leaf.emoji}
            </div>
          ))}

          {/* Glitzer-Effekte */}
          <div className="absolute inset-0 pointer-events-none">
            {SPARKLES.map((s) => (
              <div
                key={s.id}
                className="absolute text-sm animate-sparkle"
                style={{
                  left: s.left,
                  top: s.top,
                  animationDelay: s.delay,
                }}
              >
                ✨
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Liebevolle Nachricht */}
      <div className="px-6 pb-8 text-center relative z-10">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg max-w-sm mx-auto border border-rose-200">
          <p className="text-rose-700 font-medium leading-relaxed">
            Für dich. Einfach so. 🌹
          </p>
        </div>
      </div>
    </div>
  );
}
