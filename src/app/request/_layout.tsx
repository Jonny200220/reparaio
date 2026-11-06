import { Stack } from 'expo-router';

import { colors } from '@/theme/tokens';

export default function RequestLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.paper } }}>
      <Stack.Screen name="describe" />
      <Stack.Screen name="offer" options={{ contentStyle: { backgroundColor: colors.ink } }} />
      <Stack.Screen name="bids" />
      <Stack.Screen name="tracking" options={{ gestureEnabled: false }} />
      <Stack.Screen name="payment" options={{ gestureEnabled: false }} />
    </Stack>
  );
}
