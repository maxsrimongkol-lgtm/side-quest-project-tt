import { Clock, Wallet, Tag } from 'lucide-react'

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TIME_HINTS, type Quest } from '@/lib/quests'

export function QuestCard({ quest }: { quest: Quest }) {
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
              <Tag aria-hidden="true" />
              {quest.category}
            </Badge>
            <Badge variant="secondary">
              <Clock aria-hidden="true" />
              <span>
                {quest.time}
                <span className="sr-only">{`, ${TIME_HINTS[quest.time]}`}</span>
              </span>
            </Badge>
            <Badge variant="outline">
              <Wallet aria-hidden="true" />
              {quest.cost}
            </Badge>
          </CardFooter>
        </article>
      </Card>
    </li>
  )
}
