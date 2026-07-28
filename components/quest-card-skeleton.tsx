import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

function QuestCardSkeleton() {
  return (
    <li className="h-full list-none">
      <Card className="h-full overflow-hidden pt-0">
        <div className="flex h-full flex-col">
          <Skeleton className="aspect-[16/9] w-full rounded-none" />
          <CardHeader className="mt-4">
            <Skeleton className="h-6 w-3/4" />
          </CardHeader>
          <CardContent className="flex-1 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
          <CardFooter className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </CardFooter>
        </div>
      </Card>
    </li>
  )
}

export function QuestGridSkeleton() {
  return (
    <ul
      className="grid grid-cols-1 gap-4 md:grid-cols-3"
      aria-hidden="true"
    >
      {Array.from({ length: 3 }).map((_, i) => (
        <QuestCardSkeleton key={i} />
      ))}
    </ul>
  )
}
