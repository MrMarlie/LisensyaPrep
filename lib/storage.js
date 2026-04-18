import { createClient } from '@/lib/supabase'

const KEYS = {
  PROGRESS: 'lisensyaprep_progress',
  COLLECTIBLES: 'lisensyaprep_collectibles',
  QUIZ_STATE: 'lisensyaprep_quiz_state',
  PROFILE: 'lisensyaprep_profile',
}

// --- Private localStorage helpers ---

function getProgressLocal() {
  if (typeof window === 'undefined') return {}
  try { return JSON.parse(localStorage.getItem(KEYS.PROGRESS) || '{}') }
  catch { return {} }
}

function saveProgressLocal(progress) {
  if (typeof window === 'undefined') return
  localStorage.setItem(KEYS.PROGRESS, JSON.stringify(progress))
}

function getCollectiblesLocal() {
  if (typeof window === 'undefined') return {}
  try { return JSON.parse(localStorage.getItem(KEYS.COLLECTIBLES) || '{}') }
  catch { return {} }
}

function saveCollectiblesLocal(data) {
  if (typeof window === 'undefined') return
  localStorage.setItem(KEYS.COLLECTIBLES, JSON.stringify(data))
}

async function getAuthedUser() {
  if (typeof window === 'undefined') return null
  try {
    const { data: { user } } = await createClient().auth.getUser()
    return user
  } catch { return null }
}

// --- Progress ---

export async function saveStageResult(examId, moduleId, result) {
  const user = await getAuthedUser()
  if (user) {
    await createClient().from('quiz_results').insert({
      user_id: user.id,
      exam_id: examId,
      module_id: moduleId,
      score: result.correct,
      total: result.total,
      percentage: result.percentage,
      passed: result.passed,
      player_hp: result.playerHP,
      boss_hp: result.bossHP,
      status: result.status,
    })
    return
  }
  const progress = getProgressLocal()
  if (!progress[examId]) progress[examId] = {}
  const existing = progress[examId][moduleId]
  if (!existing?.percentage || result.percentage > existing.percentage) {
    progress[examId][moduleId] = { ...result, completedAt: new Date().toISOString() }
  }
  saveProgressLocal(progress)
}

export async function getStageResult(examId, moduleId) {
  const user = await getAuthedUser()
  if (user) {
    const { data } = await createClient()
      .from('best_quiz_results')
      .select('percentage, passed, completed_at')
      .eq('user_id', user.id)
      .eq('exam_id', examId)
      .eq('module_id', moduleId)
      .single()
    if (data) return { percentage: data.percentage, passed: data.passed, completedAt: data.completed_at }
    return null
  }
  const progress = getProgressLocal()
  return progress?.[examId]?.[moduleId] || null
}

export async function isStageCompleted(examId, moduleId) {
  const result = await getStageResult(examId, moduleId)
  return result?.passed === true
}

// --- Collectibles ---

export async function awardCollectible(examId, pieceId, pieceData) {
  const user = await getAuthedUser()
  if (user) {
    await createClient().from('collectibles').upsert({
      user_id: user.id,
      exam_id: examId,
      piece_id: pieceId,
      piece_title: pieceData.title,
      piece_icon: pieceData.icon,
    }, { onConflict: 'user_id,exam_id,piece_id' })
    return
  }
  const collectibles = getCollectiblesLocal()
  if (!collectibles[examId]) collectibles[examId] = {}
  if (!collectibles[examId][pieceId]) {
    collectibles[examId][pieceId] = { ...pieceData, earnedAt: new Date().toISOString() }
    saveCollectiblesLocal(collectibles)
  }
}

export async function hasCollectible(examId, pieceId) {
  const user = await getAuthedUser()
  if (user) {
    const { data } = await createClient()
      .from('collectibles')
      .select('id')
      .eq('user_id', user.id)
      .eq('exam_id', examId)
      .eq('piece_id', pieceId)
      .single()
    return !!data
  }
  const collectibles = getCollectiblesLocal()
  return !!collectibles?.[examId]?.[pieceId]
}

export async function getExamCollectibles(examId) {
  const user = await getAuthedUser()
  if (user) {
    const { data } = await createClient()
      .from('collectibles')
      .select('piece_id, piece_title, piece_icon, earned_at')
      .eq('user_id', user.id)
      .eq('exam_id', examId)
    if (data) {
      return data.reduce((acc, row) => {
        acc[row.piece_id] = { title: row.piece_title, icon: row.piece_icon, earnedAt: row.earned_at }
        return acc
      }, {})
    }
    return {}
  }
  const collectibles = getCollectiblesLocal()
  return collectibles?.[examId] || {}
}

export async function isLicenseComplete(examId, totalPieces) {
  const examCollectibles = await getExamCollectibles(examId)
  return Object.keys(examCollectibles).length >= totalPieces
}

// --- Active Quiz State (sessionStorage — sync, tab-scoped, no DB sync needed) ---

export function saveActiveQuizState(state) {
  if (typeof window === 'undefined') return
  try { sessionStorage.setItem(KEYS.QUIZ_STATE, JSON.stringify(state)) }
  catch {}
}

export function getActiveQuizState() {
  if (typeof window === 'undefined') return null
  try {
    const raw = sessionStorage.getItem(KEYS.QUIZ_STATE)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

export function clearActiveQuizState() {
  if (typeof window === 'undefined') return
  sessionStorage.removeItem(KEYS.QUIZ_STATE)
}

// --- User Profile ---

export async function saveUserProfile(name, email) {
  const user = await getAuthedUser()
  if (user) {
    await createClient()
      .from('profiles')
      .update({ display_name: name, updated_at: new Date().toISOString() })
      .eq('id', user.id)
    return
  }
  if (typeof window === 'undefined') return
  localStorage.setItem(KEYS.PROFILE, JSON.stringify({ name, email }))
}

export async function getUserProfile() {
  const user = await getAuthedUser()
  if (user) {
    const { data } = await createClient()
      .from('profiles')
      .select('display_name, email')
      .eq('id', user.id)
      .single()
    if (data) return { name: data.display_name, email: data.email }
  }
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(KEYS.PROFILE)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

// --- Stats ---

export async function getOverallStats(examId) {
  const user = await getAuthedUser()
  if (user) {
    const { data } = await createClient()
      .from('best_quiz_results')
      .select('percentage, passed')
      .eq('user_id', user.id)
      .eq('exam_id', examId)
    if (data?.length) {
      return {
        totalStagesPlayed: data.length,
        totalStagesPassed: data.filter(s => s.passed).length,
        averageScore: Math.round(data.reduce((sum, s) => sum + s.percentage, 0) / data.length),
      }
    }
    return { totalStagesPlayed: 0, totalStagesPassed: 0, averageScore: 0 }
  }
  const progress = getProgressLocal()
  const stages = Object.values(progress[examId] || {})
  return {
    totalStagesPlayed: stages.length,
    totalStagesPassed: stages.filter(s => s.passed).length,
    averageScore: stages.length
      ? Math.round(stages.reduce((sum, s) => sum + (s.percentage || 0), 0) / stages.length)
      : 0,
  }
}
