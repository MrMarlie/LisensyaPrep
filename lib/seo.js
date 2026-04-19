// SEO metadata helpers for Next.js metadata API

const BASE_URL = 'https://lisensyaprep.com';
const SITE_NAME = 'LisensyaPrep';
const DEFAULT_DESCRIPTION =
  'LisensyaPrep — free gamified PRC licensure exam reviewer for Filipino professionals. Fight your way to your license with battle-style quizzes.';

export function buildMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  image = '/assets/og-default.png',
  noIndex = false,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — PRC Licensure Exam Review`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: `${BASE_URL}${path}`,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: `${BASE_URL}${path}`,
      siteName: SITE_NAME,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: 'en_PH',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export const PAGE_SEO = {
  home: buildMetadata({
    title: 'LisensyaPrep — Free PRC Board Exam Reviewer Philippines 2026',
    description:
      'Free gamified PRC board exam reviewer for Filipino professionals. Nursing, Criminology, Education (LET), Agriculture, and more. Battle bosses, collect your license, pass the boards.',
    path: '/',
  }),
  agriculture: buildMetadata({
    title: 'Agriculture PRC Board Exam Review',
    description:
      'Prepare for the Agriculture PRC Licensure Exam with LisensyaPrep. Cover Crop Science, Soil Science, and Agricultural Economics through battle-style quiz challenges.',
    path: '/agriculture',
  }),
  collection: buildMetadata({
    title: 'My PRZ Collection',
    description:
      'Track your earned PRZ pieces. Complete all quiz stages to collect your full PRZ — the LisensyaPrep gamified achievement.',
    path: '/collection',
  }),
  blog: buildMetadata({
    title: 'PRC Board Exam Tips, Study Guides & Reviewers Philippines',
    description:
      'Free study guides, exam tips, application guides, and review materials for the PRC licensure exams — Nursing, Criminology, Agriculture, Education, and more.',
    path: '/blog',
  }),
  about: buildMetadata({
    title: 'About LisensyaPrep',
    description:
      'Learn about LisensyaPrep — the free gamified PRC licensure exam reviewer built for Filipino professionals across all board exam professions.',
    path: '/about',
  }),
  criminology: buildMetadata({
    title: 'Criminology PRC Board Exam Review',
    description:
      'Prepare for the Criminologist Licensure Examination (CLE) with LisensyaPrep. Cover Criminal Jurisprudence, Criminalistics, Law Enforcement, Crime Investigation, Corrections, and Sociology of Crimes through battle-style quiz challenges.',
    path: '/criminology',
  }),
};
