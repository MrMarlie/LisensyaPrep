'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import AuthModal from '@/components/auth/AuthModal';
import { getUserProfile } from '@/lib/storage';

const COURSES = [
  { href: '/agriculture', label: '🌾 Agriculture' },
  { href: '/civil-service', label: '🏛️ Civil Service (CSE)' },
  { href: '/education', label: '🎓 Education (LET)' },
  { href: '/criminology', label: '⚖️ Criminology' },
  { href: '/medical-technology', label: '🧪 Medical Technology' },
  { href: '/nclex', label: '💉 NCLEX' },
  { href: '/nursing', label: '🏥 Nursing' },
  { href: '/pharmacy', label: '💊 Pharmacy' },
];

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/collection', label: 'My License' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
];

const PREMIUM_LINKS = [
  { href: '/premium/let-profed-mastery', label: '🎓 LET ProfEd Mastery', badge: null },
  { href: '/premium/let-gen-ed-mastery', label: '📗 LET Gen Ed Mastery', badge: null },
  { href: '/premium/let-bundle-mastery', label: '🎁 Bundle Deal — Save ₱99', badge: 'BEST' },
  { href: '/premium/cse-pro-mastery', label: '📊 CSE Pro Mastery', badge: 'NEW' },
  { href: '/premium/cse-subprof-mastery', label: '📋 CSE SubProf Mastery', badge: 'NEW' },
  { href: '/premium/pnle-mastery', label: '🏥 PNLE Mastery', badge: 'NEW' },
  { href: '/premium/cle-mastery', label: '⚖️ CLE Criminology Mastery', badge: 'NEW' },
  { href: '/premium/agri-mastery', label: '🌾 Agriculture (ALE) Mastery', badge: 'NEW' },
  { href: '/premium/mtle-mastery', label: '🧪 Medical Technology (MTLE) Mastery', badge: 'NEW' },
];
const FREEBIE_LINKS = [
  { href: '/freebies/let-profed-starter-pack', label: '📘 LET ProfEd Starter Pack' },
  { href: '/freebies/let-gen-ed-starter-pack', label: '📗 LET Gen Ed Starter Pack' },
  { href: '/freebies/cse-pro-starter-pack', label: '📊 CSE Pro Starter Pack', isNew: true },
  { href: '/freebies/cse-subprof-starter-pack', label: '📋 CSE SubProf Starter Pack', isNew: true },
  { href: '/freebies/pnle-nursing-starter-pack', label: '🏥 PNLE Nursing Starter Pack', isNew: true },
  { href: '/freebies/cle-starter-pack', label: '⚖️ CLE Criminology Starter Pack', isNew: true },
  { href: '/freebies/agriculture-starter-pack', label: '🌾 Agriculture Starter Pack', isNew: true },
  { href: '/freebies/medical-technology-starter-pack', label: '🧪 Medical Technology Starter Pack', isNew: true },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [premiumOpen, setPremiumOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const premiumRef = useRef(null);
  const quizRef = useRef(null);
  const [localProfile, setLocalProfile] = useState(null);
  const pathname = usePathname();
  const { user, profile, signOut } = useAuth();
  const dropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setCoursesOpen(false);
      }
      if (premiumRef.current && !premiumRef.current.contains(e.target)) {
        setPremiumOpen(false);
      }
      if (quizRef.current && !quizRef.current.contains(e.target)) {
        setQuizOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Load localStorage profile for users who signed in via PlayerSetupModal
  // (not Supabase auth). This makes "Hi [name]!" work for everyone.
  useEffect(() => {
    if (!user) {
      getUserProfile().then(p => setLocalProfile(p || null));
    } else {
      setLocalProfile(null);
    }
  }, [user]);

  // First name from whichever source is available
  const firstName = user
    ? (profile?.display_name?.split(' ')[0] || user.email.split('@')[0])
    : localProfile?.name?.split(' ')[0] || null;

  const isCourseActive = COURSES.some((c) => pathname.startsWith(c.href));

  // ── Locked minimal header during quiz — no navigation, no exit ─────────────
  if (pathname.startsWith('/quiz/')) {
    return (
      <header className="bg-[#0a0f1e]/95 border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-3">
            <span className="text-xl">⚔️</span>
            <span className="font-extrabold text-lg">
              <span className="text-white">Lisensya</span>
              <span className="text-yellow-400">Prep</span>
            </span>
            <span className="text-gray-600 text-sm">— Quiz in Progress</span>
          </div>
        </div>
      </header>
    );
  }

  // ── Normal header ──────────────────────────────────────────────────────────
  return (
  <>
    <header className="bg-navy-950 border-b border-gold-500/20 sticky top-0 z-50 backdrop-blur-sm bg-[#0a0f1e]/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/assets/logo.png"
              alt="LisensyaPrep"
              width={160}
              height={40}
              className="object-contain h-10 w-auto"
              priority
            />
            <span className="font-extrabold text-xl">
              <span className="text-white">Lisensya</span>
              <span className="text-yellow-400">Prep</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === '/'
                  ? 'bg-yellow-400/10 text-yellow-400'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Home
            </Link>

            {/* Courses dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setCoursesOpen((o) => !o)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isCourseActive
                    ? 'bg-yellow-400/10 text-yellow-400'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                Courses
                <svg
                  className={`w-3.5 h-3.5 transition-transform ${coursesOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {coursesOpen && (
                <div className="absolute top-full left-0 mt-1 w-52 bg-[#0f1629] border border-white/10 rounded-xl shadow-xl overflow-hidden">
                  {COURSES.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setCoursesOpen(false)}
                      className={`flex items-center px-4 py-3 text-sm font-medium transition-colors ${
                        pathname.startsWith(href)
                          ? 'bg-yellow-400/10 text-yellow-400'
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Remaining nav links */}
            {NAV_LINKS.filter((l) => l.href !== '/').map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === href
                    ? 'bg-yellow-400/10 text-yellow-400'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {label}
              </Link>
            ))}

            {/* Freebies dropdown */}
            <div className="relative group">
              <button
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold transition-colors relative ${
                  pathname.startsWith('/freebies')
                    ? 'bg-green-400/20 text-green-400'
                    : 'text-green-400 hover:bg-green-400/10'
                }`}
              >
                Freebies
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-green-400 text-gray-900 text-[9px] font-extrabold px-1 rounded-full leading-4">FREE</span>
              </button>
              <div className="absolute top-full left-0 mt-1 w-56 bg-[#0f1629] border border-white/10 rounded-xl shadow-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                {FREEBIE_LINKS.map(({ href, label, isNew }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors ${
                      pathname.startsWith(href)
                        ? 'bg-green-400/10 text-green-400'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{label}</span>
                    {isNew && <span className="bg-green-400 text-gray-900 text-[9px] font-extrabold px-1.5 rounded-full">NEW</span>}
                  </Link>
                ))}
              </div>
            </div>

            {/* Premium dropdown */}
            <div className="relative" ref={premiumRef}>
              <button
                onClick={() => setPremiumOpen((o) => !o)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold transition-colors relative ${
                  pathname.startsWith('/premium')
                    ? 'bg-yellow-400/20 text-yellow-400'
                    : 'text-yellow-400 hover:bg-yellow-400/10'
                }`}
              >
                Premium
                <svg className={`w-3.5 h-3.5 transition-transform ${premiumOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-gray-900 text-[9px] font-extrabold px-1 rounded-full leading-4">NEW</span>
              </button>
              {premiumOpen && (
                <div className="absolute top-full right-0 mt-1 w-60 bg-[#0f1629] border border-white/10 rounded-xl shadow-xl overflow-hidden">
                  {PREMIUM_LINKS.map(({ href, label, badge }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setPremiumOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors ${
                        pathname.startsWith(href)
                          ? 'bg-yellow-400/10 text-yellow-400'
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span>{label}</span>
                      {badge && <span className="bg-yellow-400 text-gray-900 text-[9px] font-extrabold px-1.5 rounded-full">{badge}</span>}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {firstName ? (
              <>
                <span className="text-yellow-400 text-sm font-semibold">
                  Hi {firstName}!
                </span>
                {user && (
                  <button
                    onClick={signOut}
                    className="text-gray-500 hover:text-white text-sm transition-colors"
                  >
                    Sign out
                  </button>
                )}
              </>
            ) : (
              <button
                onClick={() => setShowAuth(true)}
                className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
              >
                Sign in
              </button>
            )}
            <div className="relative" ref={quizRef}>
              <button
                onClick={() => setQuizOpen((o) => !o)}
                className="flex items-center gap-1.5 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Start Quiz
                <svg
                  className={`w-3.5 h-3.5 transition-transform ${quizOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {quizOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-[#0f1629] border border-white/10 rounded-xl shadow-xl overflow-hidden z-50">
                  <div className="px-4 py-2 border-b border-white/10">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Choose your exam</p>
                  </div>
                  {COURSES.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setQuizOpen(false)}
                      className={`flex items-center px-4 py-3 text-sm font-medium transition-colors ${
                        pathname.startsWith(href)
                          ? 'bg-yellow-400/10 text-yellow-400'
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0a0f1e] overflow-y-auto max-h-[calc(100dvh-4rem)]">
          <nav className="flex flex-col px-4 py-3 gap-1">
            {/* User greeting row in mobile */}
            {firstName ? (
              <div className="flex items-center justify-between px-4 py-2 mb-1 border-b border-white/10">
                <span className="text-yellow-400 text-sm font-semibold">Hi {firstName}!</span>
                {user && (
                  <button
                    onClick={() => { setMenuOpen(false); signOut(); }}
                    className="text-gray-500 hover:text-white text-xs transition-colors"
                  >
                    Sign out
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={() => { setMenuOpen(false); setShowAuth(true); }}
                className="text-left px-4 py-3 text-gray-300 hover:text-white text-sm font-medium transition-colors border-b border-white/10 mb-1"
              >
                Sign in
              </button>
            )}

            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                pathname === '/' ? 'bg-yellow-400/10 text-yellow-400' : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Home
            </Link>

            {/* Courses section in mobile */}
            <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-1">
              Courses
            </div>
            {COURSES.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`pl-6 pr-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  pathname.startsWith(href)
                    ? 'bg-yellow-400/10 text-yellow-400'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {label}
              </Link>
            ))}

            {NAV_LINKS.filter((l) => l.href !== '/').map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  pathname === href
                    ? 'bg-yellow-400/10 text-yellow-400'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {label}
              </Link>
            ))}

            {/* Freebies in mobile */}
            <div className="px-4 py-2 text-xs font-semibold text-green-400 uppercase tracking-wider mt-1">
              🎁 Freebies — Free Reviewers
            </div>
            {FREEBIE_LINKS.map(({ href, label, isNew }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`pl-6 pr-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                  pathname.startsWith(href)
                    ? 'bg-green-400/20 text-green-400'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{label}</span>
                {isNew && <span className="bg-green-400 text-gray-900 text-[9px] font-extrabold px-1.5 rounded-full">NEW</span>}
              </Link>
            ))}

            {/* Premium section in mobile */}
            <div className="px-4 py-2 text-xs font-semibold text-yellow-400 uppercase tracking-wider mt-1">
              ⭐ Premium Reviewers
            </div>
            {PREMIUM_LINKS.map(({ href, label, badge }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`pl-6 pr-4 py-3 rounded-lg text-sm font-bold transition-colors flex items-center justify-between ${
                  pathname.startsWith(href)
                    ? 'bg-yellow-400/20 text-yellow-400'
                    : 'text-yellow-400 hover:bg-yellow-400/10'
                }`}
              >
                <span>{label}</span>
                {badge && <span className="bg-yellow-400 text-gray-900 text-[9px] font-extrabold px-1.5 rounded-full">{badge}</span>}
              </Link>
            ))}

            <button
              onClick={() => setQuizOpen((o) => !o)}
              className="mt-2 w-full bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-4 py-3 rounded-lg text-sm text-center transition-colors flex items-center justify-center gap-2"
            >
              Start Quiz
              <svg
                className={`w-4 h-4 transition-transform ${quizOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {quizOpen && (
              <div className="mt-1 rounded-xl overflow-hidden border border-white/10 bg-[#0f1629]">
                {COURSES.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => { setMenuOpen(false); setQuizOpen(false); }}
                    className={`block px-4 py-3 text-sm font-medium transition-colors border-b border-white/5 last:border-0 ${
                      pathname.startsWith(href)
                        ? 'bg-yellow-400/10 text-yellow-400'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
    {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
  </>
  );
}
