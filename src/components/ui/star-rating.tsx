import { Pressable, StyleSheet, View } from 'react-native';

import { colors } from '@/theme/tokens';

import { AppText } from './app-text';

type Props = { value: number; onChange: (value: number) => void; max?: number };

/** Interactive stars: 52px buttons, radius 16. */
export function StarRating({ value, onChange, max = 5 }: Props) {
  return (
    <View style={styles.row}>
      {Array.from({ length: max }, (_, i) => i + 1).map((n) => {
        const active = n <= value;
        return (
          <Pressable
            key={n}
            accessibilityRole="button"
            accessibilityLabel={`${n} de ${max} estrellas`}
            accessibilityState={{ selected: n === value }}
            onPress={() => onChange(n)}
            style={[styles.star, { backgroundColor: active ? colors.electric : colors.surfaceMuted }]}>
            <AppText style={[styles.glyph, { color: active ? colors.ink : colors.iconInactive }]}>★</AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 8 },
  star: { width: 52, height: 52, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  glyph: { fontSize: 24, lineHeight: 28 },
});
