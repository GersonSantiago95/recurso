// Sistema de progresso e renderização das aulas (Multi-Page Version)

// Chave para localStorage
const STORAGE_KEY = 'edu_tech_progress';

// Carregar progresso salvo
function loadProgress() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch (e) {
        console.warn('LocalStorage not available:', e);
        return new Set();
    }
}

// Salvar progresso
function saveProgress(completedSet) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...completedSet]));
    } catch (e) {
        console.warn('LocalStorage not available:', e);
    }
}

// Estado atual
let completedLessons = loadProgress();

// Verificar se aula está desbloqueada
function isLessonUnlocked(lessonNum) {
    if (lessonNum === 1) return true; // Aula 1 sempre desbloqueada
    return completedLessons.has(lessonNum - 1); // Precisa completar a anterior
}

// Marcar aula como completa
function completeLesson(lessonNum) {
    completedLessons.add(lessonNum);
    saveProgress(completedLessons);
    updateUI();
}

// Atualizar interface (Cards e Sumário)
function updateUI() {
    updateLessonCards();
    updateTocItems();
}

// Atualizar visual dos cards (usado na página de menu de aulas)
function updateLessonCards() {
    const cards = document.querySelectorAll('.interactive-card[data-lesson]');
    if (cards.length === 0) return;

    cards.forEach(card => {
        const lessonNum = parseInt(card.dataset.lesson);
        const isUnlocked = isLessonUnlocked(lessonNum);
        const isCompleted = completedLessons.has(lessonNum);

        if (!isUnlocked) {
            card.style.opacity = '0.5';
            card.style.filter = 'grayscale(100%)';
            card.style.cursor = 'not-allowed';
            card.onclick = (e) => {
                e.preventDefault();
                alert('Complete a aula anterior para desbloquear esta!');
            };
        } else {
            card.style.opacity = '1';
            card.style.filter = 'none';
            card.style.cursor = 'pointer';
            card.style.pointerEvents = 'auto';

            // Link direto
            card.onclick = () => {
                window.location.href = `../aulas/aula${lessonNum.toString().padStart(2, '0')}/index.html`;
            };
        }

        if (isCompleted) {
            card.style.borderColor = '#10b981';
            card.style.borderWidth = '3px';
            if (!card.querySelector('.completed-badge')) {
                const badge = document.createElement('div');
                badge.className = 'completed-badge absolute top-2 right-2 bg-green-500 text-white rounded-full p-1';
                badge.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" class="stroke-current stroke-2"><path d="M20 6L9 17l-5-5"/></svg>';
                card.style.position = 'relative';
                card.appendChild(badge);
            }
        }
    });
}

// Atualizar visual do sumário (usado na página de sumário)
function updateTocItems() {
    const items = document.querySelectorAll('.toc-item[data-lesson]');
    if (items.length === 0) return;

    items.forEach(item => {
        const lessonNum = parseInt(item.dataset.lesson);
        const isUnlocked = isLessonUnlocked(lessonNum);
        const isCompleted = completedLessons.has(lessonNum);

        item.classList.remove('opacity-50', 'grayscale', 'cursor-not-allowed', 'bg-green-100');

        if (!isUnlocked) {
            item.classList.add('opacity-50', 'grayscale', 'cursor-not-allowed');
            item.onclick = (e) => {
                e.preventDefault();
                alert('Complete a aula anterior para desbloquear esta!');
            };
        } else {
            item.style.cursor = 'pointer';
            item.onclick = () => {
                window.location.href = `../aulas/aula${lessonNum.toString().padStart(2, '0')}/index.html`;
            };
        }

        if (isCompleted) {
            item.classList.add('bg-green-50');
            if (!item.innerHTML.includes('✅')) {
                const titleSpan = item.querySelector('span:first-child');
                if (titleSpan) titleSpan.innerHTML += ' ✅';
            }
        }
    });
}

// NOVA FUNÇÃO: Renderização de Aulas Refatoradas (Suporte a Main Layout)
function initLessonPage() {
    const body = document.body;
    const lessonIdStr = body.getAttribute('data-lesson-id');

    // Se não tiver data-lesson-id, não é uma página de aula refatorada
    if (!lessonIdStr) return;

    // Verificar dependências
    if (typeof lessonConfig === 'undefined' || typeof renderMainLayout === 'undefined') {
        console.error('Dependências (config.js, components.js) não carregadas.');
        return;
    }

    const lessonId = parseInt(lessonIdStr);

    // MODO MAIN LAYOUT: Procura por template de conteúdo
    const contentTemplate = document.getElementById('lesson-content');

    if (contentTemplate) {
        // Extrai conteúdo do template
        const contentHTML = contentTemplate.innerHTML;

        // Gera o layout completo
        const fullPageHTML = renderMainLayout(lessonId, contentHTML);

        // Injeta no body (mantendo os scripts que estão no head/final do body se necessário, 
        // mas aqui estamos substituindo o innerHTML do body todo, o que pode matar scripts inline do body se houver.
        // Como nossos scripts estão no head com defer, eles já rodaram ou estão rodando.
        // O ideal é inserir DENTRO do body, preservando o que não deve ser sobrescrito?
        // Neste caso, vamos sobrescrever o innerHTML do body, pois o script.js é externo e já está na memória.

        // Hack para evitar layout shift visual: body já deve estar hidden ou estilizado
        document.body.innerHTML = fullPageHTML;

        // Re-attach events (pois o DOM foi reescrito)
        attachNavigationEvents(lessonId);
    } else {
        // MODO LEGADO/PARCIAL (sem template, apenas placeholders)
        // Mantido para compatibilidade se algo falhar ou template não existir
        const headerContainer = document.getElementById('lesson-header-placeholder');
        if (headerContainer) headerContainer.innerHTML = renderLessonHeader(lessonId);

        const footerContainer = document.getElementById('lesson-footer-placeholder');
        if (footerContainer) {
            // Precisamos da lógica de botões aqui manualmente se não usar o MainLayout
            // Mas como components.js agora tem renderLessonFooterButtons separada, ok.
            // Simplificação: vamos focar no MainLayout. Se falhar, não faz nada.
        }

        const backContainer = document.getElementById('back-link-container');
        if (backContainer) backContainer.innerHTML = renderBackLink();

        attachNavigationEvents(lessonId);
    }
}

function attachNavigationEvents(lessonId) {
    const completeBtn = document.getElementById('btn-complete-lesson');
    if (completeBtn) {
        completeBtn.addEventListener('click', (e) => {
            // Se for link (<a>), evitar navegação imediata
            if (completeBtn.tagName === 'A') {
                // Deixa navegar naturalmente se for link, mas marca completo antes?
                // O evento de clique dispara, marca completo.
                // Se for link externo ou página, o browser segue.
                completeLesson(lessonId);
            } else {
                // Botão
                completeLesson(lessonId);
                const config = lessonConfig[lessonId];
                if (config && config.nextLessonLink) {
                    setTimeout(() => {
                        window.location.href = config.nextLessonLink;
                    }, 300);
                }
            }
        });
    }
}

// Inicialização Global
document.addEventListener('DOMContentLoaded', () => {
    initLessonPage();
    updateUI();

    // Fallback legado
    const legacyBtn = document.getElementById('btn-complete-lesson');
    if (legacyBtn && !document.body.hasAttribute('data-lesson-id')) {
        legacyBtn.addEventListener('click', (e) => {
            const lessonNum = parseInt(legacyBtn.dataset.lesson);
            if (lessonNum) completeLesson(lessonNum);
        });
    }
});
