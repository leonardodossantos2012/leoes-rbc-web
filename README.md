# Site Institucional Leões RBC

Site institucional da **Associação Desportiva RBC (Leões RBC)**, clube esportivo social de Caieiras-SP, desenvolvido pela **321takes**.

Este README é a especificação do projeto. Leia tudo antes de começar a codar.

---

## 1. Objetivo

Profissionalizar a presença digital do RBC com um site que:

1. Apresente o clube, sua missão e todas as frentes esportivas e sociais
2. Gere credibilidade para **patrocinadores e parceiros** (principal objetivo de negócio)
3. Facilite **doações e apoio** (PIX, voluntariado, patrocínio)
4. Esteja pronto para **métricas (GA4)** e **Google Ads / Google Ad Grants**
5. Seja leve, rápido no celular e acessível (o público inclui pessoas com deficiência)

---

## 2. Sobre o RBC (conteúdo base)

- **Nome:** Associação Desportiva RBC (Leões RBC). RBC = "Rescued By Christ"
- **Fundação:** 2016, Caieiras-SP
- **Missão:** "Amar o próximo como a nós mesmos" através do esporte
- **Instagram:** [@leoesrbcaieiras](https://www.instagram.com/leoesrbcaieiras/)
- **Sede:** Studio Lion (Av. Dr. Armando Pinto, 100, Centro, Caieiras-SP), quadra society coberta usada para treinos, funcional PCD, Autismo em Movimento e cultos
- **Parceiro/patrocinador:** Solví (Essencis Ambiental)

### Frentes (dados do relatório 2025)

| Frente | Números | Destaques |
|---|---|---|
| Futebol de Amputados | 20 atletas PCD | Disputam Paulista e Brasileiro, filiados à Confederação Brasileira de Futebol de Amputados |
| Futebol Feminino "Leoas" | 40 meninas | Campeonato Municipal, Copa J&E, Copa Praça, campanhas Outubro Rosa / Novembro Azul |
| Futebol de Base | 150 crianças e adolescentes | Paulista, Copa Ouro, Paulista Cup, treinos no CT do Corinthians |
| Futebol Amador Adulto | 30 atletas | Campeonato Municipal, Copa Caieiras |
| Autismo em Movimento | 21 crianças | Diferentes níveis de suporte, treinos no Studio Lion |
| Funcional PCD | 8 cadeirantes | Eventos mensais, trilhas adaptadas com cadeira joëlette |
| Ações Sociais | Datas festivas | Dia das Mulheres, Dia das Mães, Dia das Crianças, Natal |
| Cultos | Mensais | No Studio Lion |

> Todos os textos devem ser escritos em português do Brasil, tom acolhedor, inspirador e profissional. Não usar travessão (—) nos textos; usar vírgula ou ponto.

---

## 3. Stack e hospedagem

- **HTML + CSS + JavaScript puro** (sem framework, sem build step obrigatório)
- **Hospedagem:** GitHub Pages
- **Domínio:** personalizado (sugestão: `leoesrbc.org.br`), configurado via arquivo `CNAME`
- **HTTPS:** obrigatório (ativar "Enforce HTTPS" no GitHub Pages)
- **Fontes:** Bebas Neue (títulos) e Inter (texto), do Google Fonts, **hospedadas localmente** em `assets/fonts/` (sem requisição ao Google, melhor para desempenho e LGPD)
- **Ícones:** SVG inline ou biblioteca leve (ex.: Lucide via CDN)
- **Formulários:** Formspree (GitHub Pages não processa dados no servidor)

Regra geral: nada de dependências pesadas. O site precisa abrir rápido em 4G.

---

## 4. Identidade visual

- **Cores:** vermelho, branco e preto (do escudo do leão)
  - Definir como variáveis CSS em `:root` (ex.: `--red`, `--black`, `--white`, `--gray`)
  - Os hexadecimais exatos serão ajustados depois a partir do escudo oficial; usar placeholders coerentes (ex.: `#C8102E`, `#111111`, `#FFFFFF`)
- **Logos:** escudo do leão + wordmark "RBC Associação Desportiva"
  - Usar placeholders em `assets/img/logo-escudo.svg` e `assets/img/logo-wordmark.svg` até recebermos os arquivos oficiais
- **Estilo:** esportivo, forte, com muita foto e vídeo de pessoas reais. Evitar visual genérico de template

---

## 5. Estrutura de páginas

```
/
├── index.html            # Home
├── sobre.html            # História, missão, Studio Lion, fé
├── projetos.html         # Visão geral das frentes
├── cronograma.html       # Cronograma semanal (horários e locais, filtro por local)
├── projetos/
│   ├── amputados.html
│   ├── leoas.html
│   ├── base.html
│   ├── amador.html
│   ├── autismo-em-movimento.html
│   └── funcional-pcd.html
├── apoie.html            # Doação PIX, patrocínio, voluntariado
├── parceiros.html        # Patrocinadores atuais + como se tornar um
├── contato.html
├── privacidade.html      # Política de privacidade (LGPD)
├── 404.html
├── CNAME
├── robots.txt
├── sitemap.xml
└── assets/
    ├── css/style.css
    ├── js/main.js
    ├── js/consent.js
    └── img/
```

Todas as páginas de projeto usam o **mesmo template**, mudando só conteúdo.

### Home (`index.html`)
1. **Hero** com vídeo ou foto em destaque, frase da missão e dois CTAs: "Conheça os projetos" e "Apoie o RBC"
2. **Números de impacto** em contadores animados (ex.: 260+ atletas atendidos, 6 frentes, desde 2016)
3. **Cards das frentes** com foto, nome e link para a página de cada uma
4. **Studio Lion** (bloco curto com foto)
5. **Feed do Instagram** embutido (ver seção 7)
6. **Parceiros** (logos, começando por Solví)
7. **CTA final** de patrocínio e doação

### Página de projeto (template)
- Hero com foto e nome da frente
- Sobre o projeto
- Números (atletas, competições)
- Galeria de fotos
- Competições / conquistas
- CTA: "Patrocine esta frente" e "Apoie via PIX"

### Apoie (`apoie.html`)
- **Doação PIX:** QR code (imagem placeholder) + chave PIX com botão "Copiar" (placeholder `CHAVE_PIX_AQUI`)
- **Patrocínio:** benefícios para empresas (visibilidade em uniformes, redes, eventos) + formulário de interesse
- **Voluntariado:** formulário simples

### Parceiros (`parceiros.html`)
- Grade de logos dos parceiros atuais
- Seção "Por que patrocinar o RBC" com números de impacto
- Formulário de contato para empresas

### Contato
- Formulário (Formspree), botão de WhatsApp (placeholder `NUMERO_WHATSAPP`), Instagram, endereço do Studio Lion com mapa do Google embutido (placeholder)

---

## 6. Componentes globais

- **Header** fixo com logo, menu e botão de destaque "Apoie"
- **Menu mobile** (hamburger) acessível por teclado
- **Footer** com logo, links, redes, CNPJ (placeholder), link para política de privacidade e crédito "Desenvolvido por 321takes" com link para https://321takes.com
- **Botão flutuante de WhatsApp**
- **Banner de consentimento de cookies (LGPD)**

---

## 7. Integrações

### Instagram
- Embutir o feed de @leoesrbcaieiras com solução gratuita e leve (ex.: widget da Behold, LightWidget ou similar)
- Deixar o ponto de inserção isolado num bloco comentado `<!-- INSTAGRAM FEED -->` para trocarmos o provedor facilmente

### Google Tag Manager + GA4
- Instalar **Google Tag Manager** em todas as páginas (placeholder `GTM-XXXXXXX`)
- GA4 e Google Ads serão configurados dentro do GTM, não direto no código
- **Carregar o GTM só depois do consentimento** do usuário (usar Google Consent Mode v2)

### Eventos a disparar via `dataLayer`
| Evento | Quando |
|---|---|
| `click_apoie` | Clique em qualquer botão "Apoie" |
| `copy_pix` | Clique em "Copiar chave PIX" |
| `click_whatsapp` | Clique no botão de WhatsApp |
| `submit_patrocinio` | Envio do formulário de patrocínio |
| `submit_voluntario` | Envio do formulário de voluntariado |
| `submit_contato` | Envio do formulário de contato |
| `click_instagram` | Clique em link para o Instagram |

Exemplo:
```js
window.dataLayer = window.dataLayer || [];
dataLayer.push({ event: 'copy_pix' });
```

### Formulários
- Formspree com endpoint placeholder `https://formspree.io/f/SEU_ID`
- Validação no front, mensagem de sucesso/erro sem recarregar a página
- Campo honeypot anti-spam

---

## 8. Requisitos para Google Ad Grants e SEO

O site deve atender aos requisitos de sites do Google Ad Grants:
- Domínio próprio com HTTPS
- Conteúdo substancial e claro sobre a missão e as atividades
- Navegação clara, sem links quebrados
- Sem excesso de anúncios ou conteúdo comercial

SEO:
- `<title>` e `<meta name="description">` únicos por página
- Open Graph e Twitter Cards (imagem de compartilhamento `assets/img/og-image.jpg`)
- HTML semântico (`header`, `nav`, `main`, `section`, `footer`)
- Dados estruturados JSON-LD do tipo `NGO` / `SportsOrganization` na home
- `sitemap.xml` e `robots.txt`
- URLs amigáveis

---

## 9. Acessibilidade (prioridade alta)

O RBC atende pessoas com deficiência. O site precisa dar exemplo:
- Meta WCAG 2.1 nível AA
- Contraste adequado entre texto e fundo
- `alt` descritivo em todas as imagens
- Navegação completa por teclado, com foco visível
- Link "Pular para o conteúdo"
- Respeitar `prefers-reduced-motion` (desligar animações)
- Tamanho de fonte base confortável (mínimo 16px)
- Vídeos sem autoplay com som

---

## 10. Performance

- Imagens em WebP com `loading="lazy"` (exceto o hero)
- Dimensões explícitas em imagens para evitar layout shift
- CSS e JS enxutos, sem bibliotecas desnecessárias
- Meta: Lighthouse acima de 90 em Performance, Acessibilidade, Boas Práticas e SEO no mobile

---

## 11. Placeholders a substituir depois

Conteúdo pendente aparece no site com contorno tracejado vermelho (classe `.todo`) ou como bloco cinza listrado (classe `.ph`). Para achar tudo: `grep -rn "PLACEHOLDER\|_AQUI\|SEU_ID\|GTM-XXXXXXX\|NUMERO_WHATSAPP\|NOME_PROFESSOR\|00.000.000" --include=*.html --include=*.js --include=*.svg .`

| Placeholder | O que é | Onde está |
|---|---|---|
| `logo-escudo.svg` / `logo-wordmark.svg` | Logos oficiais do RBC | `assets/img/` (substituir os arquivos mantendo os nomes) |
| Cores hexadecimais | Cores exatas do escudo | `:root` em `assets/css/style.css` |
| `CHAVE_PIX_AQUI` + QR code | Dados de doação | `apoie.html` (`#pix-chave`) e `assets/img/pix-qrcode-placeholder.svg` |
| `NUMERO_WHATSAPP` | WhatsApp oficial (formato `5511999999999`) | Todas as páginas (botão flutuante, rodapé, contato, parceiros) |
| `GTM-XXXXXXX` | ID do Google Tag Manager | `assets/js/consent.js` (um único lugar) |
| `https://formspree.io/f/SEU_ID` | Endpoint dos formulários | `apoie.html` (2 formulários), `parceiros.html`, `contato.html` |
| `00.000.000/0000-00` | CNPJ | Rodapé de todas as páginas, `apoie.html`, `privacidade.html` |
| `EMAIL_ENCARREGADO` | E-mail do encarregado de dados (LGPD) | `privacidade.html` |
| `NOME_PROFESSOR` + mini-bio + foto | Professores (nome, função, frentes, bio e foto quadrada) | Seção `#professores` em `sobre.html` |
| `CONQUISTAS_AQUI` | Títulos e resultados da temporada | As 6 páginas em `projetos/` |
| Logo da Solví | Logo do parceiro | Bloco `.logos` em `index.html` e `parceiros.html` |
| Feed do Instagram | Widget do provedor escolhido | Bloco `<!-- INSTAGRAM FEED -->` em `index.html` |
| Fotos e vídeos | Material captado pela 321takes | Blocos `.ph` (trocar por `<img>` WebP com `width`, `height`, `alt` e `loading="lazy"`; o hero tem exemplo de `<video>` comentado) |
| `og-image.jpg` | Imagem de compartilhamento definitiva | `assets/img/og-image.jpg` (1200x630) |
| Domínio no `CNAME` | Domínio final | `CNAME`, `sitemap.xml`, `robots.txt` e metas `canonical`/`og:url` de cada página |

Usar imagens placeholder neutras (ex.: blocos com cor e texto indicando o que vai ali), nunca fotos de banco genéricas.

---|---|
| `logo-escudo.svg` / `logo-wordmark.svg` | Logos oficiais do RBC |
| Cores hexadecimais | Cores exatas do escudo |
| `CHAVE_PIX_AQUI` + QR code | Dados de doação |
| `NUMERO_WHATSAPP` | WhatsApp oficial |
| `GTM-XXXXXXX` | ID do Google Tag Manager |
| `https://formspree.io/f/SEU_ID` | Endpoint dos formulários |
| CNPJ e endereço | Dados oficiais da associação |
| Fotos e vídeos | Material captado pela 321takes |
| Domínio no `CNAME` | Domínio final |

Usar imagens placeholder neutras (ex.: blocos com cor e texto indicando o que vai ali), nunca fotos de banco genéricas.

---

## 12. Deploy (GitHub Pages)

1. Fazer push para a branch `main`
2. Em **Settings > Pages**, publicar a partir da branch `main`, pasta raiz
3. Adicionar o domínio personalizado (gera/usa o arquivo `CNAME`)
4. No provedor do domínio, configurar os registros DNS:
   - 4 registros `A` apontando para os IPs do GitHub Pages
   - `CNAME` de `www` apontando para `<usuario>.github.io`
5. Ativar **Enforce HTTPS**

---

## 13. Ordem de desenvolvimento sugerida

1. Estrutura base, variáveis CSS, header, footer e menu mobile
2. Home completa
3. Template de projeto + as 6 páginas de frentes
4. Sobre, Apoie, Parceiros, Contato, Privacidade, 404
5. Formulários, cópia de PIX e eventos no `dataLayer`
6. Banner de consentimento + GTM com Consent Mode
7. SEO (metas, OG, JSON-LD, sitemap, robots)
8. Revisão de acessibilidade e performance (rodar Lighthouse)

Ao final de cada etapa, fazer um commit com mensagem clara em português.

---

## 14. Checklist de entrega

- [x] Todas as páginas navegáveis e responsivas (320px até desktop)
- [x] Nenhum link quebrado (links internos e âncoras verificados)
- [ ] Formulários enviando e mostrando confirmação (validação e mensagens prontas; falta o endpoint real do Formspree)
- [ ] Botão de copiar PIX funcionando (implementado; conferir manualmente no celular com a chave real)
- [x] Eventos aparecendo no `dataLayer` (conferir no console)
- [x] GTM só carrega após aceite dos cookies (testado com ID fictício; falta o ID real)
- [x] Lighthouse mobile acima de 90 nas quatro categorias (100 em todas as páginas indexáveis, em teste local)
- [x] Navegação por teclado ok em todas as páginas
- [x] `sitemap.xml`, `robots.txt` e `CNAME` presentes
- [x] Lista de placeholders pendentes atualizada

---

Desenvolvido por **[321takes](https://321takes.com)**.
