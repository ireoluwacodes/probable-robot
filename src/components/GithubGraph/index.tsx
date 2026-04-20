'use client'

import { motion, useInView } from "framer-motion"
import { GitHubCalendar } from "react-github-calendar"
import { useRef } from "react"
import { IGithubGraphProps } from "./@types"

const contributionTheme = {
  light: ["var(--color-muted)", "#b2ded4", "#6cc4b2", "#2fa88e", "var(--color-primary)"],
  dark: ["var(--color-muted)", "#b2ded4", "#6cc4b2", "#2fa88e", "var(--color-primary)"],
}

export function GithubGraph({ username = "ireoluwacodes" }: IGithubGraphProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="github" className="py-16 sm:py-20 md:py-28 border-t border-border">
      <div className="container px-4 sm:px-6" ref={ref}>
        <motion.div
          className="mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium mb-2">github activity</h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            contributions on @{username}
          </p>
        </motion.div>

        <motion.div
          className="overflow-x-auto scrollbar-hide rounded-lg border border-border bg-card p-4 sm:p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <GitHubCalendar
            username={username}
            colorScheme="light"
            theme={contributionTheme}
            fontSize={13}
            labels={{
              totalCount: "{{count}} contributions in the last year",
            }}
          />
        </motion.div>
      </div>
    </section>
  )
}
