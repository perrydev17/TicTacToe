// TypeScript type shim — Vite resolves useAvatars.web.ts, Metro resolves useAvatars.native.ts
import type { UseAvatarsReturn } from '../types';
declare function useAvatars(): UseAvatarsReturn & {
  handleFileUpload: (e: any, player: 'X' | 'O') => void;
};
export default useAvatars;
