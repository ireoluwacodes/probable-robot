'use client'

import { motion } from "framer-motion"

export function TechBlog() {
  return (
    <section id="tech-blog" className="py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center space-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Tech Blog</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Coming soon! Insights and tutorials on software development.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
