"use client"

import { motion } from "framer-motion"
import { useI18n } from "@/lib/i18n"
import { fadeInUp } from "@/lib/animations"

export function Footer() {
  const { t } = useI18n()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border/30 px-6 py-12">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0}
        className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row"
      >
        <p className="text-sm text-muted-foreground">
          {t("footer.designed")}
        </p>
        <p className="text-sm text-muted-foreground/60">
          &copy; {year}. {t("footer.rights")}
        </p>
      </motion.div>
    </footer>
  )
}
