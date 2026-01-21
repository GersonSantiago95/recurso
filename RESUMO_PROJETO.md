# Resumo do Projeto: Trilha Formativa em Tecnologias Educacionais

## 🎯 Objetivo Principal
Recurso Educacional Digital (RED) voltado para educadores, focado no uso pedagógico de tecnologias (Google for Education). O projeto funciona como uma aplicação web estática (SPA simulada) com navegação entre páginas e aulas interativas.

---

## ✅ Estrutura do Projeto (v1.0)

O projeto foi reestruturado para melhor organização e integridade:

### 1. Diretórios Principais
- **`index.html`**: Página de entrada (Capa).
- **`pages/`**: Páginas de conteúdo sequencial (02 a 10).
- **`aulas/`**: 11 Aulas práticas (aula01 a aula11).
- **`assets/`**: Imagens e ícones (migrado de `public/`).
- **`src/`**: Código-fonte organizado por domínio (Screaming Architecture):
  - `dominio/`: Lógica de negócios (catalogo-aulas.js)
  - `interface/`: Componentes visuais (layout-aula.js)
  - `aplicacao/`: Orquestração (inicializador-aula.js)
  - `apresentacao/`: Estilos (tema-educacional.css)
  - `fichaCatalografica/`: Dados específicos (dados_ficha.js)
- **`tools/`**: Scripts de automação e testes em Python.

### 2. Melhorias Recentes
- **Renumeração de Páginas**: Removida página vazia 02; sequência ajustada de 02 a 10.
- **Correção de Navegação**: Todos os links "Anterior/Próxima" validados.
- **Migração de Assets**: Pasta `public` renomeada para `assets` para compatibilidade com servidores.
- **Limpeza de Código**: Removidas referências a SDKs inexistentes (`_sdk/`) que causavam erros 404.
- **Favicon**: Adicionado favicon personalizado em todas as páginas.

---

## �️ Ferramentas e Scripts

Ferramentas Python criadas para garantir a qualidade do projeto:

### Testes de Regressão (`tools/`)
1. **`test_navigation_back.py`**: Valida todos os botões "Anterior".
2. **`test_navigation_next.py`**: Valida todos os botões "Próxima".
3. **`verify_assets.py`**: Valida a existência de todos os arquivos referenciados (CSS, JS, Imagens).
4. **`run_all_tests.py`**: Executa a suite completa de testes.

### Comandos de Teste
Para verificar a integridade do projeto, execute:
```bash
python tools/run_all_tests.py
```



## 🛠️ Stack Tecnológico

### Frontend
- **HTML5**: Estrutura semântica das páginas
- **CSS3**: Estilização customizada
- **TailwindCSS**: Framework utilitário via CDN (`cdn.tailwindcss.com`)
- **JavaScript (Vanilla)**: Lógica client-side sem frameworks
  - Renderização dinâmica de componentes
  - Sistema de progresso com `localStorage`
  - Navegação entre aulas

### Arquitetura de Código
- **Screaming Architecture** (branch `test/dry`):
  - `src/dominio/`: Lógica de negócios (catálogo de aulas)
  - `src/interface/`: Componentes visuais (layouts)
  - `src/aplicacao/`: Orquestração e inicialização
  - `src/apresentacao/`: Estilos e temas
  - `src/fichaCatalografica/`: Dados específicos

### Hospedagem/Servidor
- **Servidor HTTP Estático**: Qualquer servidor (Nginx, Apache, http-server)
- **Sem Backend**: 100% client-side
- **Offline-first**: Funciona localmente sem internet

---

## 🔧 Ferramentas de Build e Desenvolvimento

### Ambiente Local
- **Node.js** (opcional): Para servidor de desenvolvimento
  - `npx http-server -p 8080`: Servidor local rápido
  - `npx live-server`: Com auto-reload

### Controle de Versão
- **Git**: Versionamento de código
- **GitHub**: Repositório remoto
  - Branch `main`: Código estável (estrutura flat)
  - Branch `test/dry`: Código refatorado (Screaming Architecture)

### Testes e Validação
- **Python 3.11+**: Scripts de teste automático
  - `pytest`: Framework de testes
  - `beautifulsoup4`: Parsing de HTML
  - `requests`: Validação de links

### Ferramentas de Desenvolvimento
- **VS Code**: Editor recomendado
- **Git Flow**: Estratégia de branches
- **PowerShell**: Automação de tarefas (Windows)

### Deploy
- **GitHub Pages**: Hospedagem estática gratuita
- **Netlify/Vercel**: Alternativas com CI/CD automático
- **Nenhum build step necessário**: HTML/CSS/JS prontos para produção

---

## 📦 Comandos Úteis

### Desenvolvimento
```bash
# Iniciar servidor local
npx http-server -p 8080

# Executar testes
python tools/run_all_tests.py

# Verificar status do Git
git status

# Trocar entre branches
git switch main        # Código estável
git switch test/dry    # Código refatorado
```

### Deploy Estático
```bash
# Todo conteúdo em raiz do projeto já está pronto
# Apenas copie para servidor web ou hospedagem estática
```

