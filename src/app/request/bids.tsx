import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BidCard } from '@/components/request/bid-card';
import { CountdownBadge } from '@/components/request/countdown-badge';
import { WaitingDots } from '@/components/request/waiting-dots';
import { AppText } from '@/components/ui/app-text';
import { bidWindowSeconds, buildBids, contractors, describeProblem } from '@/features/request/mock-data';
import { formatMoney } from '@/features/request/offer-math';
import { useServiceRequest } from '@/features/request/request-context';
import type { Bid } from '@/features/request/types';
import { colors, font, radii, spacing, type } from '@/theme/tokens';

function secondsUntil(closesAt: number | undefined) {
  if (!closesAt) return bidWindowSeconds;
  return Math.max(0, Math.round((closesAt - Date.now()) / 1000));
}

/** 1d · Contractor bids (step 3 of 3). */
export default function BidsScreen() {
  const { request, accept } = useServiceRequest();
  const [bids, setBids] = useState(() => buildBids(request.offer));
  const [secondsLeft, setSecondsLeft] = useState(() => secondsUntil(request.closesAt));

  useEffect(() => {
    const id = setInterval(() => setSecondsLeft(secondsUntil(request.closesAt)), 1000);
    return () => clearInterval(id);
  }, [request.closesAt]);

  const onAccept = (bid: Bid) => {
    accept(bid);
    router.push('/request/tracking');
  };

  const noun = describeProblem(request.problem).noun;

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <AppText style={styles.step}>PASO 3 DE 3</AppText>
          <CountdownBadge secondsLeft={secondsLeft} />
        </View>

        <AppText style={[type.h2, styles.h2]} accessibilityRole="header">
          {bids.length} {bids.length === 1 ? 'oferta' : 'ofertas'} para tu {noun}
        </AppText>

        <View style={styles.yourOffer}>
          <AppText style={styles.yourOfferLabel}>Tu oferta</AppText>
          <View style={styles.yourOfferRight}>
            <AppText style={styles.yourOfferAmount}>{formatMoney(request.offer)}</AppText>
            <Pressable accessibilityRole="button" hitSlop={8} onPress={() => router.back()}>
              <AppText style={styles.edit}>Editar</AppText>
            </Pressable>
          </View>
        </View>

        <View style={styles.list}>
          {bids.map((bid) => (
            <BidCard
              key={bid.id}
              bid={bid}
              contractor={contractors[bid.contractorId]}
              offer={request.offer}
              onAccept={() => onAccept(bid)}
              onReject={() => setBids((prev) => prev.filter((b) => b.id !== bid.id))}
            />
          ))}
        </View>

        <View style={styles.waiting}>
          <WaitingDots label="Esperando más ofertas…" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.paper },
  content: { paddingBottom: 40 },
  header: {
    paddingTop: 8,
    paddingHorizontal: spacing.gutter,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  step: { ...font.mono(500), fontSize: 12, color: colors.textMuted },
  h2: { marginTop: 16, marginHorizontal: spacing.gutter },
  yourOffer: {
    marginTop: 14,
    marginHorizontal: spacing.gutter,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: radii.photo,
    backgroundColor: colors.surfaceMuted,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  yourOfferLabel: { fontSize: 14, color: colors.textSecondary },
  yourOfferRight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  yourOfferAmount: { ...font.mono(700), fontSize: 16 },
  edit: { ...font.ui(600), fontSize: 14, color: colors.accent },
  list: { paddingTop: 14, paddingHorizontal: 16, gap: 10 },
  waiting: { marginTop: 14, marginHorizontal: spacing.gutter },
});
