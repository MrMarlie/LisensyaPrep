import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Terms of Use',
  description: 'LisensyaPrep terms of use — rules for using our PRC licensure exam review platform.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-white mb-2">Terms of Use</h1>
        <p className="text-gray-500 text-sm mb-8">Last updated: April 17, 2025</p>

        <div className="space-y-8 text-gray-300 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and using LisensyaPrep, you agree to be bound by these Terms of Use.
              If you do not agree to these terms, please do not use our platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Educational Purpose Only</h2>
            <p>
              LisensyaPrep is an educational review tool. All quiz content, study materials, and
              blog posts are provided for informational and educational purposes only.
              We do not guarantee that using our platform will result in passing any PRC board examination.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. No PRC Affiliation</h2>
            <p>
              LisensyaPrep is an independent platform and is not affiliated with, endorsed by, or
              connected to the Professional Regulation Commission (PRC) of the Philippines.
              For official exam schedules, requirements, and results, always refer to the official PRC website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Intellectual Property</h2>
            <p>
              All content on LisensyaPrep including text, graphics, quiz questions, and design elements
              are the property of LisensyaPrep or its content creators.
              You may not reproduce, distribute, or create derivative works without our written permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul className="mt-2 space-y-1 ml-4">
              {[
                'Use the platform for any unlawful purpose',
                'Scrape, crawl, or systematically download content',
                'Attempt to circumvent or hack platform security',
                'Misrepresent your identity or affiliations',
                'Use automated tools to interact with our quizzes',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">•</span> {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. Disclaimer of Warranties</h2>
            <p>
              LisensyaPrep is provided &quot;as is&quot; without any warranties, express or implied.
              We make no representations about the accuracy, completeness, or suitability of the content
              for any purpose. Quiz content accuracy has been carefully prepared but errors may exist.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">7. Limitation of Liability</h2>
            <p>
              LisensyaPrep shall not be liable for any indirect, incidental, or consequential damages
              arising from the use of our platform, including but not limited to exam failure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">8. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Changes will be effective
              upon posting to this page. Continued use of the platform constitutes acceptance of modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">9. Contact</h2>
            <p>
              Questions about these Terms? Reach us through our{' '}
              <a href="/contact" className="text-yellow-400 hover:underline">Contact page</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
