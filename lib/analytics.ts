import { createClient } from '@/lib/supabase/client'

const SESSION_STORAGE_KEY = 'sq_session_id'

/**
 * Returns a stable anonymous session id, creating one on first use.
 * Persisted in localStorage so it survives reloads and continues across the
 * browser session. Falls back to an ephemeral id when storage is unavailable
 * (e.g. SSR or privacy mode).
 */
export function getSessionId(): string {
  if (typeof window === 'undefined') return 'server'

  try {
    let sessionId = window.localStorage.getItem(SESSION_STORAGE_KEY)
    if (!sessionId) {
      sessionId = crypto.randomUUID()
      window.localStorage.setItem(SESSION_STORAGE_KEY, sessionId)
    }
    return sessionId
  } catch {
    return crypto.randomUUID()
  }
}

/**
 * Fire-and-forget analytics tracker. Inserts an event row into the Supabase
 * `analytics` table with the event type, the anonymous session id, and a JSON
 * metadata payload. The insert is never awaited and any failure is logged to
 * the console instead of surfacing to the user, so tracking never blocks or
 * slows down the UI.
 */
export function trackEvent(
  eventType: string,
  metadata: Record<string, unknown> = {},
): void {
  // Analytics must never break the UI, so any failure (including a missing
  // Supabase client config) is swallowed with a console warning.
  try {
    const supabase = createClient()

    void supabase
      .from('analytics')
      .insert({
        event_type: eventType,
        session_id: getSessionId(),
        metadata,
      })
      .then(({ error }) => {
        if (error) {
          console.error('[v0] Analytics track failed:', error.message)
        }
      })
  } catch (err) {
    console.error('[v0] Analytics track skipped:', err)
  }
}

type AnalyticsEvent =
  | {
      event_type: 'Filter_Click'
      metadata: { filter_type: 'category' | 'time' | 'cost'; value: string }
    }
  | { event_type: 'Reroll'; metadata: { active_filters: string[] } }
  | { event_type: 'Quest_Accepted'; metadata: { quest_id: number; title: string } }
  | { event_type: 'QuestDismissed'; metadata: { quest_id: number; title: string } }

/**
 * Backwards-compatible wrapper around {@link trackEvent} used by existing
 * interaction handlers. New code should prefer calling `trackEvent` directly.
 */
export function logEvent(event: AnalyticsEvent): void {
  trackEvent(event.event_type, event.metadata)
}
