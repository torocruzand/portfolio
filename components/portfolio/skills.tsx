"use client"

import { motion } from "framer-motion"
import { useI18n } from "@/lib/i18n"
import { fadeInUp } from "@/lib/animations"
import { SectionHeading } from "./section-heading"

interface SkillCategory {
  labelKey: string
  skills: string[]
}

const skillCategories: SkillCategory[] = [
  {
    labelKey: "skills.frontend",
    skills: ["JavaScript", "TypeScript", "HTML5", "CSS3", "Tailwind CSS", "Vue JS", "Angular CLI", "Astro", "PHP", "CodeIgniter", "WordPress"],
  },
  {
    labelKey: "skills.backend",
    skills: ["LiveCode", ".NET Core", "C#", "SQL", "SQLite", "MySQL", "SQL Server", "REST APIs", "JSON", "XML"],
  },
  {
    labelKey: "skills.tools",
    skills: ["Git", "GitHub", "VS Code", "Visual Studio", "Android Studio", "SmartGit", "Stacked Git"],
  },
]

function SkillPill({ skill, index }: { skill: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.4,
        delay: index * 0.04,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      whileHover={{ scale: 1.05, y: -2 }}
      className="group relative cursor-default"
    >
      <div className="rounded-xl border border-border/50 bg-card px-5 py-3 text-sm tracking-wide text-foreground transition-all duration-300 hover:border-accent/30 hover:shadow-md hover:shadow-accent/5">
        {skill}
      </div>
    </motion.div>
  )
}

export function Skills() {
  const { t } = useI18n()

  return (
    <section id="skills" className="relative px-6 py-32 lg:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading label={t("skills.label")} title={t("skills.title")} />

        <div className="space-y-16">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.labelKey}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              custom={catIndex * 0.15}
            >
              <h3 className="mb-6 text-sm font-medium tracking-[0.2em] text-muted-foreground uppercase">
                {t(category.labelKey)}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, i) => (
                  <SkillPill
                    key={skill}
                    skill={skill}
                    index={catIndex * 8 + i}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
