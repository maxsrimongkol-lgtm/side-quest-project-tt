import { supabase } from '@/lib/supabaseClient';

// 1. Map present-tense or legacy string inputs to standard past-tense database names
const EVENT_NAME_MAP: Record<string, string> = {
  button_click: 'button_clicked',
  click: 'button_clicked',
  filter_click: 'filter_clicked',
  reroll_clicked: 'reroll_clicked',
  reroll: 'reroll_clicked',
  click_reroll: 'reroll_clicked',
  page_view: 'page_viewed',
};

export async function logEvent(
  rawEventType: string,
  metadata: Record<string, unknown> = {}
) {
  // 2. Resolve to standardized past-tense string (or keep original if already past-tense)
  const eventType = EVENT_NAME_MAP[rawEventType] || rawEventType;

  // 3. Lowercase metadata keys & string values automatically
  const sanitizedMetadata = Object.fromEntries(
    Object.entries(metadata).map(([key, val]) => [
      key.toLowerCase(),
      typeof val === 'string' ? val.toLowerCase() : val,
    ])
  );

  // 4. Insert into Supabase analytics table
  const { error } = await supabase.from('analytics').insert({
    event_type: eventType,
    metadata: sanitizedMetadata,
  });

  if (error) {
    console.error('Failed to log event:', error);
  }
}

// Aliases for backwards compatibility across components
export const trackEvent = logEvent;
export const track = logEvent;
export default logEvent;
