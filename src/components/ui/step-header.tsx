import { Pressable, StyleSheet, View } from 'react-native';

import { BackIcon } from '@/components/icons';
import { colors, spacing, type } from '@/theme/tokens';

import { AppText } from './app-text';

type Props = {
  step: number;
  total?: number;
  onBack: () => void;
  dark?: boolean;
};

/** Circular back button (40px) + "PASO N DE 3" mono label. */
export function StepHeader({ step, total = 3, onBack, dark = false }: Props) {
  return (
    <View style={styles.row}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Atrás"
        hitSlop={8}
        onPress={onBack}
        style={[styles.back, { borderColor: dark ? colors.darkBorder : colors.border }]}>
        <BackIcon color={dark ? colors.paper : colors.ink} />
      </Pressable>
      <AppText style={styles.label}>
        PASO {step} DE {total}
      </AppText>
      <View style={styles.spacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingTop: 8,
    paddingHorizontal: spacing.gutter,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  back: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: { ...type.monoLabel, letterSpacing: 0, color: colors.textMuted },
  spacer: { width: 40 },
});
