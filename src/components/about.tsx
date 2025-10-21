'use client'

import { motion } from "framer-motion"

export function About() {
  return (
    <section id="about" className="py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center space-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Me</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            I am a passionate Software Engineer with a strong foundation in computer science from Bowen University, where I graduated with a B.Sc in Software Engineering and a remarkable CGPA of 4.85. My journey in tech is driven by an insatiable curiosity and a commitment to solving complex problems through elegant code.
          </p>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            I thrive on collaboration, adaptability, and continuous learning, always striving to build scalable, efficient, and user-friendly software systems that make a real impact.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
