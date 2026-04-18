import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Privacy Policy',
  description: 'LisensyaPrep privacy policy — how we collect, use, and protect your information.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-white mb-2">Privacy Policy</h1>
        <p className="text-gray-500 text-sm mb-8">Last updated: April 17, 2025</p>

        <div className="space-y-8 text-gray-300 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Information We Collect</h2>
            <p>
              LisensyaPrep is a client-side application. We do not collect personal information on our servers.
              Your quiz progress and collectibles are stored entirely in your browser&apos;s local storage
              and session storage, and never transmitted to us.
            </p>
            <p className="mt-3">
              If you use the contact form, we collect your name, email address, and message content
              solely to respond to your inquiry.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Local Storage</h2>
            <p>
              We use browser local storage to save your quiz progress, scores, and earned collectibles.
              This data stays on your device. Clearing your browser data will also remove your progress.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Analytics and Advertising</h2>
            <p>
              We may use analytics services (e.g., Google Analytics) to understand how users interact
              with our site. These services may collect anonymized usage data.
              We may display contextual advertisements through third-party ad networks.
              These networks may use cookies to serve relevant ads.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Cookies</h2>
            <p>
              LisensyaPrep uses essential cookies for site functionality and may use third-party cookies
              for analytics and advertising. You can disable cookies in your browser settings,
              though this may affect site functionality.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Data Security</h2>
            <p>
              Since your data is stored locally, its security depends on your device and browser settings.
              We do not transmit your quiz progress or scores to any external servers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this page
              with an updated date. Continued use of LisensyaPrep constitutes acceptance of any changes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">7. Contact</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us through our{' '}
              <a href="/contact" className="text-yellow-400 hover:underline">Contact page</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
