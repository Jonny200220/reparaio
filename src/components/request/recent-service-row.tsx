import { StyleSheet, View } from 'react-native';

import { BoltIcon, DropIcon } from '@/components/icons';
import { AppText } from '@/components/ui/app-text';
import type { RecentService } from '@/features/request/types';
import { colors, font, radii } from '@/theme/tokens';

type Props = { item: RecentService; last: boolean };

export function RecentServiceRow({ item, last }: Props) {
  const plumbing = item.category === 'hidraulica';
  const Icon = plumbing ? DropIcon : BoltIcon;
  return (
    <View style={[styles.row, !last && styles.divider]}>
      <View style={[styles.icon, { backgroundColor: plumbing ? colors.plumbingTint : colors.electricTint }]}>
        <Icon size={18} strokeWidth={2} color={plumbing ? colors.plumbing : colors.electricStrong} />
      </View>
      <View style={styles.texts}>
        <AppText style={styles.title}>{item.title}</AppText>
        <AppText style={styles.meta}>
          {item.date} · {item.contractorShort}
        </AppText>
      </View>
      <AppText style={styles.price}>${item.price}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12 },
  divider: { borderBottomWidth: 1, borderBottomColor: colors.divider },
  icon: { width: 38, height: 38, borderRadius: radii.listIcon, alignItems: 'center', justifyContent: 'center' },
  texts: { flex: 1, gap: 2 },
  title: { ...font.ui(600), fontSize: 15 },
  meta: { ...font.ui(400), fontSize: 12, color: colors.textMuted },
  price: { ...font.mono(700), fontSize: 14 },
});
