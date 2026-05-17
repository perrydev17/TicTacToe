import type { Player, WinnerInfo } from './types';

const WIN_PATTERNS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const checkWinner = (squares: Player[]): WinnerInfo => {
  for (const [a, b, c] of WIN_PATTERNS) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }

  return { winner: null, line: null };
};

export const isDraw = (squares: Player[]): boolean => {
  return (
    squares.every((s) => s !== null) && checkWinner(squares).winner === null
  );
};

const minimax = (
  board: Player[],
  isMaximizing: boolean,
  cpuPlayer: Player,
  opponent: Player,
): number => {
  const { winner } = checkWinner(board);

  if (winner === cpuPlayer) return 10;
  if (winner === opponent) return -10;
  if (board.every((square) => square !== null)) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = cpuPlayer;
        const score = minimax(board, false, cpuPlayer, opponent);
        board[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = opponent;
        const score = minimax(board, true, cpuPlayer, opponent);
        board[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
};

export const getBestMove = (squares: Player[], cpuPlayer: Player) => {
  if (!cpuPlayer) return -1;
  const opponent = cpuPlayer === 'X' ? 'O' : 'X';

  let bestMove = -1;
  let bestScore = -Infinity;
  const boardCopy = [...squares];
  for (let i = 0; i < 9; i++) {
    if (boardCopy[i] === null) {
      boardCopy[i] = cpuPlayer;
      const score = minimax(boardCopy, false, cpuPlayer, opponent);
      boardCopy[i] = null;
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }

  return bestMove;
};

export const getRandomMove = (squares: Player[]): number => {
  const availableMoves = squares
    .map((s, i) => (s === null ? i : null))
    .filter((s) => s !== null) as number[];
  if (availableMoves.length === 0) return -1;
  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
};
