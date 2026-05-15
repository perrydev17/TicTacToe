export type Player = 'X' | 'O' | null;
export type GameDifficulty = 'Easy' | 'Hard';
export type GameMode = 'pvc'; //player vs cpu;
export type GameStatus = 'playing' | 'won' | 'draw';

export interface WinnerInfo {
  winner: Player;
}
