'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import AuthModal from '@/components/auth/AuthModal';

const COURSES = [
  { href: '/agriculture', label: '🌾 Agriculture' },
  { href: '/education', label: '🎓 Education (LET)' },
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

  const isCourseActive = COURSES.some((c) => pathname.startsWith(c.href));

  return (
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
            <span className="font-extrabold text-xl hidden sm:inline">
              <span className="text-white">Lisensya</span>
              <span className="text-yellow-400">Prep</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {/* Home */}
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

            {/* Remaining links */}
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

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <span className="text-gray-400 text-sm truncate max-w-[140px]">
                  {profile?.display_name || user.email}
                </span>
                <button
                  onClick={signOut}
                  className="text-gray-500 hover:text-white text-sm transition-colors"
                >
                  Sign out
                </button>
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
          {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}

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
  );
}
