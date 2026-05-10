import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Affiliate Disclosure',
  description:
    'LisensyaPrep participates in the Shopee Affiliate Program. Learn how we select products and how our affiliate links work.',
  path: '/disclosure',
});

export default function DisclosurePage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm mb-8 text-gray-500">
          <Link href="/" className="hover:text-yellow-400 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-gray-300">Affiliate Disclosure</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
          Affiliate Disclosure
        </h1>
        <p className="text-gray-500 text-sm mb-10">Last updated: May 2026</p>

        <div className="prose-content space-y-8 text-gray-300 text-sm leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Our Participation in Affiliate Programs</h2>
            <p>
              LisensyaPrep participates in the <strong className="text-white">Shopee Affiliate Program</strong>.
              This means that when you click a product link on our site and make a purchase on Shopee, we may
              earn a small commission — at <strong className="text-white">no additional cost to you</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">How We Select Products</h2>
            <p>
              Every product recommended on LisensyaPrep is selected based on its <strong className="text-white">educational relevance</strong> to
              the exam being discussed — not based on commission rates or paid placements. Our goal is to
              recommend the tools that will genuinely help you pass your board exam.
            </p>
            <ul className="space-y-2 mt-4">
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 mt-0.5 flex-shrink-0">•</span>
                <span>Reviewer books are recommended based on exam alignment and community trust among Filipino examinees.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 mt-0.5 flex-shrink-0">•</span>
                <span>Writing materials (pens, highlighters) are standard exam-day supplies.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 mt-0.5 flex-shrink-0">•</span>
                <span>Study supplies (index cards, sticky notes, lamps) support the study techniques discussed in our articles.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 mt-0.5 flex-shrink-0">•</span>
                <span>We never recommend products we would not recommend to a friend preparing for the same exam.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">What This Means for You</h2>
            <p>
              Using our affiliate links does not change the price you pay. Any commission we earn goes toward
              maintaining and improving LisensyaPrep — keeping our quiz questions updated, writing new study
              guides, and hosting costs.
            </p>
            <p className="mt-3">
              You are never obligated to use our affiliate links. You can always search for the same products
              directly on Shopee.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">FTC Compliance</h2>
            <p>
              In accordance with the U.S. Federal Trade Commission (FTC) guidelines and international
              equivalents, we disclose our affiliate relationships on every page where affiliate links appear.
              All affiliate links on LisensyaPrep are marked with{' '}
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs font-mono text-gray-300">
                rel=&quot;sponsored nofollow noopener&quot;
              </code>{' '}
              attributes and accompanied by visible disclosure text.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Questions?</h2>
            <p>
              If you have questions about our affiliate relationships or product recommendations, please{' '}
              <Link href="/contact" className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2">
                contact us
              </Link>
              .
            </p>
          </section>

        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-yellow-400 transition-colors"
          >
            ← Back to LisensyaPrep
          </Link>
        </div>
      </div>
    </div>
  );
}
