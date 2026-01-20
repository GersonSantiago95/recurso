// Configurações das aulas
const lessonConfig = {
    1: {
        title: "Google Sala de Aula",
        subtitle: "Prepare-se para usar a tecnologia na sala de aula",
        color: "green",
        nextLessonName: "Documentos Google",
        nextLessonLink: "../../aulas/aula02/index.html",
        iconSvg: `<path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" fill="white" /><path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" fill="white" />`
    },
    2: {
        title: "Documentos Google e Gemini",
        subtitle: "Trabalhe de forma colaborativa com Documentos Google e Gemini",
        color: "blue",
        nextLessonName: "Google Meet",
        nextLessonLink: "../../aulas/aula03/index.html",
        iconSvg: `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />`
    },
    3: {
        title: "Google Meet",
        subtitle: "Amplie sua comunicação para receber ajuda e facilitar a aprendizagem",
        color: "red",
        nextLessonName: "Google Agenda e Tarefas",
        nextLessonLink: "../../aulas/aula04/index.html",
        iconSvg: `<rect x="2" y="6" width="14" height="12" rx="2" stroke="white" stroke-width="2" /><path d="M16 10l6-3v10l-6-3" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />`
    },
    4: {
        title: "Google Agenda e Google Tarefas",
        subtitle: "Organize tarefas, defina prazos e receba lembretes",
        color: "amber",
        nextLessonName: "Google Formulários",
        nextLessonLink: "../../aulas/aula05/index.html",
        iconSvg: `<rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="white" stroke-width="2" /><line x1="16" y1="2" x2="16" y2="6" stroke="white" stroke-width="2" /><line x1="8" y1="2" x2="8" y2="6" stroke="white" stroke-width="2" /><line x1="3" y1="10" x2="21" y2="10" stroke="white" stroke-width="2" />`
    },
    5: {
        title: "Google Formulários",
        subtitle: "Avalie a evolução dos estudantes através dos formulários Google",
        color: "purple",
        nextLessonName: "Drive e Planilhas",
        nextLessonLink: "../../aulas/aula06/index.html",
        iconSvg: `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /><path d="M14 2v6h6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /><path d="M16 13H8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /><path d="M16 17H8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /><path d="M10 9H8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />`
    },
    6: {
        title: "Drive e Planilhas",
        subtitle: "Mensure e acompanhe o desenvolvimento dos alunos",
        color: "yellow",
        nextLessonName: "Google Apresentações",
        nextLessonLink: "../../aulas/aula07/index.html",
        iconSvg: `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /><path d="M14 2v6h6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /><line x1="8" y1="13" x2="16" y2="13" stroke="white" stroke-width="2" stroke-linecap="round" /><line x1="8" y1="17" x2="16" y2="17" stroke="white" stroke-width="2" stroke-linecap="round" /><polyline points="10 9 9 9 8 9" stroke="white" stroke-width="2" stroke-linecap="round" />`
    },
    7: {
        title: "Google Apresentações",
        subtitle: "Transforme suas ideias em slides geniais com Apresentações Google",
        color: "orange",
        nextLessonName: "Gmail e Grupos do Google",
        nextLessonLink: "../../aulas/aula08/index.html",
        iconSvg: `<rect x="2" y="3" width="20" height="16" rx="2" stroke="white" stroke-width="2" /><path d="M8 7h8M8 11h8M8 15h5" stroke="white" stroke-width="2" stroke-linecap="round" />`
    },
    8: {
        title: "Gmail e Grupos do Google",
        subtitle: "Uma sala de aula (quase) totalmente digital",
        color: "pink",
        nextLessonName: "Chrome e Extensões",
        nextLessonLink: "../../aulas/aula09/index.html",
        iconSvg: `<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="white" stroke-width="2" /><path d="M22 6l-10 7L2 6" stroke="white" stroke-width="2" stroke-linecap="round" />`
    },
    9: {
        title: "Chrome e Extensões e Desenhos",
        subtitle: "Aprimore sua prática pedagógica com recursos interativos",
        color: "teal",
        nextLessonName: "Google Sites",
        nextLessonLink: "../../aulas/aula10/index.html",
        iconSvg: `<circle cx="12" cy="12" r="9" stroke="white" stroke-width="2" /><circle cx="12" cy="12" r="3" fill="white" />`
    },
    10: {
        title: "Google Sites",
        subtitle: "Leve os trabalhos dos estudantes para o mundo digital",
        color: "indigo",
        nextLessonName: "Certificação Google",
        nextLessonLink: "../../aulas/aula11/index.html",
        iconSvg: `<rect x="3" y="3" width="18" height="18" rx="2" stroke="white" stroke-width="2" /><path d="M3 9h18M9 21V9" stroke="white" stroke-width="2" />`
    },
    11: {
        title: "Certificação Google",
        subtitle: "Prepare-se para a Certificação Oficial",
        color: "amber",
        nextLessonName: "Considerações Finais 🎓",
        nextLessonLink: "../../pages/07_final.html",
        iconSvg: `<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="white" />`
    }
};
