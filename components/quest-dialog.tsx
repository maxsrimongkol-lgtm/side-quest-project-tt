'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import confetti from 'canvas-confetti'
import { Loader2, PartyPopper } from 'lucide-react'

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
import { QuestBadges } from '@/components/quest-badges'
import { CATEGORY_IMAGES, type Quest } from '@/lib/quests'
import { logEvent } from '@/lib/analytics'

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
  const acceptedTitleRef = useRef<string>('')

  // Reset the accept state whenever a different quest is opened or it closes.
  useEffect(() => {
    if (!open) return
    setStatus('idle')
  }, [open, quest?.id])

  // Fire a celebratory confetti burst when the quest is accepted.
  useEffect(() => {
    if (status !== 'accepted') return
    const duration = 700
    const end = Date.now() + duration
    const colors = ['#10b981', '#34d399', '#a7f3d0', '#fbbf24']

    confetti({
      particleCount: 90,
      spread: 80,
      startVelocity: 45,
      origin: { y: 0.6 },
      colors,
    })

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      })
      if (Date.now() < end) requestAnimationFrame(frame)
    }
    frame()
  }, [status])

  async function handleAccept() {
    // Prevent multiple submissions while a request is in flight or done.
    if (status !== 'idle' || !quest) return
    acceptedTitleRef.current = quest.title
    logEvent({
      event_type: 'Quest_Accepted',
      metadata: { quest_id: quest.id, title: quest.title },
    })
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
  const isAccepted = status === 'accepted'

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-md">
        {quest && image && !isAccepted && (
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
                <QuestBadges quest={quest} />
              </div>
            </div>

            <DialogFooter className="px-5 pt-2 pb-5 sm:justify-center">
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
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="animate-spin" aria-hidden="true" />
                    Accepting…
                  </>
                ) : (
                  'Accept Quest'
                )}
              </Button>
            </DialogFooter>
          </>
        )}

        {isAccepted && (
          <div className="flex flex-col items-center gap-4 p-8 text-center">
            <div
              className="flex size-16 animate-in zoom-in-50 items-center justify-center rounded-full bg-primary text-primary-foreground duration-500"
              aria-hidden="true"
            >
              <PartyPopper className="size-8" />
            </div>
            <DialogHeader className="items-center gap-2">
              <DialogTitle className="font-serif text-2xl text-balance">
                {'Quest Accepted! 🎉'}
              </DialogTitle>
              <DialogDescription className="leading-relaxed text-pretty">
                {"Adventure awaits — you've got this. Go make it happen!"}
              </DialogDescription>
            </DialogHeader>

            <p className="w-full rounded-md bg-muted px-4 py-3 font-serif text-base font-medium text-foreground text-balance">
              {acceptedTitleRef.current}
            </p>

            <DialogFooter className="w-full sm:justify-center">
              <DialogClose render={<Button className="w-full sm:w-auto" />}>
                Done
              </DialogClose>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
