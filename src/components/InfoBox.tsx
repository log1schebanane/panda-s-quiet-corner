import { useEffect } from 'react';

type TimeOfDay = 'morning' | 'day' | 'evening' | 'night';

interface InfoBoxProps {
  isOpen: boolean;
  onClose: () => void;
  text: string;
  timeOfDay: TimeOfDay;
}

const timeColors: Record<TimeOfDay, { bg: string; border: string; accent: string }> = {
  morning: {
    bg: 'from-amber-900/95 to-amber-950/95',
    border: 'border-amber-700/50',
    accent: 'text-amber-200',
  },
  day: {
    bg: 'from-emerald-900/95 to-emerald-950/95',
    border: 'border-emerald-700/50',
    accent: 'text-emerald-200',
  },
  evening: {
    bg: 'from-orange-900/95 to-rose-950/95',
    border: 'border-orange-700/50',
    accent: 'text-orange-200',
  },
  night: {
    bg: 'from-indigo-900/95 to-slate-950/95',
    border: 'border-indigo-600/50',
    accent: 'text-indigo-200',
  },
};

export default function InfoBox({ isOpen, onClose, text, timeOfDay }: InfoBoxProps) {
  const colors = timeColors[timeOfDay];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-scene-fade" />
      
      {/* Info Card */}
      <div 
        className={`
          relative max-w-sm w-full rounded-2xl p-6 
          bg-gradient-to-b ${colors.bg}
          border-2 ${colors.border}
          shadow-2xl shadow-black/50
          animate-scale-in
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative corner pixels */}
        <div className={`absolute top-2 left-2 w-2 h-2 ${colors.accent} opacity-50`} 
          style={{ background: 'currentColor', imageRendering: 'pixelated' }} 
        />
        <div className={`absolute top-2 right-2 w-2 h-2 ${colors.accent} opacity-50`} 
          style={{ background: 'currentColor', imageRendering: 'pixelated' }} 
        />
        <div className={`absolute bottom-2 left-2 w-2 h-2 ${colors.accent} opacity-50`} 
          style={{ background: 'currentColor', imageRendering: 'pixelated' }} 
        />
        <div className={`absolute bottom-2 right-2 w-2 h-2 ${colors.accent} opacity-50`} 
          style={{ background: 'currentColor', imageRendering: 'pixelated' }} 
        />

        {/* Close button */}
        <button
          onClick={onClose}
          className={`absolute -top-3 -right-3 w-8 h-8 rounded-full bg-card border-2 ${colors.border} flex items-center justify-center text-foreground/70 hover:text-foreground hover:scale-110 transition-all`}
          aria-label="Schließen"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>

        {/* Panda emoji header */}
        <div className="text-center mb-4">
          <span className="text-4xl">🐼</span>
        </div>

        {/* Text content */}
        <div className={`${colors.accent} text-center whitespace-pre-line leading-relaxed text-sm font-medium`}>
          {text}
        </div>

        {/* Tap hint */}
        <p className="text-center text-foreground/40 text-xs mt-6">
          Tippe außerhalb zum Schließen
        </p>
      </div>
    </div>
  );
}
