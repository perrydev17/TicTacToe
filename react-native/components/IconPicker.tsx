import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Upload } from 'lucide-react-native';
import { AvatarConfig } from '@shared/types';
import { colors, players } from '../constants/theme';

export const ICON_NAMES = ['Ghost', 'Skull', 'Zap', 'Star', 'Heart', 'Flame', 'Eye', 'Shield'];

export async function pickImage(onSet: (config: AvatarConfig) => void) {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permission needed', 'Allow photo access to use a custom avatar.');
    return;
  }
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8,
  });
  if (!result.canceled) {
    onSet({ type: 'image', value: result.assets[0].uri });
  }
}

interface Props {
  player: 'X' | 'O';
  current: AvatarConfig;
  onSelect: (name: string) => void;
  onUpload: () => void;
}

export function IconPicker({ player, current, onSelect, onUpload }: Props) {
  const color = players[player];
  return (
    <View>
      <Text style={[styles.label, { color }]}>Player {player} Avatar</Text>
      <View style={styles.grid}>
        {ICON_NAMES.map(name => (
          <TouchableOpacity
            key={name}
            onPress={() => onSelect(name)}
            style={[
              styles.item,
              current.type === 'icon' && current.value === name && {
                borderColor: color,
                backgroundColor: `${color}20`,
              },
            ]}
            accessibilityRole="button"
            accessibilityLabel={`${name} icon`}
            accessibilityState={{ selected: current.type === 'icon' && current.value === name }}
          >
            <Text style={styles.itemText}>{name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        onPress={onUpload}
        style={[styles.uploadBtn, current.type === 'image' && { borderColor: color, borderStyle: 'solid' }]}
        accessibilityRole="button"
        accessibilityLabel={current.type === 'image' ? 'Photo selected, tap to change' : 'Use a photo from gallery'}
      >
        {current.type === 'image' ? (
          <Image source={{ uri: current.value }} style={[styles.preview, { borderColor: color }]} />
        ) : (
          <Upload size={14} color={colors.textMuted} />
        )}
        <Text style={[styles.uploadText, current.type === 'image' && { color }]}>
          {current.type === 'image' ? 'Photo selected — tap to change' : 'Use a photo from gallery'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  item: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderFaint,
    backgroundColor: colors.surfaceSub,
  },
  itemText: {
    color: colors.textSub,
    fontSize: 11,
  },
  uploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.borderMid,
    backgroundColor: colors.surfaceFaint,
  },
  uploadText: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  preview: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
  },
});
