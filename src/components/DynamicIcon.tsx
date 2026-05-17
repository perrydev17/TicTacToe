import { useState, useEffect } from 'react';
import {
  X as LucideX,
  Circle,
  Ghost,
  Skull,
  Heart,
  Star,
  Zap,
  Shield,
} from 'lucide-react';
import type { AvatarConfig, Player, PresetIcon } from '../types';

export const PRESET_ICONS: PresetIcon[] = [
  { name: 'X', Icon: LucideX },
  { name: 'Circle', Icon: Circle },
  { name: 'Ghost', Icon: Ghost },
  { name: 'Skull', Icon: Skull },
  { name: 'Heart', Icon: Heart },
  { name: 'Star', Icon: Star },
  { name: 'Zap', Icon: Zap },
  { name: 'Shield', Icon: Shield },
];

interface DynamicIconProps {
  config: AvatarConfig;
  player: Player;
  className?: string;
}

const DynamicIcon = ({ config, player, className }: DynamicIconProps) => {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [config.value]);

  if (config.type === 'image' && !imgError) {
    return (
      <div
        className={`rounded-xl overflow-hidden border border-white/10 ${className}`}
      >
        <img
          src={config.value}
          alt={`Player ${player} avatar`}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  const preset = PRESET_ICONS.find((p) => p.name === config.value);
  const IconComponent = preset ? preset.Icon : player === 'X' ? LucideX : Circle;

  return <IconComponent className={className} />;
};

export default DynamicIcon;
