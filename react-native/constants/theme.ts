export const colors = {
  bg: '#050505',
  playerX: '#d4f53c',
  playerO: '#ff14d4',
  draw: '#f8ff00',
  white: '#ffffff',
  black: '#000000',
  sheetBg: '#0f0f0f',

  borderFaint: 'rgba(255,255,255,0.08)',
  borderMid: 'rgba(255,255,255,0.15)',
  borderStrong: 'rgba(255,255,255,0.22)',

  surfaceFaint: 'rgba(255,255,255,0.02)',
  surfaceSub: 'rgba(255,255,255,0.04)',
  surface: 'rgba(255,255,255,0.10)',
  surfaceMid: 'rgba(255,255,255,0.05)',
  surfaceDark: 'rgba(0,0,0,0.4)',

  textMuted: 'rgba(255,255,255,0.35)',
  textSub: 'rgba(255,255,255,0.6)',
  textDisabled: 'rgba(255,255,255,0.45)',
  textFaint: 'rgba(255,255,255,0.3)',
} as const;

export const players: Record<'X' | 'O', string> = {
  X: colors.playerX,
  O: colors.playerO,
};
