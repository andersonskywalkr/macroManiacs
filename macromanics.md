# MacroManiacs — Documentação Completa do Projeto

> Arquivo base para desenvolvimento do MVP com Codex/IA.  
> Stack definida: **React Native + Expo + TypeScript** no frontend, **Flask + MongoDB** no backend.  
> Entrega mobile: **APK Android**.

---

## 0. Objetivo deste documento

Este documento é a especificação central do projeto **MacroManiacs** para guiar o desenvolvimento completo do MVP.

Ele deve ser usado por agentes de IA, Codex, Claude Code ou desenvolvedores humanos como referência para:

- entender o produto;
- entender a jornada do usuário;
- implementar o frontend mobile;
- integrar com backend Flask;
- manter consistência visual;
- implementar telas, fluxos, casos de uso e estados;
- criar mocks quando o backend ainda não estiver pronto;
- preparar build Android em `.apk`.

O documento consolida:

- visão de produto;
- identidade visual;
- arquitetura técnica;
- frontend React Native/Expo;
- backend Flask;
- MongoDB;
- fluxos principais;
- páginas;
- componentes;
- casos de uso;
- endpoints esperados;
- modelos de dados;
- regras de gamificação;
- estados de UI;
- estratégia de desenvolvimento do MVP.

---

# 1. Visão geral do produto

## 1.1 O que é o MacroManiacs

**MacroManiacs** é um aplicativo mobile social e gamificado de dieta.

A proposta é ser um **“GymRats para dietas”**: uma experiência jovem, competitiva e divertida onde usuários escaneiam sua dieta, acompanham macros, registram refeições, participam de clubes/desafios, postam check-ins no feed, ganham pontos, badges e medalhas, e competem em rankings com amigos.

O app deve fugir completamente da estética tradicional de app de dieta, saúde clínica, wellness ou contador de calorias para público mais velho.

## 1.2 Proposta central

> Transformar dieta em jogo social: escaneie seu plano, bata seus macros, poste check-ins no grupo, ganhe medalhas no avatar e dispute o ranking com seus amigos.

## 1.3 Pilares do produto

1. **Dieta digitalizada**  
   IA transforma foto/PDF/texto em refeições e metas de macros.

2. **Macro counter diário**  
   Usuário acompanha consumo versus meta em tempo real.

3. **Feed social do grupo**  
   Check-ins viram prova social, zoeira e accountability.

4. **Ranking + avatar + medalhas**  
   Dieta vira jogo, status, coleção e competição.

5. **Open Food Facts**  
   Produtos podem ser consultados por código de barras para obter dados nutricionais.

## 1.4 Posicionamento

Frases de posicionamento:

- `Bata macros. Ganhe medalhas. Suba no ranking.`
- `Dieta é difícil sozinho. Com os amigos, vira jogo.`
- `Não é só contar calorias. É vencer a semana.`
- `Sua dieta virou jogo social.`
- `Macros, medalhas e ranking com seus amigos.`

## 1.5 Tom de voz

O tom deve ser:

- jovem;
- provocativo;
- divertido;
- social;
- competitivo;
- direto;
- com humor de internet/gym culture;
- sem linguagem clínica;
- sem culpa alimentar pesada;
- sem incentivar comportamento perigoso.

Exemplos de microcopy:

- `Proteína batida. Hoje você não foi frango.`
- `Faltam 38g de proteína. Só mais um franguinho.`
- `Ranking atualizado.`
- `Vai deixar a Ana passar?`
- `Maniac mode ativado.`
- `Dieta registrada. Agora vira jogo.`
- `Streak pegando fogo.`
- `Seu avatar ganhou uma medalha nova.`
- `A maionese venceu essa batalha.`
- `O carbo fugiu do controle, mas o jogo ainda não acabou.`

## 1.6 Aviso de responsabilidade

O produto lida com alimentação, peso, idade, altura e objetivos físicos. Portanto, incluir aviso claro em onboarding e telas de dieta:

> O MacroManiacs não substitui acompanhamento médico ou nutricional. A gente organiza e gamifica informações fornecidas por você.

O app não deve:

- prometer emagrecimento;
- prescrever dieta como profissional de saúde;
- incentivar restrição extrema;
- humilhar o usuário;
- gerar culpa alimentar;
- romantizar comportamento alimentar perigoso.

---

# 2. Identidade visual

## 2.1 Direção visual

A identidade escolhida é baseada em um **mascote roxo**, jovem, caótico, divertido, expressivo e app-friendly.

O app deve parecer um jogo social mobile, com energia de academia, ranking, medalhas e competição.

## 2.2 Características visuais

O app deve comunicar:

- juventude;
- academia;
- competição;
- social;
- mascote;
- ranking;
- medalhas;
- streaks;
- caos controlado;
- humor;
- app premium;
- visual de jogo mobile.

## 2.3 Princípios visuais

- **Dark first:** fundo escuro ou roxo profundo.
- **Game-like:** progresso, pontos, streaks, medalhas e rankings.
- **Social first:** feed, grupo, chat e reações são centrais.
- **Reward-driven:** conquistas devem aparecer visualmente.
- **Fun, not shame:** provocação leve, sem humilhação pesada.
- **Mascot-driven:** o mascote e avatares devem dar personalidade.

## 2.4 Paleta de cores

Baseada no logo/mascote roxo.

```ts
export const colors = {
  darkPurple: "#1A082F",
  deepPurple: "#2A0F4A",
  cardPurple: "#35145F",
  mascotPurple: "#8B4DFF",
  vibrantPurple: "#9B5CFF",
  lightLavender: "#C7A6FF",
  softLavender: "#E9DCFF",
  offWhite: "#FFF9F0",
  white: "#FFFFFF",
  medalGold: "#FFD447",
  coralAlert: "#FF5A5F",
  darkInk: "#170B26",
  mutedTextDark: "#B8A8CE",
  mutedTextLight: "#6D5A80",
};
```

## 2.5 Dark mode

Dark mode é o modo principal do app.

Usar:

- fundo roxo escuro/quase preto;
- cards em roxo profundo;
- textos em branco/off-white;
- botões em roxo vibrante;
- medalhas em dourado;
- alertas em coral;
- bordas suaves em lilás/roxo.

## 2.6 Light mode

O app também deve ter light mode.

Usar:

- fundo branco/off-white;
- cards brancos;
- texto em roxo escuro;
- botões em roxo vibrante;
- bordas em lilás claro;
- medalhas em dourado;
- alertas em coral.

Importante: o light mode **não pode parecer app médico/wellness**. Mesmo claro, precisa parecer jovem e gamificado.

## 2.7 Design system

Criar componentes próprios. Não usar visual padrão sem customização.

Componentes base:

- `ManiacButton`
- `ManiacCard`
- `MacroCounterCard`
- `MacroProgressBar`
- `AvatarPreview`
- `FeedPostCard`
- `RankingUserCard`
- `MedalBadge`
- `LoadingManiac`
- `EmptyState`
- `ScreenHeader`
- `BottomTabBar`
- `ChallengeCard`
- `CheckInOptionCard`
- `GroupHeader`
- `PodiumTopThree`

---

# 3. Stack técnica definida

## 3.1 Frontend mobile

Stack do app:

```txt
Expo
React Native
TypeScript
Expo Router
Axios
TanStack Query
Zustand
Expo Camera
Expo Image Picker
Expo Document Picker
Expo File System
Expo SecureStore
Expo Linear Gradient
React Native SVG
Lucide React Native
Moti ou Reanimated
StyleSheet customizado ou NativeWind
```

## 3.2 Backend

Backend será responsabilidade de outra pessoa, mas o frontend deve ser planejado para integrar com:

```txt
Python
Flask
MongoDB
Flask-JWT-Extended ou equivalente
Pydantic/Marshmallow para validação
Open Food Facts API
Serviço de IA/OCR
Storage para imagens/PDFs
Push notifications futuramente
```

## 3.3 Banco de dados

Banco principal:

```txt
MongoDB
```

O banco guarda:

- usuários;
- perfis;
- avatares;
- dietas;
- refeições;
- produtos;
- check-ins;
- grupos;
- desafios;
- rankings;
- pontos;
- medalhas;
- badges;
- feed;
- chat.

## 3.4 Serviços externos

- Open Food Facts API.
- Serviço de IA/OCR.
- Storage para imagens/PDFs.
- Push notifications.

## 3.5 Deploy do app

Entrega do MVP:

```txt
APK Android
```

Usar Expo/EAS Build ou prebuild/build local, conforme disponibilidade.

---

# 4. Arquitetura geral

## 4.1 Fluxo de dados macro

```txt
Usuário
↓
Frontend Mobile React Native/Expo
↓
Backend API Flask
↓
MongoDB
↓
Serviços externos:
  - Open Food Facts
  - IA/OCR
  - Storage
  - Push notifications
```

## 4.2 Responsabilidades do Frontend Mobile

Responsável por:

- telas;
- navegação;
- estado de UI;
- scanner de barcode;
- upload de imagem/PDF;
- gráficos de macros;
- feed;
- ranking;
- avatar;
- chat;
- tema dark/light;
- integração com backend;
- mocks enquanto backend não estiver pronto;
- estados de loading/error/empty;
- experiência visual premium.

## 4.3 Responsabilidades do Backend API

Responsável por:

- autenticação;
- regras de negócio;
- integração com Open Food Facts;
- IA;
- cálculo de macros;
- pontuação;
- ranking;
- feed;
- persistência;
- validação;
- uploads;
- normalização de produtos;
- criação de eventos.

## 4.4 Responsabilidades do MongoDB

Guarda:

- usuários;
- perfis;
- avatares;
- dietas;
- refeições;
- produtos;
- check-ins;
- grupos;
- desafios;
- rankings;
- pontos;
- medalhas;
- badges;
- feed;
- chat.

---

# 5. Arquitetura do frontend React Native/Expo

## 5.1 Princípio principal

O app deve funcionar com `Mock API/Fake Services` antes da integração real.

Isso permite desenvolver a demo visual sem depender do backend.

## 5.2 Camadas do frontend

```txt
screens/routes
↓
components
↓
state/hooks
↓
services
↓
api
↓
backend Flask
```

## 5.3 Estrutura de pastas recomendada

```txt
macromaniacs/
├── app/
│   ├── _layout.tsx
│   ├── index.tsx
│   ├── auth/
│   │   ├── login.tsx
│   │   └── register.tsx
│   ├── onboarding/
│   │   ├── avatar.tsx
│   │   ├── body-data.tsx
│   │   ├── diet-scan.tsx
│   │   ├── diet-processing.tsx
│   │   ├── diet-review.tsx
│   │   └── group-entry.tsx
│   ├── app/
│   │   ├── _layout.tsx
│   │   ├── home.tsx
│   │   ├── macros.tsx
│   │   ├── check-in.tsx
│   │   ├── barcode-scanner.tsx
│   │   ├── product-review.tsx
│   │   ├── planned-meal.tsx
│   │   ├── manual-check-in.tsx
│   │   ├── check-in-success.tsx
│   │   ├── group.tsx
│   │   ├── feed.tsx
│   │   ├── ranking.tsx
│   │   ├── chat.tsx
│   │   ├── profile.tsx
│   │   ├── medals.tsx
│   │   ├── diet.tsx
│   │   └── settings.tsx
│   └── modal.tsx
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── constants/
│   ├── features/
│   ├── hooks/
│   ├── lib/
│   ├── services/
│   ├── mocks/
│   ├── store/
│   └── types/
│
├── app.json
├── eas.json
├── package.json
├── tsconfig.json
└── macromanics.md
```

---

# 6. Bibliotecas frontend

## 6.1 Instalação base

```bash
npx create-expo-app macromaniacs --template
```

Usar TypeScript.

## 6.2 Dependências

```bash
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar
npm install axios @tanstack/react-query zustand
npx expo install expo-secure-store
npx expo install expo-camera
npx expo install expo-image-picker
npx expo install expo-document-picker
npx expo install expo-file-system
npx expo install expo-linear-gradient
npm install react-native-svg lucide-react-native
npm install moti react-native-reanimated
```

Se usar NativeWind:

```bash
npm install nativewind
npm install --save-dev tailwindcss
```

## 6.3 Recomendação para prazo curto

Para evitar bugs de configuração, usar:

- `StyleSheet` customizado;
- `expo-linear-gradient`;
- `lucide-react-native`;
- `moti` para animações simples;
- `zustand` para estado global;
- `tanstack/react-query` para API.

---

# 7. Rotas do app

## 7.1 Fluxo de autenticação

```txt
/
→ /auth/login
→ /auth/register
```

## 7.2 Onboarding

```txt
/onboarding/avatar
/onboarding/body-data
/onboarding/diet-scan
/onboarding/diet-processing
/onboarding/diet-review
/onboarding/group-entry
```

## 7.3 App principal

```txt
/app/home
/app/macros
/app/check-in
/app/barcode-scanner
/app/product-review
/app/planned-meal
/app/manual-check-in
/app/check-in-success
/app/group
/app/feed
/app/ranking
/app/chat
/app/profile
/app/medals
/app/diet
/app/settings
```

## 7.4 Bottom tabs

Usar bottom navigation com:

```txt
Home
Grupo
Check-in
Ranking
Perfil
```

O botão de `Check-in` deve ser central, maior e mais chamativo.

---

# 8. Jornada macro do usuário

```txt
Login
→ Cadastro
→ Criação do avatar
→ Dados físicos
→ Scanner da dieta
→ IA extrai dieta
→ Usuário revisa macros
→ Cria ou entra em clube/desafio
→ Primeiro check-in
→ Home do grupo
→ Contador diário de macros
→ Feed do grupo
→ Ranking
→ Badges e medalhas no avatar
```

---

# 9. Fluxograma de onboarding

## 9.1 Objetivo

Levar o usuário do primeiro acesso até o início da competição social, com dieta ativa, avatar e grupo/desafio.

## 9.2 Fluxo

```txt
[01. Splash / Tela inicial]
↓
[02. Login ou cadastro]
↓
[03. Criar perfil básico]
↓
[04. Criar avatar 2D]
↓
[05. Informar idade, altura e peso]
↓
[06. Escolher objetivo]
↓
[07. Scanner da dieta]
↓
[08. IA processa dieta]
↓
[09. Revisão da dieta extraída]
↓
[10. Confirmar metas diárias]
↓
[11. Criar ou entrar em clube/desafio]
↓
[12. Tela de convite / código do grupo]
↓
[13. Primeiro check-in sugerido]
↓
[14. Home do grupo]
```

---

# 10. Páginas e responsabilidades

## 10.1 Splash

Função: entrada visual do app.

Contém:

- logo;
- mascote;
- frase principal;
- CTA.

Ações:

- criar conta;
- entrar;
- entrar por convite.

## 10.2 Login

Função: autenticação.

Contém:

- e-mail/senha;
- Google visual/futuro;
- Apple visual/futuro;
- convite pendente;
- link de cadastro.

Regra:

```txt
se onboarding_completed = false → etapa pendente
se onboarding_completed = true → Home
```

## 10.3 Cadastro

Função: criar conta.

Contém:

- nome;
- username;
- e-mail;
- senha;
- termos.

Ação:

- criar usuário;
- iniciar onboarding.

## 10.4 Criar avatar

Função: criar mascote pessoal.

Contém:

- preview;
- customizações;
- medalhas bloqueadas como tease;
- botão salvar.

Ação:

- criar AvatarProfile.

## 10.5 Dados físicos

Função: coletar idade, altura, peso e objetivo.

Contém:

- formulário;
- aviso de responsabilidade.

Ação:

- atualizar UserProfile.

## 10.6 Scanner da dieta

Função: enviar dieta para análise.

Contém:

- upload PDF;
- câmera;
- imagem;
- texto;
- explicação.

Ação:

- iniciar DietScanJob.

## 10.7 Processamento da dieta

Função: indicar que IA está lendo dieta.

Contém:

- loading animado;
- mascote;
- mensagens como `Caçando proteína...`.

Ação interna:

```txt
OCR/IA → Diet Engine → Macro Engine → DietDraft
```

## 10.8 Revisão da dieta

Função: validar dieta extraída.

Contém:

- cards de macros diários;
- refeições extraídas;
- edição manual;
- confirmação.

Ação:

- criar DietPlan ativo;
- criar MacroTargets;
- criar DailyMacroCounter.

## 10.9 Criar/entrar em grupo

Função: colocar usuário no loop social.

Contém:

- criar clube;
- criar desafio;
- entrar por código;
- convites.

Ação:

- criar grupo ou GroupMembership.

## 10.10 Home

Função: resumo diário e CTA para check-in.

Contém:

- avatar;
- saudação;
- streak;
- posição;
- macro counter;
- próxima refeição;
- botão de check-in;
- feed resumido;
- ranking resumido.

## 10.11 Diário de macros

Função: detalhar consumo do dia.

Contém:

- gráficos;
- metas;
- consumido;
- restante;
- refeições feitas/pendentes;
- histórico de check-ins.

## 10.12 Check-in

Função: registrar refeição.

Contém:

- barcode;
- foto do prato;
- refeição planejada;
- manual.

## 10.13 Grupo/Clube

Função: central social do grupo.

Contém:

- banner;
- membros;
- feed;
- ranking;
- chat;
- regras;
- convite.

## 10.14 Feed do grupo

Função: mostrar check-ins, conquistas, ranking e eventos.

Contém:

- posts;
- reações;
- comentários;
- mensagens automáticas.

## 10.15 Ranking

Função: mostrar competição.

Contém:

- top 3;
- lista;
- filtros;
- avatares;
- medalhas;
- pontos;
- streak.

## 10.16 Chat

Função: conversas e bot do grupo.

Contém:

- mensagens de usuários;
- mensagens automáticas de ranking, streak e medalhas.

## 10.17 Perfil/avatar

Função: identidade e coleção do usuário.

Contém:

- avatar grande;
- medalhas equipadas;
- título;
- pontos;
- streak;
- badges;
- histórico.

## 10.18 Dieta

Função: visualizar e editar dieta ativa.

Contém:

- metas;
- refeições;
- alimentos;
- quantidades;
- reescanear;
- editar manualmente.

## 10.19 Produtos salvos

Função: armazenar produtos consultados via Open Food Facts ou cadastrados manualmente.

Contém:

- nome;
- marca;
- barcode;
- macros;
- imagem;
- histórico;
- fonte.

---

# 11. Contabilizador diário de macros

## 11.1 Objetivo

Mostrar ao usuário quanto ele consumiu no dia em comparação com a meta cadastrada na dieta.

## 11.2 Dados exibidos

- Calorias consumidas / meta.
- Proteína consumida / meta.
- Carboidratos consumidos / meta.
- Gordura consumida / meta.
- Refeições feitas e pendentes.
- Pontos do dia.
- Status do dia.

## 11.3 Visual recomendado

Para o MVP, usar barras grossas estilo game.

```txt
PROTEÍNA ███████░░░ 142g / 180g
CARBO    ██████░░░░ 180g / 250g
GORDURA  █████░░░░░ 44g / 70g
KCAL     ██████░░░░ 1450 / 2300
```

## 11.4 Estados do contador

- `empty_day`: nenhum check-in.
- `in_progress`: macros parcialmente preenchidos.
- `target_hit`: macro dentro da margem.
- `over_target`: usuário passou do alvo.
- `all_complete`: Maniac Day.

## 11.5 Fluxo técnico

```txt
Usuário faz check-in
→ CheckInService salva refeição
→ MacroCalculationEngine calcula macros consumidos
→ DailyMacroCounter soma valores no dia
→ ScoringEngine calcula pontos
→ RankingService atualiza posição
→ FeedService publica check-in
→ NotificationService avisa grupo se relevante
```

---

# 12. Feed do grupo

## 12.1 Objetivo

O feed é o coração social do app.

Todo check-in importante deve virar evento social, criando accountability, zoeira, competição e retenção.

## 12.2 Tipos de posts

- Check-in de refeição.
- Produto escaneado.
- Refeição planejada cumprida.
- Streak atingido.
- Medalha desbloqueada.
- Mudança de ranking.
- Todos os macros completos.
- Alerta de produto ou macro estourado.

## 12.3 Exemplo de card

```txt
Rafael registrou o almoço.

Frango, arroz, feijão e salada.
42g proteína · 78g carbo · 11g gordura

+18 pontos
```

## 12.4 Reações sugeridas

- Brabo.
- Limpo.
- Frangão.
- Respeita.
- Macro crime.
- Cadê a proteína?
- Roubado.
- Monstro.
- Marmita lendária.

## 12.5 Fluxo técnico

```txt
CheckIn criado
→ FeedService gera FeedEvent
→ FeedEvent é salvo no grupo
→ RealtimeService envia atualização
→ Membros recebem novo post
→ RankingService atualiza posição
→ NotificationService dispara alertas importantes
```

Para o MVP, realtime pode ser substituído por refresh/polling simples.

---

# 13. Funcionalidades e como se conversam

## 13.1 Módulos internos

```txt
Auth Service
Profile Service
Avatar Service
Diet Scan Service
AI/OCR Service
Diet Engine
Macro Engine
Open Food Facts Integration
Check-in Service
Daily Macro Counter
Scoring Engine
Feed Service
Ranking Service
Achievement Service
Notification Service
Group/Challenge Service
Chat Service
```

## 13.2 Cadastro até dieta ativa

```txt
Usuário cria conta
→ AuthService cria User
→ ProfileService cria Profile
→ AvatarService cria AvatarProfile
→ ProfileService salva idade/altura/peso
→ DietScanService recebe dieta
→ AI/OCRService extrai texto
→ DietEngine estrutura refeições
→ MacroEngine calcula/estima macros
→ DietDraft é criado
→ Usuário revisa
→ DietPlan ativo é salvo
→ DailyMacroCounter é inicializado
```

## 13.3 IA analisando dieta

```txt
Upload de PDF/foto/texto
→ FileStorage salva arquivo temporário
→ OCR extrai texto se for imagem/PDF
→ AI Parser identifica refeições, horários, alimentos, quantidades e substituições
→ Diet Engine transforma em estrutura
→ Macro Engine estima macros
→ Validador verifica dados ausentes
→ DietDraft é retornado ao usuário
```

## 13.4 Check-in por Open Food Facts

```txt
Usuário escaneia código de barras
→ BarcodeScanner captura código
→ Frontend envia código ao backend
→ FoodProductService consulta banco local
→ Se produto não existir, consulta Open Food Facts API
→ Normaliza dados nutricionais
→ Salva produto localmente
→ Frontend mostra produto
→ Usuário informa porção
→ Macro Engine calcula consumo
→ CheckInService cria check-in
→ DailyMacroCounter atualiza total do dia
→ ScoringEngine calcula pontos
→ FeedService publica post
→ RankingService recalcula ranking
→ AchievementService verifica conquistas
→ NotificationService dispara alertas
```

## 13.5 Check-in por foto do prato

```txt
Usuário tira foto
→ ImageUploadService salva imagem
→ AI Food Recognition analisa imagem
→ Retorna alimentos prováveis
→ Usuário confirma/corrige
→ Macro Engine estima macros
→ CheckInService cria check-in
→ DailyMacroCounter atualiza
→ ScoringEngine calcula pontos
→ FeedService publica
→ RankingService atualiza
```

## 13.6 Check-in por refeição planejada

```txt
Usuário abre check-in
→ Seleciona Refeição planejada
→ App busca DietPlan ativo
→ Mostra refeições pendentes
→ Usuário escolhe Almoço/Jantar/etc.
→ App mostra alimentos planejados
→ Usuário confirma
→ CheckInService cria check-in com macros planejados
→ DailyMacroCounter atualiza
→ ScoringEngine calcula pontos
→ FeedService publica
→ RankingService atualiza
```

## 13.7 Atualização do contador

```txt
Novo check-in confirmado
→ Sistema soma macros do check-in
→ Atualiza DailyMacroCounter
→ Compara com MacroTargets
→ Define status: abaixo, dentro, acima ou completo
→ Atualiza gráfico na Home
→ Atualiza Diário de Macros
```

## 13.8 Pontuação

```txt
Check-in criado
→ ScoringEngine recebe tipo, macros, meta, regras e streak
→ Calcula pontos
→ Salva ScoreEvent
→ Atualiza ranking
→ Verifica badges e medalhas
```

## 13.9 Medalhas no avatar

```txt
AchievementService detecta conquista
→ Cria UserAchievement
→ Se conquista tiver medalha visual, cria UserMedal
→ AvatarService libera item equipável
→ FeedService publica conquista
→ Usuário pode equipar medalha no avatar
```

---

# 14. Estados globais do frontend

## 14.1 Estado do usuário

```txt
unauthenticated
authenticated_onboarding_incomplete
authenticated_ready
```

## 14.2 Estado da dieta

```txt
no_diet
diet_scanning
diet_draft_ready
diet_active
diet_error
```

## 14.3 Estado do grupo

```txt
no_group
has_group
joining_group
group_error
```

## 14.4 Estado do check-in

```txt
select_method
barcode_scanning
product_loading
product_found
product_not_found
meal_review
checkin_confirming
checkin_success
checkin_error
```

## 14.5 Estado dos macros do dia

```txt
empty_day
in_progress
target_hit
over_target
all_complete
```

---

# 15. Loops de retenção

## 15.1 Loop principal

```txt
Usuário abre app
→ Vê que está atrás no ranking
→ Vê que faltam macros do dia
→ Faz check-in
→ Ganha pontos
→ Feed mostra o check-in
→ Amigos reagem/zoam
→ Ranking atualiza
→ Usuário quer manter streak
→ Volta amanhã
```

## 15.2 Loop social

```txt
Usuário faz check-in
→ Grupo vê no feed
→ Amigos reagem/comentam
→ App gera provocação automática
→ Outro amigo faz check-in para responder
→ Ranking muda
→ Grupo continua ativo
```

## 15.3 Loop de conquista

```txt
Usuário bate macro
→ Ganha pontos
→ Mantém streak
→ Desbloqueia badge
→ Ganha medalha visual
→ Equipa medalha no avatar
→ Avatar fica mais raro
→ Usuário quer continuar colecionando
```

---

# 16. Regras de pontuação MVP

## 16.1 Check-ins

```txt
Registrar refeição: +5 pts
Registrar refeição com foto: +8 pts
Escanear produto: +8 pts
Confirmar refeição planejada: +10 pts
Registrar todas as refeições do dia: +15 pts
```

## 16.2 Macros

```txt
Bater proteína: +30 pts
Ficar dentro da meta calórica: +25 pts
Ficar dentro dos carbs: +15 pts
Ficar dentro das gorduras: +15 pts
Bater todos os macros: +50 pts
```

## 16.3 Streak

```txt
3 dias seguidos: +20 pts
7 dias seguidos: +70 pts
14 dias seguidos: medalha ouro
30 dias seguidos: medalha diamante
```

## 16.4 Social

```txt
Primeiro check-in do dia: +5 pts
Primeiro produto escaneado: +10 pts
Comentou no check-in de alguém: +1 pt limitado
Reagiu no feed: sem ponto ou limite diário
```

Não dar pontos demais para comentário/reação, para evitar farming social sem dieta.

---

# 17. Casos de uso

## 17.1 Atores

- **Usuário comum:** usa o app para registrar dieta, macros e competir.
- **Criador do clube/desafio:** cria e configura grupos.
- **Membro do clube/desafio:** participa por convite/código.
- **Sistema MacroManiacs:** serviços internos do produto.
- **IA/OCR:** lê dietas e imagens.
- **Open Food Facts API:** consulta produtos por código de barras.

## UC-01 — Visualizar tela inicial do app

Objetivo: apresentar marca, proposta e permitir entrada, cadastro ou convite.

Atores: usuário comum, sistema.

Pré-condições: usuário abre app sem sessão ativa.

Gatilho: abertura do app.

Fluxo principal:
1. Exibir splash/tela inicial com logo, mascote e proposta.
2. Mostrar CTAs: Criar conta, Entrar e Tenho código de convite.
3. Se houver convite detectado, guardar código temporariamente.

Fluxos alternativos:
- usuário já logado: verificar onboarding e redirecionar;
- link de convite: manter convite pendente até fim do onboarding.

Estados:
- inicial;
- carregando sessão;
- convite detectado;
- erro de sessão.

Dados:
- estado de autenticação;
- código de convite opcional.

Resultado: usuário entende proposta e segue para autenticação ou convite.

Telas: Splash, Tela inicial, Login, Cadastro.

## UC-02 — Criar conta

Objetivo: criar conta e iniciar onboarding obrigatório.

Fluxo:
1. Exibir formulário de cadastro.
2. Usuário informa nome, username, e-mail e senha.
3. Usuário aceita termos.
4. Sistema valida campos e cria usuário.
5. Redirecionar para criação de avatar.

Alternativas:
- e-mail já cadastrado;
- username indisponível;
- senha inválida;
- login social futuro.

Estados: formulário, validação, carregando, erro, sucesso.

Telas: Cadastro, Criar avatar.

## UC-03 — Fazer login

Objetivo: permitir acesso de usuário existente.

Fluxo:
1. Exibir login.
2. Usuário informa credenciais.
3. Sistema autentica.
4. Sistema verifica `onboarding_completed`.
5. Redireciona para Home ou etapa pendente.

Alternativas:
- credenciais inválidas;
- esqueci senha;
- convite pendente.

Telas: Login, Home, Onboarding.

## UC-04 — Entrar com código de convite

Objetivo: entrada em clube/desafio por código/link.

Fluxo:
1. Validar código.
2. Identificar grupo/desafio.
3. Se não logado, direcionar para auth.
4. Após onboarding, adicionar ao grupo.
5. Exibir entrada no grupo.

Alternativas:
- código inválido;
- desafio encerrado;
- clube privado;
- usuário já membro.

Telas: Convite, Login, Onboarding, Grupo.

## UC-05 — Criar avatar 2D

Objetivo: criar mascote pessoal do usuário.

Fluxo:
1. Exibir avatar base.
2. Permitir customização de pele, cabelo, cor, expressão, roupa, acessório e fundo.
3. Atualizar preview.
4. Salvar AvatarProfile.
5. Seguir para dados físicos.

Alternativas:
- randomizar avatar;
- falha ao salvar;
- pular com avatar padrão.

Telas: Criar avatar, Dados físicos, Perfil.

## UC-06 — Informar idade, altura e peso

Objetivo: coletar dados físicos.

Fluxo:
1. Exibir formulário.
2. Usuário informa idade, altura e peso.
3. Escolhe objetivo.
4. Exibir aviso.
5. Salvar dados.
6. Seguir para scanner.

Telas: Dados físicos, Scanner da dieta.

## UC-07 — Escanear dieta por PDF, foto, imagem ou texto

Objetivo: enviar dieta para IA transformar em estrutura de refeições e macros.

Fluxo:
1. Exibir opções: tirar foto, enviar PDF, enviar imagem ou colar texto.
2. Usuário envia dieta.
3. Frontend faz upload.
4. Backend cria DietScanJob.
5. IA/OCR extrai texto.
6. Diet Engine identifica refeições, horários, alimentos e quantidades.
7. Macro Engine calcula/estima macros.
8. Sistema gera DietDraft.
9. Frontend exibe revisão.

Alternativas:
- arquivo inválido;
- imagem ilegível;
- IA não encontrou macros;
- usuário sem dieta;
- upload falha.

Telas: Scanner da dieta, Processando dieta, Revisão.

## UC-08 — Revisar dieta extraída pela IA

Objetivo: validar/corrigir dieta antes de ativar.

Fluxo:
1. Exibir metas diárias.
2. Exibir refeições, alimentos, horários e quantidades.
3. Usuário revisa e edita.
4. Usuário confirma.
5. Sistema transforma DietDraft em DietPlan ativo.
6. Criar MacroTargets e DailyMacroCounter.
7. Seguir para grupo.

Telas: Revisão, Criar/entrar em grupo, Home.

## UC-09 — Criar clube

Objetivo: criar comunidade contínua para competir.

Fluxo:
1. Exibir formulário.
2. Informar nome e privacidade.
3. Escolher regras básicas.
4. Criar Club.
5. Adicionar criador como admin.
6. Gerar convite.
7. Enviar para Home do Clube.

Telas: Criar clube, Convite, Home do clube.

## UC-10 — Criar desafio

Objetivo: criar competição com começo, fim e regras.

Fluxo:
1. Exibir formulário de desafio.
2. Informar nome, duração e modo.
3. Escolher individual ou equipe.
4. Criar Challenge.
5. Gerar convite.
6. Abrir desafio.

Modos:
- Protein War;
- Macro Precision;
- No Junk Week;
- Marmita Club;
- Bulking Battle;
- Cutting Discipline.

## UC-11 — Entrar em clube/desafio existente

Fluxo:
1. Validar código.
2. Mostrar prévia do grupo.
3. Usuário toca Entrar.
4. Criar GroupMembership.
5. Abrir Home do Grupo.

## UC-12 — Visualizar Home diária

Objetivo: mostrar status do dia.

Fluxo:
1. Carregar usuário, avatar, DailyMacroCounter, grupo e ranking.
2. Exibir saudação, streak, pontos, posição, macro counter, próxima refeição, CTA e feed resumido.

Alternativas:
- sem dieta;
- sem grupo;
- sem check-in;
- sem DailyMacroCounter.

## UC-13 — Visualizar contador diário de macros

Fluxo:
1. Buscar metas.
2. Buscar consumido.
3. Calcular restante e porcentagem.
4. Renderizar gráfico.
5. Exibir status textual.

Estados:
- zerado;
- parcial;
- meta batida;
- acima;
- todos completos;
- loading;
- erro.

## UC-14 — Visualizar Diário de Macros

Fluxo:
1. Carregar macros, check-ins e refeições planejadas.
2. Exibir gráfico detalhado, consumido, restante, feitas, pendentes e histórico.
3. Permitir adicionar, editar ou remover check-ins.

## UC-15 — Abrir tela de check-in

Fluxo:
1. Abrir tela de check-in.
2. Mostrar opções: barcode, foto do prato, refeição planejada e manual.
3. Direcionar para fluxo escolhido.

## UC-16 — Fazer check-in por código de barras

Fluxo:
1. Abrir câmera com scanner.
2. Capturar barcode.
3. Enviar ao backend.
4. Backend consulta cache/MongoDB.
5. Se necessário, consulta Open Food Facts.
6. Normalizar e exibir produto.
7. Usuário informa quantidade.
8. Calcular macros.
9. Confirmar check-in.
10. Atualizar contador, pontos, feed, ranking e conquistas.

Alternativas:
- produto não encontrado;
- dados incompletos;
- sem permissão de câmera;
- API fora do ar;
- cancelamento.

## UC-17 — Fazer check-in por refeição planejada

Fluxo:
1. Buscar refeições planejadas.
2. Mostrar refeições do dia.
3. Usuário seleciona refeição.
4. Mostrar alimentos e macros.
5. Usuário confirma.
6. Criar CheckIn planned_meal.
7. Atualizar contador, pontos, feed, ranking e conquistas.

## UC-18 — Fazer check-in por foto do prato

Fluxo:
1. Abrir câmera/galeria.
2. Enviar imagem ao backend.
3. IA identifica possíveis alimentos.
4. Exibir sugestões.
5. Usuário confirma/corrige.
6. Estimar macros.
7. Confirmar check-in.
8. Atualizar app.

## UC-19 — Fazer check-in manual

Fluxo:
1. Abrir formulário manual.
2. Usuário informa alimento, quantidade e macros.
3. Sistema calcula totais.
4. Usuário confirma.
5. Criar CheckIn.
6. Atualizar contador, feed e ranking.

## UC-20 — Editar check-in

Fluxo:
1. Abrir dados do check-in.
2. Usuário altera alimento, quantidade ou macros.
3. Salvar.
4. Recalcular macros, contador, pontos e ranking.
5. Marcar post como editado se necessário.

## UC-21 — Remover check-in

Fluxo:
1. Pedir confirmação.
2. Usuário confirma.
3. Remover/marcar CheckIn como deletado.
4. Recalcular contador, pontuação e ranking.
5. Remover/marcar feed post.

## UC-22 — Visualizar feed do grupo

Fluxo:
1. Buscar FeedEvents.
2. Ordenar por data.
3. Renderizar cards.
4. Permitir reações/comentários.

## UC-23 — Publicar check-in automaticamente no feed

Fluxo:
1. CheckInService cria check-in.
2. FeedService recebe evento.
3. Gerar post.
4. Post aparece no feed.
5. Membros interagem.

## UC-24 — Reagir a post do feed

Fluxo:
1. Usuário escolhe reação.
2. Sistema salva.
3. UI atualiza contador.

Reações:
- Brabo;
- Limpo;
- Frangão;
- Respeita;
- Macro crime;
- Cadê a proteína?

## UC-25 — Comentar em post do feed

Fluxo:
1. Abrir campo.
2. Usuário digita.
3. Enviar.
4. Salvar comentário.
5. Comentário aparece no post.

## UC-26 — Calcular pontos de check-in

Fluxo:
1. Receber check-in.
2. Identificar tipo e regras.
3. Calcular pontos base.
4. Verificar bônus.
5. Criar ScoreEvent.
6. Atualizar ranking.

## UC-27 — Visualizar ranking do grupo

Fluxo:
1. Buscar ranking.
2. Aplicar filtro.
3. Exibir top 3 e lista.
4. Destacar usuário.

Filtros:
- hoje;
- semana;
- mês;
- desafio;
- proteína;
- consistência;
- medalhas.

## UC-28 — Atualizar ranking após check-in

Fluxo:
1. Somar pontos.
2. Recalcular posição.
3. Comparar posição antiga/nova.
4. Criar evento/notificação se relevante.
5. Atualizar Ranking.

## UC-29 — Desbloquear badge

Fluxo:
1. AchievementService recebe evento.
2. Verifica regras.
3. Identifica badge.
4. Salva UserBadge.
5. Exibe modal.
6. Publica no feed se aplicável.

## UC-30 — Desbloquear medalha visual

Fluxo:
1. AchievementService identifica medalha.
2. Cria UserMedal.
3. AvatarService libera item.
4. Exibe animação.
5. Usuário pode equipar.
6. Atualiza avatar.
7. Publica no feed.

## UC-31 — Equipar medalha no avatar

Fluxo:
1. Exibir avatar.
2. Listar medalhas.
3. Usuário seleciona.
4. Mostrar preview.
5. Confirmar.
6. Salvar medalha.
7. Avatar atualizado aparece no app.

## UC-32 — Visualizar perfil do usuário

Fluxo:
1. Carregar usuário, avatar, medalhas, badges e stats.
2. Exibir perfil.

## UC-33 — Editar avatar

Fluxo:
1. Abrir editor.
2. Usuário altera características.
3. Atualizar preview.
4. Salvar.
5. Avatar aparece atualizado.

## UC-34 — Visualizar dieta ativa

Fluxo:
1. Buscar DietPlan ativo.
2. Exibir metas, refeições, alimentos e quantidades.
3. Permitir editar ou reescanear.

## UC-35 — Editar metas diárias de macros

Fluxo:
1. Exibir metas atuais.
2. Usuário altera valores.
3. Validar.
4. Salvar.
5. Atualizar MacroTargets e comparações.

## UC-36 — Reescanear dieta

Fluxo:
1. Abrir scanner.
2. Usuário envia novo arquivo/foto/texto.
3. IA processa e gera DietDraft.
4. Usuário revisa.
5. Confirmar substituição.
6. Atualizar DietPlan e MacroTargets.

## UC-37 — Buscar produto por código de barras

Fluxo:
1. Backend recebe barcode.
2. FoodProductService consulta MongoDB.
3. Se existir, retorna salvo.
4. Se não existir, consulta Open Food Facts.
5. Normaliza resposta.
6. Salva produto localmente.
7. Retorna produto ao frontend.

## UC-38 — Cadastrar produto manualmente quando não encontrado

Fluxo:
1. Abrir formulário.
2. Usuário informa nome, marca e macros.
3. Salvar produto local/manual.
4. Usar produto no check-in.

## UC-39 — Visualizar página do grupo/clube

Fluxo:
1. Carregar grupo, membros, ranking resumido, feed e regras.
2. Exibir abas: Feed, Ranking, Regras, Chat e Membros.

## UC-40 — Compartilhar convite do grupo

Fluxo:
1. Exibir código e link.
2. Usuário copia ou compartilha.
3. Abrir share sheet.

## UC-41 — Visualizar chat do grupo

Fluxo:
1. Carregar mensagens recentes.
2. Exibir chat.
3. Exibir mensagens automáticas.

## UC-42 — Enviar mensagem no chat

Fluxo:
1. Usuário digita.
2. Frontend envia.
3. Sistema salva.
4. Mensagem aparece.
5. Membros recebem atualização.

## UC-43 — Gerar mensagem automática de evento

Gatilhos:
- usuário subiu no ranking;
- ganhou medalha;
- completou macros;
- perdeu streak;
- desafio está acabando.

Fluxo:
1. Detectar evento.
2. Classificar importância.
3. Criar mensagem.
4. Publicar no feed/chat/notificação.
5. Frontend renderiza.

## UC-44 — Usuário sem dieta ativa

Fluxo:
1. Identificar ausência de DietPlan.
2. Mostrar estado vazio.
3. Oferecer CTA: escanear dieta ou cadastrar metas manualmente.

## UC-45 — Usuário sem grupo

Fluxo:
1. Identificar ausência de grupo.
2. Mostrar CTA: criar clube ou entrar com código.
3. Permitir contador individual.

## UC-46 — Falha de IA ao processar dieta

Fluxo:
1. Exibir mensagem amigável.
2. Informar que leitura falhou.
3. Oferecer nova imagem, PDF, texto ou manual.

## UC-47 — Produto não encontrado na Open Food Facts

Fluxo:
1. Informar que produto não foi encontrado.
2. Oferecer digitar código novamente, cadastrar manualmente, tirar foto do rótulo ou voltar.

Alternativas:
- API indisponível;
- produto cadastrado manualmente;
- continuar check-in.

Resultado: fluxo de check-in não morre.

---

# 18. Casos de uso prioritários para MVP

Priorizar:

```txt
UC-01 — Visualizar tela inicial
UC-02 — Criar conta
UC-05 — Criar avatar 2D
UC-06 — Informar idade, altura e peso
UC-07 — Escanear dieta
UC-08 — Revisar dieta extraída
UC-09 — Criar clube
UC-11 — Entrar em clube/desafio
UC-12 — Visualizar Home diária
UC-13 — Visualizar contador diário de macros
UC-15 — Abrir tela de check-in
UC-16 — Fazer check-in por código de barras
UC-17 — Fazer check-in por refeição planejada
UC-22 — Visualizar feed do grupo
UC-23 — Publicar check-in automaticamente no feed
UC-26 — Calcular pontos de check-in
UC-27 — Visualizar ranking
UC-29 — Desbloquear badge
UC-30 — Desbloquear medalha visual
UC-32 — Visualizar perfil
```

---

# 19. Endpoints esperados do backend Flask

## 19.1 Auth

```txt
POST /auth/register
POST /auth/login
GET  /auth/me
POST /auth/logout
```

## 19.2 Profile/avatar

```txt
POST /profile/body-data
GET  /profile
POST /avatar
PUT  /avatar
GET  /profile/medals
POST /profile/medals/equip
```

## 19.3 Dieta

```txt
POST /diet/scan
POST /diet/confirm
GET  /diet/active
PUT  /diet/targets
POST /diet/rescan
```

## 19.4 Home/macros

```txt
GET /home
GET /macros/today
GET /checkins/today
```

## 19.5 Grupos/desafios

```txt
POST /groups
POST /groups/join
GET  /groups/:id
GET  /groups/:id/feed
GET  /groups/:id/ranking
GET  /groups/:id/chat
POST /groups/:id/chat
POST /groups/:id/invite
```

## 19.6 Produtos/Open Food Facts

```txt
GET  /products/barcode/:barcode
POST /products/manual
```

## 19.7 Check-ins

```txt
POST /checkins/barcode
POST /checkins/planned-meal
POST /checkins/photo
POST /checkins/manual
PUT  /checkins/:id
DELETE /checkins/:id
```

## 19.8 Feed

```txt
GET  /groups/:id/feed
POST /feed/:id/reactions
POST /feed/:id/comments
```

## 19.9 Ranking/conquistas

```txt
GET /groups/:id/ranking
GET /achievements
GET /profile/badges
GET /profile/medals
```

---

# 20. Modelos TypeScript do frontend

## 20.1 User

```ts
export type User = {
  id: string;
  name: string;
  username: string;
  email?: string;
  onboardingCompleted: boolean;
};
```

## 20.2 Avatar

```ts
export type Avatar = {
  id: string;
  userId: string;
  skinTone: string;
  hairStyle: string;
  hairColor: string;
  expression: string;
  outfit: string;
  accessory?: string | null;
  background: string;
  equippedMedals: Medal[];
};
```

## 20.3 Macro

```ts
export type MacroValue = {
  consumed: number;
  target: number;
  remaining: number;
  percentage: number;
};

export type DailyMacros = {
  calories: MacroValue;
  protein: MacroValue;
  carbs: MacroValue;
  fat: MacroValue;
  status: "empty_day" | "in_progress" | "target_hit" | "over_target" | "all_complete";
};

export type MacroSummary = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};
```

## 20.4 Diet

```ts
export type DietMealItem = {
  id: string;
  food: string;
  quantity: string;
  macros?: MacroSummary | null;
};

export type DietMeal = {
  id: string;
  name: string;
  time?: string | null;
  items: DietMealItem[];
  macros: MacroSummary;
};

export type DietDraft = {
  id: string;
  dailyTargets: MacroSummary;
  meals: DietMeal[];
  confidence?: number;
};

export type DietPlan = {
  id: string;
  dailyTargets: MacroSummary;
  meals: DietMeal[];
};
```

## 20.5 Product

```ts
export type Product = {
  barcode: string;
  name: string;
  brand?: string | null;
  imageUrl?: string | null;
  servingSize?: string | null;
  caloriesPer100g?: number | null;
  proteinPer100g?: number | null;
  carbsPer100g?: number | null;
  fatPer100g?: number | null;
  source: "open_food_facts" | "manual";
  status?: "found" | "not_found" | "incomplete";
};
```

## 20.6 Check-in

```ts
export type CheckInResult = {
  checkInId: string;
  pointsEarned: number;
  macrosAdded: MacroSummary;
  dailyMacros: DailyMacros;
  rankingPosition?: number | null;
  unlockedBadges: Badge[];
  unlockedMedals: Medal[];
};
```

## 20.7 Feed

```ts
export type FeedPostType =
  | "check_in"
  | "product_scan"
  | "streak"
  | "ranking_change"
  | "medal_unlocked"
  | "macro_complete"
  | "alert";

export type FeedUser = {
  id: string;
  name: string;
  username: string;
  avatar?: Avatar | null;
};

export type Reaction = {
  type: string;
  count: number;
  reactedByMe: boolean;
};

export type FeedPost = {
  id: string;
  type: FeedPostType;
  user: FeedUser;
  title: string;
  description: string;
  macros?: MacroSummary | null;
  points?: number | null;
  createdAt: string;
  reactions: Reaction[];
  commentsCount: number;
};
```

## 20.8 Ranking

```ts
export type RankingUser = {
  position: number;
  userId: string;
  name: string;
  username: string;
  avatar?: Avatar | null;
  points: number;
  streak: number;
  medals: Medal[];
  isCurrentUser: boolean;
};

export type Ranking = {
  groupId: string;
  period: string;
  entries: RankingUser[];
};
```

## 20.9 Achievements

```ts
export type Badge = {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
};

export type Medal = {
  id: string;
  name: string;
  category: string;
  level: "bronze" | "silver" | "gold" | "diamond";
  rarity: "common" | "rare" | "epic" | "legendary" | "maniac";
  description: string;
  visualSlot: string;
  unlocked: boolean;
  equipped: boolean;
};
```

---

# 21. Modelos MongoDB sugeridos

## 21.1 users

```js
{
  _id: ObjectId,
  name: String,
  username: String,
  email: String,
  password_hash: String,
  onboarding_completed: Boolean,
  created_at: Date,
  updated_at: Date
}
```

## 21.2 profiles

```js
{
  _id: ObjectId,
  user_id: ObjectId,
  age: Number,
  height_cm: Number,
  weight_kg: Number,
  goal: String,
  active_group_id: ObjectId | null,
  created_at: Date,
  updated_at: Date
}
```

## 21.3 avatars

```js
{
  _id: ObjectId,
  user_id: ObjectId,
  skin_tone: String,
  hair_style: String,
  hair_color: String,
  expression: String,
  outfit: String,
  accessory: String | null,
  background: String,
  equipped_medals: [ObjectId],
  created_at: Date,
  updated_at: Date
}
```

## 21.4 diet_plans

```js
{
  _id: ObjectId,
  user_id: ObjectId,
  source_type: "pdf" | "image" | "text" | "manual",
  daily_targets: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number
  },
  meals: [
    {
      id: String,
      name: String,
      time: String | null,
      items: [
        {
          id: String,
          food: String,
          quantity: String,
          macros: {
            calories: Number,
            protein: Number,
            carbs: Number,
            fat: Number
          }
        }
      ],
      macros: {
        calories: Number,
        protein: Number,
        carbs: Number,
        fat: Number
      }
    }
  ],
  active: Boolean,
  created_at: Date,
  updated_at: Date
}
```

## 21.5 daily_macro_counters

```js
{
  _id: ObjectId,
  user_id: ObjectId,
  date: String,
  targets: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number
  },
  consumed: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number
  },
  status: String,
  points_today: Number,
  created_at: Date,
  updated_at: Date
}
```

## 21.6 products

```js
{
  _id: ObjectId,
  barcode: String,
  source: "open_food_facts" | "manual",
  name: String,
  brand: String | null,
  image_url: String | null,
  serving_size: String | null,
  nutrition_per_100g: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
    sugars: Number | null,
    salt: Number | null
  },
  raw: Object,
  created_at: Date,
  updated_at: Date
}
```

## 21.7 checkins

```js
{
  _id: ObjectId,
  user_id: ObjectId,
  group_id: ObjectId | null,
  type: "barcode" | "planned_meal" | "photo" | "manual",
  title: String,
  items: [Object],
  macros: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number
  },
  points: Number,
  image_url: String | null,
  created_at: Date,
  updated_at: Date,
  deleted_at: Date | null
}
```

## 21.8 groups

```js
{
  _id: ObjectId,
  name: String,
  type: "club" | "challenge",
  owner_id: ObjectId,
  invite_code: String,
  privacy: "public" | "private",
  rules: Object,
  start_date: Date | null,
  end_date: Date | null,
  created_at: Date,
  updated_at: Date
}
```

## 21.9 group_memberships

```js
{
  _id: ObjectId,
  group_id: ObjectId,
  user_id: ObjectId,
  role: "owner" | "admin" | "member",
  joined_at: Date
}
```

## 21.10 feed_events

```js
{
  _id: ObjectId,
  group_id: ObjectId,
  user_id: ObjectId,
  type: String,
  title: String,
  description: String,
  checkin_id: ObjectId | null,
  points: Number | null,
  macros: Object | null,
  reactions: [
    {
      user_id: ObjectId,
      type: String
    }
  ],
  comments_count: Number,
  created_at: Date
}
```

## 21.11 rankings

```js
{
  _id: ObjectId,
  group_id: ObjectId,
  period: String,
  user_id: ObjectId,
  points: Number,
  streak: Number,
  position: Number,
  updated_at: Date
}
```

## 21.12 badges

```js
{
  _id: ObjectId,
  name: String,
  description: String,
  icon: String,
  rule: Object
}
```

## 21.13 user_badges

```js
{
  _id: ObjectId,
  user_id: ObjectId,
  badge_id: ObjectId,
  unlocked_at: Date
}
```

## 21.14 medals

```js
{
  _id: ObjectId,
  name: String,
  category: String,
  level: String,
  rarity: String,
  description: String,
  visual_slot: String,
  rule: Object
}
```

## 21.15 user_medals

```js
{
  _id: ObjectId,
  user_id: ObjectId,
  medal_id: ObjectId,
  equipped: Boolean,
  slot: String | null,
  unlocked_at: Date
}
```

## 21.16 chat_messages

```js
{
  _id: ObjectId,
  group_id: ObjectId,
  user_id: ObjectId | null,
  sender_type: "user" | "bot",
  text: String,
  created_at: Date
}
```

---

# 22. Serviços frontend

## 22.1 api.ts

Criar cliente Axios:

```ts
import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:5000",
  timeout: 20000,
});

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## 22.2 Estratégia mock/real

Criar flag:

```ts
export const USE_MOCKS = true;
```

Serviços devem retornar mock quando `USE_MOCKS = true`.

---

# 23. Mock data obrigatório

Criar mocks para demo.

## 23.1 Usuário

```ts
export const mockUser = {
  id: "user_rafael",
  name: "Rafael",
  username: "rafael",
  onboardingCompleted: true,
};
```

## 23.2 Macros

```ts
export const mockDailyMacros = {
  calories: { consumed: 1450, target: 2300, remaining: 850, percentage: 63 },
  protein: { consumed: 142, target: 180, remaining: 38, percentage: 79 },
  carbs: { consumed: 180, target: 250, remaining: 70, percentage: 72 },
  fat: { consumed: 44, target: 70, remaining: 26, percentage: 63 },
  status: "in_progress",
};
```

## 23.3 Ranking

```ts
export const mockRanking = [
  { position: 1, name: "Ana", username: "ana", points: 920, streak: 8 },
  { position: 2, name: "Rafael", username: "rafael", points: 880, streak: 6 },
  { position: 3, name: "João", username: "joao", points: 760, streak: 4 },
];
```

## 23.4 Feed

Criar posts:

- Rafael registrou almoço.
- Ana escaneou produto.
- Bia chegou em 7 dias de streak.
- Rafael passou João no ranking.
- Ana fechou todos os macros.

---

# 24. Desenvolvimento por fases

## Fase 1 — Base visual

1. Criar Expo app.
2. Configurar TypeScript.
3. Configurar Expo Router.
4. Criar theme dark/light.
5. Criar tokens de cor.
6. Criar componentes UI.
7. Criar layout com bottom tabs.
8. Criar mocks.

## Fase 2 — Onboarding

1. Splash.
2. Login.
3. Cadastro.
4. Avatar.
5. Dados físicos.
6. Scanner dieta.
7. Processing.
8. Review.
9. Group entry.

## Fase 3 — App principal

1. Home.
2. MacroCounter.
3. Macro Diary.
4. Check-in.
5. Product Review.
6. Success.

## Fase 4 — Social

1. Feed.
2. Ranking.
3. Grupo.
4. Chat simples.
5. Perfil.
6. Medalhas.

## Fase 5 — Integração

1. Auth.
2. Diet scan.
3. Home.
4. Barcode.
5. Check-in.
6. Feed.
7. Ranking.

## Fase 6 — Build APK

1. Testar app.
2. Configurar ícone/splash.
3. Rodar build Android.
4. Gerar `.apk`.

---

# 25. Build APK com Expo

Usar EAS:

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build -p android --profile preview
```

Configurar `eas.json`:

```json
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      }
    }
  }
}
```

Para hackathon, usar `preview` com `apk`.

---

# 26. Definition of Done

Uma tela só está pronta se tiver:

- visual premium;
- dark mode;
- light mode;
- loading state;
- error state;
- empty state quando aplicável;
- navegação correta;
- mock data;
- preparada para API real;
- textos no tom do MacroManiacs;
- responsividade básica;
- sem aparência de template genérico.

---

# 27. Checklist final da demo

Antes da apresentação:

- [ ] App abre sem crash.
- [ ] Splash visualmente forte.
- [ ] Cadastro/login funcionam ou simulam.
- [ ] Avatar aparece.
- [ ] Dados físicos salvam.
- [ ] Scanner de dieta tem fluxo.
- [ ] Revisão de dieta aparece.
- [ ] Home mostra macro counter.
- [ ] Check-in abre.
- [ ] Barcode scanner funciona ou tem fallback.
- [ ] Produto aparece.
- [ ] Check-in sucesso mostra pontos.
- [ ] Feed tem posts.
- [ ] Ranking tem top 3.
- [ ] Perfil mostra medalha.
- [ ] Dark mode bonito.
- [ ] Light mode bonito.
- [ ] Textos jovens.
- [ ] Nada parece app médico.
- [ ] Demo pode ser feita em menos de 3 minutos.

---

# 28. Resumo executivo

O MacroManiacs deve ser desenvolvido em torno da lógica:

```txt
Criar identidade
→ Criar avatar
→ Informar dados físicos
→ Escanear dieta
→ Confirmar macros
→ Entrar em grupo
→ Registrar refeição
→ Atualizar contador diário
→ Publicar no feed
→ Gerar pontos
→ Atualizar ranking
→ Desbloquear conquistas
→ Exibir medalhas no avatar
```

O frontend deve sempre deixar claro:

1. Quem é o usuário no jogo: avatar/perfil.
2. Qual é a meta do dia: contador de macros.
3. O que ele precisa fazer agora: check-in.
4. Como o grupo está reagindo: feed.
5. Qual é a posição dele: ranking.
6. O que ele ganhou: badges e medalhas.

O sucesso do MVP depende de quatro entregas principais:

1. IA para digitalizar dieta.
2. Contador diário de macros.
3. Feed do grupo.
4. Ranking com avatar/medalhas.

---

# 29. Instruções finais para Codex

Ao desenvolver este projeto:

1. Use React Native + Expo + TypeScript.
2. Priorize UI premium antes da integração real.
3. Crie mocks completos para todas as telas.
4. Faça o app funcionar sem backend inicialmente.
5. Integre endpoints Flask gradualmente.
6. Não use visual genérico.
7. Mantenha a identidade roxa.
8. Use componentes próprios.
9. Faça dark e light mode.
10. Garanta que o app possa ser buildado como APK.
11. Não implemente backend dentro do app.
12. Não chame Open Food Facts direto no frontend; chamar backend Flask.
13. Backend usa MongoDB.
14. Se uma API não estiver pronta, use mock e deixe TODO claro.
15. A demo precisa mostrar o fluxo completo, mesmo que parte esteja mockada.

