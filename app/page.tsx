'use client'

import { useMemo, useState } from 'react'
import useSWR from 'swr'
import { Shuffle } from 'lucide-react'

import { SiteHeader } from '@/components/site-header'
import { FilterPanel } from '@/components/filter-panel'
import { QuestCard } from '@/components/quest-card'
import { QuestGridSkeleton } from '@/components/quest-card-skeleton'
import { QuestDialog } from '@/components/quest-dialog'
import { Button } from '@/components/ui/button'
import {
  fetchQuests,
  type Category,
  type Cost,
  type Quest,
  type QuestFilters,
  type TimeCommitment,
} from '@/lib/quests'

function shuffle<T>(items: T[]): T[] {
  const arr = [...items]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export default function Page() {
  const [categories, setCategories] = useState<Category[]>([])
  const [time, setTime] = useState<TimeCommitment | null>(null)
  const [cost, setCost] = useState<Cost | null>(null)
  const [shuffleKey, setShuffleKey] = useState(0)

  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const filters = useMemo<QuestFilters>(
    () => ({
      categories,
      times: time ? [time] : [],
      costs: cost ? [cost] : [],
    }),
    [categories, time, cost],
  )

  // Re-query Supabase whenever the active filters (or shuffle) change.
  const { data, isLoading, error } = useSWR(
    ['quests', filters, shuffleKey],
    ([, activeFilters]) => fetchQuests(activeFilters),
    { keepPreviousData: true },
  )

  const quests = useMemo(() => {
    if (!data) return []
    return shuffleKey === 0 ? data : shuffle(data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, shuffleKey])

  function handleSelect(quest: Quest) {
    setSelectedQuest(quest)
    setDialogOpen(true)
  }

  return (
    <div className="min-h-svh bg-background">
      <SiteHeader />
      <main className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8">
        <FilterPanel
          categories={categories}
          time={time}
          cost={cost}
          onCategoriesChange={setCategories}
          onTimeChange={setTime}
          onCostChange={setCost}
        />

        <div className="flex justify-center sm:justify-start">
          <Button
            size="lg"
            onClick={() => setShuffleKey((key) => key + 1)}
            className="w-full sm:w-auto"
          >
            <Shuffle aria-hidden="true" />
            Shuffle Quests
          </Button>
        </div>

        <section aria-label="Suggested side quests">
          <div className="mb-4 flex items-baseline justify-between gap-4">
            <h2 className="font-serif text-xl font-bold text-foreground">
              Your Quests
            </h2>
            {!isLoading && !error && (
              <p className="text-sm text-muted-foreground" aria-live="polite">
                {quests.length} {quests.length === 1 ? 'quest' : 'quests'}
              </p>
            )}
          </div>

          {isLoading ? (
            <QuestGridSkeleton />
          ) : error ? (
            <div className="rounded-xl border border-dashed border-destructive/50 bg-card p-8 text-center">
              <p className="text-sm text-muted-foreground text-pretty">
                Something went wrong loading your quests. Please try shuffling
                again.
              </p>
            </div>
          ) : quests.length > 0 ? (
            <ul
              key={`${categories.join()}-${time}-${cost}-${shuffleKey}`}
              className="grid grid-cols-1 gap-4 md:grid-cols-3"
            >
              {quests.map((quest) => (
                <QuestCard
                  key={quest.id}
                  quest={quest}
                  onSelect={handleSelect}
                />
              ))}
            </ul>
          ) : (
            <div className="rounded-xl border border-dashed border-border bg-card p-8 text-center">
              <p className="text-sm text-muted-foreground text-pretty">
                No quests match your filters yet. Try loosening a filter to
                reveal more adventures.
              </p>
            </div>
          )}
        </section>
      </main>

      <QuestDialog
        quest={selectedQuest}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  )
}
