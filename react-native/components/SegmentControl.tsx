import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../constants/theme';

interface Option<T extends string> {
  label: string;
  value: T;
}

interface Props<T extends string> {
  options: Option<T>[];
  value: T;
  onChange: (v: T) => void;
  optionColors?: Partial<Record<string, string>>;
  disabledValues?: T[];
}

export function SegmentControl<T extends string>({
  options, value, onChange, optionColors, disabledValues,
}: Props<T>) {
  return (
    <View style={styles.row}>
      {options.map(opt => {
        const active = opt.value === value;
        const disabled = disabledValues?.includes(opt.value) ?? false;
        const color = optionColors?.[opt.value] ?? colors.white;
        return (
          <TouchableOpacity
            key={opt.value}
            onPress={() => onChange(opt.value)}
            disabled={disabled}
            style={[styles.btn, active && { backgroundColor: color }, disabled && styles.btnDisabled]}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel={opt.label}
            accessibilityState={{ selected: active, disabled }}
          >
            <Text style={[
              styles.label,
              { color: active ? colors.black : disabled ? colors.textDisabled : colors.textFaint },
            ]}>
              {opt.label}
            </Text>
            {disabled && <Text style={styles.comingSoon}>soon</Text>}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceDark,
    borderRadius: 16,
    padding: 4,
    borderWidth: 1,
    borderColor: colors.borderFaint,
  },
  btn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnDisabled: {
    opacity: 0.6,
  },
  label: {
    fontWeight: '700',
    fontSize: 11,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  comingSoon: {
    color: colors.textSub,
    fontSize: 9,
    letterSpacing: 1,
    marginTop: 2,
    textTransform: 'uppercase',
  },
});
