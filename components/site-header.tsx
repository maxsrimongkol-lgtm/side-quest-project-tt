import { Footprints } from 'lucide-react'

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-4 sm:px-6">
        <span
          aria-hidden="true"
          className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground"
        >
          <Footprints className="size-5" />
        </span>
        <div className="flex flex-col">
          <h1 className="font-serif text-lg font-bold leading-tight text-foreground text-balance sm:text-xl">
            The Side Quest Generator
          </h1>
          <p className="text-xs text-muted-foreground sm:text-sm">
            Spontaneous adventures, tailored to your moment.
          </p>
        </div>
      </div>
    </header>
  )
}
