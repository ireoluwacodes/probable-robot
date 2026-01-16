'use client'

import { motion } from "framer-motion"
import Image from "next/image"
import { HugeiconsIcon } from "@hugeicons/react"
import { GithubIcon, Mail01Icon, NewTwitterIcon, File02Icon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"

const socialLinks = [
  { icon: GithubIcon, href: "https://github.com/ireoluwacodes", label: "github" },
  { icon: Mail01Icon, href: "mailto:righteousnessakinbola@gmail.com", label: "mail" },
  { icon: NewTwitterIcon, href: "https://twitter.com/ireoluwa_codes", label: "twitter" },
]

export function Hero() {
  return (
    <section id="hero" className="relative min-h-[100dvh] flex items-center geometric-bg pt-14">
      {/* Floating geometric shapes - hidden on mobile for cleaner look */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
        {/* Large circle - top right */}
        <motion.div
          className="absolute -top-20 -right-20 w-60 md:w-80 h-60 md:h-80 rounded-full border border-geometric animate-float-slow"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        />
        
        {/* Small circle - bottom left */}
        <motion.div
          className="absolute bottom-32 left-8 md:left-16 w-16 md:w-24 h-16 md:h-24 rounded-full border border-geometric animate-float-medium"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        />
        
        {/* Triangle - right side */}
        <motion.svg
          className="absolute top-1/3 right-8 md:right-32 w-12 md:w-20 h-12 md:h-20 animate-float-slow"
          viewBox="0 0 100 100"
          initial={{ opacity: 0, rotate: -10 }}
          animate={{ opacity: 0.4, rotate: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <polygon 
            points="50,10 90,90 10,90" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1"
            className="text-geometric"
          />
        </motion.svg>
        
        {/* Rotated square - left side */}
        <motion.div
          className="absolute top-1/4 left-[15%] md:left-1/4 w-8 md:w-12 h-8 md:h-12 border border-geometric rotate-45 animate-float-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1, delay: 0.8 }}
        />
      </div>

      <div className="container relative z-10 px-4 sm:px-6">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Intro heading with memoji */}
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl font-medium text-foreground mb-4 sm:mb-6 flex flex-wrap items-center gap-2 sm:gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span>hello, i am</span>
            <span className="text-primary inline-flex items-center gap-2 sm:gap-3">
              ireoluwa
              <Image
                src="/ireoluwa.png"
                alt="ireoluwa memoji"
                width={56}
                height={56}
                className="w-10 sm:w-14 h-auto inline-block object-contain"
                priority
              />
            </span>
          </motion.h1>

          {/* Bio paragraph */}
          <motion.p
            className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            welcome to my corner of the internet! i&apos;m a software engineer passionate about 
            building impactful solutions. i enjoy crafting efficient web and mobile 
            applications that solve real problems.
          </motion.p>

          {/* Current work */}
          <motion.p
            className="text-sm sm:text-base text-muted-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            you&apos;ll mostly find me working with{" "}
            <span className="text-foreground">nestjs</span>,{" "}
            <span className="text-foreground">react</span>,{" "}
            <span className="text-foreground">python</span>, and{" "}
            <span className="text-foreground">go</span>.
          </motion.p>

          {/* Italic quote */}
          <motion.p
            className="text-primary italic mb-6 sm:mb-8 text-sm sm:text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            &ldquo;building software that makes a difference.&rdquo;
          </motion.p>

          {/* Social links */}
          <motion.div
            className="flex flex-wrap items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {socialLinks.map((social) => (
              <Button
                key={social.label}
                variant="outline"
                size="sm"
                className="gap-2 text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors text-xs sm:text-sm"
                asChild
              >
                <a href={social.href} target="_blank" rel="noopener noreferrer">
                  <HugeiconsIcon icon={social.icon} size={16} />
                  <span className="hidden xs:inline">{social.label}</span>
                </a>
              </Button>
            ))}
            
            {/* Resume link */}
            <Button
              variant="default"
              size="sm"
              className="gap-2 text-xs sm:text-sm"
              asChild
            >
              <a 
                href="https://docs.google.com/document/d/1JQqYFfl-KkD_96xa6CdkV-UhrS68I5sD1u9dGs4nMWI/edit?usp=sharing" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <HugeiconsIcon icon={File02Icon} size={16} />
                resume
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
