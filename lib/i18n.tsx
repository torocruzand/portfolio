"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export type Locale = "en" | "es" | "pt"

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

const translations: Record<Locale, Record<string, string>> = {
  en: {
    // Nav
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.skills": "Skills",
    "nav.experience": "Experience",
    "nav.contact": "Contact",

    // Hero
    "hero.greeting": "Hello, I'm",
    "hero.name": "Andr\u00e9s",
    "hero.role": "Full-Stack Developer & Technology Educator",
    "hero.tagline": "Passionate about creating innovative solutions. Over a decade designing cross-platform and scalable applications, teaching courses, and collaborating on high-impact projects.",
    "hero.cta": "View my work",
    "hero.scroll": "Scroll to explore",

    // About
    "about.label": "About Me",
    "about.title": "Turning ideas into seamless digital experiences",
    "about.p1": "I'm a Full-Stack Software Developer passionate about creating innovative solutions. With more than a decade of experience, I've designed and maintained cross-platform and scalable applications, taught courses, and collaborated on high-impact projects.",
    "about.p2": "My approach combines technical depth with a love for teaching. I believe great software is built not only with clean code, but with a deep understanding of the people who will use it. From LiveCode to modern web frameworks, I bring versatility and dedication to every project.",
    "about.p3": "Based in Paran\u00e1, Brazil, I currently work as a Software Developer at LiveCode Ltd while continuing to explore new technologies and share knowledge with the developer community.",
    "about.years": "Years of Experience",
    "about.projects": "Projects Completed",
    "about.clients": "Technologies Mastered",

    // Projects
    "projects.label": "Selected Work",
    "projects.title": "Projects I'm proud of",
    "projects.viewProject": "View Project",
    "projects.viewCode": "Source Code",
    "projects.download": "Download",
    "projects.all": "All",
    "project1.title": "PhotonJSON",
    "project1.description": "LiveCode script library for working with JSON, written in LiveCode Script and without the use of externals. A lightweight and efficient solution for JSON parsing and generation.",
    "project2.title": "Drag Drop Files into IDE",
    "project2.description": "This plugin allows you to drag image, video, SVG and plain text files and import them into any of the LiveCode IDE's open windows. Streamlines the development workflow.",
    "project3.title": "TinyColor for LiveCode",
    "project3.description": "A LiveCode Script library based on Brian Grinstead's TinyColor v1.4.2 micro-framework. Translated into LiveCode Script by the FerrusLogic team for color manipulation and conversion.",
    "project4.title": "touchGestures",
    "project4.description": "A LiveCode Script library for handling finger gestures on a screen. Enables swipe, pinch, rotate and other touch interactions for mobile and tablet applications.",
    "project5.title": "DevGuides",
    "project5.description": "An extension to help LiveCode developers design their UI. Provides visual alignment guides, rulers, and grid overlays for precise interface design.",
    "project6.title": "University Accreditation Platform",
    "project6.description": "A product that collects the internal life of the University of Pedagogical Sciences \u201cJos\u00e9 de la Luz y Caballero\u201d. Built as a comprehensive Windows desktop application.",
    "project7.title": "University of Holgu\u00edn Forum",
    "project7.description": "University of Holgu\u00edn Forum Platform. Contributed to the deployment, configuration, and ongoing support of this academic discussion platform built with PHPBB.",
    "project8.title": "Dictionary of Mart\u00ed's Thought",
    "project8.description": "A mobile application presenting the enriched and contextualized content of the writer Ram\u00edro Vald\u00e9s Galarraga. Built for Android using LiveCode.",

    // Skills
    "skills.label": "Skills & Tech",
    "skills.title": "Technologies I work with",
    "skills.frontend": "Web Development",
    "skills.backend": "Cross-Platform & Backend",
    "skills.tools": "Tools & Workflow",

    // Experience
    "experience.label": "Experience",
    "experience.title": "My professional journey",
    "exp1.role": "Software Developer",
    "exp1.company": "LiveCode Ltd",
    "exp1.period": "2024 \u2014 Present",
    "exp1.description": "Developing cross-platform applications and contributing to the LiveCode ecosystem. Building scalable solutions and collaborating with an international team on high-impact products.",
    "exp2.role": "Freelance Developer",
    "exp2.company": "Independent",
    "exp2.period": "2019 \u2014 2024",
    "exp2.description": "Delivered 300+ projects for diverse clients, building cross-platform desktop apps, web applications, and multimedia solutions. Specialized in LiveCode, .NET Core, and modern web technologies.",
    "exp3.role": "Programmer & Professor",
    "exp3.company": "CESOFTAD, University of Holgu\u00edn",
    "exp3.period": "2016 \u2014 2019",
    "exp3.description": "Taught software development courses and built educational platforms. Developed and maintained academic systems including OJS/OMP journal management. Combined teaching with hands-on development.",
    "exp4.role": "Student Developer",
    "exp4.company": "CESOFTAD",
    "exp4.period": "2012 \u2014 2014",
    "exp4.description": "Started my development journey building applications and learning multiple programming languages. Gained foundational expertise in LiveCode, web technologies, and database management.",

    // Contact
    "contact.label": "Get In Touch",
    "contact.title": "Let's build something great together",
    "contact.description": "I'm always open to new opportunities, collaborations, or just a friendly chat about technology, education, and innovative solutions.",
    "contact.name": "Your Name",
    "contact.email": "Your Email",
    "contact.message": "Your Message",
    "contact.send": "Send Message",
    "contact.sending": "Sending...",
    "contact.sent": "Message sent!",
    "contact.orReach": "Or reach me directly at",

    // Footer
    "footer.designed": "Designed & Built by Andr\u00e9s",
    "footer.rights": "All rights reserved.",
  },
  es: {
    // Nav
    "nav.about": "Sobre m\u00ed",
    "nav.projects": "Proyectos",
    "nav.skills": "Habilidades",
    "nav.experience": "Experiencia",
    "nav.contact": "Contacto",

    // Hero
    "hero.greeting": "Hola, soy",
    "hero.name": "Andr\u00e9s",
    "hero.role": "Desarrollador Full-Stack & Educador Tecnol\u00f3gico",
    "hero.tagline": "Apasionado por crear soluciones innovadoras. M\u00e1s de una d\u00e9cada dise\u00f1ando aplicaciones multiplataforma y escalables, impartiendo cursos y colaborando en proyectos de alto impacto.",
    "hero.cta": "Ver mi trabajo",
    "hero.scroll": "Despl\u00e1zate para explorar",

    // About
    "about.label": "Sobre M\u00ed",
    "about.title": "Convirtiendo ideas en experiencias digitales fluidas",
    "about.p1": "Soy un Desarrollador de Software Full-Stack apasionado por crear soluciones innovadoras. Con m\u00e1s de una d\u00e9cada de experiencia, he dise\u00f1ado y mantenido aplicaciones multiplataforma y escalables, impartido cursos y colaborado en proyectos de alto impacto.",
    "about.p2": "Mi enfoque combina la profundidad t\u00e9cnica con la pasi\u00f3n por ense\u00f1ar. Creo que un gran software se construye no solo con c\u00f3digo limpio, sino con una comprensi\u00f3n profunda de las personas que lo usar\u00e1n. Desde LiveCode hasta frameworks web modernos, aporto versatilidad y dedicaci\u00f3n a cada proyecto.",
    "about.p3": "Resido en Paran\u00e1, Brasil, y actualmente trabajo como Desarrollador de Software en LiveCode Ltd mientras contin\u00fao explorando nuevas tecnolog\u00edas y compartiendo conocimiento con la comunidad de desarrolladores.",
    "about.years": "A\u00f1os de Experiencia",
    "about.projects": "Proyectos Completados",
    "about.clients": "Tecnolog\u00edas Dominadas",

    // Projects
    "projects.label": "Trabajo Seleccionado",
    "projects.title": "Proyectos de los que estoy orgulloso",
    "projects.viewProject": "Ver Proyecto",
    "projects.viewCode": "C\u00f3digo Fuente",
    "projects.download": "Descargar",
    "projects.all": "Todos",
    "project1.title": "PhotonJSON",
    "project1.description": "Librer\u00eda de scripts LiveCode para trabajar con JSON, escrita en LiveCode Script y sin el uso de externos. Una soluci\u00f3n ligera y eficiente para el an\u00e1lisis y generaci\u00f3n de JSON.",
    "project2.title": "Drag Drop Files into IDE",
    "project2.description": "Este plugin permite arrastrar archivos de imagen, video, SVG y texto plano e importarlos en cualquiera de las ventanas abiertas del IDE de LiveCode. Agiliza el flujo de desarrollo.",
    "project3.title": "TinyColor para LiveCode",
    "project3.description": "Una librer\u00eda de LiveCode Script basada en el micro-framework TinyColor v1.4.2 de Brian Grinstead. Traducida a LiveCode Script por el equipo de FerrusLogic para la manipulaci\u00f3n y conversi\u00f3n de colores.",
    "project4.title": "touchGestures",
    "project4.description": "Una librer\u00eda de LiveCode Script para manejar gestos t\u00e1ctiles en una pantalla. Habilita interacciones de deslizar, pellizcar, rotar y otros gestos para aplicaciones m\u00f3viles y tablets.",
    "project5.title": "DevGuides",
    "project5.description": "Una extensi\u00f3n para ayudar a los desarrolladores de LiveCode a dise\u00f1ar su UI. Proporciona gu\u00edas de alineaci\u00f3n visual, reglas y superposiciones de cuadr\u00edcula para un dise\u00f1o de interfaz preciso.",
    "project6.title": "Plataforma de Acreditaci\u00f3n Universitaria",
    "project6.description": "Producto que recoge la vida interna de la Universidad de Ciencias Pedag\u00f3gicas \u201cJos\u00e9 de la Luz y Caballero\u201d. Construido como una aplicaci\u00f3n de escritorio integral para Windows.",
    "project7.title": "Foro de la Universidad de Holgu\u00edn",
    "project7.description": "Plataforma de foros de la Universidad de Holgu\u00edn. Contribu\u00ed en el despliegue, configuraci\u00f3n y soporte continuo de esta plataforma de discusi\u00f3n acad\u00e9mica construida con PHPBB.",
    "project8.title": "Diccionario del Pensamiento Martiano",
    "project8.description": "Una aplicaci\u00f3n m\u00f3vil que presenta el contenido enriquecido y contextualizado del escritor Ram\u00edro Vald\u00e9s Galarraga. Construida para Android usando LiveCode.",

    // Skills
    "skills.label": "Habilidades y Tecnolog\u00edas",
    "skills.title": "Tecnolog\u00edas con las que trabajo",
    "skills.frontend": "Desarrollo Web",
    "skills.backend": "Multiplataforma & Backend",
    "skills.tools": "Herramientas y Flujo de Trabajo",

    // Experience
    "experience.label": "Experiencia",
    "experience.title": "Mi trayectoria profesional",
    "exp1.role": "Desarrollador de Software",
    "exp1.company": "LiveCode Ltd",
    "exp1.period": "2024 \u2014 Presente",
    "exp1.description": "Desarrollando aplicaciones multiplataforma y contribuyendo al ecosistema LiveCode. Construyendo soluciones escalables y colaborando con un equipo internacional en productos de alto impacto.",
    "exp2.role": "Desarrollador Freelance",
    "exp2.company": "Independiente",
    "exp2.period": "2019 \u2014 2024",
    "exp2.description": "Entregu\u00e9 m\u00e1s de 300 proyectos para clientes diversos, construyendo aplicaciones de escritorio multiplataforma, aplicaciones web y soluciones multimedia. Especializado en LiveCode, .NET Core y tecnolog\u00edas web modernas.",
    "exp3.role": "Programador y Profesor",
    "exp3.company": "CESOFTAD, Universidad de Holgu\u00edn",
    "exp3.period": "2016 \u2014 2019",
    "exp3.description": "Impart\u00ed cursos de desarrollo de software y constru\u00ed plataformas educativas. Desarroll\u00e9 y mantuve sistemas acad\u00e9micos incluyendo gesti\u00f3n de revistas OJS/OMP. Combin\u00e9 la ense\u00f1anza con el desarrollo pr\u00e1ctico.",
    "exp4.role": "Desarrollador Estudiante",
    "exp4.company": "CESOFTAD",
    "exp4.period": "2012 \u2014 2014",
    "exp4.description": "Comenc\u00e9 mi trayectoria en desarrollo construyendo aplicaciones y aprendiendo m\u00faltiples lenguajes de programaci\u00f3n. Adquir\u00ed experiencia fundamental en LiveCode, tecnolog\u00edas web y gesti\u00f3n de bases de datos.",

    // Contact
    "contact.label": "Contacto",
    "contact.title": "Construyamos algo grandioso juntos",
    "contact.description": "Siempre estoy abierto a nuevas oportunidades, colaboraciones o simplemente una charla amigable sobre tecnolog\u00eda, educaci\u00f3n y soluciones innovadoras.",
    "contact.name": "Tu Nombre",
    "contact.email": "Tu Email",
    "contact.message": "Tu Mensaje",
    "contact.send": "Enviar Mensaje",
    "contact.sending": "Enviando...",
    "contact.sent": "\u00a1Mensaje enviado!",
    "contact.orReach": "O cont\u00e1ctame directamente en",

    // Footer
    "footer.designed": "Dise\u00f1ado y Construido por Andr\u00e9s",
    "footer.rights": "Todos los derechos reservados.",
  },
  pt: {
    // Nav
    "nav.about": "Sobre",
    "nav.projects": "Projetos",
    "nav.skills": "Habilidades",
    "nav.experience": "Experi\u00eancia",
    "nav.contact": "Contato",

    // Hero
    "hero.greeting": "Ol\u00e1, eu sou",
    "hero.name": "Andr\u00e9s",
    "hero.role": "Desenvolvedor Full-Stack & Educador Tecnol\u00f3gico",
    "hero.tagline": "Apaixonado por criar solu\u00e7\u00f5es inovadoras. Mais de uma d\u00e9cada projetando aplica\u00e7\u00f5es multiplataforma e escal\u00e1veis, ministrando cursos e colaborando em projetos de alto impacto.",
    "hero.cta": "Ver meu trabalho",
    "hero.scroll": "Role para explorar",

    // About
    "about.label": "Sobre Mim",
    "about.title": "Transformando ideias em experi\u00eancias digitais fluidas",
    "about.p1": "Sou um Desenvolvedor de Software Full-Stack apaixonado por criar solu\u00e7\u00f5es inovadoras. Com mais de uma d\u00e9cada de experi\u00eancia, projetei e mantive aplica\u00e7\u00f5es multiplataforma e escal\u00e1veis, ministrei cursos e colaborei em projetos de alto impacto.",
    "about.p2": "Minha abordagem combina profundidade t\u00e9cnica com a paix\u00e3o por ensinar. Acredito que um grande software \u00e9 constru\u00eddo n\u00e3o apenas com c\u00f3digo limpo, mas com uma compreens\u00e3o profunda das pessoas que o utilizar\u00e3o. De LiveCode a frameworks web modernos, trago versatilidade e dedica\u00e7\u00e3o a cada projeto.",
    "about.p3": "Moro em Paran\u00e1, Brasil, e atualmente trabalho como Desenvolvedor de Software na LiveCode Ltd enquanto continuo explorando novas tecnologias e compartilhando conhecimento com a comunidade de desenvolvedores.",
    "about.years": "Anos de Experi\u00eancia",
    "about.projects": "Projetos Conclu\u00eddos",
    "about.clients": "Tecnologias Dominadas",

    // Projects
    "projects.label": "Trabalho Selecionado",
    "projects.title": "Projetos dos quais me orgulho",
    "projects.viewProject": "Ver Projeto",
    "projects.viewCode": "C\u00f3digo Fonte",
    "projects.download": "Baixar",
    "projects.all": "Todos",
    "project1.title": "PhotonJSON",
    "project1.description": "Biblioteca de scripts LiveCode para trabalhar com JSON, escrita em LiveCode Script e sem o uso de externos. Uma solu\u00e7\u00e3o leve e eficiente para an\u00e1lise e gera\u00e7\u00e3o de JSON.",
    "project2.title": "Drag Drop Files into IDE",
    "project2.description": "Este plugin permite arrastar arquivos de imagem, v\u00eddeo, SVG e texto simples e import\u00e1-los em qualquer janela aberta do IDE do LiveCode. Agiliza o fluxo de desenvolvimento.",
    "project3.title": "TinyColor para LiveCode",
    "project3.description": "Uma biblioteca LiveCode Script baseada no micro-framework TinyColor v1.4.2 de Brian Grinstead. Traduzida para LiveCode Script pela equipe FerrusLogic para manipula\u00e7\u00e3o e convers\u00e3o de cores.",
    "project4.title": "touchGestures",
    "project4.description": "Uma biblioteca LiveCode Script para lidar com gestos de toque na tela. Permite intera\u00e7\u00f5es de deslizar, pinch, rotacionar e outros gestos para aplica\u00e7\u00f5es m\u00f3veis e tablets.",
    "project5.title": "DevGuides",
    "project5.description": "Uma extens\u00e3o para ajudar desenvolvedores LiveCode a projetar sua UI. Fornece guias de alinhamento visual, r\u00e9guas e sobreposi\u00e7\u00f5es de grade para design de interface preciso.",
    "project6.title": "Plataforma de Credenciamento Universit\u00e1rio",
    "project6.description": "Produto que recolhe a vida interna da Universidade de Ci\u00eancias Pedag\u00f3gicas \u201cJos\u00e9 de la Luz y Caballero\u201d. Constru\u00eddo como uma aplica\u00e7\u00e3o desktop abrangente para Windows.",
    "project7.title": "F\u00f3rum da Universidade de Holgu\u00edn",
    "project7.description": "Plataforma de f\u00f3runs da Universidade de Holgu\u00edn. Contribu\u00ed para a implanta\u00e7\u00e3o, configura\u00e7\u00e3o e suporte cont\u00ednuo desta plataforma de discuss\u00e3o acad\u00eamica constru\u00edda com PHPBB.",
    "project8.title": "Dicion\u00e1rio do Pensamento Martiano",
    "project8.description": "Uma aplica\u00e7\u00e3o m\u00f3vel que apresenta o conte\u00fado enriquecido e contextualizado do escritor Ram\u00edro Vald\u00e9s Galarraga. Constru\u00edda para Android usando LiveCode.",

    // Skills
    "skills.label": "Habilidades e Tecnologias",
    "skills.title": "Tecnologias com as quais trabalho",
    "skills.frontend": "Desenvolvimento Web",
    "skills.backend": "Multiplataforma & Backend",
    "skills.tools": "Ferramentas e Fluxo de Trabalho",

    // Experience
    "experience.label": "Experi\u00eancia",
    "experience.title": "Minha jornada profissional",
    "exp1.role": "Desenvolvedor de Software",
    "exp1.company": "LiveCode Ltd",
    "exp1.period": "2024 \u2014 Presente",
    "exp1.description": "Desenvolvendo aplica\u00e7\u00f5es multiplataforma e contribuindo para o ecossistema LiveCode. Construindo solu\u00e7\u00f5es escal\u00e1veis e colaborando com uma equipe internacional em produtos de alto impacto.",
    "exp2.role": "Desenvolvedor Freelance",
    "exp2.company": "Independente",
    "exp2.period": "2019 \u2014 2024",
    "exp2.description": "Entreguei mais de 300 projetos para diversos clientes, construindo aplica\u00e7\u00f5es desktop multiplataforma, aplica\u00e7\u00f5es web e solu\u00e7\u00f5es multim\u00eddia. Especializado em LiveCode, .NET Core e tecnologias web modernas.",
    "exp3.role": "Programador e Professor",
    "exp3.company": "CESOFTAD, Universidade de Holgu\u00edn",
    "exp3.period": "2016 \u2014 2019",
    "exp3.description": "Ministrei cursos de desenvolvimento de software e constru\u00ed plataformas educacionais. Desenvolvi e mantive sistemas acad\u00eamicos incluindo gerenciamento de revistas OJS/OMP. Combinei o ensino com o desenvolvimento pr\u00e1tico.",
    "exp4.role": "Desenvolvedor Estudante",
    "exp4.company": "CESOFTAD",
    "exp4.period": "2012 \u2014 2014",
    "exp4.description": "Comecei minha jornada em desenvolvimento construindo aplica\u00e7\u00f5es e aprendendo m\u00faltiplas linguagens de programa\u00e7\u00e3o. Adquiri experi\u00eancia fundamental em LiveCode, tecnologias web e gerenciamento de banco de dados.",

    // Contact
    "contact.label": "Contato",
    "contact.title": "Vamos construir algo grandioso juntos",
    "contact.description": "Estou sempre aberto a novas oportunidades, colabora\u00e7\u00f5es ou apenas um bate-papo amig\u00e1vel sobre tecnologia, educa\u00e7\u00e3o e solu\u00e7\u00f5es inovadoras.",
    "contact.name": "Seu Nome",
    "contact.email": "Seu Email",
    "contact.message": "Sua Mensagem",
    "contact.send": "Enviar Mensagem",
    "contact.sending": "Enviando...",
    "contact.sent": "Mensagem enviada!",
    "contact.orReach": "Ou entre em contato diretamente em",

    // Footer
    "footer.designed": "Projetado e Constru\u00eddo por Andr\u00e9s",
    "footer.rights": "Todos os direitos reservados.",
  },
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en")

  const t = useCallback(
    (key: string): string => {
      return translations[locale][key] || translations.en[key] || key
    },
    [locale]
  )

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}
