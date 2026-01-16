'use client'

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { Mail01Icon, GithubIcon, Linkedin01Icon, NewTwitterIcon } from "@hugeicons/core-free-icons"

const socialLinks = [
  { icon: GithubIcon, href: "https://github.com/ireoluwacodes", label: "github" },
  { icon: Linkedin01Icon, href: "https://linkedin.com/in/righteousness-akinbola-b4a479228", label: "linkedin" },
  { icon: NewTwitterIcon, href: "https://twitter.com/ireoluwa_codes", label: "twitter" },
]

export function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-28 border-t border-border">
      <div className="container px-4 sm:px-6" ref={ref}>
        <motion.div
          className="max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium mb-3 sm:mb-4">
            get in touch
          </h2>
          
          <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
            i&apos;m always interested in exploring new opportunities, collaborating, 
            or exchanging ideas. feel free to reach out if you&apos;d like to connect.
          </p>

          {/* Email button */}
          <motion.div
            className="mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Button
              asChild
              variant="outline"
              size="sm"
              className="gap-2 hover:border-primary hover:text-primary transition-colors text-xs sm:text-sm"
            >
              <a href="mailto:righteousnessakinbola@gmail.com">
                <HugeiconsIcon icon={Mail01Icon} size={14} className="sm:w-4 sm:h-4" />
                <span className="truncate">righteousnessakinbola@gmail.com</span>
              </a>
            </Button>
          </motion.div>

          {/* Social links */}
          <motion.div
            className="flex flex-wrap items-center gap-3 sm:gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors link-underline"
              >
                <span className="flex items-center gap-1.5 text-xs sm:text-sm">
                  <HugeiconsIcon icon={social.icon} size={14} className="sm:w-4 sm:h-4" />
                  {social.label}
                </span>
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
