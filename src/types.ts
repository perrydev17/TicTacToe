import type { LucideIcon } from 'lucide-react';

export type Player = 'X' | 'O' | null;
export type GameDifficulty = 'Easy' | 'Hard';
export type GameMode = 'pvc'; //player vs cpu;
export type GameStatus = 'playing' | 'won' | 'draw';

export interface WinnerInfo {
  winner: Player;
  line: number[] | null;
}

export type SettingsTab = 'rules' | 'avatar';

export type AvatarType = 'icon' | 'image';

export interface AvatarConfig {
  type: AvatarType;
  value: string;
}

export interface PresetIcon {
  name: string;
  Icon: LucideIcon;
}
