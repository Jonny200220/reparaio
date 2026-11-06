import { colors } from '@/theme/tokens';

/**
 * Offer screen (1c) logic, ported verbatim from the design prototype.
 * The probability formula is a placeholder: in production it must come from the backend.
 */
export const OFFER_MIN = 300;
export const OFFER_MAX = 900;
export const OFFER_STEP = 50;
export const OFFER_INITIAL = 500;

const clamp = (min: number, max: number, value: number) => Math.max(min, Math.min(max, value));

export function clampOffer(value: number) {
  return clamp(OFFER_MIN, OFFER_MAX, value);
}

export function acceptanceProbability(offer: number, base: number) {
  const d = offer - base;
  return clamp(8, 97, Math.round(62 + (d / base) * 160));
}

export function probabilityColor(prob: number) {
  return prob >= 75 ? colors.live : prob >= 45 ? colors.electric : colors.danger;
}

export function probabilityHint(prob: number) {
  return prob >= 75
    ? 'Buena oferta: los contratistas mejor calificados suelen aceptar rápido.'
    : prob >= 45
      ? 'Oferta justa. Puede que recibas contraofertas.'
      : 'Por debajo del mínimo sugerido: es probable que nadie acepte o recibas contraofertas.';
}

export function deltaText(offer: number, base: number) {
  const d = offer - base;
  if (d === 0) return 'IGUAL AL MÍNIMO';
  return (d > 0 ? `+$${d}` : `−$${-d}`) + ' VS. MÍNIMO';
}

export function deltaColor(offer: number, base: number) {
  const d = offer - base;
  return d < 0 ? colors.danger : d > 0 ? colors.live : colors.textMuted;
}

/** Thumb position on the slider track, as a 0–1 fraction. */
export function sliderFraction(value: number) {
  return (value - OFFER_MIN) / (OFFER_MAX - OFFER_MIN);
}

export function formatMoney(value: number, decimals = 0) {
  return '$' + value.toFixed(decimals);
}
