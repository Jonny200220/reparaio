import type { BottomTabBarProps } from 'expo-router/js-tabs';
import { Pressable, StyleSheet, View } from 'react-native';

import { colors, spacing, type } from '@/theme/tokens';

import { AppText } from './app-text';

const TAB_META: Record<string, { label: string; shape: 'square' | 'circle' }> = {
  index: { label: 'Inicio', shape: 'square' },
  services: { label: 'Servicios', shape: 'square' },
  account: { label: 'Cuenta', shape: 'circle' },
};

/** Custom tab bar matching the design: 84px tall, top divider, 22px glyphs. */
export function TabBar({ state, emitter, navigateToTab, insets }: BottomTabBarProps) {
  return (
    <View
      style={[
        styles.bar,
        { height: spacing.tabBarHeight - spacing.ctaBottom + Math.max(insets.bottom, spacing.ctaBottom) },
      ]}>
      {state.routes.map((route, index) => {
        const meta = TAB_META[route.name] ?? { label: route.name, shape: 'square' as const };
        const focused = index === state.index;
        const onPress = () => {
          const event = emitter.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!focused && !event.defaultPrevented) navigateToTab(route.key);
        };
        return (
          <Pressable
            key={route.key}
            accessibilityRole="tab"
            accessibilityState={{ selected: focused }}
            onPress={onPress}
            style={styles.item}>
            <View
              style={[
                styles.glyph,
                { borderRadius: meta.shape === 'circle' ? 11 : 7 },
                focused ? styles.glyphActive : styles.glyphInactive,
              ]}
            />
            <AppText style={[type.tab, { color: focused ? colors.ink : colors.textMuted }]}>
              {meta.label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingTop: 12,
    backgroundColor: colors.paper,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  item: { alignItems: 'center', gap: 4, minWidth: 64 },
  glyph: { width: 22, height: 22 },
  glyphActive: { backgroundColor: colors.ink },
  glyphInactive: { borderWidth: 2, borderColor: colors.iconInactive },
});
