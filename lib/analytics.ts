import { createClient } from '@/lib/supabase/client';

export async function logEvent(
  rawEventType: string,
  metadata: Record<string, unknown> = {}
) {
  try {
    const supabase = createClient();

    const { error } = await supabase.from('analytics').insert({
      event_type: rawEventType,
      metadata,
    });

    if (error) {
      console.error('Analytics log error:', error.message);
    }
  } catch (err) {
    console.error('Failed to send telemetry:', err);
  }
}

export const trackEvent = logEvent;
export const track = logEvent;
export default logEvent;
