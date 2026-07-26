import Image from 'next/image'
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
  CATEGORY_IMAGES,
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

export function QuestCard({
  quest,
  onSelect,
}: {
  quest: Quest
  onSelect: (quest: Quest) => void
}) {
  const CategoryIcon = CATEGORY_ICONS[quest.category]
  const TimeIcon = TIME_ICONS[quest.time]
  const CostIcon = COST_ICONS[quest.cost]
  const image = CATEGORY_IMAGES[quest.category]

  return (
    <li className="h-full list-none animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
      <Card className="group relative h-full overflow-hidden pt-0 transition-shadow focus-within:ring-2 focus-within:ring-ring hover:shadow-lg">
        <article className="flex h-full flex-col">
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <CardHeader className="mt-4">
            <h3 className="font-serif text-lg font-semibold leading-snug text-card-foreground text-balance">
              {quest.title}
            </h3>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="line-clamp-3 leading-relaxed text-muted-foreground text-pretty">
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
        <button
          type="button"
          onClick={() => onSelect(quest)}
          className="absolute inset-0 z-10 rounded-xl outline-none"
          aria-label={`View full details for ${quest.title}`}
        />
      </Card>
    </li>
  )
}
