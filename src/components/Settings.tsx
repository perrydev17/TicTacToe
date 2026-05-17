import React, { useState } from 'react';
import { motion } from 'motion/react';
import type {
  GameMode,
  GameDifficulty,
  SettingsTab,
  AvatarConfig,
} from '../types';
import { Upload } from 'lucide-react';
import { PRESET_ICONS } from './DynamicIcon';

interface SettingsMenuProps {
  onClose: () => void;
  gameMode: GameMode;
  setGameMode: (mode: GameMode) => void;
  difficulty: GameDifficulty;
  setDifficulty: (diff: GameDifficulty) => void;
  resetGame: () => void;
  playerXAvatar: AvatarConfig;
  setPlayerXAvatar: (config: AvatarConfig) => void;
  playerOAvatar: AvatarConfig;
  setPlayerOAvatar: (config: AvatarConfig) => void;
  activeTab: SettingsTab;
  setActiveTab: (tab: SettingsTab) => void;
  handleFileUpload: (
    e: React.ChangeEvent<HTMLInputElement>,
    player: 'X' | 'O',
  ) => void;
}

const Settings = ({
  onClose,
  gameMode,
  setGameMode,
  difficulty,
  setDifficulty,
  resetGame,
  playerXAvatar,
  setPlayerXAvatar,
  playerOAvatar,
  setPlayerOAvatar,
  activeTab,
  setActiveTab,
  handleFileUpload,
}: SettingsMenuProps) => {
  const [fileError, setFileError] = useState<string | null>(null);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    player: 'X' | 'O',
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const allowed = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];
    if (!allowed.includes(file.type)) {
      setFileError('Unsupported file type. Please upload a PNG, JPG, WEBP, or GIF.');
      e.target.value = '';
      return;
    }
    setFileError(null);
    handleFileUpload(e, player);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-2xl"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden flex flex-col shadow-2xl backdrop-blur-3xl border-white/20"
      >
        <div className="p-10 pb-4">
          <h2 className="text-3xl font-bold mb-8 uppercase tracking-tighter text-white">
            Game Settings
          </h2>
          <div className="flex gap-8 border-b border-white/10">
            <button
              onClick={() => setActiveTab('rules')}
              className={`pb-4 text-xs font-mono uppercase tracking-[0.3em] relative transition-colors ${activeTab === 'rules' ? 'text-white' : 'text-white/30'}`}
            >
              RULES{' '}
              {activeTab === 'rules' && (
                <motion.div
                  layoutId="setTab"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyber-cyan shadow-[0_0_10px_rgba(0,243,255,0.5)]"
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('avatar')}
              className={`pb-4 text-xs font-mono uppercase tracking-[0.3em] relative transition-colors ${activeTab === 'avatar' ? 'text-white' : 'text-white/30'}`}
            >
              AVATAR{' '}
              {activeTab === 'avatar' && (
                <motion.div
                  layoutId="setTab"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyber-pink shadow-[0_0_10px_rgba(255,0,255,0.5)]"
                />
              )}
            </button>
          </div>
        </div>
        <div className="p-10 pt-6 overflow-y-auto h-96 space-y-10 scrollbar-hide">
          {activeTab === 'rules' ? (
            <div className="space-y-10">
              <div>
                <label className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em] mb-4 block font-bold">
                  GAME MODE
                </label>
                <div className="grid grid-cols-2 gap-3 p-1.5 bg-black/40 rounded-2xl border border-white/10">
                  <button
                    onClick={() => {
                      setGameMode('pvc');
                      resetGame();
                    }}
                    className={`py-5 rounded-xl text-xs font-bold uppercase tracking-widest ${gameMode === 'pvc' ? 'bg-white text-black' : 'text-white/30 hover:text-white hover:bg-white/5 transition-all'}`}
                  >
                    PLAYER VS AI CPU
                  </button>
                  <button
                    onClick={() => {
                      setGameMode('pvp');
                      resetGame();
                    }}
                    disabled
                    className={`py-5 rounded-xl text-xs font-bold uppercase tracking-widest cursor-not-allowed ${gameMode === 'pvp' ? 'bg-white text-black' : 'text-white/30 transition-all'}`}
                  >
                    Player vs Player
                  </button>
                </div>
              </div>
              {gameMode === 'pvc' && (
                <div>
                  <label className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em] mb-4 block font-bold">
                    LEVEL
                  </label>
                  <div className="grid grid-cols-2 gap-3 p-1.5 bg-black/40 rounded-2xl border border-white/10">
                    <button
                      onClick={() => {
                        setDifficulty('Easy');
                        resetGame();
                      }}
                      className={`py-5 rounded-xl text-xs font-bold uppercase tracking-widest ${difficulty === 'Easy' ? 'bg-cyber-yellow text-black' : 'text-white/30 hover:text-white transition-all'}`}
                    >
                      Easy
                    </button>
                    <button
                      onClick={() => {
                        setDifficulty('Hard');
                        resetGame();
                      }}
                      className={`py-5 rounded-xl text-xs font-bold uppercase tracking-widest ${difficulty === 'Hard' ? 'bg-cyber-pink text-white' : 'text-white/30 hover:text-white transition-all'}`}
                    >
                      Hard
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-12">
              {(['X', 'O'] as const).map((player) => (
                <div key={player}>
                  <label
                    className={`text-[10px] font-mono uppercase tracking-[0.4em] mb-5 block font-bold ${player === 'X' ? 'text-cyber-cyan' : 'text-cyber-pink'}`}
                  >
                    {player === 'X'
                      ? 'Choose your Avatar'
                      : 'Choose CPU Avatar'}
                  </label>
                  <div className="grid grid-cols-4 gap-3 mb-6">
                    {PRESET_ICONS.map(({ name, Icon }) => (
                      <button
                        key={name}
                        onClick={() =>
                          player === 'X'
                            ? setPlayerXAvatar({ type: 'icon', value: name })
                            : setPlayerOAvatar({ type: 'icon', value: name })
                        }
                        className={`p-4 rounded-2xl border-2 flex items-center justify-center transition-all ${(player === 'X' ? playerXAvatar : playerOAvatar).value === name ? 'border-white bg-white/15 scale-105 shadow-xl text-white' : 'border-white/5 bg-white/5 hover:border-white/20 text-white/60'}`}
                      >
                        <Icon size={20} />
                      </button>
                    ))}
                  </div>
                  <label className="flex items-center justify-center gap-3 p-5 border-2 border-dashed border-white/10 rounded-2xl cursor-pointer hover:border-white/40 transition-all hover:bg-white/5 active:scale-[0.98]">
                    {(player === 'X' ? playerXAvatar : playerOAvatar).type ===
                    'image' ? (
                      <img
                        src={
                          (player === 'X' ? playerXAvatar : playerOAvatar).value
                        }
                        alt="Uploaded avatar"
                        className="w-8 h-8 rounded-lg object-cover border border-white/20"
                      />
                    ) : (
                      <Upload size={16} className="text-white/40" />
                    )}
                    <span className="text-[10px] font-mono text-white/40 uppercase font-bold tracking-widest text-center">
                      {(player === 'X' ? playerXAvatar : playerOAvatar).type ===
                      'image'
                        ? 'Change Image'
                        : player === 'X'
                          ? 'Upload image as Player Avatar'
                          : 'Upload image as CPU Avatar'}
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/png,image/jpeg,image/webp,image/gif"
                      onChange={(e) => handleFileChange(e, player)}
                    />
                  </label>
                  {fileError && (
                    <p className="mt-2 text-[10px] font-mono text-red-400 uppercase tracking-widest">
                      {fileError}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="p-10">
          <button
            onClick={onClose}
            className="w-full py-6 bg-white text-black font-bold uppercase tracking-[0.3em] text-xs rounded-2xl hover:bg-cyber-cyan transition-all shadow-2xl"
          >
            Save
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;
