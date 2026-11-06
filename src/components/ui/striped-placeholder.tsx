import { useId, type ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import Svg, { Defs, Pattern, Rect } from 'react-native-svg';

import { colors } from '@/theme/tokens';

type Props = {
  style?: StyleProp<ViewStyle>;
  /** Stripe width in px (design uses 8 for photos, 6 for avatars). */
  stripe?: number;
  children?: ReactNode;
};

/** 135° striped placeholder used for photos and avatars. */
export function StripedPlaceholder({ style, stripe = 8, children }: Props) {
  const id = useId().replace(/:/g, '');
  return (
    <View style={[styles.container, style]}>
      <Svg style={StyleSheet.absoluteFill}>
        <Defs>
          <Pattern
            id={id}
            patternUnits="userSpaceOnUse"
            width={stripe * 2}
            height={stripe * 2}
            patternTransform="rotate(45)">
            <Rect x={0} y={0} width={stripe} height={stripe * 2} fill={colors.placeholderA} />
            <Rect x={stripe} y={0} width={stripe} height={stripe * 2} fill={colors.placeholderB} />
          </Pattern>
        </Defs>
        <Rect x={0} y={0} width="100%" height="100%" fill={`url(#${id})`} />
      </Svg>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { overflow: 'hidden' },
});
