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

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from '@/components/ui/card'
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

export function QuestCard({ quest }: { quest: Quest }) {
  const CategoryIcon = CATEGORY_ICONS[quest.category]
  const TimeIcon = TIME_ICONS[quest.time]
  const CostIcon = COST_ICONS[quest.cost]

  return (
    <li className="h-full list-none">
      <Card className="h-full">
        <article className="flex h-full flex-col">
          <CardHeader>
            <h3 className="font-serif text-lg font-semibold leading-snug text-card-foreground text-balance">
              {quest.title}
            </h3>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="leading-relaxed text-muted-foreground text-pretty">
              {quest.description}
            </p>
          </CardContent>
          <CardFooter className="flex flex-wrap gap-2">
            <Badge variant="default">
              <CategoryIcon aria-hidden="true" />
              {quest.category}
            </Badge>
            <Badge variant="secondary">
              <TimeIcon aria-hidden="true" />
              <span>
                {quest.time}
                <span className="sr-only">{`, ${TIME_HINTS[quest.time]}`}</span>
              </span>
            </Badge>
            <Badge variant="outline">
              <CostIcon aria-hidden="true" />
              {quest.cost}
            </Badge>
          </CardFooter>
        </article>
      </Card>
    </li>
  )
}
