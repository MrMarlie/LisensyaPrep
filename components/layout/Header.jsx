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
  { href: '/education', label: '🎓 Education (LET)' },
  { href: '/criminology', label: '⚖️ Criminology' },
  { href: '/medical-technology', label: '🧪 Medical Technology' },
  { href: '/nursing', label: '🏥 Nursing' },
  { href: '/pharmacy', label: '💊 Pharmacy' },
];

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/collection', label: 'My License' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [localProfile, setLocalProfile] = useState(null);
  const pathname = usePathname();
  const { user, profile, signOut } = useAuth();
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setCoursesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

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
            <Link
              href="/agriculture"
              className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-4 py-2 rounded-lg text-sm transition-colors"
            >
              Start Quiz
            </Link>
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
        <div className="md:hidden border-t border-white/10 bg-[#0a0f1e]">
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

            <Link
              href="/agriculture"
              onClick={() => setMenuOpen(false)}
              className="mt-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-4 py-3 rounded-lg text-sm text-center transition-colors"
            >
              Start Quiz
            </Link>
          </nav>
        </div>
      )}
    </header>
    {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
  </>
  );
}
