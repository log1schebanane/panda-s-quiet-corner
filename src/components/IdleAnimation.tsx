import { useState, useEffect } from 'react';

export type IdleState = 'normal' | 'yawn' | 'stretch' | 'sleep' | 'wave';

const idleStates: Exclude<IdleState, 'normal'>[] = ['yawn', 'stretch', 'sleep', 'wave'];

// Wie lange jede Animation angezeigt wird (in ms)
const ANIMATION_DURATION = 4000;
// Pause zwischen Animationen (in ms)
const PAUSE_BETWEEN = 8000;

export function useIdleAnimation(isIdle: boolean) {
  const [idleState, setIdleState] = useState<IdleState>('normal');

  useEffect(() => {
    if (!isIdle) {
      setIdleState('normal');
      return;
    }

    let animationTimeout: NodeJS.Timeout;
    let pauseTimeout: NodeJS.Timeout;

    const playRandomAnimation = () => {
      // Wähle zufällige Idle-Animation
      const randomState = idleStates[Math.floor(Math.random() * idleStates.length)];
      setIdleState(randomState);

      // Nach ANIMATION_DURATION zurück zu normal
      animationTimeout = setTimeout(() => {
        setIdleState('normal');

        // Nach PAUSE_BETWEEN nächste Animation
        pauseTimeout = setTimeout(playRandomAnimation, PAUSE_BETWEEN);
      }, ANIMATION_DURATION);
    };

    // Starte erste Animation nach kurzer Verzögerung
    pauseTimeout = setTimeout(playRandomAnimation, 2000);

    return () => {
      clearTimeout(animationTimeout);
      clearTimeout(pauseTimeout);
    };
  }, [isIdle]);

  return { idleState };
}

export function getIdleMessage(state: IdleState): string | null {
  switch (state) {
    case 'yawn':
      return 'Ziewam... 😴';
    case 'stretch':
      return 'Rozciągam się! 💪';
    case 'sleep':
      return 'Śpię... 💤';
    case 'wave':
      return 'Cześć! 👋';
    default:
      return null;
  }
}
