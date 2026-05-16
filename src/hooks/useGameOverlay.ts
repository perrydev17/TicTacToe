import { useState, useRef, useCallback } from 'react';

const useGameOverlay = () => {
  const [showWinnerLine, setShowWinnerLine] = useState(false);
  const [showVictoryOverlay, setShowVictoryOverlay] = useState(false);
  const lineTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const overlayTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const triggerGameEnd = useCallback((hasWinner: boolean) => {
    if (hasWinner) {
      lineTimeoutRef.current = setTimeout(() => setShowWinnerLine(true), 1100);
    }
    overlayTimeoutRef.current = setTimeout(
      () => setShowVictoryOverlay(true),
      2200,
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
