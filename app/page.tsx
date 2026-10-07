'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function QuestsPage() {
  const [quests, setQuests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize the Supabase browser client inside the component
  const supabase = createClient();

  useEffect(() => {
    async function fetchQuests() {
      setLoading(true);
      const { data, error } = await supabase.from('quests').select('*');

      if (error) {
        console.error('Error fetching quests:', error);
      } else if (data) {
        setQuests(data);
      }
      setLoading(false);
    }

    fetchQuests();
  }, []);

  if (loading) return <div>Loading quests...</div>;

  return (
    <main>
      <h1>Your Quests</h1>
      <ul>
        {quests.map((quest) => (
          <li key={quest.id}>{quest.title || quest.name}</li>
        ))}
      </ul>
    </main>
  );
}
