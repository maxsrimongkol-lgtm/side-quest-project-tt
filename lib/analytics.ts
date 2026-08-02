import { createClient } from '@/lib/supabase/client'

type AnalyticsEvent =
  | {
      event_type: 'Filter_Click'
      metadata: { filter_type: 'category' | 'time' | 'cost'; value: string }
    }
  | { event_type: 'Reroll'; metadata: { active_filters: string[] } }
  | { event_type: 'Quest_Accepted'; metadata: { quest_id: number; title: string } }

/**
 * Fire-and-forget analytics logger. Writes an event row to the Supabase
 * `analytics` table without blocking the UI: the insert is never awaited and
 * any failure is logged to the console instead of surfacing to the user.
 */
export function logEvent(event: AnalyticsEvent): void {
  const supabase = createClient()

  void supabase
    .from('analytics')
    .insert({ event_type: event.event_type, metadata: event.metadata })
    .then(({ error }) => {
      if (error) {
        console.error('[v0] Analytics log failed:', error.message)
      }
    })
}
