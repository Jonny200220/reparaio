import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { colors, font, radii } from '@/theme/tokens';

type Props = { secondsLeft: number };

function mmss(total: number) {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function CountdownBadge({ secondsLeft }: Props) {
  return (
    <View style={styles.badge} accessibilityLabel={`Cierra en ${mmss(secondsLeft)}`}>
      <View style={styles.dot} />
      <AppText style={styles.text}>{secondsLeft > 0 ? `CIERRA EN ${mmss(secondsLeft)}` : 'CERRADA'}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 11,
    borderRadius: radii.pill,
    backgroundColor: colors.accentTint,
  },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.accent },
  text: { ...font.mono(700), fontSize: 12, color: colors.accentStrong },
});
