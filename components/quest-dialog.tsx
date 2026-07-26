'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Check, Loader2 } from 'lucide-react'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CATEGORY_IMAGES, TIME_HINTS, type Quest } from '@/lib/quests'

type SubmitState = 'idle' | 'submitting' | 'accepted'

export function QuestDialog({
  quest,
  open,
  onOpenChange,
}: {
  quest: Quest | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [status, setStatus] = useState<SubmitState>('idle')

  // Reset the accept state whenever a different quest is opened or it closes.
  useEffect(() => {
    if (!open) return
    setStatus('idle')
  }, [open, quest?.id])

  async function handleAccept() {
    // Prevent multiple submissions while a request is in flight or done.
    if (status !== 'idle') return
    setStatus('submitting')
    try {
      // Simulate a network request to accept the quest.
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setStatus('accepted')
    } catch {
      setStatus('idle')
    }
  }

  const image = quest ? CATEGORY_IMAGES[quest.category] : null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-md">
        {quest && image && (
          <>
            <div className="relative aspect-[16/9] w-full bg-muted">
              <Image
                src={image.src || '/placeholder.svg'}
                alt={image.alt}
                fill
                sizes="(min-width: 640px) 28rem, 100vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col gap-4 p-5">
              <DialogHeader>
                <DialogTitle className="font-serif text-xl leading-snug text-balance">
                  {quest.title}
                </DialogTitle>
                <DialogDescription className="leading-relaxed text-pretty">
                  {quest.description}
                </DialogDescription>
              </DialogHeader>

              <div
                className="flex flex-wrap gap-2"
                aria-label="Quest details"
              >
                <Badge variant="default">{quest.category}</Badge>
                <Badge variant="secondary">
                  {quest.time}
                  <span className="sr-only">{`, ${TIME_HINTS[quest.time]}`}</span>
                </Badge>
                <Badge variant="outline">{quest.cost}</Badge>
              </div>
            </div>

            <DialogFooter>
              <DialogClose
                render={<Button variant="outline" />}
                disabled={status === 'submitting'}
              >
                Maybe later
              </DialogClose>
              <Button
                onClick={handleAccept}
                disabled={status !== 'idle'}
                aria-live="polite"
              >
                {status === 'submitting' && (
                  <>
                    <Loader2 className="animate-spin" aria-hidden="true" />
                    Accepting…
                  </>
                )}
                {status === 'accepted' && (
                  <>
                    <Check aria-hidden="true" />
                    Quest Accepted
                  </>
                )}
                {status === 'idle' && 'Accept Quest'}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
