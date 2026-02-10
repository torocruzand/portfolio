"use client"

import React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useI18n } from "@/lib/i18n"
import { fadeInUp } from "@/lib/animations"
import { SectionHeading } from "./section-heading"
import { Send, Github, Linkedin, Twitter, Mail } from "lucide-react"

export function Contact() {
  const { t } = useI18n()
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormState("sending")
    setTimeout(() => {
      setFormState("sent")
      setTimeout(() => setFormState("idle"), 3000)
    }, 1500)
  }

  return (
    <section id="contact" className="relative px-6 py-32 lg:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading label={t("contact.label")} title={t("contact.title")} />

        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left - Description & Socials */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            custom={0.1}
          >
            <p className="mb-8 text-base leading-relaxed text-muted-foreground lg:text-lg">
              {t("contact.description")}
            </p>

            <div className="mb-8">
              <p className="mb-3 text-sm text-muted-foreground">
                {t("contact.orReach")}
              </p>
              <a
                href="mailto:torcruzand@gmail.com"
                className="inline-flex items-center gap-2 text-lg font-medium text-foreground transition-colors hover:text-accent"
              >
                <Mail className="h-5 w-5" />
                torcruzand@gmail.com
              </a>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4">
              {[
                { icon: Github, label: "GitHub", href: "https://github.com/torocruzand" },
                { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/torocruzand" },
                { icon: Twitter, label: "Twitter", href: "https://x.com/torocruzand" },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border/50 bg-card text-muted-foreground transition-all hover:border-accent/30 hover:text-accent hover:shadow-md hover:shadow-accent/5"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.form
            onSubmit={handleSubmit}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            custom={0.2}
            className="space-y-6"
          >
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
                {t("contact.name")}
              </label>
              <input
                id="name"
                type="text"
                required
                className="w-full rounded-xl border border-border/50 bg-card px-4 py-3 text-sm text-foreground placeholder-muted-foreground/50 outline-none transition-all focus:border-accent/50 focus:ring-2 focus:ring-accent/10"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                {t("contact.email")}
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full rounded-xl border border-border/50 bg-card px-4 py-3 text-sm text-foreground placeholder-muted-foreground/50 outline-none transition-all focus:border-accent/50 focus:ring-2 focus:ring-accent/10"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
                {t("contact.message")}
              </label>
              <textarea
                id="message"
                required
                rows={5}
                className="w-full resize-none rounded-xl border border-border/50 bg-card px-4 py-3 text-sm text-foreground placeholder-muted-foreground/50 outline-none transition-all focus:border-accent/50 focus:ring-2 focus:ring-accent/10"
                placeholder="Tell me about your project..."
              />
            </div>
            <motion.button
              type="submit"
              disabled={formState !== "idle"}
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-3.5 text-sm font-medium tracking-wide text-background transition-all hover:bg-foreground/90 disabled:opacity-70"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {formState === "sending" && t("contact.sending")}
              {formState === "sent" && t("contact.sent")}
              {formState === "idle" && (
                <>
                  {t("contact.send")}
                  <Send className="h-4 w-4" />
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
