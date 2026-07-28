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

export function QuestBadges({ quest }: { quest: Quest }) {
  const CategoryIcon = CATEGORY_ICONS[quest.category]

  return (
    <>
      <Badge variant="default">
        <CategoryIcon aria-hidden="true" />
        {quest.category}
      </Badge>
      {quest.time.map((time) => {
        const TimeIcon = TIME_ICONS[time]
        return (
          <Badge key={time} variant="secondary">
            <TimeIcon aria-hidden="true" />
            <span>
              {time}
              <span className="sr-only">{`, ${TIME_HINTS[time]}`}</span>
            </span>
          </Badge>
        )
      })}
      {quest.cost.map((cost) => {
        const CostIcon = COST_ICONS[cost]
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
