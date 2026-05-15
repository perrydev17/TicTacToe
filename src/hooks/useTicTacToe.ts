import { useState, useCallback } from 'react';
import type { GameMode, GameDifficulty } from '../types';
import { useGameCore } from './useGameCore';
import useAvatars from './useAvatars';

const useTicTacToe = () => {
  const [gameMode, setGameMode] = useState<GameMode>('pvc');
  const [difficulty, setDifficulty] = useState<GameDifficulty>('Hard');
  const [showSettings, setShowSettings] = useState(false);

  const onGameEnd = () => {};

  const { squares, isXNext, winnerInfo, handleMove, resetCore } = useGameCore(
    gameMode,
    difficulty,
    onGameEnd,
  );
  const { playerXAvatar, setPlayerXAvatar, playerOAvatar, setPlayerOAvatar } =
    useAvatars();

  const resetGame = useCallback(() => {
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
  };
};

export default useTicTacToe;
