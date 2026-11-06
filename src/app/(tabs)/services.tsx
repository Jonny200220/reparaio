import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RecentServiceRow } from '@/components/request/recent-service-row';
import { AppText } from '@/components/ui/app-text';
import { recentServices } from '@/features/request/mock-data';
import { colors, spacing, type } from '@/theme/tokens';

/** Not part of the design: minimal placeholder listing past services. */
export default function ServicesScreen() {
  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <AppText style={[type.h2, styles.title]}>Servicios</AppText>
      <View style={styles.list}>
        {recentServices.map((item, i) => (
          <RecentServiceRow key={item.id} item={item} last={i === recentServices.length - 1} />
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.paper },
  title: { paddingTop: 30, paddingHorizontal: spacing.gutter },
  list: { paddingTop: 16, paddingHorizontal: spacing.gutter },
});
