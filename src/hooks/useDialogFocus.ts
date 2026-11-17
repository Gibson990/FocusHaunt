// Real dialog focus management for the M1 lesson.
//
// Broken mode (the defect): on open, focus is NOT moved into the dialog — it
// stays on the opener (focus left behind). Tab is not contained.
// Repaired mode (after the correct bundled repair): on open, focus moves to the
// Name input; Tab/Shift+Tab wrap at both boundaries; Escape closes.
// Both modes restore focus to the opener on close and report the REAL
// document.activeElement for observation.

import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'
import { describeElement, firstFocusable, getFocusable } from '../lib/focus'

interface UseDialogFocusOptions<T extends HTMLElement, U extends HTMLElement> {
  open: boolean
  containerRef: RefObject<T>
  openerRef: RefObject<U>
  /** true = repaired (initial focus + Tab containment); false = broken (focus left behind, no containment). */
  repaired: boolean
  onClose: () => void
  onObserved: (description: string | null) => void
}

export function useDialogFocus<T extends HTMLElement, U extends HTMLElement>({
  open,
  containerRef,
  openerRef,
  repaired,
  onClose,
  onObserved,
}: UseDialogFocusOptions<T, U>) {
  const wasOpen = useRef(false)
  const inerted = useRef<HTMLElement[]>([])
  const onCloseRef = useRef(onClose)
  const onObservedRef = useRef(onObserved)
  onCloseRef.current = onClose
  onObservedRef.current = onObserved

  const restoreBackground = () => {
    inerted.current.forEach((element) => element.removeAttribute('inert'))
    inerted.current = []
  }

  const makeBackgroundInert = (container: HTMLElement) => {
    restoreBackground()
    let current: HTMLElement = container
    while (current.parentElement && current.parentElement !== document.body) {
      const parent = current.parentElement
      Array.from(parent.children).forEach((sibling) => {
        if (sibling !== current && sibling instanceof HTMLElement && !sibling.hasAttribute('inert')) {
          sibling.setAttribute('inert', '')
          inerted.current.push(sibling)
        }
      })
      current = parent
    }
  }

  // Move focus on open (repaired only); restore to the opener on close.
  useEffect(() => {
    const container = containerRef.current
    if (open && !wasOpen.current) {
      wasOpen.current = true
      if (repaired && container) {
        makeBackgroundInert(container)
        const nameInput = container.querySelector<HTMLInputElement>('input[name="name"]')
        ;(nameInput ?? firstFocusable(container))?.focus()
      }
      // broken: leave focus where it is (on the opener) — the defect.
      onObservedRef.current(describeElement(document.activeElement))
    } else if (!open && wasOpen.current) {
      wasOpen.current = false
      restoreBackground()
      openerRef.current?.focus()
      onObservedRef.current(null)
    }
    // containerRef/openerRef are stable refs; repaired drives the open behavior.
    return () => {
      if (open && repaired) restoreBackground()
    }
  }, [open, repaired, containerRef, openerRef])

  // Escape closes; Tab is contained only when repaired.
  useEffect(() => {
    if (!open) return
    const handler = (event: KeyboardEvent) => {
      const container = containerRef.current
      if (!container) return
      if (event.key === 'Escape') {
        event.preventDefault()
        onCloseRef.current()
        return
      }
      if (event.key === 'Tab' && repaired) {
        const list = getFocusable(container)
        if (list.length === 0) return
        const first = list[0]
        const last = list[list.length - 1]
        const active = document.activeElement
        if (event.shiftKey && active === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && active === last) {
          event.preventDefault()
          first.focus()
        } else if (!container.contains(active)) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, repaired, containerRef])

  // Report the real activeElement while the fixture is open.
  useEffect(() => {
    if (!open) return
    const report = () => onObservedRef.current(describeElement(document.activeElement))
    report()
    document.addEventListener('focusin', report)
    return () => document.removeEventListener('focusin', report)
  }, [open])
}
