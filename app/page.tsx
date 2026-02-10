"use client"

import { I18nProvider } from "@/lib/i18n"
import { Navigation } from "@/components/portfolio/navigation"
import { Hero } from "@/components/portfolio/hero"
import { About } from "@/components/portfolio/about"
import { Projects } from "@/components/portfolio/projects"
import { Skills } from "@/components/portfolio/skills"
import { Experience } from "@/components/portfolio/experience"
import { Contact } from "@/components/portfolio/contact"
import { Footer } from "@/components/portfolio/footer"
import { CustomCursor } from "@/components/portfolio/custom-cursor"
import { Particles } from "@/components/portfolio/particles"
import { ScrollProgress } from "@/components/portfolio/scroll-progress"

export default function Page() {
  return (
    <I18nProvider>
      <CustomCursor />
      <Particles />
      <ScrollProgress />
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </I18nProvider>
  )
}
