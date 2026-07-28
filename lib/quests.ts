import { createClient } from '@/lib/supabase/client'

export type Category =
  | 'Wellness'
  | 'Productivity'
  | 'Social'
  | 'Entertainment'
  | 'Miscellaneous'

export type TimeCommitment = 'Short' | 'Medium' | 'Long'

export type Cost = 'Free' | 'Budget' | 'Splurge'

export type Quest = {
  id: number
  title: string
  description: string
  category: Category
  time: TimeCommitment[]
  cost: Cost[]
}

export type QuestFilters = {
  categories: Category[]
  times: TimeCommitment[]
  costs: Cost[]
}

export const CATEGORIES: Category[] = [
  'Wellness',
  'Productivity',
  'Social',
  'Entertainment',
  'Miscellaneous',
]

export const TIMES: TimeCommitment[] = ['Short', 'Medium', 'Long']

export const COSTS: Cost[] = ['Free', 'Budget', 'Splurge']

export const TIME_HINTS: Record<TimeCommitment, string> = {
  Short: 'Under 30 min',
  Medium: '1–2 hours',
  Long: 'Half a day+',
}

export const CATEGORY_IMAGES: Record<
  Category,
  { src: string; alt: string }
> = {
  Wellness: {
    src: '/quests/wellness.png',
    alt: 'Illustration of a person doing a sunrise yoga stretch on a mat in soft morning light',
  },
  Productivity: {
    src: '/quests/productivity.png',
    alt: 'Illustration of a tidy desk with a laptop showing an empty inbox and a checklist',
  },
  Social: {
    src: '/quests/social.png',
    alt: 'Illustration of two friends chatting over coffee cups at a cozy cafe table',
  },
  Entertainment: {
    src: '/quests/entertainment.png',
    alt: 'Illustration of a cinema scene with a movie clapperboard and a bucket of popcorn',
  },
  Miscellaneous: {
    src: '/quests/miscellaneous.png',
    alt: 'Illustration of a mystery grab bag filled with assorted playful shapes and a question mark',
  },
}

type QuestRow = {
  id: number
  title: string
  description: string
  category: string
  time_estimate: string[] | null
  cost: string[] | null
}

function mapRowToQuest(row: QuestRow): Quest {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    category: row.category as Category,
    time: (row.time_estimate ?? []) as TimeCommitment[],
    cost: (row.cost ?? []) as Cost[],
  }
}

/**
 * Fetches up to 3 quests from Supabase, applying the active filters.
 * - Category: exact match when a single category chip is selected (`.in` for multiple).
 * - Time / Cost: `.overlaps()` so a quest matches if ANY of its tags are selected.
 */
export async function fetchQuests(filters: QuestFilters): Promise<Quest[]> {
  const supabase = createClient()

  let query = supabase
    .from('quests')
    .select('id, title, description, category, time_estimate, cost')

  if (filters.categories.length > 0) {
    query = query.in('category', filters.categories)
  }

  if (filters.times.length > 0) {
    query = query.overlaps('time_estimate', filters.times)
  }

  if (filters.costs.length > 0) {
    query = query.overlaps('cost', filters.costs)
  }

  const { data, error } = await query.limit(3)

  if (error) {
    console.error('[v0] Failed to fetch quests from Supabase:', error.message)
    throw error
  }

  return (data as QuestRow[]).map(mapRowToQuest)
}
