# Documentação do app MacroManiacs

Este documento explica como o app está organizado hoje, o que já existe e onde encontrar as coisas. A ideia é ajudar a entender o fluxo sem precisar abrir arquivo por arquivo no escuro.

## Resumo do app

O MacroManiacs é um app mobile de dieta gamificada e social.

O fluxo principal é:

```txt
Splash
-> Login/Cadastro
-> Onboarding
-> Avatar
-> Dados físicos
-> Scan de dieta
-> Revisão da dieta
-> Entrada/criação de grupo
-> Home
-> Check-ins
-> Feed
-> Ranking
-> Perfil/medalhas
```

Hoje o app está funcional com mocks e preparado para receber o backend Flask depois.

## Stack

```txt
Expo
React Native
TypeScript
Expo Router
TanStack Query
Zustand
Axios
Expo SecureStore
Expo Camera
Expo Image Picker
Expo Document Picker
Expo Linear Gradient
Lucide React Native
React Native SVG
```

## Scripts principais

```bash
npm run start
npm run web
npm run android
npm run typecheck
npm run lint
```

## Estrutura principal

```txt
app/
  _layout.tsx
  index.tsx
  auth/
  onboarding/
  app/

src/
  api/
  components/
  constants/
  hooks/
  lib/
  mocks/
  services/
  store/
  types/
```

## Rotas do app

### Entrada

```txt
app/index.tsx
```

Tela inicial/splash do app.

Tem chamadas para:

```txt
/auth/register
/auth/login
/onboarding/group-entry
```

### Auth

```txt
app/auth/login.tsx
app/auth/register.tsx
```

Essas telas já chamam `authService`.

O design dessas telas ainda está cru, mas o fluxo existe.

### Onboarding

```txt
app/onboarding/avatar.tsx
app/onboarding/body-data.tsx
app/onboarding/diet-scan.tsx
app/onboarding/diet-processing.tsx
app/onboarding/diet-review.tsx
app/onboarding/group-entry.tsx
```

Fluxo:

```txt
Cadastro
-> Avatar
-> Dados físicos
-> Scanner de dieta
-> Processamento
-> Revisão
-> Grupo
-> Home
```

### App principal

```txt
app/app/home.tsx
app/app/macros.tsx
app/app/check-in.tsx
app/app/barcode-scanner.tsx
app/app/product-review.tsx
app/app/planned-meal.tsx
app/app/photo-check-in.tsx
app/app/manual-check-in.tsx
app/app/check-in-success.tsx
app/app/group.tsx
app/app/feed.tsx
app/app/ranking.tsx
app/app/chat.tsx
app/app/profile.tsx
app/app/medals.tsx
app/app/diet.tsx
app/app/settings.tsx
```

## Bottom tabs

O layout das tabs fica em:

```txt
app/app/_layout.tsx
```

Tabs visíveis:

```txt
Home
Grupo
Check-in
Ranking
Perfil
```

As outras telas existem como rotas internas escondidas da tab bar.

## Telas e o que cada uma faz

### Home

Arquivo:

```txt
app/app/home.tsx
```

Mostra:

- saudação;
- avatar;
- streak;
- contador de macros;
- próxima refeição;
- botão de check-in;
- botão para diário de macros.

Dados vêm de:

```txt
useDailyMacros()
useProfile()
```

### Diário de macros

Arquivo:

```txt
app/app/macros.tsx
```

Mostra:

- contador completo;
- refeições planejadas;
- status feito/pendente;
- botão para check-in.

Dados vêm de:

```txt
useDailyMacros()
useActiveDiet()
```

### Check-in

Arquivo:

```txt
app/app/check-in.tsx
```

Opções:

```txt
Código de barras
Refeição planejada
Foto do prato
Manual
```

Cada opção leva para uma tela específica.

### Barcode scanner

Arquivo:

```txt
app/app/barcode-scanner.tsx
```

Hoje simula o scanner e redireciona para:

```txt
/app/product-review?barcode=7891000315507
```

Quando for integrar câmera real, este é o arquivo principal.

### Product review

Arquivo:

```txt
app/app/product-review.tsx
```

Mostra produto encontrado por barcode.

Dados vêm de:

```txt
useProduct(barcode)
useBarcodeCheckIn()
```

### Refeição planejada

Arquivo:

```txt
app/app/planned-meal.tsx
```

Mostra refeições do plano ativo.

Dados vêm de:

```txt
useActiveDiet()
usePlannedMealCheckIn()
```

### Foto do prato

Arquivo:

```txt
app/app/photo-check-in.tsx
```

Hoje é uma simulação preparada para depois usar câmera/image picker.

Dados vêm de:

```txt
usePhotoCheckIn()
```

### Check-in manual

Arquivo:

```txt
app/app/manual-check-in.tsx
```

Permite digitar:

```txt
Nome
Kcal
Proteína
Carbo
Gordura
```

Dados vêm de:

```txt
useManualCheckIn()
```

### Sucesso do check-in

Arquivo:

```txt
app/app/check-in-success.tsx
```

Mostra:

- pontos;
- ranking;
- contador atualizado;
- medalha desbloqueada;
- botões para Home e Ranking.

Dados vêm de:

```txt
useLastCheckIn()
```

### Grupo

Arquivo:

```txt
app/app/group.tsx
```

Mostra:

- nome do grupo;
- desafio atual;
- membros;
- código de convite;
- botões para Feed, Ranking e Chat.

Dados vêm de:

```txt
useGroup()
```

### Feed

Arquivo:

```txt
app/app/feed.tsx
```

Mostra eventos do grupo:

- check-ins;
- produtos escaneados;
- streak;
- pontos;
- reações;
- comentários.

Dados vêm de:

```txt
useFeed()
```

### Ranking

Arquivo:

```txt
app/app/ranking.tsx
```

Mostra lista de usuários, pontos, streak e medalhas.

Dados vêm de:

```txt
useRanking()
```

### Chat

Arquivo:

```txt
app/app/chat.tsx
```

Mostra mensagens do grupo e permite enviar mensagem.

Dados vêm de:

```txt
useChat()
useSendChatMessage()
```

### Perfil

Arquivo:

```txt
app/app/profile.tsx
```

Mostra:

- avatar;
- nome;
- username;
- medalhas;
- botões para medalhas, dieta e settings.

Dados vêm de:

```txt
useProfile()
```

### Medalhas

Arquivo:

```txt
app/app/medals.tsx
```

Mostra:

- medalhas;
- badges.

Dados vêm de:

```txt
useAchievements()
```

### Dieta

Arquivo:

```txt
app/app/diet.tsx
```

Mostra:

- metas diárias;
- refeições;
- alimentos;
- macros por refeição.

Dados vêm de:

```txt
useActiveDiet()
```

### Settings

Arquivo:

```txt
app/app/settings.tsx
```

Mostra:

- tema atual;
- botão de alternar tema;
- status de `USE_MOCKS`;
- URL da API.

## Componentes principais

Pasta:

```txt
src/components/
```

Componentes mais importantes:

```txt
src/components/ui/ManiacButton.tsx
src/components/ui/ManiacCard.tsx
src/components/ui/ManiacInput.tsx
src/components/ui/LoadingManiac.tsx
src/components/ui/EmptyState.tsx
src/components/layout/Screen.tsx
src/components/layout/ScreenHeader.tsx
src/components/avatar/AvatarPreview.tsx
src/components/macros/MacroCounterCard.tsx
src/components/macros/MacroProgressBar.tsx
src/components/checkin/CheckInOptionCard.tsx
src/components/achievements/MedalBadge.tsx
```

Para mexer no design, provavelmente o melhor caminho é começar por esses componentes. Assim muda várias telas de uma vez.

## Tema e cores

Arquivos:

```txt
src/constants/colors.ts
src/constants/theme.ts
src/constants/spacing.ts
src/store/theme.store.ts
```

O app tem dark/light mode.

O design ainda será refeito pelo Figma, então esses tokens podem mudar bastante.

## Dados, API e mocks

### Hooks usados pelas telas

Arquivo:

```txt
src/hooks/useBackendReadyData.ts
```

As telas devem usar esses hooks, não chamar services direto.

Principais hooks:

```txt
useDailyMacros
useGroup
useFeed
useChat
useSendChatMessage
useActiveDiet
useProduct
useLastCheckIn
useBarcodeCheckIn
usePlannedMealCheckIn
usePhotoCheckIn
useManualCheckIn
useProfile
useRanking
useAchievements
```

### Services

Pasta:

```txt
src/services/
```

Os services fazem a ponte entre app e backend/mock.

### API

Pasta:

```txt
src/api/
```

Arquivos:

```txt
endpoints.ts
dtos.ts
mappers.ts
errors.ts
```

`endpoints.ts` centraliza as rotas.

`dtos.ts` descreve o formato que pode vir do backend.

`mappers.ts` converte backend para o formato interno usado nas telas.

`errors.ts` padroniza erro de API.

### Mocks

Pasta:

```txt
src/mocks/
```

Esses mocks mantêm o app funcionando sem backend.

Para ligar API real:

```txt
EXPO_PUBLIC_USE_MOCKS=false
```

## Store

Pasta:

```txt
src/store/
```

Arquivos:

```txt
auth.store.ts
theme.store.ts
demo.store.ts
```

`demo.store.ts` é usado apenas para manter comportamento mockado mais realista.

As telas principais não devem depender diretamente dele.

## O que o time de design precisa saber

O app já tem fluxo e telas. O design pode trocar:

- layout;
- cores;
- espaçamento;
- tipografia;
- cards;
- botões;
- componentes de macro;
- avatar;
- feed;
- ranking;
- tabs.

Mas deve tentar preservar:

- nomes das rotas;
- hooks usados;
- services;
- tipos;
- navegação principal;
- fluxo de check-in;
- chamadas para API.

Melhor ponto de partida para design:

```txt
src/components/ui/
src/components/layout/
src/components/macros/
src/components/checkin/
app/app/home.tsx
app/app/check-in.tsx
app/app/feed.tsx
app/app/ranking.tsx
app/app/profile.tsx
```

## Estado atual

Já existe:

- fluxo completo mockado;
- estrutura preparada para backend;
- auth com token;
- mappers;
- endpoints centralizados;
- upload preparado em service;
- scanner simulado;
- telas principais;
- lint;
- typecheck.

Ainda falta para produção final:

- plugar backend real;
- testar em celular;
- aplicar design do Figma;
- gerar APK final;
- testar APK instalado.

## Checklist rápido pra fazer o design

1. Rodar o app.
2. Navegar por Home, Check-in, Feed, Ranking e Perfil.
3. Ajustar componentes base primeiro.
4. Depois ajustar telas específicas.
5. Não mexer em `services`, `api`, `hooks` sem necessidade.
6. Validar `npm run typecheck`.
7. Validar `npm run lint`.
