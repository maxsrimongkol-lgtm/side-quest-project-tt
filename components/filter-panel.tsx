'use client'

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import {
  CATEGORIES,
  COSTS,
  TIMES,
  type Category,
  type Cost,
  type TimeCommitment,
} from '@/lib/quests'
import { logEvent } from '@/lib/analytics'

type FilterPanelProps = {
  category: Category | null
  time: TimeCommitment | null
  cost: Cost | null
  onCategoryChange: (value: Category | null) => void
  onTimeChange: (value: TimeCommitment | null) => void
  onCostChange: (value: Cost | null) => void
}

function FilterGroup({
  title,
  headingId,
  children,
}: {
  title: string
  headingId: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <h3
        id={headingId}
        className="text-sm font-medium text-foreground"
      >
        {title}
      </h3>
      {children}
    </div>
  )
}

export function FilterPanel({
  category,
  time,
  cost,
  onCategoryChange,
  onTimeChange,
  onCostChange,
}: FilterPanelProps) {
  return (
    <section
      aria-label="Filter side quests"
      className="flex flex-col gap-5 rounded-xl border border-border bg-card p-4 sm:p-5"
    >
      <FilterGroup title="Category" headingId="filter-category">
        <ToggleGroup
          aria-labelledby="filter-category"
          value={category ? [category] : []}
          onValueChange={(value) => {
            const next = (value[value.length - 1] as Category) ?? null
            if (next) {
              logEvent({
                event_type: 'Filter_Click',
                metadata: { filter_type: 'category', value: next },
              })
            }
            onCategoryChange(next)
          }}
          variant="outline"
          spacing={2}
          className="flex-wrap"
        >
          {CATEGORIES.map((option) => (
            <ToggleGroupItem
              key={option}
              value={option}
              aria-label={`Filter by ${option}`}
              className="rounded-full aria-pressed:border-primary! aria-pressed:bg-primary! aria-pressed:text-primary-foreground! aria-pressed:hover:bg-primary/90!"
            >
              {option}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </FilterGroup>

      <FilterGroup title="Time" headingId="filter-time">
        <ToggleGroup
          aria-labelledby="filter-time"
          value={time ? [time] : []}
          onValueChange={(value) => {
            const next = (value[value.length - 1] as TimeCommitment) ?? null
            if (next) {
              logEvent({
                event_type: 'filter_clicked',
                metadata: { filter_type: 'time', value: next },
              })
            }
            onTimeChange(next)
          }}
          variant="outline"
          spacing={2}
          className="flex-wrap"
        >
          {TIMES.map((option) => (
            <ToggleGroupItem
              key={option}
              value={option}
              aria-label={`Filter by ${option} time commitment`}
              className="rounded-full aria-pressed:border-primary! aria-pressed:bg-primary! aria-pressed:text-primary-foreground! aria-pressed:hover:bg-primary/90!"
            >
              {option}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </FilterGroup>

      <FilterGroup title="Cost" headingId="filter-cost">
        <ToggleGroup
          aria-labelledby="filter-cost"
          value={cost ? [cost] : []}
          onValueChange={(value) => {
            const next = (value[value.length - 1] as Cost) ?? null
            if (next) {
              logEvent({
                event_type: 'filter_clicked',
                metadata: { filter_type: 'cost', value: next },
              })
            }
            onCostChange(next)
          }}
          variant="outline"
          spacing={2}
          className="flex-wrap"
        >
          {COSTS.map((option) => (
            <ToggleGroupItem
              key={option}
              value={option}
              aria-label={`Filter by ${option} cost`}
              className="rounded-full aria-pressed:border-primary! aria-pressed:bg-primary! aria-pressed:text-primary-foreground! aria-pressed:hover:bg-primary/90!"
            >
              {option}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </FilterGroup>
    </section>
  )
}
