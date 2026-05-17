export type Player = 'X' | 'O' | null;
export type GameDifficulty = 'Easy' | 'Hard';
export type GameMode = 'pvc' | 'pvp';
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

export interface UseAvatarsReturn {
  playerXAvatar: AvatarConfig;
  setPlayerXAvatar: (config: AvatarConfig) => void;
  playerOAvatar: AvatarConfig;
  setPlayerOAvatar: (config: AvatarConfig) => void;
}
