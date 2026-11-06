import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { StripedPlaceholder } from '@/components/ui/striped-placeholder';
import type { Bid, Contractor } from '@/features/request/types';
import { colors, font, radii, type } from '@/theme/tokens';

type Props = {
  bid: Bid;
  contractor: Contractor;
  offer: number;
  onAccept: () => void;
  onReject: () => void;
};

/** Contractor bid card (1d) in three variants: accepts, counteroffer, compact/dimmed. */
export function BidCard({ bid, contractor, offer, onAccept, onReject }: Props) {
  const accepts = bid.type === 'acepta';
  const diff = bid.price - offer;
  const tag = accepts
    ? 'ACEPTA TU PRECIO'
    : bid.compact
      ? `+$${diff} · ${bid.etaMin} min`
      : `CONTRAOFERTA +$${diff}`;

  const header = (
    <View style={styles.header}>
      <StripedPlaceholder stripe={6} style={styles.avatar} />
      <View style={styles.info}>
        <AppText style={styles.name}>{contractor.name}</AppText>
        <AppText style={styles.meta}>
          ★ {contractor.rating.toFixed(1)} · {contractor.services} servicios · {contractor.distanceKm} km
        </AppText>
      </View>
      <View style={styles.priceCol}>
        <AppText style={type.cardPrice}>${bid.price}</AppText>
        <AppText style={[styles.tag, { color: accepts ? colors.success : colors.accentStrong }]}>{tag}</AppText>
      </View>
    </View>
  );

  if (bid.compact) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityHint="Aceptar esta oferta"
        onPress={onAccept}
        style={[styles.card, styles.compact]}>
        {header}
      </Pressable>
    );
  }

  return (
    <View style={[styles.card, accepts ? styles.best : styles.regular]}>
      {header}
      {!!bid.comment && <AppText style={styles.comment}>“{bid.comment}”</AppText>}
      {accepts ? (
        <Pressable accessibilityRole="button" onPress={onAccept} style={[styles.btn, styles.btnInk]}>
          <AppText style={[styles.btnLabel, { color: colors.white, fontSize: 15 }]}>
            Aceptar · llega en {bid.etaMin} min
          </AppText>
        </Pressable>
      ) : (
        <View style={styles.actions}>
          <Pressable accessibilityRole="button" onPress={onReject} style={[styles.btn, styles.btnOutline]}>
            <AppText style={[styles.btnLabel, font.ui(600)]}>Rechazar</AppText>
          </Pressable>
          <Pressable accessibilityRole="button" onPress={onAccept} style={[styles.btn, styles.btnMuted]}>
            <AppText style={styles.btnLabel}>Aceptar · {bid.etaMin} min</AppText>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 16, borderRadius: radii.bidCard, backgroundColor: colors.card, gap: 12 },
  best: { borderWidth: 2, borderColor: colors.ink },
  regular: { borderWidth: 1.5, borderColor: colors.divider },
  compact: { borderWidth: 1.5, borderColor: colors.divider, opacity: 0.75 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { width: 48, height: 48, borderRadius: 16 },
  info: { flex: 1, gap: 2 },
  name: { ...font.ui(700), fontSize: 16 },
  meta: { ...font.ui(400), fontSize: 12, color: colors.textSecondary },
  priceCol: { alignItems: 'flex-end', gap: 2 },
  tag: { ...font.ui(600), fontSize: 11 },
  comment: { ...font.ui(400), fontSize: 13, lineHeight: 17.5, color: colors.textSecondary },
  actions: { flexDirection: 'row', gap: 8 },
  btn: { flex: 1, paddingVertical: 12, borderRadius: radii.chip, alignItems: 'center' },
  btnInk: { backgroundColor: colors.ink },
  btnOutline: { borderWidth: 1.5, borderColor: colors.border, paddingVertical: 10.5 },
  btnMuted: { backgroundColor: colors.surfaceMuted },
  btnLabel: { ...font.ui(700), fontSize: 14 },
});
