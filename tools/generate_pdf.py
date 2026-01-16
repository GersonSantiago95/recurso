import os
from playwright.sync_api import sync_playwright

def generate_pdf():
    # Caminho para o arquivo index.html (um nível acima da pasta tools)
    current_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(current_dir)
    html_path = os.path.join(project_root, 'index.html')
    output_path = os.path.join(project_root, 'site_completo.pdf')

    # Verifica se o arquivo existe
    if not os.path.exists(html_path):
        print(f"Erro: Arquivo não encontrado em {html_path}")
        return

    # URL local para o arquivo
    file_url = f"file:///{html_path.replace(os.sep, '/')}"
    print(f"Carregando: {file_url}")

    with sync_playwright() as p:
        # Lança o navegador (chromium é a base do Chrome/Edge)
        browser = p.chromium.launch()
        page = browser.new_page()

        # Carrega a página
        page.goto(file_url, wait_until="networkidle")

        # Injeta CSS para preparar para impressão (modo slide-by-side)
        print("Injetando estilos para impressão...")
        page.evaluate("""() => {
            // Revelar todas as seções escondidas (classes .hidden do tailwind e display:none)
            const style = document.createElement('style');
            style.innerHTML = `
                /* Força a exibição de todos os slides */
                [id^="page-"], [id^="lesson-"] {
                    display: block !important;
                    position: relative !important;
                    opacity: 1 !important;
                    visibility: visible !important;
                    transform: none !important;
                    min-height: 100vh !important;
                    padding-top: 20px !important;
                    padding-bottom: 20px !important;
                    page-break-after: always !important;
                    margin-bottom: 0 !important;
                }

                /* Esconde elementos de navegação e interativos que não fazem sentido no PDF */
                button, 
                .page-number, 
                .fixed.bottom-20,
                .back-to-page7,
                .back-to-sumario,
                [id$="-prev"], [id$="-next"], [id$="-to-start"], [id^="next-to-"] {
                    display: none !important;
                }

                /* Ajustes gerais de layout para impressão */
                html, body {
                    height: auto !important;
                    overflow: visible !important;
                    background: white !important;
                }
                
                #app-wrapper {
                    overflow: visible !important;
                    height: auto !important;
                }

                /* Garante que o fundo apareça se definido */
                * {
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                }
            `;
            document.head.appendChild(style);
        }""")

        # Aguarda um pouco para garantir que estilos e imagens renderizem
        page.wait_for_timeout(2000)

        # Gera o PDF
        print(f"Gerando PDF em: {output_path}")
        page.pdf(
            path=output_path,
            format="A4",
            print_background=True,
            margin={"top": "0cm", "right": "0cm", "bottom": "0cm", "left": "0cm"}
        )

        browser.close()
        print("Sucesso! O arquivo 'site_completo.pdf' foi criado na pasta do projeto.")

if __name__ == "__main__":
    generate_pdf()
