import { createClient } from '@/lib/supabase/client';

// 1. Comprehensive present-tense -> past-tense mapping
const EVENT_NAME_MAP: Record<string, string> = {
  // Page events
  page_view: 'page_viewed',
  view: 'page_viewed',
  
  // Reroll/Shuffle events
  reroll: 'reroll_clicked',
  click_reroll: 'reroll_clicked',
  reroll_click: 'reroll_clicked',
  
  // Click/Button events
  click: 'button_clicked',
  button_click: 'button_clicked',
  
  // Filter events
  filter_click: 'filter_clicked',
  filter_change: 'filter_clicked',
};

// Helper to manage or generate a persistent anon session ID
function getSessionId(): string {
  if (typeof window === 'undefined') return 'server_session';
  let sessionId = localStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
}

export async function logEvent(
  rawEventType: string,
  metadata: Record<string, unknown> = {}
) {
  const supabase = createClient();

  // 2. Resolve to standardized past-tense string
  const eventType = EVENT_NAME_MAP[rawEventType] || rawEventType;

  // 3. Automatically attach session ID and resolve current auth user ID
  const sessionId = getSessionId();
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user?.id || null;

  // 4. Lowercase metadata keys & string values automatically
  const sanitizedMetadata = Object.fromEntries(
    Object.entries(metadata).map(([key, val]) => [
      key.toLowerCase(),
      typeof val === 'string' ? val.toLowerCase() : val,
    ])
  );

  // 5. Insert payload into Supabase analytics table
  const { error } = await supabase.from('analytics').insert({
    event_type: eventType,
    user_id: userId,
    session_id: sessionId,
    metadata: sanitizedMetadata,
  });

  if (error) {
    console.error('Failed to log event:', error);
  }
}

// Backwards-compatibility aliases
export const trackEvent = logEvent;
export const track = logEvent;
export default logEvent;
