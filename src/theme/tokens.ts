/**
 * Design tokens for Arreglo. Values come from design/HANDOFF.md §2.
 * Letter spacing in the design is expressed in em; here it is converted to px (em × fontSize).
 */
import type { TextStyle } from 'react-native';

export const colors = {
  ink: '#15171C',
  paper: '#FAF8F4',
  card: '#FFFFFF',
  surfaceMuted: '#EFEBE3',
  accent: '#FF5B23',
  accentHover: '#FF7340',
  accentStrong: '#D9420F',
  accentTint: '#FFE6DC',
  plumbing: '#2F6BFF',
  plumbingTint: '#E3EAFF',
  electric: '#F5B700',
  electricTint: '#FFF1C2',
  electricStrong: '#A67C00',
  success: '#1E9E5A',
  live: '#3DDC84',
  danger: '#FF6B5B',
  textSecondary: '#6B6862',
  textMuted: '#8A867E',
  textOnDark: '#A9A59C',
  iconInactive: '#B9B4AA',
  border: '#DCD6CA',
  borderDashed: '#C9C3B7',
  divider: '#E7E2D8',
  darkSurface: '#22252C',
  darkBorder: '#3A3D45',
  darkHover: '#24272E',
  darkMuted: '#5A5D64',
  placeholderA: '#E2DDD2',
  placeholderB: '#ECE8DF',
  placeholderText: '#7D786F',
  mapBackground: '#E8E3D7',
  mapRoad: '#F6F3EC',
  mapPark: '#D4E2C6',
  mapBlock: '#DCD6C8',
  white: '#FFFFFF',
} as const;

/** Font family names registered in the root layout via `useFonts`. */
export const fontFamilies = {
  ui400: 'BricolageGrotesque_400Regular',
  ui500: 'BricolageGrotesque_500Medium',
  ui600: 'BricolageGrotesque_600SemiBold',
  ui700: 'BricolageGrotesque_700Bold',
  ui800: 'BricolageGrotesque_800ExtraBold',
  mono500: 'JetBrainsMono_500Medium',
  mono700: 'JetBrainsMono_700Bold',
} as const;

type UiWeight = 400 | 500 | 600 | 700 | 800;
type MonoWeight = 500 | 700;

/** Static font files carry the weight, so we set `fontFamily` instead of `fontWeight`. */
export const font = {
  ui: (weight: UiWeight): TextStyle => ({ fontFamily: fontFamilies[`ui${weight}`] }),
  mono: (weight: MonoWeight): TextStyle => ({ fontFamily: fontFamilies[`mono${weight}`] }),
};

export const type = {
  h1: { ...font.ui(800), fontSize: 40, lineHeight: 39.2, letterSpacing: -1.4 },
  successTitle: { ...font.ui(800), fontSize: 34, lineHeight: 34, letterSpacing: -1.19 },
  h2: { ...font.ui(800), fontSize: 30, lineHeight: 30.6, letterSpacing: -0.9 },
  eta: { ...font.ui(800), fontSize: 44, lineHeight: 39.6, letterSpacing: -1.76 },
  categoryTitle: { ...font.ui(700), fontSize: 24, letterSpacing: -0.48 },
  section: { ...font.ui(700), fontSize: 17 },
  cta: { ...font.ui(700), fontSize: 17 },
  body: { ...font.ui(500), fontSize: 15, lineHeight: 21 },
  tab: { ...font.ui(600), fontSize: 11 },
  offerAmount: { ...font.mono(700), fontSize: 60, lineHeight: 60, letterSpacing: -2.4 },
  cardPrice: { ...font.mono(700), fontSize: 20 },
  monoLabel: { ...font.mono(500), fontSize: 12, letterSpacing: 0.48 },
  code: { ...font.mono(700), fontSize: 22, letterSpacing: 2.64 },
} satisfies Record<string, TextStyle>;

export const radii = {
  categoryCard: 28,
  bidCard: 24,
  panel: 22,
  cta: 20,
  input: 18,
  photo: 16,
  chip: 14,
  listIcon: 12,
  pill: 99,
  sheet: 32,
} as const;

export const spacing = {
  gutter: 22,
  ctaBottom: 34,
  ctaHeight: 58,
  tabBarHeight: 84,
} as const;
