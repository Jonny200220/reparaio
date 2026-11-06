import { Pressable, StyleSheet } from 'react-native';

import { colors, font, radii } from '@/theme/tokens';

import { AppText } from './app-text';

type Props = {
  label: string;
  selected: boolean;
  onPress: () => void;
  size?: 'md' | 'sm';
};

/** Selectable chip: selected = ink background, otherwise 1.5px border. */
export function Chip({ label, selected, onPress, size = 'md' }: Props) {
  const sm = size === 'sm';
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[
        styles.base,
        sm ? styles.sm : styles.md,
        selected ? styles.selected : styles.unselected,
      ]}>
      <AppText
        style={[
          { fontSize: sm ? 13 : 14 },
          selected ? styles.selectedText : font.ui(500),
        ]}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { borderWidth: 1.5 },
  md: { paddingVertical: 10 - 1.5, paddingHorizontal: 14 - 1.5, borderRadius: radii.chip },
  sm: { paddingVertical: 8 - 1.5, paddingHorizontal: 12 - 1.5, borderRadius: radii.listIcon },
  selected: { backgroundColor: colors.ink, borderColor: colors.ink },
  unselected: { borderColor: colors.border },
  selectedText: { ...font.ui(600), color: colors.white },
});
