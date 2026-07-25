export type Category =
  | 'Wellness'
  | 'Productivity'
  | 'Social'
  | 'Entertainment'
  | 'Miscellaneous'

export type TimeCommitment = 'Short' | 'Medium' | 'Long'

export type Cost = 'Free' | 'Budget' | 'Splurge'

export type Quest = {
  id: string
  title: string
  description: string
  category: Category
  time: TimeCommitment
  cost: Cost
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

export const QUESTS: Quest[] = [
  {
    id: 'sunrise-stretch',
    title: 'Sunrise Stretch Session',
    description:
      'Roll out a mat, follow a 20-minute guided mobility flow, and greet the day with a clearer head and looser shoulders.',
    category: 'Wellness',
    time: 'Short',
    cost: 'Free',
  },
  {
    id: 'inbox-zero-sprint',
    title: 'Inbox Zero Sprint',
    description:
      'Set a timer, triage every unread email, and unsubscribe from three lists you never read. Reclaim your attention.',
    category: 'Productivity',
    time: 'Medium',
    cost: 'Free',
  },
  {
    id: 'mystery-cafe-crawl',
    title: 'Mystery Café Crawl',
    description:
      'Pick a neighborhood you rarely visit and taste-test the house drink at two spots you have never tried before.',
    category: 'Social',
    time: 'Long',
    cost: 'Budget',
  },
]
