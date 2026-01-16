'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

const navItems = [
  { href: "#projects", label: "projects" },
  { href: "#contact", label: "contact" },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? "bg-background/80 backdrop-blur-sm border-b border-border" 
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-12 sm:h-14 items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link 
          href="/" 
          className="text-sm sm:text-base font-medium transition-colors"
        >
          <span className="text-foreground">ireoluwa</span>
          <span className="text-primary">.ssh</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-4 sm:gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors link-underline"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </motion.header>
  )
}
