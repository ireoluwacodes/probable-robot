export type TProject = {
  name: string
  slug: string
  description: string
  href: string
  tech: string[]
}

export type TSocialLink = {
  label: string
  href: string
}

export const projects: TProject[] = [
  {
    name: "orbit flashcards",
    slug: "orbit-flashcards",
    description:
      "ai-assisted flashcard backend with adaptive spaced repetition, pdf-to-card generation, secure cookie auth, protected routes, learning session reporting, and ai tutor-style explanations.",
    href: "https://orbitlearn.xyz",
    tech: ["typescript", "express", "mongodb"],
  },
  {
    name: "subby",
    slug: "subby",
    description:
      "subscription management backend featuring recurring bill splitting, wallet funding and transaction tracking, utility bill payment flows, and a zero-downtime payment gateway migration.",
    href: "https://mysubbyapp.com",
    tech: ["typescript", "express", "mongodb"],
  },
  {
    name: "dathway",
    slug: "dathway",
    description:
      "ai-powered learning platform helping individuals transition into tech careers with personalized learning paths and skill recommendations.",
    href: "https://dathway.com/",
    tech: ["nextjs", "redux", "typescript", "tailwind"],
  },
  {
    name: "davkart",
    slug: "davkart",
    description:
      "b2b marketplace empowering distributors and small businesses to streamline operations and connect with fmcg manufacturers.",
    href: "https://github.com/ireoluwacodes",
    tech: ["express", "nestjs", "typescript", "postgresql", "rabbitmq"],
  },
  {
    name: "curasphere",
    slug: "curasphere",
    description:
      "health center management system for bowen university streamlining appointments, vitals recording, and medical records.",
    href: "https://github.com/ireoluwacodes",
    tech: ["fastapi", "react", "zustand", "postgresql"],
  },
  {
    name: "bowen nacos",
    slug: "bowen-nacos",
    description:
      "university administrative platform with secure authentication and efficient object storage for seamless asset delivery.",
    href: "https://nacosbowen.org.ng/",
    tech: ["nestjs", "typescript", "mongodb"],
  },
]

export const socialLinks: TSocialLink[] = [
  { label: "github", href: "https://github.com/ireoluwacodes" },
  { label: "twitter", href: "https://twitter.com/ireoluwa_codes" },
  { label: "linkedin", href: "https://linkedin.com/in/righteousness-akinbola-b4a479228" },
]

export const contactInfo = {
  email: "righteousnessakinbola@gmail.com",
}

export const bio =
  "welcome to my corner of the internet! i'm a software engineer passionate about building impactful solutions. i enjoy crafting efficient web and mobile applications that solve real problems."

export const techStack = ["nestjs", "react", "python", "go"]

export const resumeUrl =
  "https://docs.google.com/document/d/1JQqYFfl-KkD_96xa6CdkV-UhrS68I5sD1u9dGs4nMWI/edit?usp=sharing"
