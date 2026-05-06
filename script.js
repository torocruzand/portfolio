// ========================================
// Translations
// ========================================
const translations = {
    en: {
        nav: {
            home: 'Home',
            about: 'About',
            skills: 'Skills',
            projects: 'Projects',
            experience: 'Experience',
            contact: 'Contact'
        },
        hero: {
            greeting: "Hello, I'm",
            subtitle: 'Full-Stack Developer & Technology Educator',
            description: 'Passionate about creating innovative solutions. Over a decade designing cross-platform and scalable applications, teaching courses, and collaborating on high-impact projects.',
            viewWork: 'View My Work',
            getInTouch: 'Get In Touch'
        },
        about: {
            tag: 'Get to know me',
            title: 'About Me',
            subtitle: 'Turning ideas into seamless digital experiences',
            p1: "I'm a Full-Stack Software Developer passionate about creating innovative solutions. With more than a decade of experience, I've designed and maintained cross-platform and scalable applications, taught courses, and collaborated on high-impact projects.",
            p2: "My approach combines technical depth with a love for teaching. I believe great software is built not only with clean code, but with a deep understanding of the people who will use it. From LiveCode to modern web frameworks, I bring versatility and dedication to every project.",
            p3: "Based in Paraná, Brazil, I currently work as a Software Developer at LiveCode Ltd while continuing to explore new technologies and share knowledge with the developer community.",
            stat1: 'Years of Experience',
            stat2: 'Projects Completed',
            stat3: 'Technologies Mastered'
        },
        skills: {
            tag: 'What I work with',
            title: 'Skills & Technologies',
            technical: 'Technical Expertise',
            softSkills: 'Professional Skills & Methodologies',
            teamwork: 'Teamwork & Collaboration',
            teamworkDesc: 'Cross-functional collaboration, mentoring, code reviews',
            agile: 'Agile Methodologies',
            agileDesc: 'Scrum, Kanban, iterative development, sprint planning',
            problemSolving: 'Problem Solving',
            problemSolvingDesc: 'Analytical thinking, debugging, optimization strategies',
            communication: 'Communication',
            communicationDesc: 'Technical documentation, teaching, stakeholder management',
            architecture: 'System Architecture',
            architectureDesc: 'Scalable design, microservices, design patterns',
            continuous: 'Continuous Learning',
            continuousDesc: 'Staying updated, adapting to new technologies'
        },
        projects: {
            tag: 'My work',
            title: 'Featured Projects',
            github: 'GitHub',
            view: 'View',
            download: 'Download'
        },
        experience: {
            tag: 'My journey',
            title: 'Professional Experience',
            present: 'Present',
            job1: {
                title: 'Software Developer',
                desc: 'Developing cross-platform applications and contributing to the LiveCode ecosystem. Building scalable solutions and collaborating with an international team on high-impact products.'
            },
            job2: {
                title: 'Freelance Developer',
                company: 'Independent',
                desc: 'Delivered 300+ projects for diverse clients, building cross-platform desktop apps, web applications, and multimedia solutions. Specialized in LiveCode, .NET Core, and modern web technologies.'
            },
            job3: {
                title: 'Programmer & Professor',
                location: 'University of Holguín',
                desc: 'Taught software development courses and built educational platforms. Developed and maintained academic systems including OJS/OMP journal management. Combined teaching with hands-on development.'
            },
            job4: {
                title: 'Student Developer',
                desc: 'Started my development journey building applications and learning multiple programming languages. Gained foundational expertise in LiveCode, web technologies, and database management.'
            }
        },
        contact: {
            tag: "Let's connect",
            title: 'Get In Touch',
            description: "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out!",
            email: 'Email'
        },
        footer: {
            rights: 'All rights reserved.'
        }
    },
    es: {
        nav: {
            home: 'Inicio',
            about: 'Sobre mí',
            skills: 'Habilidades',
            projects: 'Proyectos',
            experience: 'Experiencia',
            contact: 'Contacto'
        },
        hero: {
            greeting: 'Hola, soy',
            subtitle: 'Desarrollador Full-Stack & Educador Tecnológico',
            description: 'Apasionado por crear soluciones innovadoras. Con más de una década diseñando aplicaciones multiplataforma y escalables, impartiendo cursos y colaborando en proyectos de alto impacto.',
            viewWork: 'Ver Mi Trabajo',
            getInTouch: 'Contactar'
        },
        about: {
            tag: 'Conóceme',
            title: 'Sobre Mí',
            subtitle: 'Transformando ideas en experiencias digitales fluidas',
            p1: 'Soy un Desarrollador de Software Full-Stack apasionado por crear soluciones innovadoras. Con más de una década de experiencia, he diseñado y mantenido aplicaciones multiplataforma y escalables, impartido cursos y colaborado en proyectos de alto impacto.',
            p2: 'Mi enfoque combina profundidad técnica con amor por la enseñanza. Creo que el gran software se construye no solo con código limpio, sino con una comprensión profunda de las personas que lo utilizarán. Desde LiveCode hasta frameworks web modernos, aporto versatilidad y dedicación a cada proyecto.',
            p3: 'Con sede en Paraná, Brasil, actualmente trabajo como Desarrollador de Software en LiveCode Ltd mientras continúo explorando nuevas tecnologías y compartiendo conocimientos con la comunidad de desarrolladores.',
            stat1: 'Años de Experiencia',
            stat2: 'Proyectos Completados',
            stat3: 'Tecnologías Dominadas'
        },
        skills: {
            tag: 'Con qué trabajo',
            title: 'Habilidades y Tecnologías',
            technical: 'Experiencia Técnica',
            softSkills: 'Habilidades Profesionales y Metodologías',
            teamwork: 'Trabajo en Equipo y Colaboración',
            teamworkDesc: 'Colaboración interfuncional, mentoría, revisiones de código',
            agile: 'Metodologías Ágiles',
            agileDesc: 'Scrum, Kanban, desarrollo iterativo, planificación de sprints',
            problemSolving: 'Resolución de Problemas',
            problemSolvingDesc: 'Pensamiento analítico, depuración, estrategias de optimización',
            communication: 'Comunicación',
            communicationDesc: 'Documentación técnica, enseñanza, gestión de stakeholders',
            architecture: 'Arquitectura de Sistemas',
            architectureDesc: 'Diseño escalable, microservicios, patrones de diseño',
            continuous: 'Aprendizaje Continuo',
            continuousDesc: 'Manteniéndose actualizado, adaptándose a nuevas tecnologías'
        },
        projects: {
            tag: 'Mi trabajo',
            title: 'Proyectos Destacados',
            github: 'GitHub',
            view: 'Ver',
            download: 'Descargar'
        },
        experience: {
            tag: 'Mi trayectoria',
            title: 'Experiencia Profesional',
            present: 'Presente',
            job1: {
                title: 'Desarrollador de Software',
                desc: 'Desarrollando aplicaciones multiplataforma y contribuyendo al ecosistema de LiveCode. Construyendo soluciones escalables y colaborando con un equipo internacional en productos de alto impacto.'
            },
            job2: {
                title: 'Desarrollador Freelance',
                company: 'Independiente',
                desc: 'Entregué más de 300 proyectos para diversos clientes, construyendo aplicaciones de escritorio multiplataforma, aplicaciones web y soluciones multimedia. Especializado en LiveCode, .NET Core y tecnologías web modernas.'
            },
            job3: {
                title: 'Programador y Profesor',
                location: 'Universidad de Holguín',
                desc: 'Impartí cursos de desarrollo de software y construí plataformas educativas. Desarrollé y mantuve sistemas académicos incluyendo gestión de revistas OJS/OMP. Combiné la enseñanza con el desarrollo práctico.'
            },
            job4: {
                title: 'Desarrollador Estudiante',
                desc: 'Comencé mi viaje de desarrollo construyendo aplicaciones y aprendiendo múltiples lenguajes de programación. Adquirí experiencia fundamental en LiveCode, tecnologías web y gestión de bases de datos.'
            }
        },
        contact: {
            tag: 'Conectemos',
            title: 'Ponte en Contacto',
            description: '¡Siempre estoy abierto a discutir nuevos proyectos, ideas creativas u oportunidades para ser parte de tu visión. No dudes en contactarme!',
            email: 'Correo'
        },
        footer: {
            rights: 'Todos los derechos reservados.'
        }
    },
    pt: {
        nav: {
            home: 'Início',
            about: 'Sobre',
            skills: 'Habilidades',
            projects: 'Projetos',
            experience: 'Experiência',
            contact: 'Contato'
        },
        hero: {
            greeting: 'Olá, eu sou',
            subtitle: 'Desenvolvedor Full-Stack & Educador de Tecnologia',
            description: 'Apaixonado por criar soluções inovadoras. Mais de uma década projetando aplicações multiplataforma e escaláveis, ministrando cursos e colaborando em projetos de alto impacto.',
            viewWork: 'Ver Meu Trabalho',
            getInTouch: 'Entre em Contato'
        },
        about: {
            tag: 'Conheça-me',
            title: 'Sobre Mim',
            subtitle: 'Transformando ideias em experiências digitais perfeitas',
            p1: 'Sou um Desenvolvedor de Software Full-Stack apaixonado por criar soluções inovadoras. Com mais de uma década de experiência, projetei e mantive aplicações multiplataforma e escaláveis, ministrei cursos e colaborei em projetos de alto impacto.',
            p2: 'Minha abordagem combina profundidade técnica com amor pelo ensino. Acredito que um ótimo software é construído não apenas com código limpo, mas com uma compreensão profunda das pessoas que o usarão. Do LiveCode aos frameworks web modernos, trago versatilidade e dedicação a cada projeto.',
            p3: 'Baseado no Paraná, Brasil, atualmente trabalho como Desenvolvedor de Software na LiveCode Ltd enquanto continuo explorando novas tecnologias e compartilhando conhecimento com a comunidade de desenvolvedores.',
            stat1: 'Anos de Experiência',
            stat2: 'Projetos Concluídos',
            stat3: 'Tecnologias Dominadas'
        },
        skills: {
            tag: 'Com o que trabalho',
            title: 'Habilidades e Tecnologias',
            technical: 'Experiência Técnica',
            softSkills: 'Habilidades Profissionais e Metodologias',
            teamwork: 'Trabalho em Equipe e Colaboração',
            teamworkDesc: 'Colaboração multifuncional, mentoria, revisões de código',
            agile: 'Metodologias Ágeis',
            agileDesc: 'Scrum, Kanban, desenvolvimento iterativo, planejamento de sprints',
            problemSolving: 'Resolução de Problemas',
            problemSolvingDesc: 'Pensamento analítico, depuração, estratégias de otimização',
            communication: 'Comunicação',
            communicationDesc: 'Documentação técnica, ensino, gestão de stakeholders',
            architecture: 'Arquitetura de Sistemas',
            architectureDesc: 'Design escalável, microserviços, padrões de design',
            continuous: 'Aprendizado Contínuo',
            continuousDesc: 'Mantendo-se atualizado, adaptando-se a novas tecnologias'
        },
        projects: {
            tag: 'Meu trabalho',
            title: 'Projetos em Destaque',
            github: 'GitHub',
            view: 'Ver',
            download: 'Baixar'
        },
        experience: {
            tag: 'Minha jornada',
            title: 'Experiência Profissional',
            present: 'Presente',
            job1: {
                title: 'Desenvolvedor de Software',
                desc: 'Desenvolvendo aplicações multiplataforma e contribuindo para o ecossistema LiveCode. Construindo soluções escaláveis e colaborando com uma equipe internacional em produtos de alto impacto.'
            },
            job2: {
                title: 'Desenvolvedor Freelancer',
                company: 'Independente',
                desc: 'Entreguei mais de 300 projetos para diversos clientes, construindo aplicações desktop multiplataforma, aplicações web e soluções multimídia. Especializado em LiveCode, .NET Core e tecnologias web modernas.'
            },
            job3: {
                title: 'Programador e Professor',
                location: 'Universidade de Holguín',
                desc: 'Ministrei cursos de desenvolvimento de software e construí plataformas educacionais. Desenvolvi e mantive sistemas acadêmicos incluindo gerenciamento de revistas OJS/OMP. Combinei ensino com desenvolvimento prático.'
            },
            job4: {
                title: 'Desenvolvedor Estudante',
                desc: 'Iniciei minha jornada de desenvolvimento construindo aplicações e aprendendo múltiplas linguagens de programação. Adquiri experiência fundamental em LiveCode, tecnologias web e gerenciamento de banco de dados.'
            }
        },
        contact: {
            tag: 'Vamos conectar',
            title: 'Entre em Contato',
            description: 'Estou sempre aberto para discutir novos projetos, ideias criativas ou oportunidades para fazer parte da sua visão. Sinta-se à vontade para entrar em contato!',
            email: 'E-mail'
        },
        footer: {
            rights: 'Todos os direitos reservados.'
        }
    }
};

// ========================================
// Projects Data
// ========================================
const projects = [
    {
        name: "PixelCrush",
        description: "A fast, cross-platform image compression and format conversion tool with a sleek UI built in Rust and Slint.",
        image: "images/projects/pixelcrush.jpg",
        web: "https://torocruzand.github.io/PixelCrush",
        download: "https://github.com/torocruzand/PixelCrush/releases/latest",
        github: "https://github.com/torocruzand/PixelCrush",
        technologies: ["Rust", "Slint", "Image Processing"],
        categories: ["Desktop App", "Utility"]
    },
    {
        name: "PhotonJSON: JSON library for LiveCode language",
        description: "LiveCode script library for working with JSON, written in livecode-script and without the use of external",
        image: "images/projects/photon-json.jpg",
        web: "",
        download: "https://github.com/Ferruslogic/PhotonJSON/archive/refs/tags/v1.2.4.zip",
        github: "https://github.com/Ferruslogic/PhotonJSON/",
        technologies: ["LiveCode", "LiveCode Script"],
        categories: ["Library", "Development"]
    },
    {
        name: "Drag Drop file into IDE of LiveCode",
        description: "This plugin allows you to drag image, video, SVG and plain text files and import them into any of the LiveCode IDE's open windows",
        image: "images/projects/drag-drop-ide.jpg",
        web: "",
        download: "https://github.com/Ferruslogic/frlDragDropFilesIntoIDE/archive/refs/tags/v1.1.1.zip",
        github: "https://github.com/Ferruslogic/frlDragDropFilesIntoIDE/",
        technologies: ["LiveCode", "LiveCode Script"],
        categories: ["Plugin", "Development"]
    },
    {
        name: "TinyColor for LiveCode",
        description: "This LiveCode Script library is based on Brian Grinstead's TinyColor v1.4.2 micro-framework. Which was translated into LiveCode Script by the FerrusLogic team",
        image: "images/projects/tiny-color.jpg",
        web: "",
        download: "https://github.com/Ferruslogic/TinyColor/archive/refs/tags/v1.0.0.zip",
        github: "https://github.com/Ferruslogic/TinyColor",
        technologies: ["LiveCode", "LiveCode Script"],
        categories: ["Library", "Development"]
    },
    {
        name: "touchGestures",
        description: "This LiveCode Script library is  Library for handling finger gestures on a screen",
        image: "images/projects/touch-gestures.jpg",
        web: "",
        download: "",
        github: "https://github.com/Ferruslogic/touchGestures",
        technologies: ["LiveCode", "LiveCode Script"],
        categories: ["Library", "Development"]
    },
    {
        name: "DevGuides",
        description: "Extension to help LiveCode developers to design the UI",
        image: "images/projects/dev-guides.jpg",
        web: "",
        download: "https://github.com/Ferruslogic/DevGuides/archive/refs/tags/v1.0.6.zip",
        github: "https://github.com/Ferruslogic/DevGuides",
        technologies: ["LiveCode", "LiveCode Script"],
        categories: ["Plugin", "Development"]
    },
    {
        name: "Accreditation of the University of Pedagogical Sciences of Holguin",
        description: 'Product that collects the internal life of the University of Pedagogical Sciences "José de la Luz y Caballero"',
        image: "images/projects/accreditation-uho.jpg",
        web: "https://cesoftad.uho.edu.cu/producto/123",
        download: "",
        github: "",
        technologies: ["LiveCode", "LiveCode Script"],
        categories: ["App", "Windows", "Event Memory", "Development"]
    },
    {
        name: "University of Holguin Forum Platform",
        description: "University of Holguin Forum Platform. Here I helped in the deployment and support of this platform",
        image: "images/projects/forum-uho.jpg",
        web: "https://foros.uho.edu.cu/",
        download: "",
        github: "",
        technologies: ["PHPBB", "CSS", "HTML", "PHP", "JavaScript"],
        categories: ["Deployment", "Support"]
    },
    {
        name: "Dictionary of Marti's Thought",
        description: "This mobile application presents the enriched and contextualized content of the writer Ramiro Valdéz Galarraga",
        image: "images/projects/DPM.jpg",
        web: "https://cesoftad.uho.edu.cu/producto/168",
        download: "",
        github: "",
        technologies: ["LiveCode", "LiveCode Script"],
        categories: ["App", "Android", "Development"]
    }
];

// ========================================
// State Management
// ========================================
let currentLang = localStorage.getItem('preferredLanguage') || 'en';
let isDarkMode = localStorage.getItem('darkMode') !== 'false';

// ========================================
// Initialization
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLanguage();
    initMobileMenu();
    initScrollAnimations();
    initSmoothScroll();
    renderProjects();
    registerServiceWorker();
    
    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
});

// ========================================
// PWA Service Worker
// ========================================
function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) {
        return;
    }

    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js').then((registration) => {
            registration.update();

            if (registration.waiting) {
                registration.waiting.postMessage({ type: 'SKIP_WAITING' });
            }

            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;
                if (!newWorker) {
                    return;
                }

                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        newWorker.postMessage({ type: 'SKIP_WAITING' });
                    }
                });
            });
        }).catch(() => {
            // Fail silently if registration fails
        });

        navigator.serviceWorker.addEventListener('controllerchange', () => {
            window.location.reload();
        });
    });
}

// ========================================
// Theme Management
// ========================================
function initTheme() {
    const applyTheme = () => {
        document.body.classList.toggle('dark-mode', isDarkMode);
        document.querySelectorAll('.theme-toggle').forEach((toggle) => {
            toggle.setAttribute('aria-pressed', String(isDarkMode));
        });
    };

    // Apply saved theme
    applyTheme();

    // Theme toggle handler (event delegation for reliability)
    document.addEventListener('click', (event) => {
        const toggle = event.target.closest('.theme-toggle');
        if (!toggle) {
            return;
        }

        isDarkMode = !isDarkMode;
        localStorage.setItem('darkMode', isDarkMode);
        applyTheme();
    });
}

// ========================================
// Language Management
// ========================================
function initLanguage() {
    const langButtons = document.querySelectorAll('.lang-btn');

    const setActiveLanguage = () => {
        langButtons.forEach(button => {
            button.classList.toggle('active', button.dataset.lang === currentLang);
        });
    };
    
    // Set active language button
    langButtons.forEach(btn => {
        // Language button click handler
        btn.addEventListener('click', () => {
            currentLang = btn.dataset.lang;
            localStorage.setItem('preferredLanguage', currentLang);
            
            // Update active state
            setActiveLanguage();
            
            // Update translations
            updateTranslations();
        });
    });

    setActiveLanguage();
    
    // Initial translation
    updateTranslations();
}

function updateTranslations() {
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        const key = element.dataset.i18n;
        const translation = getNestedTranslation(translations[currentLang], key);
        
        if (translation) {
            element.textContent = translation;
        }
    });
}

function getNestedTranslation(obj, path) {
    return path.split('.').reduce((prev, curr) => prev && prev[curr], obj);
}

// ========================================
// Mobile Menu
// ========================================
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-link');
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// ========================================
// Smooth Scroll
// ========================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// Active Nav Link on Scroll
// ========================================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ========================================
// Scroll Animations
// ========================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animatedElements = document.querySelectorAll(
        '.stat-card, .skill-category, .timeline-item, .contact-card'
    );
    
    animatedElements.forEach(el => {
        el.classList.add('scroll-reveal');
        observer.observe(el);
    });
}

// ========================================
// Render Projects
// ========================================
function renderProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    const lang = translations[currentLang].projects;
    
    projectsGrid.innerHTML = projects.map((project, index) => {
        const hasLinks = project.github || project.web || project.download;
        
        return `
            <div class="project-card" style="animation-delay: ${index * 0.1}s">
                <img src="${project.image}" alt="${project.name}" class="project-image" 
                         loading="lazy" decoding="async" width="400" height="220" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'300\\'%3E%3Crect fill=\\'%23667eea\\' width=\\'400\\' height=\\'300\\'/%3E%3Ctext fill=\\'white\\' font-family=\\'Arial\\' font-size=\\'24\\' x=\\'50%25\\' y=\\'50%25\\' text-anchor=\\'middle\\' dominant-baseline=\\'middle\\'%3E${project.name.substring(0, 20)}%3C/text%3E%3C/svg%3E'">
                <div class="project-content">
                    <h3 class="project-title">${project.name}</h3>
                    <p class="project-description">${project.description}</p>
                    
                    <div class="project-tech">
                        ${project.technologies.map(tech => 
                            `<span class="tech-tag">${tech}</span>`
                        ).join('')}
                    </div>
                    
                    ${hasLinks ? `
                        <div class="project-links">
                            ${project.github ? `
                                <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="project-link project-link-secondary">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                                    </svg>
                                    ${lang.github}
                                </a>
                            ` : ''}
                            
                            ${project.web ? `
                                <a href="${project.web}" target="_blank" rel="noopener noreferrer" class="project-link project-link-primary">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                    ${lang.view}
                                </a>
                            ` : ''}
                            
                            ${project.download ? `
                                <a href="${project.download}" target="_blank" rel="noopener noreferrer" class="project-link project-link-secondary">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                        <polyline points="7 10 12 15 17 10"></polyline>
                                        <line x1="12" y1="15" x2="12" y2="3"></line>
                                    </svg>
                                    ${lang.download}
                                </a>
                            ` : ''}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');
    
    // Re-observe project cards for scroll animation
    const projectCards = document.querySelectorAll('.project-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        observer.observe(card);
    });
}

// Update projects when language changes
const originalUpdateTranslations = updateTranslations;
updateTranslations = function() {
    originalUpdateTranslations();
    renderProjects();
};
