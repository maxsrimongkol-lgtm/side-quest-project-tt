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

type FilterPanelProps = {
  category: Category
  time: TimeCommitment | null
  cost: Cost | null
  onCategoryChange: (value: Category) => void
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
          value={[category]}
          onValueChange={(value) => {
            // Keep exactly one category selected: ignore attempts to
            // deselect the active chip, otherwise switch to the new one.
            const next = value[value.length - 1] as Category | undefined
            if (next) onCategoryChange(next)
          }}
          variant="outline"
          spacing={2}
          className="flex-wrap"
        >
          {CATEGORIES.map((category) => (
            <ToggleGroupItem
              key={category}
              value={category}
              aria-label={`Filter by ${category}`}
              className="rounded-full aria-pressed:border-primary! aria-pressed:bg-primary! aria-pressed:text-primary-foreground! aria-pressed:hover:bg-primary/90!"
            >
              {category}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </FilterGroup>

      <FilterGroup title="Time" headingId="filter-time">
        <ToggleGroup
          aria-labelledby="filter-time"
          value={time ? [time] : []}
          onValueChange={(value) =>
            onTimeChange((value[value.length - 1] as TimeCommitment) ?? null)
          }
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
          onValueChange={(value) =>
            onCostChange((value[value.length - 1] as Cost) ?? null)
          }
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
