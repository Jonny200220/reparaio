import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { colors, font } from '@/theme/tokens';

import { AppText } from './app-text';

type Props = {
  /** Thumb position, 0–1. */
  fraction: number;
  /** Position of the suggested minimum on the track, 0–1. */
  minFraction: number;
  minLabel: string;
  startLabel: string;
  endLabel: string;
};

const THUMB = 26;

/** Visual (non-draggable) slider from the design: gradient track + haloed thumb, 0.2s transition. */
export function OfferSlider({ fraction, minFraction, minLabel, startLabel, endLabel }: Props) {
  return (
    <View style={styles.container} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      <LinearGradient
        style={styles.track}
        colors={[colors.darkBorder, colors.darkBorder, colors.accent, colors.electric]}
        locations={[0, minFraction, minFraction, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />
      <Animated.View
        style={[
          styles.thumb,
          {
            left: `${fraction * 100}%`,
            transitionProperty: 'left',
            transitionDuration: 200,
          },
        ]}
      />
      <View style={[styles.minLabelWrap, { left: `${minFraction * 100}%` }]}>
        <AppText style={[styles.tick, { color: colors.textMuted }]}>{minLabel}</AppText>
      </View>
      <AppText style={[styles.tick, styles.start]}>{startLabel}</AppText>
      <AppText style={[styles.tick, styles.end]}>{endLabel}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { height: 44 },
  track: { position: 'absolute', left: 0, right: 0, top: 12, height: 6, borderRadius: 3 },
  thumb: {
    position: 'absolute',
    top: 2,
    marginLeft: -THUMB / 2,
    width: THUMB,
    height: THUMB,
    borderRadius: THUMB / 2,
    backgroundColor: colors.paper,
    boxShadow: '0 0 0 6px rgba(255,91,35,0.3)',
  },
  minLabelWrap: { position: 'absolute', top: 30, width: 80, marginLeft: -40, alignItems: 'center' },
  tick: { ...font.mono(500), fontSize: 10, color: colors.darkMuted },
  start: { position: 'absolute', left: 0, top: 30 },
  end: { position: 'absolute', right: 0, top: 30 },
});
