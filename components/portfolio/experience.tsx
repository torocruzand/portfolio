"use client"

import { motion } from "framer-motion"
import { useI18n } from "@/lib/i18n"
import { fadeInUp } from "@/lib/animations"
import { SectionHeading } from "./section-heading"

const experiences = [
  { roleKey: "exp1.role", companyKey: "exp1.company", periodKey: "exp1.period", descKey: "exp1.description" },
  { roleKey: "exp2.role", companyKey: "exp2.company", periodKey: "exp2.period", descKey: "exp2.description" },
  { roleKey: "exp3.role", companyKey: "exp3.company", periodKey: "exp3.period", descKey: "exp3.description" },
  { roleKey: "exp4.role", companyKey: "exp4.company", periodKey: "exp4.period", descKey: "exp4.description" },
]

export function Experience() {
  const { t } = useI18n()

  return (
    <section id="experience" className="relative px-6 py-32 lg:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading label={t("experience.label")} title={t("experience.title")} />

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 bottom-0 hidden w-px bg-border/50 md:left-[200px] md:block lg:left-[240px]" />

          <div className="space-y-12 md:space-y-16">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.roleKey}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                custom={i * 0.1}
                className="group relative md:flex md:gap-12 lg:gap-16"
              >
                {/* Period - left side */}
                <div className="mb-3 shrink-0 md:mb-0 md:w-[188px] md:text-right lg:w-[228px]">
                  <span className="text-sm tracking-wide text-muted-foreground">
                    {t(exp.periodKey)}
                  </span>
                </div>

                {/* Timeline dot */}
                <div className="absolute left-[-4.5px] top-1.5 hidden md:left-[196px] md:block lg:left-[236px]">
                  <motion.div
                    className="h-2.5 w-2.5 rounded-full border-2 border-accent bg-background"
                    whileInView={{ scale: [0, 1.3, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 + 0.3 }}
                  />
                </div>

                {/* Content - right side */}
                <div className="flex-1 rounded-xl border border-transparent p-0 transition-all duration-500 md:p-0 group-hover:border-border/30">
                  <div className="md:pl-8">
                    <h3 className="text-lg font-semibold text-foreground">
                      {t(exp.roleKey)}
                    </h3>
                    <p className="mb-3 text-sm font-medium text-accent">
                      {t(exp.companyKey)}
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {t(exp.descKey)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
