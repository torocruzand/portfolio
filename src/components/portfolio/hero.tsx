import { motion, useScroll, useTransform } from "framer-motion"
import { useI18n } from "@/lib/i18n"
import { ArrowDown } from "lucide-react"

function AnimatedText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ")
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.8,
              delay: delay + i * 0.06,
              ease: [0.25, 0.4, 0.25, 1],
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export function Hero() {
  const { t } = useI18n()
  const { scrollYProgress } = useScroll()

  const y = useTransform(scrollYProgress, [0, 0.3], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.25], [1, 0.95])

  return (
    <section
      id="hero"
      className="relative flex min-h-svh items-center justify-center overflow-hidden px-6"
    >
      {/* Subtle grid background */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Floating accent orbs */}
      <motion.div
        className="pointer-events-none absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-accent/5 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="pointer-events-none absolute -left-32 bottom-1/4 h-64 w-64 rounded-full bg-accent/3 blur-3xl"
        animate={{
          x: [0, -20, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 mx-auto max-w-4xl text-center"
      >
        {/* Greeting line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-block rounded-full border border-border/50 bg-secondary/50 px-4 py-1.5 text-sm tracking-widest text-muted-foreground">
            {t("hero.greeting")}
          </span>
        </motion.div>

        {/* Name */}
        <h1 className="mb-4 text-5xl font-serif font-semibold leading-tight tracking-tight text-foreground sm:text-7xl lg:text-8xl">
          <AnimatedText text={t("hero.name")} delay={0.4} />
        </h1>

        {/* Role */}
        <div className="mb-8 overflow-hidden">
          <motion.p
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-xl tracking-wide text-accent sm:text-2xl"
          >
            {t("hero.role")}
          </motion.p>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mx-auto mb-12 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {t("hero.tagline")}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <motion.button
            onClick={() => {
              const el = document.getElementById("projects")
              if (el) el.scrollIntoView({ behavior: "smooth" })
            }}
            className="group relative inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground px-8 py-3.5 text-sm font-medium tracking-wide text-background transition-all hover:bg-foreground/90"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {t("hero.cta")}
            <motion.span
              className="inline-block"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            >
              {"->"}
            </motion.span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-xs tracking-widest text-muted-foreground/60 uppercase">
          {t("hero.scroll")}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4 text-muted-foreground/40" />
        </motion.div>
      </motion.div>
    </section>
  )
}
