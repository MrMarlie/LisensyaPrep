import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#060c1a] border-t border-white/10 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <span className="text-2xl">⚔️</span>
              <span className="font-extrabold text-xl">
                <span className="text-white">Lisensya</span>
                <span className="text-yellow-400">Prep</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm">
              Gamified PRC licensure exam review for Filipino professionals.
              Battle your way to your license — one question at a time.
            </p>
            <p className="text-xs mt-4 text-gray-600">
              © {new Date().getFullYear()} LisensyaPrep. All rights reserved.
            </p>
          </div>

          {/* Exams */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3 uppercase tracking-wide">Exams</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/agriculture" className="hover:text-yellow-400 transition-colors">Agriculture</Link></li>
              <li><Link href="/education" className="hover:text-yellow-400 transition-colors">Education (LET)</Link></li>
              <li><Link href="/nursing" className="hover:text-yellow-400 transition-colors">Nursing</Link></li>
              <li><Link href="/criminology" className="hover:text-yellow-400 transition-colors">Criminology</Link></li>
              <li><Link href="/medical-technology" className="hover:text-yellow-400 transition-colors">Medical Technology</Link></li>
              <li><Link href="/pharmacy" className="hover:text-yellow-400 transition-colors">Pharmacy</Link></li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3 uppercase tracking-wide">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/collection" className="hover:text-yellow-400 transition-colors">My Collection</Link></li>
              <li><Link href="/blog" className="hover:text-yellow-400 transition-colors">Blog</Link></li>
              <li><Link href="/about" className="hover:text-yellow-400 transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-yellow-400 transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-yellow-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-yellow-400 transition-colors">Terms of Use</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-8 pt-6 text-xs text-center text-gray-600">
          LisensyaPrep is an independent review tool and is not affiliated with the Professional Regulation Commission (PRC).
          All exam content is for educational purposes only.
        </div>
      </div>
    </footer>
  );
}
