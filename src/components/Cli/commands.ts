import {
  bio,
  contactInfo,
  projects,
  resumeUrl,
  socialLinks,
  techStack,
} from "@/lib/portfolio-data"
import {
  ICommandContext,
  IParsedCommand,
  TCommand,
  TCommandResult,
  TTerminalNode,
} from "./@types"

const ROOT = "/"

const staticNodes: TTerminalNode[] = [
  { name: "projects", kind: "dir", path: "/projects" },
  { name: "about", kind: "dir", path: "/about" },
  { name: "contact", kind: "dir", path: "/contact" },
  { name: "github", kind: "link", path: "/github", value: "https://github.com/ireoluwacodes" },
  { name: "socials", kind: "dir", path: "/socials" },
  { name: "resume", kind: "link", path: "/resume", value: resumeUrl },
]

const getProjectNodes = (): TTerminalNode[] =>
  projects.map((project) => ({
    name: project.slug,
    kind: "dir",
    path: `/projects/${project.slug}`,
  }))

const getSocialNodes = (): TTerminalNode[] =>
  socialLinks.map((social) => ({
    name: social.label,
    kind: "link",
    path: `/socials/${social.label}`,
    value: social.href,
  }))

const getPathNodes = (cwd: string): TTerminalNode[] => {
  if (cwd === ROOT) return staticNodes
  if (cwd === "/projects") return getProjectNodes()
  if (cwd.startsWith("/projects/")) {
    return [{ name: "details.md", kind: "file", path: `${cwd}/details.md` }]
  }
  if (cwd === "/socials") return getSocialNodes()
  if (cwd === "/contact") return [{ name: "contact.md", kind: "file", path: "/contact/contact.md" }]
  if (cwd === "/about") return [{ name: "about.md", kind: "file", path: "/about/about.md" }]
  return []
}

const normalizePath = (cwd: string, input: string): string => {
  if (!input || input === "~") return ROOT
  if (input === "..") {
    if (cwd === ROOT) return ROOT
    const parts = cwd.split("/").filter(Boolean)
    parts.pop()
    return parts.length ? `/${parts.join("/")}` : ROOT
  }
  if (input === "/" || input === "~/" || input === "~") return ROOT
  if (input.startsWith("/")) return input
  return cwd === ROOT ? `/${input}` : `${cwd}/${input}`
}

const openNode = (target: string, cwd: string): string | null => {
  const input = target.trim()
  if (!input) return null
  if (/^https?:\/\//.test(input)) return input

  if (input === "resume") return resumeUrl
  const fromRoot = staticNodes.find((node) => node.name === input && node.value)
  if (fromRoot?.value) return fromRoot.value

  const project = projects.find((item) => item.slug === input)
  if (project) return project.href

  const social = socialLinks.find((item) => item.label === input)
  if (social) return social.href

  const nodes = getPathNodes(cwd)
  const fromCwd = nodes.find((node) => node.name === input && node.value)
  return fromCwd?.value ?? null
}

const commandMap: Record<string, TCommand> = {
  help: () => ({
    content:
      "available commands: help, ls, cd, pwd, cat, open, whoami, clear, theme, history, exit",
  }),
  ls: (_, context) => {
    const nodes = getPathNodes(context.cwd)
    if (!nodes.length) return { content: "empty directory" }
    return {
      content: nodes
        .map((node) => `${node.kind === "dir" ? node.name + "/" : node.name}`)
        .join("  "),
    }
  },
  cd: (args, context) => {
    if (!args[0]) {
      context.setCwd(ROOT)
      return { content: ROOT }
    }
    const targetPath = normalizePath(context.cwd, args[0])

    if (targetPath === ROOT || targetPath === "/projects" || targetPath === "/socials" || targetPath === "/about" || targetPath === "/contact") {
      context.setCwd(targetPath)
      return { content: targetPath }
    }

    const projectExists = projects.some((project) => targetPath === `/projects/${project.slug}`)
    if (projectExists) {
      context.setCwd(targetPath)
      return { content: targetPath }
    }

    return { content: `cd: no such directory: ${args[0]}` }
  },
  pwd: (_, context) => ({ content: context.cwd }),
  cat: (args, context) => {
    const target = args[0]
    if (!target) return { content: "cat: missing file operand" }

    if ((context.cwd === "/about" && target === "about.md") || target === "about.md") {
      return { content: bio }
    }

    if ((context.cwd === "/contact" && target === "contact.md") || target === "contact.md") {
      return {
        content: `email: ${contactInfo.email}\nlinkedin: ${socialLinks.find((link) => link.label === "linkedin")?.href ?? "n/a"}`,
      }
    }

    if (context.cwd.startsWith("/projects/") && (target === "details.md" || target.endsWith(".md"))) {
      const slug = context.cwd.split("/").pop()
      const project = projects.find((item) => item.slug === slug)
      if (!project) return { content: `cat: ${target}: no such file` }
      return {
        content: `${project.name}\n${project.description}\ntech: ${project.tech.join(", ")}\nurl: ${project.href}`,
      }
    }

    return { content: `cat: ${target}: no such file` }
  },
  open: (args, context) => {
    if (!args[0]) return { content: "open: missing target (project slug, social label, resume, or url)" }
    const url = openNode(args[0], context.cwd)
    if (!url) return { content: `open: cannot resolve target: ${args[0]}` }
    window.open(url, "_blank", "noopener,noreferrer")
    return { content: `opened ${url}` }
  },
  whoami: () => ({
    content: `ireoluwa - software engineer\nfocus: ${techStack.join(", ")}`,
  }),
  clear: () => ({
    content: "",
    shouldClear: true,
  }),
  theme: () => ({
    content: "theme tokens: --color-background, --color-foreground, --color-primary, --color-border",
  }),
  history: (_, context) => ({
    content: context.history.length ? context.history.join("\n") : "no history yet",
  }),
  exit: () => ({
    content: "closing cli...",
    shouldClose: true,
  }),
  close: () => ({
    content: "closing cli...",
    shouldClose: true,
  }),
}

export const parseCommand = (raw: string): IParsedCommand => {
  const parts = raw.trim().split(/\s+/).filter(Boolean)
  return {
    raw,
    name: (parts[0] ?? "").toLowerCase(),
    args: parts.slice(1),
  }
}

export const executeCommand = (parsed: IParsedCommand, context: ICommandContext): TCommandResult => {
  if (!parsed.name) return { content: "" }
  const command = commandMap[parsed.name]
  if (!command) return { content: `command not found: ${parsed.name}. try 'help'.` }
  return command(parsed.args, context)
}

export const getCommandNames = (): string[] => Object.keys(commandMap)

export const getAutocompleteValues = (cwd: string): string[] => {
  const pathNodes = getPathNodes(cwd).map((node) => node.name)
  return [...new Set([...getCommandNames(), ...pathNodes])]
}

export const getWelcomeMessage = (): string =>
  [
    "ireoluwa.ssh",
    "type 'help' to get started",
    "shortcut: ` or cmd/ctrl+k",
  ].join("\n")
