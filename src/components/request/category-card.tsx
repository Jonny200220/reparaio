import { Pressable, StyleSheet, View } from 'react-native';

import { BoltIcon, DropIcon } from '@/components/icons';
import { AppText } from '@/components/ui/app-text';
import { categoryInfo } from '@/features/request/mock-data';
import type { Category } from '@/features/request/types';
import { colors, font, radii, type } from '@/theme/tokens';

type Props = { category: Category; onPress: () => void };

const VARIANTS = {
  hidraulica: { bg: colors.plumbing, fg: colors.white, circle: 'rgba(255,255,255,0.12)', subOpacity: 0.85 },
  electrica: { bg: colors.electric, fg: colors.ink, circle: 'rgba(255,255,255,0.25)', subOpacity: 0.75 },
} as const;

/** Home category card: height 212, radius 28, decorative circle bottom-right. */
export function CategoryCard({ category, onPress }: Props) {
  const v = VARIANTS[category];
  const info = categoryInfo[category];
  const Icon = category === 'hidraulica' ? DropIcon : BoltIcon;
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.card, { backgroundColor: v.bg }, pressed && styles.pressed]}>
      <View style={[styles.circle, { backgroundColor: v.circle }]} />
      <Icon color={v.fg} />
      <View>
        <AppText style={[type.categoryTitle, { color: v.fg }]}>{info.label}</AppText>
        <AppText style={[styles.subtitle, { color: v.fg, opacity: v.subOpacity }]}>{info.subtitle}</AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 212,
    borderRadius: radii.categoryCard,
    padding: 18,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  pressed: { transform: [{ scale: 0.98 }] },
  circle: { position: 'absolute', right: -30, bottom: -40, width: 150, height: 150, borderRadius: 75 },
  subtitle: { ...font.ui(400), fontSize: 13, marginTop: 4 },
});
