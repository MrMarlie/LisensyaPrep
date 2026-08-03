export type PopupType = 'profed' | 'gened' | 'auto' | 'pnle' | 'cle' | 'agri' | 'cse' | 'mtle';

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
  // CSE has two products (Pro + SubProf). The default offer here is the
  // Professional one; decidePopup() swaps in the SubProf offer when the user
  // grabbed the SubProf starter pack. See CSE_PRO_OFFER / CSE_SUBPROF_OFFER.
  cse: {
    name: 'CSE Professional Mastery System',
    url: '/premium/cse-pro-mastery',
    price: '₱199',
    tagline: 'You’ve got the free questions. Ready for the full reviewer?',
    bullets: [
      '550+ CSE Professional questions with full rationales',
      'All 4 sections incl. Analytical Ability + 170-item mock',
      'Mobile-friendly PDF — pay via GCash',
    ],
    accent: 'yellow',
  },
  // No MTLE Mastery System live yet — show nothing as the post-pack upsell.
  mtle: null,
};

const CSE_PRO_OFFER = MASTERY_OFFERS.cse as MasteryOffer;

const CSE_SUBPROF_OFFER: MasteryOffer = {
  name: 'CSE SubProfessional Mastery System',
  url: '/premium/cse-subprof-mastery',
  price: '₱149',
  tagline: 'You’ve got the free questions. Ready for the full reviewer?',
  bullets: [
    '465+ CSE SubProfessional questions with full rationales',
    'All 4 sections incl. Clerical Ability + 165-item mock',
    'Mobile-friendly PDF — pay via GCash',
  ],
  accent: 'yellow',
};

// ── Mock Board campaign (LET only, auto-expires) ────────────────────────────
// Until this date, LET pages (Gen Ed / ProfEd / generic LET) show the Mock
// Board sell popup to EVERY visitor. On/after this date decidePopup() falls back
// to the normal freebie/mastery logic automatically — no redeploy needed.
export const MOCK_CAMPAIGN_END = new Date('2026-10-01T00:00:00+08:00');

export function isMockCampaignActive(): boolean {
  return Date.now() < MOCK_CAMPAIGN_END.getTime();
}

export type MockOffer = {
  title: string;
  url: string;
  price: string;
  tagline: string;
  bullets: string[];
};

// Only LET popup types get a mock offer. Other professions map to nothing here.
const MOCK_OFFERS: Partial<Record<PopupType, MockOffer>> = {
  profed: {
    title: 'LET Prof Ed Mock Board Exam',
    url: '/mock-board/let-profed',
    price: '₱59',
    tagline: 'Sit a real, timed LET simulation — before the real thing.',
    bullets: [
      '150 items · 180-minute countdown',
      'Shuffled every attempt — no memorizing answers',
      'Full rationales + score breakdown after you submit',
    ],
  },
  gened: {
    title: 'LET Gen Ed Mock Board Exam',
    url: '/mock-board/let-gened',
    price: '₱49',
    tagline: 'Sit a real, timed LET simulation — before the real thing.',
    bullets: [
      '150 items · 180-minute countdown',
      'Shuffled every attempt — no memorizing answers',
      'Full rationales + score breakdown after you submit',
    ],
  },
  auto: {
    title: 'LET Mock Board Exams',
    url: '/mock-board',
    price: 'from ₱49',
    tagline: 'Sit a real, timed LET simulation — Gen Ed & Prof Ed.',
    bullets: [
      '150 items each · 180-minute countdown',
      'Shuffled every attempt — no memorizing answers',
      'Full rationales + score breakdown after you submit',
    ],
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

// Read the set of starter packs the user has downloaded. The legacy 'both'
// value maps back to the original LET packs.
function getDownloadedPacks(): string[] {
  try {
    const raw = localStorage.getItem(PACK_KEY);
    if (!raw) return [];
    if (raw === 'both') return ['profed', 'gened'];
    return raw.split(',').filter(Boolean);
  } catch {
    return [];
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
  | { kind: 'mock'; offer: MockOffer }
  | { kind: 'none' };

// Decide which popup (if any) to show for a given page/quiz type:
//  - already a Mastery buyer  -> nothing
//  - already grabbed any pack -> Mastery upsell (if this profession has one)
//  - otherwise                -> the free starter-pack popup
export function decidePopup(type: PopupType): PopupDecision {
  // Campaign layer: until Oct 1, every visitor on a LET page gets the Mock Board
  // sell popup. Auto-reverts to the logic below once the campaign window closes.
  const mockOffer = MOCK_OFFERS[type];
  if (mockOffer && isMockCampaignActive()) {
    return { kind: 'mock', offer: mockOffer };
  }

  if (hasPurchasedMastery()) return { kind: 'none' };
  if (hasDownloadedAnyPack()) {
    // CSE has two levels — upsell the Mastery that matches the pack they grabbed
    // (default to Professional when ambiguous or both were downloaded).
    if (type === 'cse') {
      const packs = getDownloadedPacks();
      const offer = packs.includes('cse-subprof') && !packs.includes('cse-pro')
        ? CSE_SUBPROF_OFFER
        : CSE_PRO_OFFER;
      return { kind: 'mastery', offer };
    }
    const offer = MASTERY_OFFERS[type];
    return offer ? { kind: 'mastery', offer } : { kind: 'none' };
  }
  return { kind: 'freebie' };
}
