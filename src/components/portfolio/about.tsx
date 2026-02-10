"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useI18n } from "@/lib/i18n"
import { fadeInUp } from "@/lib/animations"
import { SectionHeading } from "./section-heading"

function StatCounter({ value, label, delay }: { value: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      custom={delay}
      className="text-center"
    >
      <motion.span
        className="block text-4xl font-serif font-semibold text-foreground sm:text-5xl"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: delay + 0.2, ease: [0.25, 0.4, 0.25, 1] }}
      >
        {value}
      </motion.span>
      <span className="mt-2 block text-sm tracking-wide text-muted-foreground">{label}</span>
    </motion.div>
  )
}

export function About() {
  const { t } = useI18n()

  return (
    <section id="about" className="relative px-6 py-32 lg:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading label={t("about.label")} title={t("about.title")} />

        <div className="grid gap-16 lg:grid-cols-5">
          {/* Text content */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {["about.p1", "about.p2", "about.p3"].map((key, i) => (
                <motion.p
                  key={key}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  custom={0.1 * (i + 1)}
                  className="text-base leading-relaxed text-muted-foreground lg:text-lg"
                >
                  {t(key)}
                </motion.p>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center lg:col-span-2">
            <div className="grid w-full grid-cols-3 gap-8">
              <StatCounter value="10+" label={t("about.years")} delay={0.2} />
              <StatCounter value="300+" label={t("about.projects")} delay={0.3} />
              <StatCounter value="20+" label={t("about.clients")} delay={0.4} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
