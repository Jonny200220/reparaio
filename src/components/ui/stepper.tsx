import { Pressable, StyleSheet, View } from 'react-native';

import { colors, font, type } from '@/theme/tokens';

import { AppText } from './app-text';

type Props = {
  valueLabel: string;
  caption: string;
  captionColor: string;
  onDecrement: () => void;
  onIncrement: () => void;
};

/** Dark-theme stepper (1c): − (58px, bordered) · big mono amount · + (58px, accent). */
export function Stepper({ valueLabel, caption, captionColor, onDecrement, onIncrement }: Props) {
  return (
    <View style={styles.row}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Bajar oferta"
        onPress={onDecrement}
        style={({ pressed }) => [
          styles.button,
          styles.decrement,
          pressed && { backgroundColor: colors.darkHover },
        ]}>
        <AppText style={styles.glyph}>−</AppText>
      </Pressable>
      <View style={styles.center}>
        <AppText style={styles.amount} accessibilityLiveRegion="polite">
          {valueLabel}
        </AppText>
        <AppText style={[styles.caption, { color: captionColor }]}>{caption}</AppText>
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Subir oferta"
        onPress={onIncrement}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? colors.accentHover : colors.accent },
        ]}>
        <AppText style={styles.glyph}>+</AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  button: { width: 58, height: 58, borderRadius: 29, alignItems: 'center', justifyContent: 'center' },
  decrement: { borderWidth: 1.5, borderColor: colors.darkBorder },
  glyph: { fontSize: 28, lineHeight: 32, color: colors.paper },
  center: { alignItems: 'center', gap: 6 },
  amount: { ...type.offerAmount, color: colors.paper },
  caption: { ...font.mono(500), fontSize: 12 },
});
