import { Pressable, StyleSheet, View } from 'react-native';

import { ArrowRightIcon } from '@/components/icons';
import { AppText } from '@/components/ui/app-text';
import { colors, font, radii } from '@/theme/tokens';

type Props = { nearbyCount: number; onPress: () => void };

export function UrgencyBanner({ nearbyCount, onPress }: Props) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.banner}>
      <View style={styles.texts}>
        <AppText style={styles.title}>¿Urgencia? Pide en 3 toques</AppText>
        <AppText style={styles.subtitle}>Contratistas a menos de 4 km ahora: {nearbyCount}</AppText>
      </View>
      <View style={styles.arrow}>
        <ArrowRightIcon color={colors.white} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  banner: {
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: radii.panel,
    backgroundColor: colors.ink,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  texts: { gap: 3, flexShrink: 1 },
  title: { ...font.ui(600), fontSize: 15, color: colors.paper },
  subtitle: { ...font.ui(400), fontSize: 13, color: colors.textOnDark },
  arrow: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
