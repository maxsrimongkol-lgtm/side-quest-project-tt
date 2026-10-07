import { createClient } from '@/lib/supabase/client'

const EVENT_NAME_MAP: Record<string, string> = {
  page_view: 'page_viewed',
  view: 'page_viewed',
  reroll: 'reroll_clicked',
  click_reroll: 'reroll_clicked',
  reroll_click: 'reroll_clicked',
  click: 'button_clicked',
  button_click: 'button_clicked',
  filter_click: 'filter_clicked',
  filter_change: 'filter_clicked',
}

function getSessionId(): string {
  if (typeof window === 'undefined') return 'server_session'
  try {
    let sessionId = localStorage.getItem('analytics_session_id')
    if (!sessionId) {
      sessionId = typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
      localStorage.setItem('analytics_session_id', sessionId)
    }
    return sessionId
  } catch (e) {
    return `session_${Date.now()}`
  }
}

export async function logEvent(
  rawEventType: string,
  metadata: Record<string, unknown> = {}
) {
  try {
    const supabase = createClient()
    const eventType = EVENT_NAME_MAP[rawEventType] || rawEventType
    const sessionId = getSessionId()

    // Safely attempt to read auth user without crashing if unauthenticated
    let userId: string | null = sessionId
    try {
      const { data } = await supabase.auth.getUser()
      if (data?.user?.id) {
        userId = data.user.id
      }
    } catch {
      // Fallback to sessionId when no auth user exists
    }

    const sanitizedMetadata = Object.fromEntries(
      Object.entries(metadata || {}).map(([key, val]) => [
        key.toLowerCase(),
        typeof val === 'string' ? val.toLowerCase() : val,
      ])
    )

    const { error } = await supabase.from('analytics').insert({
      event_type: eventType,
      user_id: userId,
      session_id: sessionId,
      metadata: sanitizedMetadata,
    })

    if (error) {
      console.error('❌ Supabase Analytics Insert Error:', error.message)
    } else {
      console.log('✅ Logged event:', eventType)
    }
  } catch (err) {
    console.error('❌ Error logging event:', err)
  }
}

export const trackEvent = logEvent
export const track = logEvent
export default logEvent
