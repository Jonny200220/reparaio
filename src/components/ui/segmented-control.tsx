import { Pressable, StyleSheet, View } from 'react-native';

import { colors, font } from '@/theme/tokens';

import { AppText } from './app-text';

type Props<T extends string> = {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
};

export function SegmentedControl<T extends string>({ options, value, onChange }: Props<T>) {
  return (
    <View style={styles.track} accessibilityRole="tablist">
      {options.map((option) => {
        const active = option.value === value;
        return (
          <Pressable
            key={option.value}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            onPress={() => onChange(option.value)}
            style={[styles.segment, active && styles.active]}>
            <AppText style={[styles.label, { color: active ? colors.ink : colors.textSecondary }]}>
              {option.label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    padding: 4,
    gap: 4,
    borderRadius: 16,
    backgroundColor: colors.surfaceMuted,
  },
  segment: { flex: 1, paddingVertical: 10, borderRadius: 12, alignItems: 'center' },
  active: {
    backgroundColor: colors.card,
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
  },
  label: { ...font.ui(600), fontSize: 14 },
});
