#!/usr/bin/env python3
"""
Builds the CV in EN / ES / PT-BR as print-ready HTML (cv/src/cv-<lang>.html).
Render to PDF with cv/render.sh (headless Chromium, A4, no headers/footers).

Content rules: only information already public on torocruzand.com plus the
employment history and education from the CV template. Phone included at the owner's request.
"""
import html
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent
SRC = ROOT / 'src'
SRC.mkdir(exist_ok=True)
e = html.escape

# --- Employment dates for the two studio roles (set after verification) ---
DATES = {
    'sifisoft': ('2019', '2021'),
    'severin': ('2021', '2024'),
}

CONTACT = [
    ('+55 (41) 9973-8831', 'tel:+554199738831'),
    ('torocruzand@gmail.com', 'mailto:torocruzand@gmail.com'),
    ('torocruzand.com', 'https://torocruzand.com'),
    ('github.com/torocruzand', 'https://github.com/torocruzand'),
    ('linkedin.com/in/torocruzand', 'https://linkedin.com/in/torocruzand'),
]

T = {
    'en': {
        'lang': 'en', 'present': 'Present',
        'title': 'Full-Stack Software Developer · Technology Educator',
        'location': 'Paraná, Brazil · Open to remote',
        'h_profile': 'Profile', 'h_exp': 'Experience', 'h_edu': 'Education',
        'h_oss': 'Selected Projects', 'h_skills': 'Technical Skills', 'h_lang': 'Languages', 'h_facts': 'Key Facts',
        'profile': 'Full-Stack Software Developer with more than a decade of experience designing, building and maintaining cross-platform, scalable applications for desktop, web and mobile. Combines hands-on engineering with a long teaching background: clear technical communication, mentoring and code review come standard. Specialist in LiveCode, with production work across .NET Core, PHP and modern JavaScript frameworks.',
        'facts': [('10+', 'years of experience'), ('300+', 'projects delivered'), ('20+', 'technologies in production')],
        'jobs': [
            ('Software Developer', 'LiveCode Ltd', 'remote · Paraná, Brazil', ('2024', None), [
                'Develop cross-platform applications and contribute to the LiveCode ecosystem.',
                'Build scalable solutions together with an international, distributed team on high-impact products.',
            ]),
            ('Software Developer', 'Severin Studio S.L.', 'remote', DATES['severin'], [
                'Developed cross-platform desktop and web applications for the studio\'s client portfolio.',
                'Owned features end to end, from requirements and estimation to delivery and support.',
            ]),
            ('Software Developer', 'SifiSoft', 'Holguín, Cuba', DATES['sifisoft'], [
                'Built cross-platform desktop applications and multimedia solutions with LiveCode and .NET Core.',
                'Delivered web applications with PHP/CodeIgniter and JavaScript for a diverse client base.',
            ]),
            ('Programmer & Professor', 'CESOFTAD, University of Holguín', 'Holguín, Cuba', ('2016', '2019'), [
                'Taught software development courses and built educational platforms.',
                'Developed and maintained academic systems, including OJS/OMP journal and monograph publishing.',
                'Shipped university products such as an institutional event-memory application (Windows) and the "Dictionary of Martí\'s Thought" Android app.',
            ]),
            ('Student Developer', 'CESOFTAD', 'Holguín, Cuba', ('2012', '2014'), [
                'Started building production applications; gained a foundation in LiveCode, web technologies and databases.',
            ]),
        ],
        'edu': [
            ('Bachelor of Education — Mathematics and Physics', 'University of Holguín · Holguín, Cuba', ''),
            ('Software Development (self-directed, continuous)', 'LiveCode, .NET Core, JavaScript, Tailwind CSS and more', '2012 – Present'),
        ],
        'oss': [
            ('PhotonJSON', 'JSON encode/decode library written in pure LiveCode Script, no externals.'),
            ('TinyColor for LiveCode', 'Port of the TinyColor v1.4.2 colour micro-framework to LiveCode Script.'),
            ('DevGuides', 'IDE extension that helps LiveCode developers lay out user interfaces.'),
            ('touchGestures', 'Library for handling finger gestures on touch screens.'),
            ('Drag Drop Files into IDE', 'Plugin to drag images, video, SVG and text into any open LiveCode IDE window.'),
        ],
        'oss_note': 'Open source under github.com/dtbyte-Ltd',
        'skills': [
            ('Web', 'JavaScript, TypeScript, HTML5, CSS3, PHP, CodeIgniter, Vue.js, Angular, Astro, Tailwind CSS, WordPress'),
            ('Cross-platform', 'LiveCode, .NET Core / C#, Flutter / Dart'),
            ('Data', 'SQL, MySQL, SQLite, SQL Server, REST APIs, JSON, XML, YAML'),
            ('Tooling', 'Git, GitHub, Stacked Git, SmartGit, VS Code, Visual Studio, Android Studio'),
            ('AI tools', 'Claude Code, OpenAI Codex, Google Gemini, Google Antigravity'),
            ('Practices', 'Agile (Scrum, Kanban), code review, mentoring, technical documentation, AI-augmented development'),
        ],
        'langs': [('Spanish', 'Native'), ('English', 'Intermediate'), ('Portuguese', 'Intermediate')],
        'footer': 'References available on request',
    },
    'es': {
        'lang': 'es', 'present': 'Actualidad',
        'title': 'Desarrollador de Software Full-Stack · Educador Tecnológico',
        'location': 'Paraná, Brasil · Disponible en remoto',
        'h_profile': 'Perfil', 'h_exp': 'Experiencia', 'h_edu': 'Formación',
        'h_oss': 'Proyectos Destacados', 'h_skills': 'Habilidades Técnicas', 'h_lang': 'Idiomas', 'h_facts': 'Datos Clave',
        'profile': 'Desarrollador de Software Full-Stack con más de una década de experiencia diseñando, construyendo y manteniendo aplicaciones multiplataforma y escalables para escritorio, web y móvil. Combina la ingeniería práctica con una amplia trayectoria docente: comunicación técnica clara, mentoría y revisión de código. Especialista en LiveCode, con experiencia en producción con .NET Core, PHP y frameworks modernos de JavaScript.',
        'facts': [('10+', 'años de experiencia'), ('300+', 'proyectos entregados'), ('20+', 'tecnologías en producción')],
        'jobs': [
            ('Desarrollador de Software', 'LiveCode Ltd', 'remoto · Paraná, Brasil', ('2024', None), [
                'Desarrollo de aplicaciones multiplataforma y contribución al ecosistema de LiveCode.',
                'Construcción de soluciones escalables junto a un equipo internacional y distribuido en productos de alto impacto.',
            ]),
            ('Desarrollador de Software', 'Severin Studio S.L.', 'remoto', DATES['severin'], [
                'Desarrollo de aplicaciones de escritorio y web multiplataforma para la cartera de clientes del estudio.',
                'Responsable de funcionalidades de principio a fin: requisitos, estimación, entrega y soporte.',
            ]),
            ('Desarrollador de Software', 'SifiSoft', 'Holguín, Cuba', DATES['sifisoft'], [
                'Desarrollo de aplicaciones de escritorio multiplataforma y soluciones multimedia con LiveCode y .NET Core.',
                'Entrega de aplicaciones web con PHP/CodeIgniter y JavaScript para clientes diversos.',
            ]),
            ('Programador y Profesor', 'CESOFTAD, Universidad de Holguín', 'Holguín, Cuba', ('2016', '2019'), [
                'Impartí cursos de desarrollo de software y construí plataformas educativas.',
                'Desarrollé y mantuve sistemas académicos, incluida la gestión de revistas y monografías OJS/OMP.',
                'Entregué productos universitarios como una aplicación de memoria institucional (Windows) y la app Android «Diccionario del Pensamiento Martiano».',
            ]),
            ('Desarrollador Estudiante', 'CESOFTAD', 'Holguín, Cuba', ('2012', '2014'), [
                'Inicio en el desarrollo de aplicaciones en producción; base sólida en LiveCode, tecnologías web y bases de datos.',
            ]),
        ],
        'edu': [
            ('Licenciatura en Educación — Matemática y Física', 'Universidad de Holguín · Holguín, Cuba', ''),
            ('Desarrollo de Software (autodidacta, formación continua)', 'LiveCode, .NET Core, JavaScript, Tailwind CSS y más', '2012 – Actualidad'),
        ],
        'oss': [
            ('PhotonJSON', 'Librería de codificación/decodificación JSON escrita en LiveCode Script puro, sin externals.'),
            ('TinyColor for LiveCode', 'Port del micro-framework de color TinyColor v1.4.2 a LiveCode Script.'),
            ('DevGuides', 'Extensión del IDE que ayuda a los desarrolladores LiveCode a maquetar interfaces.'),
            ('touchGestures', 'Librería para gestionar gestos táctiles en pantallas.'),
            ('Drag Drop Files into IDE', 'Plugin para arrastrar imágenes, vídeo, SVG y texto a cualquier ventana abierta del IDE de LiveCode.'),
        ],
        'oss_note': 'Código abierto en github.com/dtbyte-Ltd',
        'skills': [
            ('Web', 'JavaScript, TypeScript, HTML5, CSS3, PHP, CodeIgniter, Vue.js, Angular, Astro, Tailwind CSS, WordPress'),
            ('Multiplataforma', 'LiveCode, .NET Core / C#, Flutter / Dart'),
            ('Datos', 'SQL, MySQL, SQLite, SQL Server, APIs REST, JSON, XML, YAML'),
            ('Herramientas', 'Git, GitHub, Stacked Git, SmartGit, VS Code, Visual Studio, Android Studio'),
            ('Herramientas de IA', 'Claude Code, OpenAI Codex, Google Gemini, Google Antigravity'),
            ('Prácticas', 'Ágil (Scrum, Kanban), revisión de código, mentoría, documentación técnica, desarrollo asistido por IA'),
        ],
        'langs': [('Español', 'Nativo'), ('Inglés', 'Intermedio'), ('Portugués', 'Intermedio')],
        'footer': 'Referencias disponibles bajo solicitud',
    },
    'pt': {
        'lang': 'pt-BR', 'present': 'Atual',
        'title': 'Desenvolvedor de Software Full-Stack · Educador de Tecnologia',
        'location': 'Paraná, Brasil · Disponível para remoto',
        'h_profile': 'Perfil', 'h_exp': 'Experiência', 'h_edu': 'Formação',
        'h_oss': 'Projetos em Destaque', 'h_skills': 'Competências Técnicas', 'h_lang': 'Idiomas', 'h_facts': 'Números',
        'profile': 'Desenvolvedor de Software Full-Stack com mais de uma década de experiência projetando, construindo e mantendo aplicações multiplataforma e escaláveis para desktop, web e mobile. Une engenharia prática a uma longa trajetória como professor: comunicação técnica clara, mentoria e revisão de código. Especialista em LiveCode, com experiência em produção com .NET Core, PHP e frameworks modernos de JavaScript.',
        'facts': [('10+', 'anos de experiência'), ('300+', 'projetos entregues'), ('20+', 'tecnologias em produção')],
        'jobs': [
            ('Desenvolvedor de Software', 'LiveCode Ltd', 'remoto · Paraná, Brasil', ('2024', None), [
                'Desenvolvimento de aplicações multiplataforma e contribuição para o ecossistema LiveCode.',
                'Construção de soluções escaláveis com uma equipe internacional e distribuída em produtos de alto impacto.',
            ]),
            ('Desenvolvedor de Software', 'Severin Studio S.L.', 'remoto', DATES['severin'], [
                'Desenvolvimento de aplicações desktop e web multiplataforma para a carteira de clientes do estúdio.',
                'Responsável por funcionalidades de ponta a ponta: requisitos, estimativa, entrega e suporte.',
            ]),
            ('Desenvolvedor de Software', 'SifiSoft', 'Holguín, Cuba', DATES['sifisoft'], [
                'Desenvolvimento de aplicações desktop multiplataforma e soluções multimídia com LiveCode e .NET Core.',
                'Entrega de aplicações web com PHP/CodeIgniter e JavaScript para clientes diversos.',
            ]),
            ('Programador e Professor', 'CESOFTAD, Universidade de Holguín', 'Holguín, Cuba', ('2016', '2019'), [
                'Ministrei cursos de desenvolvimento de software e construí plataformas educacionais.',
                'Desenvolvi e mantive sistemas acadêmicos, incluindo o gerenciamento de revistas e monografias OJS/OMP.',
                'Entreguei produtos universitários como um aplicativo de memória institucional (Windows) e o app Android “Dicionário do Pensamento Martiano”.',
            ]),
            ('Desenvolvedor Estudante', 'CESOFTAD', 'Holguín, Cuba', ('2012', '2014'), [
                'Início no desenvolvimento de aplicações em produção; base sólida em LiveCode, tecnologias web e bancos de dados.',
            ]),
        ],
        'edu': [
            ('Licenciatura em Educação — Matemática e Física', 'Universidade de Holguín · Holguín, Cuba', ''),
            ('Desenvolvimento de Software (autodidata, formação contínua)', 'LiveCode, .NET Core, JavaScript, Tailwind CSS e mais', '2012 – Atual'),
        ],
        'oss': [
            ('PhotonJSON', 'Biblioteca de codificação/decodificação JSON escrita em LiveCode Script puro, sem externals.'),
            ('TinyColor for LiveCode', 'Port do micro-framework de cores TinyColor v1.4.2 para LiveCode Script.'),
            ('DevGuides', 'Extensão do IDE que ajuda desenvolvedores LiveCode a diagramar interfaces.'),
            ('touchGestures', 'Biblioteca para tratar gestos de toque em telas.'),
            ('Drag Drop Files into IDE', 'Plugin para arrastar imagens, vídeo, SVG e texto para qualquer janela aberta do IDE LiveCode.'),
        ],
        'oss_note': 'Código aberto em github.com/dtbyte-Ltd',
        'skills': [
            ('Web', 'JavaScript, TypeScript, HTML5, CSS3, PHP, CodeIgniter, Vue.js, Angular, Astro, Tailwind CSS, WordPress'),
            ('Multiplataforma', 'LiveCode, .NET Core / C#, Flutter / Dart'),
            ('Dados', 'SQL, MySQL, SQLite, SQL Server, APIs REST, JSON, XML, YAML'),
            ('Ferramentas', 'Git, GitHub, Stacked Git, SmartGit, VS Code, Visual Studio, Android Studio'),
            ('Ferramentas de IA', 'Claude Code, OpenAI Codex, Google Gemini, Google Antigravity'),
            ('Práticas', 'Ágil (Scrum, Kanban), revisão de código, mentoria, documentação técnica, desenvolvimento assistido por IA'),
        ],
        'langs': [('Espanhol', 'Nativo'), ('Inglês', 'Intermediário'), ('Português', 'Intermediário')],
        'footer': 'Referências disponíveis mediante solicitação',
    },
}

CSS = (ROOT / 'cv.css').read_text()


def span(dates, present):
    start, end = dates
    return f'{start} – {end or present}'


def page(t):
    contact = ''.join(f'<li><a href="{u}">{e(label)}</a></li>' for label, u in CONTACT)
    facts = ''.join(f'<li><b>{e(n)}</b><span>{e(l)}</span></li>' for n, l in t['facts'])
    jobs = ''
    for title, org, where, dates, bullets in t['jobs']:
        lis = ''.join(f'<li>{e(b)}</li>' for b in bullets)
        jobs += (f'<article class="job"><header><h3>{e(title)} <span class="org">— {e(org)}</span></h3>'
                 f'<p class="meta"><time>{e(span(dates, t["present"]))}</time> · {e(where)}</p></header><ul>{lis}</ul></article>')
    edu = ''.join(f'<article class="job"><header><h3>{e(a)}</h3><p class="meta">{e(b)}{(" · " + e(c)) if c else ""}</p></header></article>'
                  for a, b, c in t['edu'])
    oss = ''.join(f'<li><b>{e(n)}</b> — {e(d)}</li>' for n, d in t['oss'])
    skills = ''.join(f'<div><dt>{e(k)}</dt><dd>{e(v)}</dd></div>' for k, v in t['skills'])
    langs = ''.join(f'<li><b>{e(k)}</b><span>{e(v)}</span></li>' for k, v in t['langs'])
    return f'''<!DOCTYPE html>
<html lang="{t['lang']}">
<head>
<meta charset="utf-8">
<title>Andrés del Toro Cruz — CV</title>
<meta name="author" content="Andrés del Toro Cruz">
<meta name="description" content="{e(t['title'])}">
<style>{CSS}</style>
</head>
<body>
<main class="sheet">
  <aside class="side">
    <img class="photo" src="../../images/profile.png" alt="" width="120" height="120">
    <h1>Andrés del Toro Cruz</h1>
    <p class="role">{e(t['title'])}</p>
    <p class="loc">{e(t['location'])}</p>
    <ul class="contact">{contact}</ul>
    <section><h2>{e(t['h_facts'])}</h2><ul class="facts">{facts}</ul></section>
    <section><h2>{e(t['h_lang'])}</h2><ul class="langs">{langs}</ul></section>
    <section><h2>{e(t['h_skills'])}</h2><dl class="skills">{skills}</dl></section>
  </aside>
  <div class="body">
    <section><h2>{e(t['h_profile'])}</h2><p class="profile">{e(t['profile'])}</p></section>
    <section><h2>{e(t['h_exp'])}</h2>{jobs}</section>
    <section><h2>{e(t['h_edu'])}</h2>{edu}</section>
    <section><h2>{e(t['h_oss'])}</h2><ul class="oss">{oss}</ul><p class="note">{e(t['oss_note'])}</p></section>
    <p class="foot">{e(t['footer'])} · torocruzand.com</p>
  </div>
</main>
</body>
</html>
'''


for code, t in T.items():
    (SRC / f'cv-{code}.html').write_text(page(t))
    print('wrote', SRC / f'cv-{code}.html')
