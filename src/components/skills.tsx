'use client'

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

const skills = {
  Frontend: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js"],
  Backend: ["Node.js", "NestJS", "FastAPI", "Flask", "Go", "RabbitMQ", "WebSockets"],
  Database: ["PostgreSQL", "MongoDB"],
  Tools: ["Git", "GitHub", "Figma", "Postman", "Trello", "Notion", "Slack"],
}

export function Skills() {
  return (
    <section id="skills" className="py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center space-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Skills</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Here are the technologies and tools I work with to bring ideas to life.
          </p>
        </motion.div>
        <div className="grid gap-6 mt-12 md:grid-cols-2 lg:grid-cols-4">
          {Object.entries(skills).map(([category, techs], index) => (
            <motion.div
              key={category}
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {techs.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
