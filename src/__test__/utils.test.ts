import { describe, it, expect } from 'vitest';
import { checkWinner, isDraw, getBestMove, getRandomMove } from '../utils';
import type { Player } from '../types';

const _ = null as Player;

describe('checkWinner', () => {
  it('returns no winner for an empty board', () => {
    expect(checkWinner(Array(9).fill(_))).toEqual({ winner: null, line: null });
  });

  it('returns no winner for a partial board with no winner', () => {
    const board: Player[] = ['X', 'O', _, _, 'X', _, _, _, 'O'];
    expect(checkWinner(board)).toEqual({ winner: null, line: null });
  });

  it.each([
    {
      label: 'row 0',
      board: ['X', 'X', 'X', _, _, _, _, _, _] as Player[],
      line: [0, 1, 2],
    },
    {
      label: 'row 1',
      board: [_, _, _, 'O', 'O', 'O', _, _, _] as Player[],
      line: [3, 4, 5],
    },
    {
      label: 'row 2',
      board: [_, _, _, _, _, _, 'X', 'X', 'X'] as Player[],
      line: [6, 7, 8],
    },
    {
      label: 'col 0',
      board: ['X', _, _, 'X', _, _, 'X', _, _] as Player[],
      line: [0, 3, 6],
    },
    {
      label: 'col 1',
      board: [_, 'O', _, _, 'O', _, _, 'O', _] as Player[],
      line: [1, 4, 7],
    },
    {
      label: 'col 2',
      board: [_, _, 'X', _, _, 'X', _, _, 'X'] as Player[],
      line: [2, 5, 8],
    },
    {
      label: 'diag top-left',
      board: ['O', _, _, _, 'O', _, _, _, 'O'] as Player[],
      line: [0, 4, 8],
    },
    {
      label: 'diag top-right',
      board: [_, _, 'X', _, 'X', _, 'X', _, _] as Player[],
      line: [2, 4, 6],
    },
  ])('detects winner for $label', ({ board, line }) => {
    const result = checkWinner(board);
    expect(result.winner).not.toBeNull();
    expect(result.line).toEqual(line);
  });

  it('returns the correct winner symbol', () => {
    const xWins: Player[] = ['X', 'X', 'X', _, _, _, _, _, _];
    expect(checkWinner(xWins).winner).toBe('X');

    const oWins: Player[] = [_, _, _, 'O', 'O', 'O', _, _, _];
    expect(checkWinner(oWins).winner).toBe('O');
  });
});

describe('isDraw', () => {
  it('returns false for an empty board', () => {
    expect(isDraw(Array(9).fill(_))).toBe(false);
  });

  it('returns false for a partial board', () => {
    const board: Player[] = ['X', 'O', 'X', 'O', _, _, _, _, _];
    expect(isDraw(board)).toBe(false);
  });

  it('returns false for a full board with a winner', () => {
    // X wins row 0, board is full
    const board: Player[] = ['X', 'X', 'X', 'O', 'O', 'X', 'O', 'X', 'O'];
    expect(isDraw(board)).toBe(false);
  });

  it('returns true for a full board with no winner', () => {
    // X O X / O X X / O X O — all 8 win patterns blocked
    const board: Player[] = ['X', 'O', 'X', 'O', 'X', 'X', 'O', 'X', 'O'];
    expect(isDraw(board)).toBe(true);
  });
});

describe('getBestMove', () => {
  it('returns -1 when cpuPlayer is null', () => {
    expect(getBestMove(Array(9).fill(_), null)).toBe(-1);
  });

  it('takes an immediate winning move', () => {
    // O can win at index 2
    const board: Player[] = ['O', 'O', _, 'X', 'X', _, _, _, _];
    expect(getBestMove(board, 'O')).toBe(2);
  });

  it('blocks the opponent from winning', () => {
    // X threatens at index 2, CPU is O — must block
    const board: Player[] = ['X', 'X', _, 'O', _, _, _, _, _];
    expect(getBestMove(board, 'O')).toBe(2);
  });

  it('returns a valid index for an empty board', () => {
    const move = getBestMove(Array(9).fill(_), 'X');
    expect(move).toBeGreaterThanOrEqual(0);
    expect(move).toBeLessThanOrEqual(8);
  });

  it('returns -1 when no moves are available', () => {
    // Full board, no winner
    const board: Player[] = ['X', 'O', 'X', 'O', 'O', 'X', 'O', 'X', 'X'];
    expect(getBestMove(board, 'O')).toBe(-1);
  });
});

describe('getRandomMove', () => {
  it('returns a valid index from an empty board', () => {
    const move = getRandomMove(Array(9).fill(_));
    expect(move).toBeGreaterThanOrEqual(0);
    expect(move).toBeLessThanOrEqual(8);
  });

  it('only returns indices of empty squares', () => {
    // Only index 4 is free
    const board: Player[] = ['X', 'O', 'X', 'O', _, 'O', 'X', 'X', 'O'];
    expect(getRandomMove(board)).toBe(4);
  });

  it('returns -1 when the board is full', () => {
    const board: Player[] = ['X', 'O', 'X', 'O', 'O', 'X', 'O', 'X', 'X'];
    expect(getRandomMove(board)).toBe(-1);
  });
});
