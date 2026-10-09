import { createClient } from '@/lib/supabase/client';

export async function logEvent(
  rawEventType: string,
  metadata: Record<string, unknown> = {}
) {
  console.log('⚡ logEvent triggered with:', { rawEventType, metadata });

  try {
    const supabase = createClient();

    const { data, error } = await supabase.from('analytics').insert({
      event_type: rawEventType,
      metadata: metadata,
    }).select();

    if (error) {
      console.error('❌ Supabase insert failed:', error);
    } else {
      console.log('✅ Supabase insert succeeded:', data);
    }
  } catch (err) {
    console.error('❌ Unexpected analytics error:', err);
  }
}

export const trackEvent = logEvent;
export const track = logEvent;
export default logEvent;
