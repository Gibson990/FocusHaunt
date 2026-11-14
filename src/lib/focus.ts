// Focus management utilities for the M1 real lesson.
//
// Implementation helpers: the app genuinely moves and contains focus. These
// are NOT used to fake keyboard tests — acceptance tests use real Tab /
// Shift+Tab / Escape / close / reset and read document.activeElement.

/** Visible, enabled, focusable descendants of `container` in DOM order. */
export function getFocusable(container: HTMLElement): HTMLElement[] {
  const selector = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(',')

  return Array.from(container.querySelectorAll<HTMLElement>(selector)).filter(
    (el) => el.offsetParent !== null || el === document.activeElement,
  )
}

export function firstFocusable(container: HTMLElement): HTMLElement | null {
  return getFocusable(container)[0] ?? null
}

export function lastFocusable(container: HTMLElement): HTMLElement | null {
  const list = getFocusable(container)
  return list[list.length - 1] ?? null
}

/** A short, honest label for the real active element (the observed-focus
 * readout). Reads the DOM only; never fakes a highlight or a mode label. */
export function describeElement(el: Element | null): string | null {
  if (!el) return null
  const tag = el.tagName
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') {
    const name = (el as HTMLInputElement).name || (el as HTMLInputElement).id
    return name
      ? `${name[0].toUpperCase()}${name.slice(1)} ${tag.toLowerCase()}`
      : tag.toLowerCase()
  }
  if (tag === 'BUTTON') {
    const aria = el.getAttribute('aria-label')
    const text = el.textContent?.trim()
    return aria ?? text ?? 'button'
  }
  if (tag === 'A') {
    return el.textContent?.trim() || 'link'
  }
  return el.textContent?.trim() || tag.toLowerCase()
}
