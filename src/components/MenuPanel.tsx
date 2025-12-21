import { X, Heart, Info, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type TimeOfDay = 'morning' | 'day' | 'evening' | 'night';

interface MenuPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onShowMessage: () => void;
  onShowStats: () => void;
  timeOfDay: TimeOfDay;
}

const timeColors: Record<TimeOfDay, { bg: string; border: string; accent: string }> = {
  morning: {
    bg: 'bg-amber-50/95',
    border: 'border-amber-200/50',
    accent: 'text-amber-700',
  },
  day: {
    bg: 'bg-emerald-50/95',
    border: 'border-emerald-200/50',
    accent: 'text-emerald-700',
  },
  evening: {
    bg: 'bg-orange-50/95',
    border: 'border-orange-200/50',
    accent: 'text-orange-700',
  },
  night: {
    bg: 'bg-indigo-950/95',
    border: 'border-indigo-400/30',
    accent: 'text-indigo-300',
  },
};

export default function MenuPanel({ isOpen, onClose, onShowMessage, onShowStats, timeOfDay }: MenuPanelProps) {
  const colors = timeColors[timeOfDay];
  const isNight = timeOfDay === 'night';
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div 
      className="absolute inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      {/* Menu Card */}
      <div 
        className={`relative ${colors.bg} ${colors.border} border-2 rounded-3xl p-6 mx-6 max-w-xs w-full backdrop-blur-md animate-scale-in shadow-2xl`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center ${isNight ? 'bg-indigo-800/50 text-indigo-300 hover:bg-indigo-700/50' : 'bg-black/10 text-black/50 hover:bg-black/20'} transition-colors`}
        >
          <X size={18} />
        </button>

        {/* Title */}
        <h2 className={`text-2xl font-bold mb-6 ${isNight ? 'text-indigo-100' : 'text-gray-800'}`}>
          🐼 Balu
        </h2>

        {/* Menu items */}
        <div className="space-y-3">
          {/* Nachricht */}
          <button
            onClick={() => {
              onShowMessage();
              onClose();
            }}
            className={`w-full flex items-center gap-3 p-4 rounded-2xl transition-all duration-200 ${isNight ? 'bg-indigo-800/40 hover:bg-indigo-700/50 text-indigo-100' : 'bg-white/60 hover:bg-white/80 text-gray-700'}`}
          >
            <Heart className={colors.accent} size={22} />
            <span className="font-medium">Wiadomość dla Ciebie</span>
          </button>

          {/* Statistik */}
          <button
            onClick={() => {
              onShowStats();
              onClose();
            }}
            className={`w-full flex items-center gap-3 p-4 rounded-2xl transition-all duration-200 ${isNight ? 'bg-indigo-800/40 hover:bg-indigo-700/50 text-indigo-100' : 'bg-white/60 hover:bg-white/80 text-gray-700'}`}
          >
            <BarChart3 className={colors.accent} size={22} />
            <span className="font-medium">Statistik</span>
          </button>

          {/* J+J Seite */}
          <button
            onClick={() => {
              navigate("/jj");
              onClose();
            }}
            className={`w-full flex items-center gap-3 p-4 rounded-2xl transition-all duration-200 ${isNight ? 'bg-indigo-800/40 hover:bg-indigo-700/50 text-indigo-100' : 'bg-white/60 hover:bg-white/80 text-gray-700'}`}
          >
            <Heart className={colors.accent} size={22} />
            <span className="font-medium">J+J</span>
          </button>

          {/* Info Box */}
          <div className={`p-4 rounded-2xl ${isNight ? 'bg-indigo-800/30 text-indigo-200' : 'bg-white/40 text-gray-600'}`}>
            <div className="flex items-center gap-3 mb-2">
              <Info className={colors.accent} size={22} />
              <span className="font-medium">O Balu</span>
            </div>
            <p className="text-sm opacity-80 ml-9">
              Balu to Twoja panda, która zawsze na Ciebie czeka. Odwiedź go o każdej porze dnia i nocy! 🎋
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
