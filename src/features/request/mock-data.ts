import type { Bid, Category, Contractor, MaterialLine, RecentService } from './types';

export const mockUser = {
  firstName: 'Mariana',
  initials: 'MR',
  address: 'Av. Insurgentes Sur 1458',
  paymentMethod: 'Visa ·· 4417',
};

export const nearbyContractorsCount = 23;

export const categoryInfo: Record<
  Category,
  { label: string; subtitle: string; tradePlural: string; problems: string[] }
> = {
  hidraulica: {
    label: 'Hidráulica',
    subtitle: 'Fugas, tuberías, WC, calentador',
    tradePlural: 'plomeros',
    problems: ['Fuga de agua', 'Tubería tapada', 'WC', 'Calentador', 'Tinaco / bomba', 'Instalación'],
  },
  electrica: {
    label: 'Eléctrica',
    subtitle: 'Cortos, contactos, lámparas, centro de carga',
    tradePlural: 'electricistas',
    // Not in the design: equivalent options derived from the category subtitle.
    problems: ['Corto circuito', 'Contactos', 'Lámparas', 'Centro de carga', 'Apagadores', 'Instalación'],
  },
};

/** Short noun used in titles: "3 ofertas para tu fuga", "Tu fuga quedó reparada". */
export const problemNoun: Record<string, { noun: string; feminine: boolean }> = {
  'Fuga de agua': { noun: 'fuga', feminine: true },
  'Tubería tapada': { noun: 'tubería', feminine: true },
  WC: { noun: 'WC', feminine: false },
  Calentador: { noun: 'calentador', feminine: false },
  'Tinaco / bomba': { noun: 'tinaco', feminine: false },
  Instalación: { noun: 'instalación', feminine: true },
  'Corto circuito': { noun: 'corto', feminine: false },
  Contactos: { noun: 'contacto', feminine: false },
  Lámparas: { noun: 'lámpara', feminine: true },
  'Centro de carga': { noun: 'centro de carga', feminine: false },
  Apagadores: { noun: 'apagador', feminine: false },
};

export function describeProblem(problem: string) {
  return problemNoun[problem] ?? { noun: problem.toLowerCase(), feminine: false };
}

export const suggestedMinimum = 450;
export const similarRepairsCount = 38;
export const availableNearbyCount = 11;

export const mockPhotos = ['foto_fuga', 'foto_mueble'];

export const recentServices: RecentService[] = [
  {
    id: 'r1',
    category: 'hidraulica',
    title: 'Fuga en lavabo',
    date: '12 sep',
    contractorShort: 'Jorge L.',
    price: 420,
  },
  {
    id: 'r2',
    category: 'electrica',
    title: 'Cambio de contactos',
    date: '28 ago',
    contractorShort: 'Ana P.',
    price: 680,
  },
];

export const contractors: Record<string, Contractor> = {
  jorge: {
    id: 'jorge',
    name: 'Jorge Luna',
    rating: 4.9,
    services: 212,
    distanceKm: 1.8,
    vehicle: 'Nissan NP300 blanca',
    plates: 'MXA-482-B',
  },
  ramirez: {
    id: 'ramirez',
    name: 'Plomería Ramírez',
    rating: 4.8,
    services: 530,
    distanceKm: 3.1,
    vehicle: 'Chevrolet Tornado gris',
    plates: 'NLK-219-C',
  },
  hugo: {
    id: 'hugo',
    name: 'Hugo Téllez',
    rating: 4.6,
    services: 48,
    distanceKm: 2.4,
    vehicle: 'Italika FT150 roja',
    plates: 'Z7-31-PM',
  },
};

/** Mock bids priced relative to the client's offer (design: $500 → $500 / $580 / $650). */
export function buildBids(offer: number): Bid[] {
  return [
    { id: 'b1', contractorId: 'jorge', price: offer, type: 'acepta', etaMin: 12 },
    {
      id: 'b2',
      contractorId: 'ramirez',
      price: offer + 80,
      type: 'contraoferta',
      comment: 'Incluyo cambio de llave de paso si hace falta.',
      etaMin: 20,
    },
    {
      id: 'b3',
      contractorId: 'hugo',
      price: offer + 150,
      type: 'contraoferta',
      etaMin: 35,
      compact: true,
    },
  ];
}

export const bidWindowSeconds = 5 * 60;

export const verificationCode = '4821';
export const workDurationMin = 47;
export const materials: MaterialLine[] = [{ concept: 'Llave de paso ½″', amount: 145 }];
export const serviceFee = 35;
export const reviewTags = ['Puntual', 'Limpio', 'Explicó el problema'];
