import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, radii, spacing, type } from '@/theme/tokens';

import { AppText } from './app-text';

type Props = {
  label: string;
  onPress: () => void;
  variant?: 'ink' | 'accent';
  /** Content rendered above the button inside the fixed area (e.g. a note). */
  above?: ReactNode;
};

/** Fixed bottom CTA: left/right 22, bottom 34, height 58, radius 20. */
export function StickyCta({ label, onPress, variant = 'ink', above }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { bottom: Math.max(spacing.ctaBottom, insets.bottom) }]}>
      {above}
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: variant === 'accent' ? colors.accent : colors.ink },
          pressed && styles.pressed,
        ]}>
        <AppText style={styles.label}>{label}</AppText>
      </Pressable>
    </View>
  );
}

/** Bottom padding a scroll view needs so its content clears the sticky CTA. */
export const STICKY_CTA_CLEARANCE = spacing.ctaHeight + spacing.ctaBottom + 24;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: spacing.gutter,
    right: spacing.gutter,
    gap: 10,
  },
  button: {
    height: spacing.ctaHeight,
    borderRadius: radii.cta,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.85 },
  label: { ...type.cta, color: colors.white },
});
