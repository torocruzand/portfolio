"use client"

import { motion } from "framer-motion"
import { fadeInUp, lineReveal } from "@/lib/animations"

interface SectionHeadingProps {
  label: string
  title: string
}

export function SectionHeading({ label, title }: SectionHeadingProps) {
  return (
    <div className="mb-16 lg:mb-20">
      <motion.span
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        custom={0}
        className="mb-4 inline-block text-xs font-medium tracking-[0.25em] text-accent uppercase"
      >
        {label}
      </motion.span>
      <motion.div
        variants={lineReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        custom={0.2}
        className="mb-6 h-px w-12 origin-left bg-accent"
      />
      <motion.h2
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        custom={0.1}
        className="text-3xl font-serif font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance"
      >
        {title}
      </motion.h2>
    </div>
  )
}
