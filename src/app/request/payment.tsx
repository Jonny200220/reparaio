import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CheckIcon } from '@/components/icons';
import { AppText } from '@/components/ui/app-text';
import { Chip } from '@/components/ui/chip';
import { StarRating } from '@/components/ui/star-rating';
import { STICKY_CTA_CLEARANCE, StickyCta } from '@/components/ui/sticky-cta';
import {
  buildBids,
  contractors,
  describeProblem,
  materials,
  mockUser,
  reviewTags,
  serviceFee,
  workDurationMin,
} from '@/features/request/mock-data';
import { formatMoney } from '@/features/request/offer-math';
import { useServiceRequest } from '@/features/request/request-context';
import { colors, font, radii, spacing, type } from '@/theme/tokens';

/** 1f · Service finished — payment and rating. */
export default function PaymentScreen() {
  const { request, acceptedBid, reset } = useServiceRequest();
  const bid = acceptedBid ?? buildBids(request.offer)[0];
  const contractor = contractors[bid.contractorId];
  const firstName = contractor.name.split(' ')[0];
  const { noun, feminine } = describeProblem(request.problem);

  const [rating, setRating] = useState(5);
  const [tags, setTags] = useState<string[]>([]);

  const lines = [
    { concept: 'Mano de obra (subasta)', amount: bid.price },
    ...materials,
    { concept: 'Tarifa de servicio', amount: serviceFee },
  ];
  const total = lines.reduce((sum, line) => sum + line.amount, 0);

  const toggleTag = (tag: string) =>
    setTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));

  const pay = () => {
    reset();
    router.dismissTo('/');
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <View style={styles.check}>
            <CheckIcon color={colors.white} />
          </View>
          <AppText style={type.successTitle} accessibilityRole="header">
            Listo. Tu {noun} quedó {feminine ? 'reparada' : 'reparado'}.
          </AppText>
          <AppText style={styles.subtitle}>
            {contractor.name} · {workDurationMin} min de trabajo
          </AppText>
        </View>

        <View style={styles.breakdown}>
          {lines.map((line) => (
            <View key={line.concept} style={styles.line}>
              <AppText style={styles.lineLabel}>{line.concept}</AppText>
              <AppText style={styles.lineAmount}>{formatMoney(line.amount, 2)}</AppText>
            </View>
          ))}
          <View style={styles.separator} />
          <View style={[styles.line, styles.totalLine]}>
            <AppText style={styles.totalLabel}>Total</AppText>
            <AppText style={styles.totalAmount}>{formatMoney(total, 2)}</AppText>
          </View>
        </View>

        <View style={styles.method}>
          <View style={styles.methodLeft}>
            <View style={styles.cardIcon} />
            <AppText style={styles.methodText}>{mockUser.paymentMethod}</AppText>
          </View>
          <AppText style={styles.change}>Cambiar</AppText>
        </View>

        <AppText style={[type.section, styles.rateTitle]}>¿Cómo te fue con {firstName}?</AppText>
        <View style={styles.stars}>
          <StarRating value={rating} onChange={setRating} />
        </View>
        <View style={styles.tags}>
          {reviewTags.map((tag) => (
            <Chip key={tag} size="sm" label={tag} selected={tags.includes(tag)} onPress={() => toggleTag(tag)} />
          ))}
        </View>
      </ScrollView>
      <StickyCta label={`Pagar ${formatMoney(total, 2)}`} onPress={pay} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.paper },
  content: { paddingBottom: STICKY_CTA_CLEARANCE },
  hero: { paddingTop: 26, paddingHorizontal: spacing.gutter, gap: 14 },
  check: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: { ...font.ui(400), fontSize: 14, color: colors.textSecondary },
  breakdown: {
    marginTop: 22,
    marginHorizontal: spacing.gutter,
    padding: 18,
    gap: 10,
    borderRadius: radii.panel,
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.divider,
  },
  line: { flexDirection: 'row', justifyContent: 'space-between' },
  lineLabel: { ...font.ui(400), fontSize: 15, color: colors.textSecondary },
  lineAmount: { ...font.mono(500), fontSize: 15 },
  separator: { height: 1, marginVertical: 4, backgroundColor: colors.divider },
  totalLine: { alignItems: 'baseline' },
  totalLabel: { ...font.ui(700), fontSize: 15 },
  totalAmount: { ...font.mono(700), fontSize: 24 },
  method: {
    marginTop: 12,
    marginHorizontal: spacing.gutter,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: radii.input,
    backgroundColor: colors.surfaceMuted,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  methodLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  cardIcon: { width: 34, height: 22, borderRadius: 5, backgroundColor: colors.ink },
  methodText: { ...font.ui(600), fontSize: 14 },
  change: { ...font.ui(600), fontSize: 14, color: colors.accent },
  rateTitle: { paddingTop: 26, paddingHorizontal: spacing.gutter },
  stars: { paddingTop: 12, paddingHorizontal: spacing.gutter },
  tags: { paddingTop: 14, paddingHorizontal: spacing.gutter, flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
});
