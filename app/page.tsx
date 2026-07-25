'use client'

import { useMemo, useState } from 'react'

import { SiteHeader } from '@/components/site-header'
import { FilterPanel } from '@/components/filter-panel'
import { QuestCard } from '@/components/quest-card'
import {
  QUESTS,
  type Category,
  type Cost,
  type TimeCommitment,
} from '@/lib/quests'

export default function Page() {
  const [categories, setCategories] = useState<Category[]>([])
  const [time, setTime] = useState<TimeCommitment | null>(null)
  const [cost, setCost] = useState<Cost | null>(null)

  const quests = useMemo(() => {
    return QUESTS.filter((quest) => {
      const matchesCategory =
        categories.length === 0 || categories.includes(quest.category)
      const matchesTime = !time || quest.time === time
      const matchesCost = !cost || quest.cost === cost
      return matchesCategory && matchesTime && matchesCost
    })
  }, [categories, time, cost])

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

        <section aria-label="Suggested side quests">
          <div className="mb-4 flex items-baseline justify-between gap-4">
            <h2 className="font-serif text-xl font-bold text-foreground">
              Your Quests
            </h2>
            <p className="text-sm text-muted-foreground" aria-live="polite">
              {quests.length} {quests.length === 1 ? 'quest' : 'quests'}
            </p>
          </div>

          {quests.length > 0 ? (
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {quests.map((quest) => (
                <QuestCard key={quest.id} quest={quest} />
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
    </div>
  )
}
