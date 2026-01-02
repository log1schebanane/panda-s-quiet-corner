import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";

const roses = [
  { id: 1, emoji: "🌹", delay: "0s", x: "20%", y: "25%" },
  { id: 2, emoji: "🌹", delay: "0.5s", x: "50%", y: "15%" },
  { id: 3, emoji: "🌹", delay: "1s", x: "75%", y: "28%" },
  { id: 4, emoji: "🌹", delay: "0.3s", x: "35%", y: "45%" },
  { id: 5, emoji: "🌹", delay: "0.8s", x: "65%", y: "40%" },
  { id: 6, emoji: "🌹", delay: "1.2s", x: "25%", y: "60%" },
  { id: 7, emoji: "🌹", delay: "0.2s", x: "80%", y: "55%" },
  { id: 8, emoji: "🌹", delay: "0.7s", x: "45%", y: "70%" },
  { id: 9, emoji: "🌹", delay: "1.1s", x: "15%", y: "80%" },
  { id: 10, emoji: "🌹", delay: "0.4s", x: "70%", y: "75%" },
  { id: 11, emoji: "🌹", delay: "0.9s", x: "55%", y: "85%" },
  { id: 12, emoji: "🌹", delay: "0.6s", x: "30%", y: "90%" },
];

const leaves = [
  { id: 1, emoji: "🌿", x: "10%", y: "35%" },
  { id: 2, emoji: "🍃", x: "85%", y: "45%" },
  { id: 3, emoji: "🌿", x: "40%", y: "95%" },
  { id: 4, emoji: "🍃", x: "60%", y: "20%" },
];

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
        {/* Vase */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10">
          <div className="text-8xl select-none animate-subtle-float">🏺</div>
        </div>

        {/* Rosen */}
        {roses.map((rose) => (
          <div
            key={rose.id}
            className="absolute text-4xl select-none animate-rose-bloom"
            style={{
              left: rose.x,
              top: rose.y,
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
            style={{ left: leaf.x, top: leaf.y }}
          >
            {leaf.emoji}
          </div>
        ))}

        {/* Glitzer-Effekte */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-sm animate-sparkle"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            >
              ✨
            </div>
          ))}
        </div>
      </div>

      {/* Liebevolle Nachricht */}
      <div className="px-6 pb-8 text-center relative z-10">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg max-w-sm mx-auto border border-rose-200">
          <p className="text-rose-700 font-medium leading-relaxed">
            Diese Rosen sind für dich. Sie welken nie und sind immer frisch – genau wie meine Gedanken an dich. 🌹
          </p>
        </div>
      </div>
    </div>
  );
}
