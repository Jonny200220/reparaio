import { StyleSheet, Text, type TextProps } from 'react-native';

import { colors, font } from '@/theme/tokens';

/** Base text: custom fonts must be set on every Text, so this carries the UI defaults. */
export function AppText({ style, ...rest }: TextProps) {
  return <Text {...rest} style={[styles.base, style]} />;
}

const styles = StyleSheet.create({
  base: { ...font.ui(500), fontSize: 15, color: colors.ink },
});
