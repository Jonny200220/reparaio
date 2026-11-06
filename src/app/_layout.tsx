import {
  BricolageGrotesque_400Regular,
  BricolageGrotesque_500Medium,
  BricolageGrotesque_600SemiBold,
  BricolageGrotesque_700Bold,
  BricolageGrotesque_800ExtraBold,
  useFonts as useBricolage,
} from '@expo-google-fonts/bricolage-grotesque';
import {
  JetBrainsMono_500Medium,
  JetBrainsMono_700Bold,
  useFonts as useJetBrains,
} from '@expo-google-fonts/jetbrains-mono';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { RequestProvider } from '@/features/request/request-context';
import { colors } from '@/theme/tokens';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [uiLoaded, uiError] = useBricolage({
    BricolageGrotesque_400Regular,
    BricolageGrotesque_500Medium,
    BricolageGrotesque_600SemiBold,
    BricolageGrotesque_700Bold,
    BricolageGrotesque_800ExtraBold,
  });
  const [monoLoaded, monoError] = useJetBrains({ JetBrainsMono_500Medium, JetBrainsMono_700Bold });
  const ready = (uiLoaded || !!uiError) && (monoLoaded || !!monoError);

  useEffect(() => {
    if (ready) SplashScreen.hideAsync();
  }, [ready]);

  if (!ready) return null;

  return (
    <RequestProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.paper } }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="request" />
      </Stack>
    </RequestProvider>
  );
}
