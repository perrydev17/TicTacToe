import { useState, useRef, useCallback } from 'react';

const useGameOverlay = () => {
  const [showWinnerLine, setShowWinnerLine] = useState(false);
  const [showVictoryOverlay, setShowVictoryOverlay] = useState(false);

  const overlayTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const triggerGameEnd = useCallback((hasWinner: boolean) => {
    if (hasWinner) {
    }
    overlayTimeoutRef.current = setTimeout(
      () => setShowVictoryOverlay(true),
      2500,
    );
  }, []);

  const resetOverlay = useCallback(() => {
    if (overlayTimeoutRef.current) clearTimeout(overlayTimeoutRef.current);
    setShowVictoryOverlay(false);
    setShowWinnerLine(false);
  }, []);

  return { showWinnerLine, showVictoryOverlay, triggerGameEnd, resetOverlay };
};

export default useGameOverlay;
