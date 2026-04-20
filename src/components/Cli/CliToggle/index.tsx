'use client'

import { useEffect, useState } from "react"
import { Cli } from "@/components/Cli"
import { ICliToggleProps } from "../@types"

export function CliToggle({ triggerLabel = ">_" }: ICliToggleProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isCommandPaletteShortcut =
        (event.metaKey || event.ctrlKey) &&
        (event.key.toLowerCase() === "k" || event.code === "KeyK") &&
        !event.shiftKey &&
        !event.altKey
      const isBacktickShortcut = event.key === "`" || event.code === "Backquote"
      if (!isCommandPaletteShortcut && !isBacktickShortcut) return
      event.preventDefault()
      event.stopPropagation()
      setOpen((prev) => !prev)
    }

    const onCliOpen = () => setOpen(true)

    // Capture phase improves reliability for shortcuts that browsers may otherwise intercept.
    window.addEventListener("keydown", onKeyDown, { capture: true })
    window.addEventListener("cli:open", onCliOpen as EventListener)
    return () => {
      window.removeEventListener("keydown", onKeyDown, { capture: true })
      window.removeEventListener("cli:open", onCliOpen as EventListener)
    }
  }, [])

  return (
    <>
      <button
        type="button"
        className="fixed bottom-5 right-5 z-50 rounded-full border border-border bg-card px-3 py-2 text-xs sm:text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
        onClick={() => setOpen(true)}
        aria-label="Open CLI drawer"
      >
        {triggerLabel}
      </button>
      <Cli open={open} onOpenChange={setOpen} />
    </>
  )
}
