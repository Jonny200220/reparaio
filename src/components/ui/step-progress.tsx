import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

import { colors, font } from '@/theme/tokens';

import { AppText } from './app-text';

type Props = {
  steps: string[];
  /** Index of the step in progress. */
  current: number;
  /** 0–1 progress of the current step. */
  currentProgress: number;
};

/** Segmented 4-step progress (1e): done = ink, current = partial accent, pending = divider. */
export function StepProgress({ steps, current, currentProgress }: Props) {
  return (
    <View>
      <View style={styles.row}>
        {steps.map((step, i) =>
          i === current ? (
            <LinearGradient
              key={step}
              style={styles.segment}
              colors={[colors.accent, colors.accent, colors.divider, colors.divider]}
              locations={[0, currentProgress, currentProgress, 1]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          ) : (
            <View
              key={step}
              style={[styles.segment, { backgroundColor: i < current ? colors.ink : colors.divider }]}
            />
          ),
        )}
      </View>
      <View style={[styles.row, styles.labels]}>
        {steps.map((step, i) => (
          <AppText
            key={step}
            style={[
              styles.label,
              {
                color: i < current ? colors.ink : i === current ? colors.accent : colors.textMuted,
              },
            ]}>
            {step}
          </AppText>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 6 },
  segment: { flex: 1, height: 5, borderRadius: 3 },
  labels: { marginTop: 6 },
  label: { flex: 1, ...font.ui(600), fontSize: 11 },
});
