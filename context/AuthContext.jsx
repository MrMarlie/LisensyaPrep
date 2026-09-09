'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { needsForcedLogout, markForcedLogoutDone } from '@/lib/authForceLogout'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    let subscription

    async function init() {
      // Force-logout gate: if this browser hasn't been signed out for the
      // current LOGOUT_VERSION yet, do it once before resolving auth state.
      if (needsForcedLogout()) {
        try { await supabase.auth.signOut() } catch { /* ignore */ }
        markForcedLogoutDone()
      }

      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      if (user) fetchProfile(supabase, user.id)
      else setLoading(false)

      subscription = supabase.auth.onAuthStateChange(
        async (event, session) => {
          setUser(session?.user ?? null)
          if (session?.user) await fetchProfile(supabase, session.user.id)
          else { setProfile(null); setLoading(false) }
        }
      ).data.subscription
    }

    init()

    return () => subscription?.unsubscribe()
  }, [])

  async function fetchProfile(supabase, userId) {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    setProfile(data)
    setLoading(false)
  }

  async function updateDisplayName(name) {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('profiles')
      .update({ display_name: name, updated_at: new Date().toISOString() })
      .eq('id', user.id)
      .select()
      .single()
    if (!error) setProfile(data)
    return { data, error }
  }

  async function signOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading, updateDisplayName, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
