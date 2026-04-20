import { ReactNode } from "react"

export type TTerminalNode = {
  name: string
  kind: "dir" | "file" | "link"
  path: string
  value?: string
}

export type TCommandResult = {
  content: ReactNode
  shouldClear?: boolean
  shouldClose?: boolean
}

export interface ICommandContext {
  cwd: string
  setCwd: (path: string) => void
  history: string[]
}

export type TCommand = (args: string[], context: ICommandContext) => TCommandResult

export interface IParsedCommand {
  raw: string
  name: string
  args: string[]
}

export interface IHistoryEntry {
  id: string
  cwd: string
  command: string
  output: ReactNode
}

export interface ICliProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export interface ICliToggleProps {
  triggerLabel?: string
}
