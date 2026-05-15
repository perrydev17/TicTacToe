import { useState, useCallback } from 'react';
import type { GameMode, GameDifficulty } from '../types';
import useGameCore from './useGameCore';
import useAvatars from './useAvatars';
import useGameOverlay from './useGameOverlay';

const useTicTacToe = () => {
  const [gameMode, setGameMode] = useState<GameMode>('pvc');
  const [difficulty, setDifficulty] = useState<GameDifficulty>('Hard');
  const [showSettings, setShowSettings] = useState(false);

  const { playerXAvatar, setPlayerXAvatar, playerOAvatar, setPlayerOAvatar } =
    useAvatars();

  const { showVictoryOverlay, triggerGameEnd, resetOverlay } = useGameOverlay();

  const { squares, isXNext, winnerInfo, handleMove, resetCore } = useGameCore(
    gameMode,
    difficulty,
    triggerGameEnd,
  );

  const resetGame = useCallback(() => {
    resetOverlay();
    resetCore();
  }, []);

  return {
    squares,
    isXNext,
    gameMode,
    setGameMode,
    difficulty,
    setDifficulty,
    winnerInfo,
    showSettings,
    setShowSettings,
    handleMove,
    resetGame,
    playerXAvatar,
    setPlayerXAvatar,
    playerOAvatar,
    setPlayerOAvatar,
    showVictoryOverlay,
  };
};

export default useTicTacToe;
