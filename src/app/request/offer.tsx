import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '@/components/ui/app-text';
import { OfferSlider } from '@/components/ui/offer-slider';
import { ProgressBar } from '@/components/ui/progress-bar';
import { StepHeader } from '@/components/ui/step-header';
import { STICKY_CTA_CLEARANCE, StickyCta } from '@/components/ui/sticky-cta';
import { Stepper } from '@/components/ui/stepper';
import {
  availableNearbyCount,
  bidWindowSeconds,
  categoryInfo,
  describeProblem,
  similarRepairsCount,
} from '@/features/request/mock-data';
import {
  OFFER_MAX,
  OFFER_MIN,
  OFFER_STEP,
  acceptanceProbability,
  clampOffer,
  deltaColor,
  deltaText,
  formatMoney,
  probabilityColor,
  probabilityHint,
  sliderFraction,
} from '@/features/request/offer-math';
import { useServiceRequest } from '@/features/request/request-context';
import { colors, font, radii, spacing, type } from '@/theme/tokens';

/** 1c · Your offer — reverse auction (step 2 of 3). Always dark. */
export default function OfferScreen() {
  const { request, update } = useServiceRequest();
  const { offer, suggestedMinimum: base } = request;
  const prob = acceptanceProbability(offer, base);
  const probColor = probabilityColor(prob);
  const noun = describeProblem(request.problem).noun;

  const publish = () => {
    update({ status: 'publicada', closesAt: Date.now() + bidWindowSeconds * 1000 });
    router.push('/request/bids');
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <StatusBar style="light" />
      <StepHeader step={2} dark onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content}>
        <AppText style={[type.h2, styles.h2]} accessibilityRole="header">
          ¿Cuánto quieres ofrecer?
        </AppText>
        <AppText style={styles.lead}>
          Cuota mínima sugerida: <AppText style={styles.leadStrong}>{formatMoney(base)}</AppText>, basada en{' '}
          {similarRepairsCount} reparaciones de {noun} similares en tu zona.
        </AppText>

        <View style={styles.stepper}>
          <Stepper
            valueLabel={formatMoney(offer)}
            caption={deltaText(offer, base)}
            captionColor={deltaColor(offer, base)}
            onDecrement={() => update({ offer: clampOffer(offer - OFFER_STEP) })}
            onIncrement={() => update({ offer: clampOffer(offer + OFFER_STEP) })}
          />
        </View>

        <View style={styles.slider}>
          <OfferSlider
            fraction={sliderFraction(offer)}
            minFraction={sliderFraction(base)}
            minLabel={`MÍN ${formatMoney(base)}`}
            startLabel={formatMoney(OFFER_MIN)}
            endLabel={formatMoney(OFFER_MAX)}
          />
        </View>

        <View style={styles.probCard}>
          <View style={styles.probHeader}>
            <AppText style={styles.probLabel}>Probabilidad de que acepten</AppText>
            <AppText style={[styles.probValue, { color: probColor }]}>{prob}%</AppText>
          </View>
          <View style={styles.probBar}>
            <ProgressBar percent={prob} color={probColor} trackColor={colors.darkBorder} />
          </View>
          <AppText style={styles.probHint}>{probabilityHint(prob)}</AppText>
        </View>

        <View style={styles.available}>
          <View style={styles.liveDot} />
          <AppText style={styles.availableText}>
            {availableNearbyCount} {categoryInfo[request.category].tradePlural} disponibles a menos de 4 km
          </AppText>
        </View>
      </ScrollView>
      <StickyCta
        variant="accent"
        label={`Publicar por ${formatMoney(offer)}`}
        onPress={publish}
        above={<AppText style={styles.note}>Solo pagas al terminar. La materia prima se cotiza aparte.</AppText>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.ink },
  content: { paddingBottom: STICKY_CTA_CLEARANCE + 30 },
  h2: { marginTop: 22, marginHorizontal: spacing.gutter, color: colors.paper },
  lead: {
    marginTop: 10,
    marginHorizontal: spacing.gutter,
    ...font.ui(400),
    fontSize: 14,
    lineHeight: 19.6,
    color: colors.textOnDark,
  },
  leadStrong: { ...font.ui(600), fontSize: 14, color: colors.paper },
  stepper: { marginTop: 30, marginHorizontal: spacing.gutter },
  slider: { marginTop: 34, marginHorizontal: spacing.gutter },
  probCard: {
    marginTop: 24,
    marginHorizontal: spacing.gutter,
    padding: 18,
    borderRadius: radii.panel,
    backgroundColor: colors.darkSurface,
  },
  probHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  probLabel: { ...font.ui(400), fontSize: 14, color: colors.textOnDark },
  probValue: { ...font.ui(700), fontSize: 18 },
  probBar: { marginTop: 12 },
  probHint: { marginTop: 12, ...font.ui(400), fontSize: 13, lineHeight: 18.2, color: colors.textOnDark },
  available: { marginTop: 12, marginHorizontal: spacing.gutter, flexDirection: 'row', alignItems: 'center', gap: 10 },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.live },
  availableText: { ...font.ui(400), fontSize: 13, color: colors.textOnDark },
  note: { ...font.ui(400), fontSize: 12, color: colors.textMuted, textAlign: 'center' },
});
