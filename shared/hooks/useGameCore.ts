import { useState, useEffect, useCallback } from 'react';
import type { Player, GameMode, GameDifficulty, WinnerInfo } from '../types';
import { checkWinner, isDraw, getBestMove, getRandomMove } from '../utils';

const AI_DELAY_MS = 800;

const useGameCore = (
  gameMode: GameMode,
  difficulty: GameDifficulty,
  onGameEnd: (hasWinner: boolean) => void,
) => {
  const [squares, setSquares] = useState<Player[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winnerInfo, setWinnerInfo] = useState<WinnerInfo | null>(null);
  const [isAiThinking, setIsAiThinking] = useState(false);

  const handleMove = useCallback(
    (i: number) => {
      if (squares[i] || winnerInfo) return;

      const newSquares = [...squares];
      newSquares[i] = isXNext ? 'X' : 'O';
      setSquares(newSquares);
      setIsXNext(!isXNext);

      const win = checkWinner(newSquares);
      if (win.winner || isDraw(newSquares)) {
        setWinnerInfo(win);
        onGameEnd(!!win.winner);
      }
    },
    [squares, isXNext, winnerInfo, onGameEnd],
  );

  useEffect(() => {
    if (gameMode === 'pvc' && !isXNext && !winnerInfo) {
      setIsAiThinking(true);
      const timer = setTimeout(() => {
        const move = difficulty === 'Hard'
          ? getBestMove(squares, 'O')
          : getRandomMove(squares);
        if (move !== -1) handleMove(move);
        setIsAiThinking(false);
      }, AI_DELAY_MS);
      return () => {
        clearTimeout(timer);
        setIsAiThinking(false);
      };
    }
  }, [isXNext, gameMode, squares, winnerInfo, difficulty, handleMove]);

  const resetCore = useCallback(() => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setWinnerInfo(null);
    setIsAiThinking(false);
  }, []);

  return { squares, isXNext, winnerInfo, isAiThinking, handleMove, resetCore };
};

export default useGameCore;
