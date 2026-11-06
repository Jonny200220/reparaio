import { router } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ChevronDownIcon } from '@/components/icons';
import { CategoryCard } from '@/components/request/category-card';
import { RecentServiceRow } from '@/components/request/recent-service-row';
import { UrgencyBanner } from '@/components/request/urgency-banner';
import { AppText } from '@/components/ui/app-text';
import { mockUser, nearbyContractorsCount, recentServices } from '@/features/request/mock-data';
import { useServiceRequest } from '@/features/request/request-context';
import type { Category } from '@/features/request/types';
import { colors, font, spacing, type } from '@/theme/tokens';

/** 1a · Home — choose a category. */
export default function HomeScreen() {
  const { start } = useServiceRequest();

  const begin = (category: Category) => {
    start(category);
    router.push('/request/describe');
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.address}>
            <AppText style={styles.monoLabel}>ENTREGAR EN</AppText>
            <View style={styles.addressRow}>
              <AppText style={styles.addressText}>{mockUser.address}</AppText>
              <ChevronDownIcon color={colors.ink} />
            </View>
          </View>
          <View style={styles.avatar}>
            <AppText style={styles.initials}>{mockUser.initials}</AppText>
          </View>
        </View>

        <AppText style={[type.h1, styles.title]} accessibilityRole="header">
          ¿Qué hay que arreglar, {mockUser.firstName}?
        </AppText>

        <View style={styles.grid}>
          <CategoryCard category="hidraulica" onPress={() => begin('hidraulica')} />
          <CategoryCard category="electrica" onPress={() => begin('electrica')} />
        </View>

        <View style={styles.banner}>
          <UrgencyBanner nearbyCount={nearbyContractorsCount} onPress={() => begin('hidraulica')} />
        </View>

        <View style={styles.sectionHeader}>
          <AppText style={type.section}>Servicios recientes</AppText>
          <AppText style={styles.seeAll}>Ver todo</AppText>
        </View>
        <View style={styles.list}>
          {recentServices.map((item, i) => (
            <RecentServiceRow key={item.id} item={item} last={i === recentServices.length - 1} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.paper },
  content: { paddingBottom: 24 },
  header: {
    paddingTop: 12,
    paddingHorizontal: spacing.gutter,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  address: { gap: 2 },
  monoLabel: { ...type.monoLabel, color: colors.textMuted },
  addressRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  addressText: { ...font.ui(600), fontSize: 16 },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: { ...font.ui(700), fontSize: 15, color: colors.paper },
  title: { paddingTop: 30, paddingHorizontal: spacing.gutter },
  grid: { paddingTop: 26, paddingHorizontal: spacing.gutter, flexDirection: 'row', gap: 12 },
  banner: { marginTop: 12, marginHorizontal: spacing.gutter },
  sectionHeader: {
    paddingTop: 28,
    paddingHorizontal: spacing.gutter,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  seeAll: { ...font.ui(400), fontSize: 13, color: colors.textMuted },
  list: { paddingTop: 10, paddingHorizontal: spacing.gutter },
});
