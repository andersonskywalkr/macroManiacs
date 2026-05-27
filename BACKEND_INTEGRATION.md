# Guia para integrar o backend Flask no MacroManiacs

Este arquivo é para quem for ligar o backend Flask no app.

A ideia é simples: o app já está pronto para rodar com mocks e também já está preparado para chamar uma API real. Quando o backend estiver pronto, não é para sair mexendo em tela por tela. O fluxo certo é ajustar as rotas, conferir os formatos das respostas e testar.

## O que eu preciso receber do backend

Preciso receber uma lista clara com:

- URL base da API.
- Todas as rotas.
- Método HTTP de cada rota.
- Body esperado em cada `POST`/`PUT`.
- Exemplo de resposta de sucesso.
- Exemplo de resposta de erro.
- Como vem o token de autenticação.
- Se os campos vêm em `snake_case` ou `camelCase`.
- Se os dados vêm direto ou dentro de `{ data: ... }`.

Exemplo do que seria ideal:

```txt
POST /auth/login
Body:
{
  "email": "rafael@email.com",
  "password": "123456"
}

Response:
{
  "access_token": "...",
  "user": {
    "_id": "123",
    "name": "Rafael",
    "username": "rafael",
    "onboarding_completed": true
  }
}
```

## Onde mudar as rotas

As rotas ficam centralizadas aqui:

```txt
src/api/endpoints.ts
```

Esse é o primeiro arquivo para mexer quando eu receber as rotas reais.

Se o backend usar caminhos diferentes, eu só atualizo esse arquivo.

Exemplo:

```ts
auth: {
  login: "/auth/login",
  register: "/auth/register",
  me: "/auth/me",
}
```

Se o backend vier com `/api/auth/login`, muda só ali:

```ts
login: "/api/auth/login"
```

## Onde mudar o formato das respostas

As telas do app usam tipos internos em `camelCase`.

O backend Flask/Mongo pode devolver coisas como:

```txt
_id
user_id
created_at
daily_targets
onboarding_completed
```

Para isso existem os mappers:

```txt
src/api/mappers.ts
```

E os DTOs:

```txt
src/api/dtos.ts
```

Se a resposta do backend vier diferente, não é para alterar a tela. O certo é ajustar o mapper.

Exemplo:

```ts
export function mapUser(value: ApiUser): User {
  return {
    id: value.id ?? value._id ?? "",
    onboardingCompleted:
      value.onboardingCompleted ?? value.onboarding_completed ?? false,
  };
}
```

## Como ligar a API real

Criar um `.env` usando o `.env.example`:

```txt
EXPO_PUBLIC_API_URL=http://URL_DO_BACKEND
EXPO_PUBLIC_USE_MOCKS=false
```

Enquanto estiver sem backend, deixar:

```txt
EXPO_PUBLIC_USE_MOCKS=true
```

## Arquivos principais da integração

```txt
src/api/endpoints.ts
src/api/dtos.ts
src/api/mappers.ts
src/api/errors.ts
src/lib/api.ts
src/services/*.service.ts
src/hooks/useBackendReadyData.ts
```

O fluxo correto é:

```txt
tela
-> hook
-> service
-> endpoint
-> mapper
-> tipo interno do app
```

As telas não devem chamar `api.get`, `api.post` ou URL diretamente.

## Auth

Rotas esperadas:

```txt
POST /auth/register
POST /auth/login
GET  /auth/me
POST /auth/logout
```

O app já está preparado para salvar token no `SecureStore`.

Ele aceita token vindo como:

```txt
accessToken
access_token
token
```

Depois disso, todas as requests mandam:

```txt
Authorization: Bearer <token>
```

Se o backend responder `401`, o app apaga o token local.

## Dieta

Rotas esperadas:

```txt
POST /diet/scan
POST /diet/confirm
GET  /diet/active
PUT  /diet/targets
POST /diet/rescan
```

O scan de dieta já está preparado para:

- texto manual;
- PDF;
- imagem;
- multipart/form-data.

Assinatura preparada no frontend:

```ts
{
  sourceType: "pdf" | "image" | "text" | "manual";
  text?: string;
  fileUri?: string;
  fileName?: string;
  mimeType?: string;
}
```

## Macros e Home

Rotas esperadas:

```txt
GET /home
GET /macros/today
GET /checkins/today
```

Hoje a Home e o Diário de Macros usam principalmente:

```txt
GET /macros/today
```

## Grupos

Rotas esperadas:

```txt
POST /groups
POST /groups/join
GET  /groups/current
GET  /groups/:id
GET  /groups/:id/feed
GET  /groups/:id/ranking
GET  /groups/:id/chat
POST /groups/:id/chat
POST /groups/:id/invite
```

Se o backend não tiver `/groups/current`, pode trocar no `endpoints.ts` para a rota real.

## Produtos

Rotas esperadas:

```txt
GET  /products/barcode/:barcode
POST /products/manual
```

A tela de produto já recebe o código pela URL interna do app:

```txt
/app/product-review?barcode=7891000315507
```

## Check-ins

Rotas esperadas:

```txt
POST /checkins/barcode
POST /checkins/planned-meal
POST /checkins/photo
POST /checkins/manual
PUT  /checkins/:id
DELETE /checkins/:id
```

Payloads já preparados:

```ts
BarcodeCheckInPayload = {
  barcode?: string;
  servingSize?: number;
}

PlannedMealCheckInPayload = {
  mealId?: string;
}

PhotoCheckInPayload = {
  fileUri?: string;
  fileName?: string;
  mimeType?: string;
}

ManualCheckInPayload = {
  title: string;
  macros: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}
```

## Feed, ranking, chat e conquistas

Rotas esperadas:

```txt
GET  /groups/:id/feed
POST /feed/:id/reactions
POST /feed/:id/comments
GET  /groups/:id/ranking
GET  /groups/:id/chat
POST /groups/:id/chat
GET  /achievements
GET  /profile/badges
GET  /profile/medals
```

## Como testar quando as rotas chegarem

1. Criar `.env`.
2. Colocar `EXPO_PUBLIC_USE_MOCKS=false`.
3. Atualizar `src/api/endpoints.ts`.
4. Rodar:

```bash
npm run typecheck
npm run lint
npm run web
```

5. Testar no app:

```txt
Cadastro
Login
Onboarding
Scan/revisao de dieta
Home
Diario de macros
Check-in por barcode
Check-in por refeicao planejada
Check-in manual
Check-in por foto
Feed
Grupo
Ranking
Chat
Perfil
Medalhas
Settings
```

6. Se alguma resposta vier diferente, ajustar `src/api/dtos.ts` e `src/api/mappers.ts`.
7. Quando tudo estiver funcionando, gerar APK.

## Observação importante

O app não precisa ser hospedado para funcionar como APK.

O que precisa estar hospedado ou acessível pelo celular é o backend.

Para o hackathon em si, o ideal é o backend estar em uma URL pública, tipo:

```txt
Render
Railway
Fly.io
ou na AWS mesmo nao sei
```
