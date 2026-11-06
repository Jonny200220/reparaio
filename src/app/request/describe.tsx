import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, StyleSheet, TextInput, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '@/components/ui/app-text';
import { Chip } from '@/components/ui/chip';
import { SegmentedControl } from '@/components/ui/segmented-control';
import { StepHeader } from '@/components/ui/step-header';
import { STICKY_CTA_CLEARANCE, StickyCta } from '@/components/ui/sticky-cta';
import { StripedPlaceholder } from '@/components/ui/striped-placeholder';
import { categoryInfo } from '@/features/request/mock-data';
import { useServiceRequest } from '@/features/request/request-context';
import type { When } from '@/features/request/types';
import { colors, font, radii, spacing, type } from '@/theme/tokens';

const WHEN_OPTIONS: { value: When; label: string }[] = [
  { value: 'ahora', label: 'Ahora' },
  { value: 'hoy', label: 'Hoy' },
  { value: 'programado', label: 'Programar' },
];

/** 1b · Describe the problem (step 1 of 3). */
export default function DescribeScreen() {
  const { request, update } = useServiceRequest();
  const { width } = useWindowDimensions();
  const info = categoryInfo[request.category];
  const plumbing = request.category === 'hidraulica';
  const tile = (width - spacing.gutter * 2 - 8 * 2) / 3;

  const addPhoto = () => update({ photos: [...request.photos, `foto_${request.photos.length + 1}`] });

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <StatusBar style="dark" />
      <StepHeader step={1} onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.categoryRow}>
          <View style={[styles.categoryChip, { backgroundColor: plumbing ? colors.plumbing : colors.electric }]}>
            <AppText style={[styles.categoryText, { color: plumbing ? colors.white : colors.ink }]}>
              {info.label}
            </AppText>
          </View>
        </View>

        <AppText style={[type.h2, styles.h2]} accessibilityRole="header">
          ¿Qué está pasando?
        </AppText>

        <View style={styles.chips}>
          {info.problems.map((problem) => (
            <Chip
              key={problem}
              label={problem}
              selected={request.problem === problem}
              onPress={() => update({ problem })}
            />
          ))}
        </View>

        <TextInput
          multiline
          value={request.description}
          onChangeText={(description) => update({ description })}
          placeholder="Describe el problema"
          placeholderTextColor={colors.textMuted}
          cursorColor={colors.accent}
          selectionColor={colors.accent}
          style={styles.input}
          textAlignVertical="top"
        />

        <AppText style={styles.section}>
          Fotos <AppText style={styles.sectionHint}>· ayudan a cotizar mejor</AppText>
        </AppText>
        <View style={styles.photos}>
          {request.photos.map((name) => (
            <StripedPlaceholder key={name} style={[styles.photo, { width: tile, height: tile }]}>
              <AppText style={styles.photoLabel}>{name}</AppText>
            </StripedPlaceholder>
          ))}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Agregar foto"
            onPress={addPhoto}
            style={[styles.addPhoto, { width: tile, height: tile }]}>
            <AppText style={styles.plus}>+</AppText>
          </Pressable>
        </View>

        <AppText style={styles.section}>¿Cuándo?</AppText>
        <View style={styles.segmented}>
          <SegmentedControl options={WHEN_OPTIONS} value={request.when} onChange={(when) => update({ when })} />
        </View>
      </ScrollView>
      <StickyCta label="Continuar" onPress={() => router.push('/request/offer')} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.paper },
  content: { paddingBottom: STICKY_CTA_CLEARANCE },
  categoryRow: { paddingTop: 18, paddingHorizontal: spacing.gutter, flexDirection: 'row' },
  categoryChip: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: radii.pill },
  categoryText: { ...font.ui(600), fontSize: 13 },
  h2: { marginTop: 12, marginHorizontal: spacing.gutter },
  chips: { paddingTop: 18, paddingHorizontal: spacing.gutter, flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  input: {
    marginTop: 20,
    marginHorizontal: spacing.gutter,
    paddingVertical: 14,
    paddingHorizontal: 16,
    minHeight: 92,
    borderRadius: radii.input,
    borderWidth: 1.5,
    borderColor: colors.divider,
    backgroundColor: colors.card,
    ...font.ui(500),
    fontSize: 15,
    lineHeight: 21,
    color: colors.ink,
  },
  section: { paddingTop: 20, paddingHorizontal: spacing.gutter, ...font.ui(700), fontSize: 15 },
  sectionHint: { ...font.ui(400), color: colors.textMuted },
  photos: { paddingTop: 10, paddingHorizontal: spacing.gutter, flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  photo: { borderRadius: radii.photo, justifyContent: 'flex-end', padding: 8 },
  photoLabel: { ...font.mono(500), fontSize: 10, color: colors.placeholderText },
  addPhoto: {
    borderRadius: radii.photo,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.borderDashed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plus: { fontSize: 26, lineHeight: 30, color: colors.textMuted },
  segmented: { marginTop: 10, marginHorizontal: spacing.gutter },
});
