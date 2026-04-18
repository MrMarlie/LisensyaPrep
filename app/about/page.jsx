import Link from 'next/link';
import { PAGE_SEO } from '@/lib/seo';

export const metadata = PAGE_SEO.about;

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-5xl mb-4">⚔️</p>
          <h1 className="text-4xl font-extrabold text-white mb-3">About LisensyaPrep</h1>
          <p className="text-gray-400 text-lg">
            Helping Filipino professionals battle their way to PRC licensure.
          </p>
        </div>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">Our Mission</h2>
            <p>
              LisensyaPrep was built for Filipino professionals preparing for PRC board exams.
              We believe exam review does not have to be boring — it can be engaging, motivating,
              and even fun. By combining gamification with comprehensive exam content, we help
              candidates stay focused, track their progress, and achieve licensure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">How We Work</h2>
            <p className="mb-3">
              LisensyaPrep turns traditional multiple-choice review into a boss-battle game.
              Every correct answer deals damage to the exam boss. Wrong answers reduce your HP.
              Clear all stages and you have proven you are board-exam ready.
            </p>
            <p>
              We start with the Agriculture PRC Licensure Exam — covering Crop Science, Soil Science,
              and Agricultural Economics — with more exams coming soon.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Disclaimer</h2>
            <p className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-gray-400">
              LisensyaPrep is an independent review platform and is <strong className="text-white">not affiliated with
              the Professional Regulation Commission (PRC)</strong> of the Philippines.
              All content is provided for educational purposes only. Question content is based on
              publicly available exam syllabi and study materials. Always refer to official PRC
              announcements for exam schedules and requirements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Contact Us</h2>
            <p>
              Have feedback, found an error in our content, or want to suggest new exam categories?
              We would love to hear from you.
            </p>
            <Link
              href="/contact"
              className="inline-block mt-3 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-6 py-3 rounded-xl text-sm transition-colors"
            >
              Get In Touch →
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
