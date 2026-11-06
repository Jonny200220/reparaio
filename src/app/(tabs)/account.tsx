import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '@/components/ui/app-text';
import { mockUser } from '@/features/request/mock-data';
import { colors, font, radii, spacing, type } from '@/theme/tokens';

/** Not part of the design: minimal placeholder for the account tab. */
export default function AccountScreen() {
  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <AppText style={[type.h2, styles.title]}>Cuenta</AppText>
      <View style={styles.card}>
        <AppText style={styles.name}>{mockUser.firstName}</AppText>
        <AppText style={styles.meta}>{mockUser.address}</AppText>
        <AppText style={styles.meta}>{mockUser.paymentMethod}</AppText>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.paper },
  title: { paddingTop: 30, paddingHorizontal: spacing.gutter },
  card: {
    marginTop: 16,
    marginHorizontal: spacing.gutter,
    padding: 18,
    gap: 4,
    borderRadius: radii.panel,
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.divider,
  },
  name: { ...font.ui(700), fontSize: 17 },
  meta: { ...font.ui(400), fontSize: 14, color: colors.textSecondary },
});
