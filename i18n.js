/**
 * i18n dictionary — EN / ES / PT-BR.
 * Copy mirrors the published torocruzand.com translations. Project names and
 * project descriptions stay in English, exactly as on the live site.
 *
 * Usage in HTML:
 *   data-i18n="key"            → element.textContent
 *   data-i18n-aria="key"       → aria-label
 */

export const LANGS = ['en', 'es', 'pt'];

export const dict = {
  en: {
    'meta.title': 'Andrés del Toro Cruz — Full-Stack Developer & Technology Educator · TOROCRUZAND',
    'meta.description': 'Portfolio of Andres del Toro Cruz (torocruzand), software developer with more than 12 years of experience in multiplatform and scalable applications.',
    'skip': 'Skip to content',

    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.experience': 'Experience',
    'nav.skills': 'Skills',
    'nav.contact': 'Contact',
    'nav.label': 'Primary',

    'hud.audio': 'Audio',
    'hud.audioAria': 'UI sound synthesis',
    'hud.theme': 'Blueprint',
    'hud.themeAria': 'Paper blueprint theme',
    'hud.terminal': 'Terminal',
    'hud.terminalAria': 'Open command terminal (Control or Command + K)',
    'hud.install': 'Install',
    'hud.installAria': 'Install this site as an app',
    'hud.lang': 'Language',
    'hud.status': 'SYS.NOMINAL',
    'hud.offline': 'OFFLINE · CACHED',

    'hero.greeting': "Hello, I'm",
    'hero.location': 'Paraná, Brazil',
    'hero.subtitle': 'Full-Stack Developer & Technology Educator',
    'hero.description': 'Passionate about creating innovative solutions. Over a decade designing cross-platform and scalable applications, teaching courses, and collaborating on high-impact projects.',
    'hero.viewWork': 'View My Work',
    'hero.getInTouch': 'Get In Touch',
    'spec.role': 'Role',
    'spec.now': 'Now',
    'spec.exp': 'Exp.',
    'spec.shipped': 'Shipped',
    'spec.stack': 'Stack',
    'spec.nowValue': 'Software Developer at LiveCode Ltd',

    'log.label': 'Boot log',
    'log.1': 'load profile: torocruzand',
    'log.2': 'mount projects: 8 public modules',
    'log.3': 'mount experience: 4 entries',
    'log.4': 'open channels: email · github · linkedin',
    'log.5': 'audio bus: muted (opt-in)',
    'log.6': 'ready. terminal: ⌘K or ~ · step: j / k',

    'about.tag': 'Get to know me',
    'about.title': 'About Me',
    'about.subtitle': 'Turning ideas into seamless digital experiences',
    'about.p1': "I'm a Full-Stack Software Developer passionate about creating innovative solutions. With more than a decade of experience, I've designed and maintained cross-platform and scalable applications, taught courses, and collaborated on high-impact projects.",
    'about.p2': 'My approach combines technical depth with a love for teaching. I believe great software is built not only with clean code, but with a deep understanding of the people who will use it. From LiveCode to modern web frameworks, I bring versatility and dedication to every project.',
    'about.p3': 'Based in Paraná, Brazil, I currently work as a Software Developer at LiveCode Ltd while continuing to explore new technologies and share knowledge with the developer community.',
    'about.stat1': 'Years of Experience',
    'about.stat2': 'Projects Completed',
    'about.stat3': 'Technologies Mastered',

    'projects.tag': 'My work',
    'projects.title': 'Featured Projects',
    'projects.lede': "Flip any module's switch to Spec to read its technologies, categories and links.",
    'projects.preview': 'Preview',
    'projects.spec': 'Spec',
    'projects.specAria': 'spec sheet mode',
    'projects.technologies': 'Technologies',
    'projects.categories': 'Categories',
    'projects.links': 'Links',
    'projects.github': 'GitHub',
    'projects.view': 'View',
    'projects.download': 'Download',

    'experience.tag': 'My journey',
    'experience.title': 'Professional Experience',
    'experience.present': 'Present',
    'experience.job1.title': 'Software Developer',
    'experience.job1.desc': 'Developing cross-platform applications and contributing to the LiveCode ecosystem. Building scalable solutions and collaborating with an international team on high-impact products.',
    'experience.job2.title': 'Freelance Developer',
    'experience.job2.company': 'Independent',
    'experience.job2.desc': 'Delivered 300+ projects for diverse clients, building cross-platform desktop apps, web applications, and multimedia solutions. Specialized in LiveCode, .NET Core, and modern web technologies.',
    'experience.job3.title': 'Programmer & Professor',
    'experience.job3.location': 'University of Holguín',
    'experience.job3.desc': 'Taught software development courses and built educational platforms. Developed and maintained academic systems including OJS/OMP journal management. Combined teaching with hands-on development.',
    'experience.job4.title': 'Student Developer',
    'experience.job4.desc': 'Started my development journey building applications and learning multiple programming languages. Gained foundational expertise in LiveCode, web technologies, and database management.',

    'skills.tag': 'What I work with',
    'skills.title': 'Skills & Technologies',
    'skills.technical': 'Technical Expertise',
    'skills.softSkills': 'Professional Skills & Methodologies',
    'skills.colGroup': 'Group',
    'skills.colTech': 'Technologies',
    'skills.colSkill': 'Skill',
    'skills.colDetail': 'Detail',
    'skills.r0': 'Frontend & Mobile',
    'skills.r1': 'Backend & Data',
    'skills.r2': 'Tools & Platforms',
    'skills.r3': 'AI-Augmented Development',
    'skills.teamwork': 'Teamwork & Collaboration',
    'skills.teamworkDesc': 'Cross-functional collaboration, mentoring, code reviews',
    'skills.agile': 'Agile Methodologies',
    'skills.agileDesc': 'Scrum, Kanban, iterative development, sprint planning',
    'skills.problemSolving': 'Problem Solving',
    'skills.problemSolvingDesc': 'Analytical thinking, debugging, optimization strategies',
    'skills.communication': 'Communication',
    'skills.communicationDesc': 'Technical documentation, teaching, stakeholder management',
    'skills.architecture': 'System Architecture',
    'skills.architectureDesc': 'Scalable design, microservices, design patterns',
    'skills.continuous': 'Continuous Learning',
    'skills.continuousDesc': 'Staying updated, adapting to new technologies',

    'contact.tag': "Let's connect",
    'contact.title': 'Get In Touch',
    'contact.description': "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out!",
    'contact.email': 'Email',
    'cv.download': 'Download CV',
    'cv.label': 'CV · PDF · 1 page',

    'footer.rights': 'All rights reserved.',
    'footer.built': 'HTML · CSS · JS — 0 dependencies',

    'toast.blueprint': 'Paper blueprint mode',
    'toast.carbon': 'Carbon telemetry mode',
    'toast.audioOn': 'Audio armed',
    'toast.audioOff': 'Audio muted',
    'toast.lang': 'Language: English',
    'toast.installed': 'Installed as an app',
    'toast.offline': 'Offline — serving cached copy',
    'toast.online': 'Back online',
  },

  es: {
    'meta.title': 'Andrés del Toro Cruz — Desarrollador Full-Stack & Educador Tecnológico · TOROCRUZAND',
    'meta.description': 'Portafolio de Andrés del Toro Cruz (torocruzand), desarrollador de software con más de 12 años de experiencia en aplicaciones multiplataforma y escalables.',
    'skip': 'Saltar al contenido',

    'nav.about': 'Sobre mí',
    'nav.projects': 'Proyectos',
    'nav.experience': 'Experiencia',
    'nav.skills': 'Habilidades',
    'nav.contact': 'Contacto',
    'nav.label': 'Principal',

    'hud.audio': 'Audio',
    'hud.audioAria': 'Sonidos de interfaz',
    'hud.theme': 'Plano',
    'hud.themeAria': 'Tema plano en papel',
    'hud.terminal': 'Terminal',
    'hud.terminalAria': 'Abrir terminal de comandos (Control o Comando + K)',
    'hud.install': 'Instalar',
    'hud.installAria': 'Instalar este sitio como aplicación',
    'hud.lang': 'Idioma',
    'hud.status': 'SIS.NOMINAL',
    'hud.offline': 'SIN CONEXIÓN · CACHÉ',

    'hero.greeting': 'Hola, soy',
    'hero.location': 'Paraná, Brasil',
    'hero.subtitle': 'Desarrollador Full-Stack & Educador Tecnológico',
    'hero.description': 'Apasionado por crear soluciones innovadoras. Con más de una década diseñando aplicaciones multiplataforma y escalables, impartiendo cursos y colaborando en proyectos de alto impacto.',
    'hero.viewWork': 'Ver Mi Trabajo',
    'hero.getInTouch': 'Contactar',
    'spec.role': 'Rol',
    'spec.now': 'Hoy',
    'spec.exp': 'Exp.',
    'spec.shipped': 'Entregas',
    'spec.stack': 'Stack',
    'spec.nowValue': 'Desarrollador de Software en LiveCode Ltd',

    'log.label': 'Registro de arranque',
    'log.1': 'cargar perfil: torocruzand',
    'log.2': 'montar proyectos: 8 módulos públicos',
    'log.3': 'montar experiencia: 4 entradas',
    'log.4': 'abrir canales: correo · github · linkedin',
    'log.5': 'bus de audio: silenciado (opcional)',
    'log.6': 'listo. terminal: ⌘K o ~ · navegar: j / k',

    'about.tag': 'Conóceme',
    'about.title': 'Sobre Mí',
    'about.subtitle': 'Transformando ideas en experiencias digitales fluidas',
    'about.p1': 'Soy un Desarrollador de Software Full-Stack apasionado por crear soluciones innovadoras. Con más de una década de experiencia, he diseñado y mantenido aplicaciones multiplataforma y escalables, impartido cursos y colaborado en proyectos de alto impacto.',
    'about.p2': 'Mi enfoque combina profundidad técnica con amor por la enseñanza. Creo que el gran software se construye no solo con código limpio, sino con una comprensión profunda de las personas que lo utilizarán. Desde LiveCode hasta frameworks web modernos, aporto versatilidad y dedicación a cada proyecto.',
    'about.p3': 'Con sede en Paraná, Brasil, actualmente trabajo como Desarrollador de Software en LiveCode Ltd mientras continúo explorando nuevas tecnologías y compartiendo conocimientos con la comunidad de desarrolladores.',
    'about.stat1': 'Años de Experiencia',
    'about.stat2': 'Proyectos Completados',
    'about.stat3': 'Tecnologías Dominadas',

    'projects.tag': 'Mi trabajo',
    'projects.title': 'Proyectos Destacados',
    'projects.lede': 'Cambia el interruptor de cualquier módulo a Ficha para ver sus tecnologías, categorías y enlaces.',
    'projects.preview': 'Vista',
    'projects.spec': 'Ficha',
    'projects.specAria': 'modo ficha técnica',
    'projects.technologies': 'Tecnologías',
    'projects.categories': 'Categorías',
    'projects.links': 'Enlaces',
    'projects.github': 'GitHub',
    'projects.view': 'Ver',
    'projects.download': 'Descargar',

    'experience.tag': 'Mi trayectoria',
    'experience.title': 'Experiencia Profesional',
    'experience.present': 'Presente',
    'experience.job1.title': 'Desarrollador de Software',
    'experience.job1.desc': 'Desarrollando aplicaciones multiplataforma y contribuyendo al ecosistema de LiveCode. Construyendo soluciones escalables y colaborando con un equipo internacional en productos de alto impacto.',
    'experience.job2.title': 'Desarrollador Freelance',
    'experience.job2.company': 'Independiente',
    'experience.job2.desc': 'Entregué más de 300 proyectos para diversos clientes, construyendo aplicaciones de escritorio multiplataforma, aplicaciones web y soluciones multimedia. Especializado en LiveCode, .NET Core y tecnologías web modernas.',
    'experience.job3.title': 'Programador y Profesor',
    'experience.job3.location': 'Universidad de Holguín',
    'experience.job3.desc': 'Impartí cursos de desarrollo de software y construí plataformas educativas. Desarrollé y mantuve sistemas académicos incluyendo gestión de revistas OJS/OMP. Combiné la enseñanza con el desarrollo práctico.',
    'experience.job4.title': 'Desarrollador Estudiante',
    'experience.job4.desc': 'Comencé mi viaje de desarrollo construyendo aplicaciones y aprendiendo múltiples lenguajes de programación. Adquirí experiencia fundamental en LiveCode, tecnologías web y gestión de bases de datos.',

    'skills.tag': 'Con qué trabajo',
    'skills.title': 'Habilidades y Tecnologías',
    'skills.technical': 'Experiencia Técnica',
    'skills.softSkills': 'Habilidades Profesionales y Metodologías',
    'skills.colGroup': 'Grupo',
    'skills.colTech': 'Tecnologías',
    'skills.colSkill': 'Habilidad',
    'skills.colDetail': 'Detalle',
    'skills.r0': 'Frontend y Móvil',
    'skills.r1': 'Backend y Datos',
    'skills.r2': 'Herramientas y Plataformas',
    'skills.r3': 'Desarrollo Asistido por IA',
    'skills.teamwork': 'Trabajo en Equipo y Colaboración',
    'skills.teamworkDesc': 'Colaboración interfuncional, mentoría, revisiones de código',
    'skills.agile': 'Metodologías Ágiles',
    'skills.agileDesc': 'Scrum, Kanban, desarrollo iterativo, planificación de sprints',
    'skills.problemSolving': 'Resolución de Problemas',
    'skills.problemSolvingDesc': 'Pensamiento analítico, depuración, estrategias de optimización',
    'skills.communication': 'Comunicación',
    'skills.communicationDesc': 'Documentación técnica, enseñanza, gestión de stakeholders',
    'skills.architecture': 'Arquitectura de Sistemas',
    'skills.architectureDesc': 'Diseño escalable, microservicios, patrones de diseño',
    'skills.continuous': 'Aprendizaje Continuo',
    'skills.continuousDesc': 'Manteniéndose actualizado, adaptándose a nuevas tecnologías',

    'contact.tag': 'Conectemos',
    'contact.title': 'Ponte en Contacto',
    'contact.description': '¡Siempre estoy abierto a discutir nuevos proyectos, ideas creativas u oportunidades para ser parte de tu visión. No dudes en contactarme!',
    'contact.email': 'Correo',
    'cv.download': 'Descargar CV',
    'cv.label': 'CV · PDF · 1 página',

    'footer.rights': 'Todos los derechos reservados.',
    'footer.built': 'HTML · CSS · JS — 0 dependencias',

    'toast.blueprint': 'Modo plano en papel',
    'toast.carbon': 'Modo telemetría carbono',
    'toast.audioOn': 'Audio activado',
    'toast.audioOff': 'Audio silenciado',
    'toast.lang': 'Idioma: Español',
    'toast.installed': 'Instalado como aplicación',
    'toast.offline': 'Sin conexión — mostrando copia en caché',
    'toast.online': 'Conexión restablecida',
  },

  pt: {
    'meta.title': 'Andrés del Toro Cruz — Desenvolvedor Full-Stack & Educador de Tecnologia · TOROCRUZAND',
    'meta.description': 'Portfólio de Andrés del Toro Cruz (torocruzand), desenvolvedor de software com mais de 12 anos de experiência em aplicações multiplataforma e escaláveis.',
    'skip': 'Pular para o conteúdo',

    'nav.about': 'Sobre',
    'nav.projects': 'Projetos',
    'nav.experience': 'Experiência',
    'nav.skills': 'Habilidades',
    'nav.contact': 'Contato',
    'nav.label': 'Principal',

    'hud.audio': 'Áudio',
    'hud.audioAria': 'Sons da interface',
    'hud.theme': 'Planta',
    'hud.themeAria': 'Tema planta em papel',
    'hud.terminal': 'Terminal',
    'hud.terminalAria': 'Abrir terminal de comandos (Control ou Command + K)',
    'hud.install': 'Instalar',
    'hud.installAria': 'Instalar este site como aplicativo',
    'hud.lang': 'Idioma',
    'hud.status': 'SIS.NOMINAL',
    'hud.offline': 'OFFLINE · CACHE',

    'hero.greeting': 'Olá, eu sou',
    'hero.location': 'Paraná, Brasil',
    'hero.subtitle': 'Desenvolvedor Full-Stack & Educador de Tecnologia',
    'hero.description': 'Apaixonado por criar soluções inovadoras. Mais de uma década projetando aplicações multiplataforma e escaláveis, ministrando cursos e colaborando em projetos de alto impacto.',
    'hero.viewWork': 'Ver Meu Trabalho',
    'hero.getInTouch': 'Entre em Contato',
    'spec.role': 'Função',
    'spec.now': 'Hoje',
    'spec.exp': 'Exp.',
    'spec.shipped': 'Entregas',
    'spec.stack': 'Stack',
    'spec.nowValue': 'Desenvolvedor de Software na LiveCode Ltd',

    'log.label': 'Registro de inicialização',
    'log.1': 'carregar perfil: torocruzand',
    'log.2': 'montar projetos: 8 módulos públicos',
    'log.3': 'montar experiência: 4 entradas',
    'log.4': 'abrir canais: e-mail · github · linkedin',
    'log.5': 'barramento de áudio: mudo (opcional)',
    'log.6': 'pronto. terminal: ⌘K ou ~ · navegar: j / k',

    'about.tag': 'Conheça-me',
    'about.title': 'Sobre Mim',
    'about.subtitle': 'Transformando ideias em experiências digitais perfeitas',
    'about.p1': 'Sou um Desenvolvedor de Software Full-Stack apaixonado por criar soluções inovadoras. Com mais de uma década de experiência, projetei e mantive aplicações multiplataforma e escaláveis, ministrei cursos e colaborei em projetos de alto impacto.',
    'about.p2': 'Minha abordagem combina profundidade técnica com amor pelo ensino. Acredito que um ótimo software é construído não apenas com código limpo, mas com uma compreensão profunda das pessoas que o usarão. Do LiveCode aos frameworks web modernos, trago versatilidade e dedicação a cada projeto.',
    'about.p3': 'Baseado no Paraná, Brasil, atualmente trabalho como Desenvolvedor de Software na LiveCode Ltd enquanto continuo explorando novas tecnologias e compartilhando conhecimento com a comunidade de desenvolvedores.',
    'about.stat1': 'Anos de Experiência',
    'about.stat2': 'Projetos Concluídos',
    'about.stat3': 'Tecnologias Dominadas',

    'projects.tag': 'Meu trabalho',
    'projects.title': 'Projetos em Destaque',
    'projects.lede': 'Mude a chave de qualquer módulo para Ficha para ver suas tecnologias, categorias e links.',
    'projects.preview': 'Prévia',
    'projects.spec': 'Ficha',
    'projects.specAria': 'modo ficha técnica',
    'projects.technologies': 'Tecnologias',
    'projects.categories': 'Categorias',
    'projects.links': 'Links',
    'projects.github': 'GitHub',
    'projects.view': 'Ver',
    'projects.download': 'Baixar',

    'experience.tag': 'Minha jornada',
    'experience.title': 'Experiência Profissional',
    'experience.present': 'Presente',
    'experience.job1.title': 'Desenvolvedor de Software',
    'experience.job1.desc': 'Desenvolvendo aplicações multiplataforma e contribuindo para o ecossistema LiveCode. Construindo soluções escaláveis e colaborando com uma equipe internacional em produtos de alto impacto.',
    'experience.job2.title': 'Desenvolvedor Freelancer',
    'experience.job2.company': 'Independente',
    'experience.job2.desc': 'Entreguei mais de 300 projetos para diversos clientes, construindo aplicações desktop multiplataforma, aplicações web e soluções multimídia. Especializado em LiveCode, .NET Core e tecnologias web modernas.',
    'experience.job3.title': 'Programador e Professor',
    'experience.job3.location': 'Universidade de Holguín',
    'experience.job3.desc': 'Ministrei cursos de desenvolvimento de software e construí plataformas educacionais. Desenvolvi e mantive sistemas acadêmicos incluindo gerenciamento de revistas OJS/OMP. Combinei ensino com desenvolvimento prático.',
    'experience.job4.title': 'Desenvolvedor Estudante',
    'experience.job4.desc': 'Iniciei minha jornada de desenvolvimento construindo aplicações e aprendendo múltiplas linguagens de programação. Adquiri experiência fundamental em LiveCode, tecnologias web e gerenciamento de banco de dados.',

    'skills.tag': 'Com o que trabalho',
    'skills.title': 'Habilidades e Tecnologias',
    'skills.technical': 'Experiência Técnica',
    'skills.softSkills': 'Habilidades Profissionais e Metodologias',
    'skills.colGroup': 'Grupo',
    'skills.colTech': 'Tecnologias',
    'skills.colSkill': 'Habilidade',
    'skills.colDetail': 'Detalhe',
    'skills.r0': 'Frontend e Mobile',
    'skills.r1': 'Backend e Dados',
    'skills.r2': 'Ferramentas e Plataformas',
    'skills.r3': 'Desenvolvimento Assistido por IA',
    'skills.teamwork': 'Trabalho em Equipe e Colaboração',
    'skills.teamworkDesc': 'Colaboração multifuncional, mentoria, revisões de código',
    'skills.agile': 'Metodologias Ágeis',
    'skills.agileDesc': 'Scrum, Kanban, desenvolvimento iterativo, planejamento de sprints',
    'skills.problemSolving': 'Resolução de Problemas',
    'skills.problemSolvingDesc': 'Pensamento analítico, depuração, estratégias de otimização',
    'skills.communication': 'Comunicação',
    'skills.communicationDesc': 'Documentação técnica, ensino, gestão de stakeholders',
    'skills.architecture': 'Arquitetura de Sistemas',
    'skills.architectureDesc': 'Design escalável, microserviços, padrões de design',
    'skills.continuous': 'Aprendizado Contínuo',
    'skills.continuousDesc': 'Mantendo-se atualizado, adaptando-se a novas tecnologias',

    'contact.tag': 'Vamos conectar',
    'contact.title': 'Entre em Contato',
    'contact.description': 'Estou sempre aberto para discutir novos projetos, ideias criativas ou oportunidades para fazer parte da sua visão. Sinta-se à vontade para entrar em contato!',
    'contact.email': 'E-mail',
    'cv.download': 'Baixar currículo',
    'cv.label': 'Currículo · PDF · 1 página',

    'footer.rights': 'Todos os direitos reservados.',
    'footer.built': 'HTML · CSS · JS — 0 dependências',

    'toast.blueprint': 'Modo planta em papel',
    'toast.carbon': 'Modo telemetria carbono',
    'toast.audioOn': 'Áudio ativado',
    'toast.audioOff': 'Áudio mudo',
    'toast.lang': 'Idioma: Português',
    'toast.installed': 'Instalado como aplicativo',
    'toast.offline': 'Offline — exibindo cópia em cache',
    'toast.online': 'Conexão restabelecida',
  },
};

/**
 * Project copy per language. Names and technology names are proper nouns and
 * stay untranslated; EN text is the live-site original.
 */
const PROJECTS = {
  photonjson: {
    en: ['JSON library for LiveCode language', 'Library · Development',
      'LiveCode script library for working with JSON, written in livecode-script and without the use of externals.'],
    es: ['Librería JSON para el lenguaje LiveCode', 'Librería · Desarrollo',
      'Librería en LiveCode Script para trabajar con JSON, escrita en livecode-script y sin usar externals.'],
    pt: ['Biblioteca JSON para a linguagem LiveCode', 'Biblioteca · Desenvolvimento',
      'Biblioteca em LiveCode Script para trabalhar com JSON, escrita em livecode-script e sem o uso de externals.'],
  },
  dragdrop: {
    en: ['Plugin · Development', 'Plugin · Development',
      "This plugin allows you to drag image, video, SVG and plain text files and import them into any of the LiveCode IDE's open windows."],
    es: ['Plugin · Desarrollo', 'Plugin · Desarrollo',
      'Este plugin permite arrastrar archivos de imagen, vídeo, SVG y texto plano e importarlos en cualquiera de las ventanas abiertas del IDE de LiveCode.'],
    pt: ['Plugin · Desenvolvimento', 'Plugin · Desenvolvimento',
      'Este plugin permite arrastar arquivos de imagem, vídeo, SVG e texto simples e importá-los para qualquer janela aberta do IDE do LiveCode.'],
  },
  tinycolor: {
    en: ['Library · Development', 'Library · Development',
      "This LiveCode Script library is based on Brian Grinstead's TinyColor v1.4.2 micro-framework, which was translated into LiveCode Script by the DTByte Ltd team."],
    es: ['Librería · Desarrollo', 'Librería · Desarrollo',
      'Esta librería de LiveCode Script se basa en el micro-framework TinyColor v1.4.2 de Brian Grinstead, traducido a LiveCode Script por el equipo de DTByte Ltd.'],
    pt: ['Biblioteca · Desenvolvimento', 'Biblioteca · Desenvolvimento',
      'Esta biblioteca em LiveCode Script é baseada no micro-framework TinyColor v1.4.2 de Brian Grinstead, traduzido para LiveCode Script pela equipe DTByte Ltd.'],
  },
  touchgestures: {
    en: ['Library · Development', 'Library · Development',
      'A LiveCode Script library for handling finger gestures on a screen.'],
    es: ['Librería · Desarrollo', 'Librería · Desarrollo',
      'Librería de LiveCode Script para gestionar gestos con los dedos en una pantalla.'],
    pt: ['Biblioteca · Desenvolvimento', 'Biblioteca · Desenvolvimento',
      'Biblioteca em LiveCode Script para tratar gestos com os dedos em uma tela.'],
  },
  devguides: {
    en: ['Plugin · Development', 'Plugin · Development',
      'Extension to help LiveCode developers to design the UI.'],
    es: ['Plugin · Desarrollo', 'Plugin · Desarrollo',
      'Extensión que ayuda a los desarrolladores de LiveCode a diseñar la interfaz de usuario.'],
    pt: ['Plugin · Desenvolvimento', 'Plugin · Desenvolvimento',
      'Extensão que ajuda desenvolvedores LiveCode a projetar a interface do usuário.'],
  },
  accreditation: {
    en: ['App · Windows · Event Memory', 'App · Windows · Event Memory · Development',
      'Product that collects the internal life of the University of Pedagogical Sciences “José de la Luz y Caballero”.'],
    es: ['App · Windows · Memoria de eventos', 'App · Windows · Memoria de eventos · Desarrollo',
      'Producto que recoge la vida interna de la Universidad de Ciencias Pedagógicas «José de la Luz y Caballero».'],
    pt: ['App · Windows · Memória de eventos', 'App · Windows · Memória de eventos · Desenvolvimento',
      'Produto que reúne a vida interna da Universidade de Ciências Pedagógicas “José de la Luz y Caballero”.'],
  },
  forum: {
    en: ['Deployment · Support', 'Deployment · Support',
      'University of Holguin Forum Platform. Here I helped in the deployment and support of this platform.'],
    es: ['Despliegue · Soporte', 'Despliegue · Soporte',
      'Plataforma de foros de la Universidad de Holguín. Participé en el despliegue y el soporte de esta plataforma.'],
    pt: ['Implantação · Suporte', 'Implantação · Suporte',
      'Plataforma de fóruns da Universidade de Holguín. Atuei na implantação e no suporte desta plataforma.'],
  },
  dictionary: {
    en: ['App · Android', 'App · Android · Development',
      'This mobile application presents the enriched and contextualized content of the writer Ramiro Valdéz Galarraga.'],
    es: ['App · Android', 'App · Android · Desarrollo',
      'Esta aplicación móvil presenta el contenido enriquecido y contextualizado del escritor Ramiro Valdés Galarraga.'],
    pt: ['App · Android', 'App · Android · Desenvolvimento',
      'Este aplicativo móvel apresenta o conteúdo enriquecido e contextualizado do escritor Ramiro Valdés Galarraga.'],
  },
};

for (const [id, langs] of Object.entries(PROJECTS)) {
  for (const [code, [sub, cats, desc]] of Object.entries(langs)) {
    Object.assign(dict[code], {
      [`proj.${id}.sub`]: sub,
      [`proj.${id}.cats`]: cats,
      [`proj.${id}.desc`]: desc,
    });
  }
}

const STORE_KEY = 'tc-lang';

/** Resolve the initial language: saved choice → legacy key → browser → en. */
export function detectLang() {
  let saved = null;
  try {
    saved = localStorage.getItem(STORE_KEY) || localStorage.getItem('preferredLanguage');
  } catch { /* storage unavailable */ }
  if (LANGS.includes(saved)) return saved;
  const nav = (navigator.language || 'en').slice(0, 2).toLowerCase();
  return LANGS.includes(nav) ? nav : 'en';
}

export function saveLang(lang) {
  try { localStorage.setItem(STORE_KEY, lang); } catch { /* storage unavailable */ }
}

/** Translate a key in the given language, falling back to English. */
export function t(lang, key) {
  return (dict[lang] && dict[lang][key]) ?? dict.en[key] ?? key;
}

/** Apply a language to every annotated node in the document. */
export function applyLang(lang, root = document) {
  const html = document.documentElement;
  html.lang = lang === 'pt' ? 'pt-BR' : lang;

  root.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = t(lang, el.dataset.i18n);
  });
  root.querySelectorAll('[data-i18n-aria]').forEach((el) => {
    const keys = el.dataset.i18nAria.split('|');
    // "Project name|projects.specAria" → literal prefix + translated suffix.
    el.setAttribute('aria-label', keys.length > 1 ? `${keys[0]}: ${t(lang, keys[1])}` : t(lang, keys[0]));
  });

  document.title = t(lang, 'meta.title');
  document.querySelector('meta[name="description"]')?.setAttribute('content', t(lang, 'meta.description'));
}
