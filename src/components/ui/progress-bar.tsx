import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

type Props = {
  /** 0–100 */
  percent: number;
  color: string;
  trackColor: string;
  height?: number;
};

/** Progress bar with a 0.25s width/color transition (design 1c). */
export function ProgressBar({ percent, color, trackColor, height = 8 }: Props) {
  const radius = height / 2;
  return (
    <View style={[styles.track, { height, borderRadius: radius, backgroundColor: trackColor }]}>
      <Animated.View
        style={{
          height: '100%',
          width: `${percent}%`,
          borderRadius: radius,
          backgroundColor: color,
          transitionProperty: ['width', 'backgroundColor', 'borderRadius'],
          transitionDuration: 250,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { overflow: 'hidden' },
});
