import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { RouteMap } from '@/components/request/route-map';
import { AppText } from '@/components/ui/app-text';
import { StepProgress } from '@/components/ui/step-progress';
import { StripedPlaceholder } from '@/components/ui/striped-placeholder';
import { buildBids, contractors, verificationCode } from '@/features/request/mock-data';
import { formatMoney } from '@/features/request/offer-math';
import { useServiceRequest } from '@/features/request/request-context';
import { colors, font, radii, spacing, type } from '@/theme/tokens';

const STEPS = ['Aceptado', 'En camino', 'Llegó', 'Terminado'];

type Phase = 'en_camino' | 'llego';

/** 1e · Tracking — contractor on the way. */
export default function TrackingScreen() {
  const insets = useSafeAreaInsets();
  const { request, acceptedBid, update } = useServiceRequest();
  const bid = acceptedBid ?? buildBids(request.offer)[0];
  const contractor = contractors[bid.contractorId];
  const [phase, setPhase] = useState<Phase>('en_camino');

  // Prototype-only control: advances the mock service status (no backend yet).
  const advance = () => {
    if (phase === 'en_camino') {
      setPhase('llego');
      update({ status: 'llego' });
    } else {
      update({ status: 'terminada' });
      router.replace('/request/payment');
    }
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <RouteMap />

      <Pressable
        accessibilityRole="button"
        onPress={advance}
        style={[styles.simulate, { top: insets.top + 8 }]}>
        <AppText style={styles.simulateText}>
          {phase === 'en_camino' ? 'Simular: llegó' : 'Simular: terminado'} ›
        </AppText>
      </Pressable>

      <View style={[styles.sheet, { paddingBottom: Math.max(30, insets.bottom) }]}>
        <View style={styles.handle} />

        <View style={styles.etaRow}>
          <View style={styles.etaCol}>
            <AppText style={styles.monoLabel}>{phase === 'en_camino' ? 'LLEGA EN' : 'ESTADO'}</AppText>
            <AppText style={type.eta}>{phase === 'en_camino' ? `${bid.etaMin} min` : 'Llegó'}</AppText>
          </View>
          <View style={[styles.etaCol, styles.right]}>
            <AppText style={styles.monoLabel}>CÓDIGO</AppText>
            <AppText style={type.code}>{verificationCode}</AppText>
          </View>
        </View>

        <StepProgress
          steps={STEPS}
          current={phase === 'en_camino' ? 1 : 2}
          currentProgress={phase === 'en_camino' ? 0.6 : 0.5}
        />

        <View style={styles.contractor}>
          <StripedPlaceholder stripe={6} style={styles.avatar} />
          <View style={styles.contractorInfo}>
            <AppText style={styles.name}>{contractor.name}</AppText>
            <AppText style={styles.meta}>
              ★ {contractor.rating.toFixed(1)} · {contractor.vehicle} · {contractor.plates}
            </AppText>
          </View>
        </View>

        <View style={styles.actions}>
          <Pressable accessibilityRole="button" style={[styles.action, styles.actionInk]}>
            <AppText style={[styles.actionText, { color: colors.white }]}>Mensaje</AppText>
          </Pressable>
          <Pressable accessibilityRole="button" style={[styles.action, styles.actionOutline]}>
            <AppText style={[styles.actionText, font.ui(600)]}>Llamar</AppText>
          </Pressable>
        </View>

        <View style={styles.footer}>
          <AppText style={styles.footerText}>
            Precio acordado <AppText style={styles.footerPrice}>{formatMoney(bid.price)}</AppText>
          </AppText>
          <AppText style={styles.footerText}>Compartir viaje</AppText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.mapBackground },
  simulate: {
    position: 'absolute',
    right: spacing.gutter,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: radii.pill,
    backgroundColor: colors.ink,
  },
  simulateText: { ...font.ui(600), fontSize: 12, color: colors.paper },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 10,
    paddingHorizontal: spacing.gutter,
    gap: 16,
    backgroundColor: colors.paper,
    borderTopLeftRadius: radii.sheet,
    borderTopRightRadius: radii.sheet,
    boxShadow: '0 -10px 30px rgba(0,0,0,0.08)',
  },
  handle: { alignSelf: 'center', width: 40, height: 5, borderRadius: 3, backgroundColor: colors.border },
  etaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  etaCol: { gap: 4 },
  right: { alignItems: 'flex-end' },
  monoLabel: { ...font.mono(500), fontSize: 12, color: colors.textMuted },
  contractor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: radii.panel,
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.divider,
  },
  avatar: { width: 52, height: 52, borderRadius: 18 },
  contractorInfo: { flex: 1, gap: 2 },
  name: { ...font.ui(700), fontSize: 16 },
  meta: { ...font.ui(400), fontSize: 12, color: colors.textSecondary },
  actions: { flexDirection: 'row', gap: 10 },
  action: { flex: 1, paddingVertical: 14, borderRadius: radii.photo, alignItems: 'center' },
  actionInk: { backgroundColor: colors.ink },
  actionOutline: { borderWidth: 1.5, borderColor: colors.border, paddingVertical: 12.5 },
  actionText: { ...font.ui(700), fontSize: 15 },
  footer: { flexDirection: 'row', justifyContent: 'space-between' },
  footerText: { ...font.ui(400), fontSize: 13, color: colors.textSecondary },
  footerPrice: { ...font.mono(700), fontSize: 13, color: colors.ink },
});
