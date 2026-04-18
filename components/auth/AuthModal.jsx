'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'

export default function AuthModal({ onClose }) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(null)

  async function handleMagicLink(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${location.origin}/auth/callback` },
    })
    setLoading(false)
    if (error) setError(error.message)
    else setSent(true)
  }

  async function handleGoogle() {
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${location.origin}/auth/callback` },
    })
    if (error) { setError(error.message); setLoading(false) }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#080d1b]/95 px-4" onClick={onClose}>
      <div
        className="w-full max-w-md bg-[#0f1629] border border-white/10 rounded-2xl p-8 shadow-2xl relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white text-lg leading-none"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <span className="text-4xl">⚔️</span>
          <h2 className="text-white font-extrabold text-2xl mt-2">Sign in to save progress</h2>
          <p className="text-gray-400 text-sm mt-1">Your quiz results and license pieces sync across devices.</p>
        </div>

        {sent ? (
          <div className="text-center text-green-400 py-4">
            <p className="text-2xl mb-2">📧</p>
            <p className="font-bold">Check your email!</p>
            <p className="text-sm text-gray-400 mt-1">We sent a magic link to {email}</p>
          </div>
        ) : (
          <>
            <button
              onClick={handleGoogle}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 font-bold py-3 rounded-xl mb-4 hover:bg-gray-100 transition-all disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-gray-600 text-xs">or email</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <form onSubmit={handleMagicLink} className="space-y-4">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm outline-none focus:ring-2 focus:ring-yellow-400/40 focus:border-yellow-400/60"
              />
              {error && <p className="text-red-400 text-xs">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-400 hover:bg-yellow-300 disabled:opacity-50 text-gray-900 font-extrabold py-3 rounded-xl text-sm transition-all"
              >
                {loading ? 'Sending…' : 'Send Magic Link'}
              </button>
            </form>
          </>
        )}

        <p className="text-gray-600 text-xs text-center mt-4">
          No password needed. Progress is saved securely.
        </p>
      </div>
    </div>
  )
}
