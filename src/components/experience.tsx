'use client'

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const experiences = [
  {
    company: "Davkart",
    role: "Backend Engineer",
    description: "Built core APIs with NestJS microservices, improving system efficiency by 30%.",
  },
  {
    company: "Dathway",
    role: "Frontend Engineer",
    description: "Migrated Twilio chat to WebSocket solution, enhancing message speed.",
  },
  {
    company: "Oatek Concepts",
    role: "Intern",
    description: "Contributed to projects like Joatech, NoveLT, and Owodee, improving frontend performance and design quality.",
  },
]

export function Experience() {
  return (
    <section id="experience" className="py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center space-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Experience</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            My professional journey and the roles I've taken on.
          </p>
        </motion.div>
        <div className="grid gap-6 mt-12 md:grid-cols-1 lg:grid-cols-3">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{exp.role}</CardTitle>
                  <CardDescription>{exp.company}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{exp.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
