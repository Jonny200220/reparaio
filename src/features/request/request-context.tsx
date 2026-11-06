import { createContext, useContext, useState, type ReactNode } from 'react';

import { categoryInfo, mockPhotos, mockUser, suggestedMinimum } from './mock-data';
import { OFFER_INITIAL } from './offer-math';
import type { Bid, Category, ServiceRequest } from './types';

function createDraft(category: Category): ServiceRequest {
  const isPlumbing = category === 'hidraulica';
  return {
    category,
    problem: categoryInfo[category].problems[0],
    description: isPlumbing ? 'Gotea la llave de paso debajo del fregadero, ya se mojó el mueble.' : '',
    photos: isPlumbing ? [...mockPhotos] : [],
    when: 'ahora',
    address: mockUser.address,
    suggestedMinimum,
    offer: OFFER_INITIAL,
    status: 'borrador',
  };
}

type RequestContextValue = {
  request: ServiceRequest;
  acceptedBid: Bid | null;
  start: (category: Category) => void;
  update: (patch: Partial<ServiceRequest>) => void;
  accept: (bid: Bid) => void;
  reset: () => void;
};

const RequestContext = createContext<RequestContextValue | null>(null);

export function RequestProvider({ children }: { children: ReactNode }) {
  const [request, setRequest] = useState<ServiceRequest>(() => createDraft('hidraulica'));
  const [acceptedBid, setAcceptedBid] = useState<Bid | null>(null);

  const value: RequestContextValue = {
    request,
    acceptedBid,
    start: (category) => {
      setRequest(createDraft(category));
      setAcceptedBid(null);
    },
    update: (patch) => setRequest((prev) => ({ ...prev, ...patch })),
    accept: (bid) => {
      setAcceptedBid(bid);
      setRequest((prev) => ({ ...prev, status: 'asignada' }));
    },
    reset: () => {
      setRequest(createDraft('hidraulica'));
      setAcceptedBid(null);
    },
  };

  return <RequestContext.Provider value={value}>{children}</RequestContext.Provider>;
}

export function useServiceRequest() {
  const ctx = useContext(RequestContext);
  if (!ctx) throw new Error('useServiceRequest must be used inside RequestProvider');
  return ctx;
}
