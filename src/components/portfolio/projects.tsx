import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useI18n } from "@/lib/i18n"
import { fadeInUp } from "@/lib/animations"
import { SectionHeading } from "./section-heading"
import { ExternalLink, Github, Download } from "lucide-react"

interface Project {
  id: number
  titleKey: string
  descKey: string
  tags: string[]
  categories: string[]
  image: string
  web?: string
  github?: string
  download?: string
}

const projects: Project[] = [
  {
    id: 1,
    titleKey: "project1.title",
    descKey: "project1.description",
    tags: ["LiveCode", "LiveCode Script"],
    categories: ["Library", "Development"],
    image: "/projects/photon-json.jpg",
    download: "https://github.com/Ferruslogic/PhotonJSON/archive/refs/tags/v1.2.4.zip",
    github: "https://github.com/Ferruslogic/PhotonJSON/",
  },
  {
    id: 2,
    titleKey: "project2.title",
    descKey: "project2.description",
    tags: ["LiveCode", "LiveCode Script"],
    categories: ["Plugin", "Development"],
    image: "/projects/drag-drop-ide.jpg",
    download: "https://github.com/Ferruslogic/frlDragDropFilesIntoIDE/archive/refs/tags/v1.1.1.zip",
    github: "https://github.com/Ferruslogic/frlDragDropFilesIntoIDE/",
  },
  {
    id: 3,
    titleKey: "project3.title",
    descKey: "project3.description",
    tags: ["LiveCode", "LiveCode Script"],
    categories: ["Library", "Development"],
    image: "/projects/tiny-color.jpg",
    download: "https://github.com/Ferruslogic/TinyColor/archive/refs/tags/v1.0.0.zip",
    github: "https://github.com/Ferruslogic/TinyColor",
  },
  {
    id: 4,
    titleKey: "project4.title",
    descKey: "project4.description",
    tags: ["LiveCode", "LiveCode Script"],
    categories: ["Library", "Development"],
    image: "/projects/touch-gestures.jpg",
    github: "https://github.com/Ferruslogic/touchGestures",
  },
  {
    id: 5,
    titleKey: "project5.title",
    descKey: "project5.description",
    tags: ["LiveCode", "LiveCode Script"],
    categories: ["Plugin", "Development"],
    image: "/projects/dev-guides.jpg",
    download: "https://github.com/Ferruslogic/DevGuides/archive/refs/tags/v1.0.6.zip",
    github: "https://github.com/Ferruslogic/DevGuides",
  },
  {
    id: 6,
    titleKey: "project6.title",
    descKey: "project6.description",
    tags: ["LiveCode", "LiveCode Script"],
    categories: ["App", "Windows"],
    image: "/projects/accreditation-uho.jpg",
    web: "https://cesoftad.uho.edu.cu/producto/123",
  },
  {
    id: 7,
    titleKey: "project7.title",
    descKey: "project7.description",
    tags: ["PHPBB", "CSS", "HTML", "PHP", "JavaScript"],
    categories: ["Deployment", "Support"],
    image: "/projects/forum-uho.jpg",
    web: "https://foros.uho.edu.cu/",
  },
  {
    id: 8,
    titleKey: "project8.title",
    descKey: "project8.description",
    tags: ["LiveCode", "LiveCode Script"],
    categories: ["App", "Android"],
    image: "/projects/dictionary-marti.jpg",
    web: "https://cesoftad.uho.edu.cu/producto/168",
  },
]

const allCategories = ["All", "Library", "Plugin", "App", "Deployment"]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t } = useI18n()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.article
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      custom={0.05 * index}
      layout
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card transition-all duration-500 hover:border-accent/20 hover:shadow-xl hover:shadow-accent/5">
        {/* Project image */}
        <div className="relative h-56 overflow-hidden sm:h-64">
          <img
            src={project.image || "/placeholder.svg"}
            alt={t(project.titleKey)}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {/* Overlay on hover */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-foreground/60 backdrop-blur-sm"
          />
          {/* Floating category badges on hover */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="absolute left-4 top-4 flex flex-wrap gap-2"
          >
            {project.categories.map((cat) => (
              <span
                key={cat}
                className="rounded-full bg-background/90 px-3 py-1 text-xs font-medium tracking-wide text-foreground"
              >
                {cat}
              </span>
            ))}
          </motion.div>
          {/* Project number */}
          <div className="absolute bottom-4 right-4">
            <span className="text-6xl font-serif font-bold text-background/20">
              {String(project.id).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <h3 className="mb-3 text-xl font-serif font-semibold text-foreground sm:text-2xl">
            {t(project.titleKey)}
          </h3>
          <p className="mb-6 text-sm leading-relaxed text-muted-foreground line-clamp-3">
            {t(project.descKey)}
          </p>

          {/* Tags */}
          <div className="mb-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border/50 bg-secondary/50 px-3 py-1 text-xs tracking-wide text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {project.web && (
              <motion.a
                href={project.web}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
                whileHover={{ x: 4 }}
              >
                {t("projects.viewProject")}
                <ExternalLink className="h-3.5 w-3.5" />
              </motion.a>
            )}
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                whileHover={{ x: 4 }}
              >
                {t("projects.viewCode")}
                <Github className="h-3.5 w-3.5" />
              </motion.a>
            )}
            {project.download && (
              <motion.a
                href={project.download}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                whileHover={{ x: 4 }}
              >
                {t("projects.download")}
                <Download className="h-3.5 w-3.5" />
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export function Projects() {
  const { t } = useI18n()
  const [activeFilter, setActiveFilter] = useState("All")

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.categories.includes(activeFilter))

  return (
    <section id="projects" className="relative px-6 py-32 lg:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading label={t("projects.label")} title={t("projects.title")} />

        {/* Filter bar */}
        <div className="mb-12 flex flex-wrap justify-center gap-2">
          {allCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveFilter(cat)}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition-all duration-300 ${
                activeFilter === cat
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border/50 bg-card text-muted-foreground hover:border-accent/30 hover:text-foreground"
              }`}
            >
              {cat === "All" ? t("projects.all") : cat}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="grid gap-8 md:grid-cols-2"
          >
            {filteredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
