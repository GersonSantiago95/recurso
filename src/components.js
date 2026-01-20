
// Componentes de Interface para Aulas (Vanilla JS)

function renderBackLink() {
    return `
    <a href="../../pages/06_menu_aulas.html"
        class="mb-6 flex items-center gap-2 text-white/90 hover:text-white font-semibold transition-all no-underline">
        <svg width="20" height="20" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
        </svg>
        Voltar para Aulas
    </a>`;
}

function renderLessonHeader(lessonId) {
    const config = lessonConfig[lessonId];
    if (!config) return '';

    return `
    <header class="mb-8 fade-in">
        <div class="bg-white/95 backdrop-blur rounded-2xl p-6 md:p-8 shadow-xl">
            <div class="flex items-center gap-4 mb-4">
                <div class="bg-${config.color}-500 p-4 rounded-xl">
                    <svg width="40" height="40" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        ${config.iconSvg}
                    </svg>
                </div>
                <div class="flex-1">
                    <div class="text-sm font-semibold text-${config.color}-600 mb-1">
                        AULA ${lessonId.toString().padStart(2, '0')}
                    </div>
                    <h1 class="text-3xl md:text-4xl font-bold text-gray-800">${config.title}</h1>
                    <p class="text-xl text-gray-600 mt-2">${config.subtitle}</p>
                </div>
            </div>
        </div>
    </header>`;
}

function renderLessonFooterButtons(lessonId) {
    const config = lessonConfig[lessonId];
    if (!config) return '';

    // Lógica especial para última aula (link direto vs botão de script)
    if (parseInt(lessonId) === 11) {
        return `
        <a href="../../pages/04_sumario.html"
            class="back-to-sumario bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold px-8 py-4 rounded-xl hover:shadow-xl transition-all flex items-center gap-2 no-underline">
            <svg width="20" height="20" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" />
            </svg>
            Sumário
        </a>
        <a href="${config.nextLessonLink}" id="btn-complete-lesson" data-lesson="${lessonId}"
            class="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-8 py-4 rounded-xl hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer no-underline">
            ${config.nextLessonName}
            <svg width="20" height="20" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </a>`;
    }

    return `
    <a href="../../pages/04_sumario.html"
        class="back-to-sumario bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold px-8 py-4 rounded-xl hover:shadow-xl transition-all flex items-center gap-2 no-underline">
        <svg width="20" height="20" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" />
        </svg>
        Sumário
    </a>
    <button id="btn-complete-lesson" data-lesson="${lessonId}"
        class="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold px-8 py-4 rounded-xl hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer border-none">
        ${config.nextLessonName}
        <svg width="20" height="20" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    </button>`;
}

// MAIN LAYOUT GENERATOR
function renderMainLayout(lessonId, contentHTML) {
    const headerHTML = renderLessonHeader(lessonId);
    const footerButtonsHTML = renderLessonFooterButtons(lessonId);
    const backLinkHTML = renderBackLink();

    return `
    <div id="app-wrapper" class="w-full h-full gradient-bg classroom-pattern overflow-auto">
        <div class="min-h-full py-8 px-4 md:px-8">
            <div id="lesson-${lessonId}" class="max-w-6xl mx-auto pt-8 min-h-screen">
                
                <!-- Back Link Area -->
                <div id="back-link-container" class="fade-in">
                    ${backLinkHTML}
                </div>

                <!-- Header Area -->
                <div id="lesson-header-placeholder">
                    ${headerHTML}
                </div>

                <!-- Main Content Area (Injected) -->
                <main id="main-content">
                    ${contentHTML}
                </main>

                <!-- Footer Area -->
                <div id="lesson-footer-placeholder">
                    <div class="flex justify-between items-center mt-8 pb-8">
                        ${footerButtonsHTML}
                    </div>
                </div>

            </div>
        </div>
    </div>`;
}
