import {
  Smile,
  ListChecks,
  Users,
  Clapperboard,
  Shapes,
  Rabbit,
  Clock,
  Hourglass,
  Gift,
  Coins,
  Gem,
  Tag,
  type LucideIcon,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import {
  TIME_HINTS,
  type Category,
  type Cost,
  type Quest,
  type TimeCommitment,
} from '@/lib/quests'

const CATEGORY_ICONS: Record<Category, LucideIcon> = {
  Wellness: Smile,
  Productivity: ListChecks,
  Social: Users,
  Entertainment: Clapperboard,
  Miscellaneous: Shapes,
}

const TIME_ICONS: Record<TimeCommitment, LucideIcon> = {
  Short: Rabbit,
  Medium: Clock,
  Long: Hourglass,
}

const COST_ICONS: Record<Cost, LucideIcon> = {
  Free: Gift,
  Budget: Coins,
  Splurge: Gem,
}

/**
 * Normalizes a tag array from Supabase into clean, individual values.
 * Guards against malformed rows where multiple values were stored in a
 * single string (e.g. ["Budget, Splurge"] instead of ["Budget", "Splurge"]).
 */
function normalizeTags(tags: string[] | null | undefined): string[] {
  if (!tags) return []
  return tags
    .flatMap((tag) => (typeof tag === 'string' ? tag.split(',') : []))
    .map((tag) => tag.trim())
    .filter(Boolean)
}

export function QuestBadges({ quest }: { quest: Quest }) {
  // Fall back to a generic tag icon if a value isn't in our icon maps.
  const CategoryIcon = CATEGORY_ICONS[quest.category] ?? Tag

  return (
    <>
      <Badge variant="default">
        <CategoryIcon aria-hidden="true" />
        {quest.category}
      </Badge>
      {normalizeTags(quest.time).map((time) => {
        const TimeIcon = TIME_ICONS[time as TimeCommitment] ?? Tag
        const hint = TIME_HINTS[time as TimeCommitment]
        return (
          <Badge key={time} variant="secondary">
            <TimeIcon aria-hidden="true" />
            <span>
              {time}
              {hint ? <span className="sr-only">{`, ${hint}`}</span> : null}
            </span>
          </Badge>
        )
      })}
      {normalizeTags(quest.cost).map((cost) => {
        const CostIcon = COST_ICONS[cost as Cost] ?? Tag
        return (
          <Badge key={cost} variant="outline">
            <CostIcon aria-hidden="true" />
            {cost}
          </Badge>
        )
      })}
    </>
  )
}
