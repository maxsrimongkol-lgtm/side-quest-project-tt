import { createClient } from '@/lib/supabase/client'

const SESSION_STORAGE_KEY = 'app_session_id'

/**
 * Retrieves the persistent session_id from localStorage or generates a new UUID.
 */
export function getSessionId(): string {
  if (typeof window === 'undefined') return ''

  let sessionId = localStorage.getItem(SESSION_STORAGE_KEY)
  if (!sessionId) {
    sessionId = crypto.randomUUID()
    localStorage.setItem(SESSION_STORAGE_KEY, sessionId)
  }
  return sessionId
}

/**
 * Standardizes event names to clean lowercase snake_case.
 * e.g., "Reroll_Clicked" or "Core Action Completed" -> "core_action_completed"
 */
function sanitizeEventType(eventType: string): string {
  return eventType
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '_') // replaces spaces with underscores
}

/**
 * Logs a structured event to the Supabase analytics table.
 */
export async function trackEvent(
  eventType: string,
  metadata: Record<string, any> = {}
) {
  try {
    const supabase = createClient()
    const sessionId = getSessionId()
    const cleanEventType = sanitizeEventType(eventType)

    const { error } = await supabase.from('analytics').insert([
      {
        event_type: cleanEventType,
        session_id: sessionId,
        user_id: null, // Populated automatically if you add user authentication later
        metadata,
      },
    ])

    if (error) {
      console.error('Failed to log analytics event:', error.message)
    }
  } catch (err) {
    console.error('Unexpected error tracking event:', err)
  }
}

export const logEvent = trackEvent;
