export type Category = 'hidraulica' | 'electrica';

export type When = 'ahora' | 'hoy' | 'programado';

export type RequestStatus =
  | 'borrador'
  | 'publicada'
  | 'asignada'
  | 'en_camino'
  | 'llego'
  | 'terminada'
  | 'pagada';

export type ServiceRequest = {
  category: Category;
  problem: string;
  description: string;
  photos: string[];
  when: When;
  scheduledAt?: string;
  address: string;
  suggestedMinimum: number;
  offer: number;
  status: RequestStatus;
  closesAt?: number;
};

export type Contractor = {
  id: string;
  name: string;
  rating: number;
  services: number;
  distanceKm: number;
  vehicle: string;
  plates: string;
};

export type BidType = 'acepta' | 'contraoferta';

export type Bid = {
  id: string;
  contractorId: string;
  price: number;
  type: BidType;
  comment?: string;
  etaMin: number;
  /** Shown dimmed and without actions (design 1d, third card). */
  compact?: boolean;
};

export type MaterialLine = { concept: string; amount: number };

export type Payment = {
  labor: number;
  materials: MaterialLine[];
  serviceFee: number;
  total: number;
  method: string;
};

export type RecentService = {
  id: string;
  category: Category;
  title: string;
  date: string;
  contractorShort: string;
  price: number;
};
