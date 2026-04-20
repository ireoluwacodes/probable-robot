'use client'

import { useEffect, useMemo, useRef, useState } from "react"
import { Drawer } from "vaul"
import { executeCommand, getAutocompleteValues, getWelcomeMessage, parseCommand } from "./commands"
import { ICliProps, IHistoryEntry } from "./@types"

const INITIAL_CWD = "/"

export function Cli({ open, onOpenChange }: ICliProps) {
  const [cwd, setCwd] = useState(INITIAL_CWD)
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<IHistoryEntry[]>([])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyCursor, setHistoryCursor] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  const commandHistoryValues = useMemo(() => commandHistory, [commandHistory])

  useEffect(() => {
    if (!open) {
      setCwd(INITIAL_CWD)
      setInput("")
      setHistory([])
      setHistoryCursor(-1)
      return
    }

    setHistory([
      {
        id: "welcome",
        cwd: INITIAL_CWD,
        command: "",
        output: getWelcomeMessage(),
      },
    ])
    requestAnimationFrame(() => inputRef.current?.focus())
  }, [open])

  useEffect(() => {
    if (!outputRef.current) return
    outputRef.current.scrollTop = outputRef.current.scrollHeight
  }, [history])

  const runCommand = () => {
    const raw = input.trim()
    if (!raw) return

    const parsed = parseCommand(raw)
    const result = executeCommand(parsed, {
      cwd,
      setCwd,
      history: commandHistoryValues,
    })

    if (!result.shouldClear) {
      setHistory((prev) => [
        ...prev,
        {
          id: `${Date.now()}-${prev.length}`,
          cwd,
          command: raw,
          output: result.content,
        },
      ])
    }

    if (result.shouldClear) {
      setHistory([])
    }

    setCommandHistory((prev) => [...prev, raw])
    setHistoryCursor(-1)
    setInput("")

    if (result.shouldClose) onOpenChange(false)
  }

  const autocompleteInput = () => {
    const values = getAutocompleteValues(cwd)
    const trimmed = input.trim()
    if (!trimmed) return
    const parts = trimmed.split(/\s+/)
    const activePart = parts[parts.length - 1]
    const match = values.find((value) => value.startsWith(activePart))
    if (!match) return
    parts[parts.length - 1] = match
    setInput(parts.join(" "))
  }

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault()
      runCommand()
      return
    }

    if (event.key === "Tab") {
      event.preventDefault()
      autocompleteInput()
      return
    }

    if (event.ctrlKey && event.key.toLowerCase() === "l") {
      event.preventDefault()
      setHistory([])
      setInput("")
      return
    }

    if (event.key === "ArrowUp") {
      event.preventDefault()
      if (!commandHistory.length) return
      const nextCursor = historyCursor < commandHistory.length - 1 ? historyCursor + 1 : historyCursor
      setHistoryCursor(nextCursor)
      setInput(commandHistory[commandHistory.length - 1 - nextCursor] ?? "")
      return
    }

    if (event.key === "ArrowDown") {
      event.preventDefault()
      if (!commandHistory.length) return
      const nextCursor = Math.max(-1, historyCursor - 1)
      setHistoryCursor(nextCursor)
      if (nextCursor === -1) {
        setInput("")
      } else {
        setInput(commandHistory[commandHistory.length - 1 - nextCursor] ?? "")
      }
    }
  }

  return (
    <Drawer.Root direction="bottom" open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-[60]" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 h-[85vh] rounded-t-xl outline-none z-[70] bg-[oklch(15%_0.02_270)] text-background flex flex-col border border-border/20">
          <div className="mx-auto mt-2 w-12 h-1.5 rounded-full bg-muted-foreground/40" />
          <div className="px-4 sm:px-6 py-3 border-b border-border/20 flex items-center justify-between font-mono text-xs sm:text-sm">
            <span>ireoluwa@portfolio - {cwd}</span>
            <button
              onClick={() => onOpenChange(false)}
              className="text-muted-foreground hover:text-background transition-colors"
              aria-label="Close terminal drawer"
            >
              close
            </button>
          </div>

          <div
            ref={outputRef}
            className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-3 font-mono text-xs sm:text-sm"
          >
            {history.map((entry) => (
              <div key={entry.id} className="space-y-1">
                {entry.command ? (
                  <p>
                    <span className="text-primary">ireoluwa@portfolio</span> {entry.cwd} $ {entry.command}
                  </p>
                ) : null}
                {entry.output ? (
                  <p className="text-muted whitespace-pre-wrap break-words">{entry.output}</p>
                ) : null}
              </div>
            ))}
          </div>

          <div className="px-4 sm:px-6 py-3 border-t border-border/20 font-mono text-xs sm:text-sm">
            <label className="flex items-center gap-2">
              <span className="text-primary shrink-0">ireoluwa@portfolio {cwd} $</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={onInputKeyDown}
                className="w-full bg-transparent outline-none text-background placeholder:text-muted-foreground/80"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                placeholder="type a command..."
              />
            </label>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
