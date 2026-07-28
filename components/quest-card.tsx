import Image from 'next/image'

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from '@/components/ui/card'
import { QuestBadges } from '@/components/quest-badges'
import { CATEGORY_IMAGES, type Quest } from '@/lib/quests'

export function QuestCard({
  quest,
  onSelect,
}: {
  quest: Quest
  onSelect: (quest: Quest) => void
}) {
  const image = CATEGORY_IMAGES[quest.category]

  return (
    <li className="h-full list-none animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
      <Card className="group relative h-full overflow-hidden pt-0 transition-shadow focus-within:ring-2 focus-within:ring-ring hover:shadow-lg">
        <article className="flex h-full flex-col">
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
            <Image
              src={image.src || '/placeholder.svg'}
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
            <QuestBadges quest={quest} />
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
