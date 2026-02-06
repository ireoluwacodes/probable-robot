'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
  { href: "#projects", label: "projects" },
  { href: "#contact", label: "contact" },
]

const PANEL_COUNT = 5

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
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

          {/* Desktop Navigation */}
          <nav className="hidden sm:flex items-center gap-4 sm:gap-6">
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

          {/* Hamburger / X - mobile only */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="sm:hidden relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-muted/50 transition-colors"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
            <div className="relative w-5 h-4">
              <motion.span
                className="absolute left-0 h-0.5 w-5 bg-foreground rounded-full origin-center top-0"
                initial={false}
                animate={menuOpen ? { y: 7, rotate: 45 } : { y: 0, rotate: 0 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              />
              <motion.span
                className="absolute left-0 top-[7px] h-0.5 w-5 bg-foreground rounded-full origin-center"
                initial={false}
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="absolute left-0 top-[14px] h-0.5 w-5 bg-foreground rounded-full origin-center"
                initial={false}
                animate={menuOpen ? { y: -7, rotate: -45 } : { y: 0, rotate: 0 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              />
            </div>
          </button>
        </div>
      </motion.header>

      {/* Mobile menu overlay - full screen with panel background */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 sm:hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={{
              closed: { pointerEvents: "none" },
              open: { pointerEvents: "auto" },
            }}
          >
            {/* Panels that form the full menu background - vertical bars animate from below, then settle to solid teal */}
            <div className="absolute inset-0 flex flex-row">
              {Array.from({ length: PANEL_COUNT }).map((_, i) => (
                <motion.div
                  key={i}
                  className="flex-1 min-w-0"
                  variants={{
                    closed: {
                      y: "100%",
                      backgroundColor: `oklch(${94 - i * 2}% 0.02 ${175 + i * 3} / 0.95)`,
                    },
                    open: {
                      y: 0,
                      backgroundColor: "oklch(55% 0.12 175)",
                      transition: {
                        y: {
                          delay: i * 0.05,
                          duration: 0.45,
                          ease: [0.32, 0.72, 0, 1],
                        },
                        backgroundColor: {
                          delay: i * 0.05 + 0.45,
                          duration: 0.3,
                        },
                      },
                    },
                  }}
                />
              ))}
            </div>

            {/* Nav links - displayed on top of the panels */}
            <motion.nav
              className="absolute inset-0 flex flex-col items-center justify-center gap-8"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                closed: { opacity: 0 },
                open: {
                  opacity: 1,
                  transition: { delay: PANEL_COUNT * 0.06 + 0.15, duration: 0.3 },
                },
              }}
            >
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: PANEL_COUNT * 0.06 + 0.2 + i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className="text-2xl font-medium text-primary-foreground hover:text-background transition-colors link-underline"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
