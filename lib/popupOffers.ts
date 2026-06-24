export type PopupType = 'profed' | 'gened' | 'auto' | 'pnle' | 'cle' | 'agri';

export type MasteryOffer = {
  name: string;
  url: string;
  price: string;
  tagline: string;
  bullets: string[];
  accent: 'yellow' | 'pink' | 'green';
};

// Mastery upsell shown to users who already grabbed a free starter pack.
// Keyed by the popup type of the page/quiz they're on. A null entry means
// that profession has no live Mastery System yet (show nothing instead).
export const MASTERY_OFFERS: Record<PopupType, MasteryOffer | null> = {
  profed: {
    name: 'LET ProfEd Mastery System',
    url: '/premium/let-profed-mastery',
    price: '₱149',
    tagline: 'You’ve got the free questions. Ready for the full reviewer?',
    bullets: [
      '430+ ProfEd questions with full rationales',
      'Built for the 2026 Enhanced TOS',
      'Mobile-friendly PDF — pay via GCash',
    ],
    accent: 'yellow',
  },
  gened: {
    name: 'LET Gen Ed Mastery System',
    url: '/premium/let-gen-ed-mastery',
    price: '₱249',
    tagline: 'You’ve got the free questions. Ready for the full reviewer?',
    bullets: [
      '430+ Gen Ed questions across all 5 subjects',
      'Built for the 2026 Enhanced TOS',
      'Mobile-friendly PDF — pay via GCash',
    ],
    accent: 'yellow',
  },
  auto: {
    name: 'LET Mastery Bundle',
    url: '/premium/let-bundle-mastery',
    price: '₱399',
    tagline: 'You’ve got the free questions. Get the complete LET reviewer.',
    bullets: [
      '860+ questions — ProfEd + Gen Ed',
      'Save ₱99 vs buying separately',
      'Mobile-friendly PDF — pay via GCash',
    ],
    accent: 'yellow',
  },
  pnle: {
    name: 'PNLE Mastery System',
    url: '/premium/pnle-mastery',
    price: '₱199',
    tagline: 'You’ve got the free questions. Ready for the full reviewer?',
    bullets: [
      '300+ PNLE questions with full rationales',
      'All 6 NLE subjects + 100-item mock exam',
      'Mobile-friendly PDF — pay via GCash',
    ],
    accent: 'pink',
  },
  cle: {
    name: 'CLE Criminology Mastery System',
    url: '/premium/cle-mastery',
    price: '₱149',
    tagline: 'You’ve got the free questions. Ready for the full reviewer?',
    bullets: [
      '300+ CLE questions with full rationales',
      'All 6 Criminology board subjects',
      'Mobile-friendly PDF — pay via GCash',
    ],
    accent: 'yellow',
  },
  agri: {
    name: 'Agriculture (ALE) Mastery System',
    url: '/premium/agri-mastery',
    price: '₱149',
    tagline: 'You’ve got the free questions. Ready for the full reviewer?',
    bullets: [
      '300+ ALE questions with full rationales',
      'Built for the 2026 ALE coverage',
      'Mobile-friendly PDF — pay via GCash',
    ],
    accent: 'green',
  },
};

const PACK_KEY = 'lp_starter_pack_downloaded';
const MASTERY_KEY = 'lp_mastery_purchased';

export function hasDownloadedAnyPack(): boolean {
  try {
    return !!localStorage.getItem(PACK_KEY);
  } catch {
    return false;
  }
}

export function hasPurchasedMastery(): boolean {
  try {
    return !!localStorage.getItem(MASTERY_KEY);
  } catch {
    return false;
  }
}

// Record that the user downloaded a starter pack. Keeps a comma-separated set
// so we never overwrite a previously downloaded pack (the legacy 'both' value
// still reads back correctly).
export function markPackDownloaded(pack: string) {
  try {
    const raw = localStorage.getItem(PACK_KEY);
    const set = new Set(
      raw === 'both' ? ['profed', 'gened'] : raw ? raw.split(',') : []
    );
    set.add(pack);
    localStorage.setItem(PACK_KEY, Array.from(set).filter(Boolean).join(','));
  } catch {
    /* ignore */
  }
}

export type PopupDecision =
  | { kind: 'freebie' }
  | { kind: 'mastery'; offer: MasteryOffer }
  | { kind: 'none' };

// Decide which popup (if any) to show for a given page/quiz type:
//  - already a Mastery buyer  -> nothing
//  - already grabbed any pack -> Mastery upsell (if this profession has one)
//  - otherwise                -> the free starter-pack popup
export function decidePopup(type: PopupType): PopupDecision {
  if (hasPurchasedMastery()) return { kind: 'none' };
  if (hasDownloadedAnyPack()) {
    const offer = MASTERY_OFFERS[type];
    return offer ? { kind: 'mastery', offer } : { kind: 'none' };
  }
  return { kind: 'freebie' };
}
