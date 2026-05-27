# Design Tokens - MacroManiacs

Baseado na frame principal **Home** do projeto MacroManiacs.

## Cores

```css
:root {
  --color-background: #E1CFF9;
  --color-surface: #FDF9ED;
  --color-primary: #280060;
  --color-primary-soft: #471C81;
  --color-accent: #A870DB;
  --color-accent-soft: #CAA1FF;
  --color-text: #280060;
  --color-muted-text: #471C81;
  --color-border: #280060;
  --color-black: #000000;
  --color-white: #FFFFFF;

  --color-chart-purple: #A870DB;
  --color-chart-green: #A9C984;
  --color-chart-yellow: #F5C779;
  --color-chart-red: #B36464;
}
```

- **Background:** `#E1CFF9`
- **Surface / cards:** `#FDF9ED`
- **Primary:** `#280060`
- **Primary soft:** `#471C81`
- **Accent:** `#A870DB`
- **Accent soft:** `#CAA1FF`
- **Text:** `#280060`
- **Muted text:** `#471C81`
- **Border:** `#280060`
- **Chart colors:** `#A870DB`, `#A9C984`, `#F5C779`, `#B36464`

## Tipografia

```css
:root {
  --font-family-base: "Baloo 2", Arial, sans-serif;
  --font-family-display: "Baloo 2", Arial, sans-serif;
  --font-family-badge: "Luckiest Guy", "Baloo 2", Arial, sans-serif;

  --font-size-h1: 24px;
  --line-height-h1: 32px;
  --font-weight-h1: 800;

  --font-size-title: 20px;
  --line-height-title: 27px;
  --font-weight-title: 800;

  --font-size-section-title: 17px;
  --line-height-section-title: 20px;
  --font-weight-section-title: 800;

  --font-size-body: 12px;
  --line-height-body: 16px;
  --font-weight-body: 400;

  --font-size-label: 9px;
  --line-height-label: 12px;
  --font-weight-label: 700;

  --font-size-caption: 11px;
  --line-height-caption: 14px;
  --font-weight-caption: 400;

  --font-size-metric: 42px;
  --line-height-metric: 48px;
  --font-weight-metric: 700;
}
```

- **Fonte:** `Baloo 2`, `Arial`, `sans-serif`
- **Fonte de badges:** `Luckiest Guy`, `Baloo 2`, `Arial`, `sans-serif`
- **H1:** `24px / 32px`, peso `800`
- **Titulo de acao:** `20px / 27px`, peso `800`
- **Titulo de secao:** `17px / 20px`, peso `800`
- **Body:** `12px / 16px`, peso `400`
- **Labels:** `9px / 12px`, peso `700`
- **Caption:** `11px / 14px`, peso `400`
- **Metric principal:** `42px / 48px`, peso `700`

## Layout

```css
:root {
  --frame-width: 440px;
  --frame-height: 956px;

  --padding-x: 20px;
  --padding-x-main-card: 25px;
  --content-width-main-card: 390px;

  --radius-card-large: 45px;
  --radius-card-inner: 43px;
  --radius-button: 15px;
  --radius-tab-item: 15px;
  --radius-tab-bar: 45px 45px 0 0;

  --border-width-heavy: 4px;
  --tab-bar-height: 94px;
  --top-bar-height: 38px;
}
```

- **Largura do frame:** `440px`
- **Altura do frame:** `956px`
- **Padding lateral:** `20px`
- **Padding lateral do card principal:** `25px`
- **Card principal:** `390px` de largura
- **Radius dos cards/botoes:** cards grandes `45px`; card interno `43px`; botoes `15px`
- **Borda principal:** `4px`
- **Altura da tab bar:** `94px`
- **Altura da top bar:** `38px`

## Espacamentos

```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
}
```

- **Gap pequeno:** `8px`
- **Gap medio:** `16px`
- **Gap grande:** `24px`
- **Margem lateral padrao:** `20px`

## Componentes

```css
:root {
  --main-card-width: 390px;
  --main-card-height: 394px;
  --main-card-inner-width: 383px;
  --main-card-inner-height: 388px;

  --action-button-width: 306px;
  --action-button-height: 50px;

  --small-card-width-ranking: 188px;
  --small-card-width-chart: 197px;
  --small-card-height: 216px;

  --tab-item-size: 50px;
  --tab-icon-size: 32px;
  --notification-icon-size: 22px;
}
```

- **Card de macros:** `390px x 394px`
- **Area interna do card de macros:** `383px x 388px`
- **Botao "Adicionar Refeicao":** `306px x 50px`
- **Card Ranking:** `188px x 216px`
- **Card Desempenho Semanal:** `197px x 216px`
- **Item ativo da tab bar:** `50px x 50px`
- **Icone de notificacao:** `22px`

## Tokens em JSON

```json
{
  "colors": {
    "background": "#E1CFF9",
    "surface": "#FDF9ED",
    "primary": "#280060",
    "primarySoft": "#471C81",
    "accent": "#A870DB",
    "accentSoft": "#CAA1FF",
    "text": "#280060",
    "mutedText": "#471C81",
    "border": "#280060",
    "black": "#000000",
    "white": "#FFFFFF",
    "chart": {
      "purple": "#A870DB",
      "green": "#A9C984",
      "yellow": "#F5C779",
      "red": "#B36464"
    }
  },
  "typography": {
    "fontFamily": "Baloo 2, Arial, sans-serif",
    "displayFontFamily": "Baloo 2, Arial, sans-serif",
    "badgeFontFamily": "Luckiest Guy, Baloo 2, Arial, sans-serif",
    "h1": {
      "fontSize": "24px",
      "lineHeight": "32px",
      "fontWeight": 800
    },
    "title": {
      "fontSize": "20px",
      "lineHeight": "27px",
      "fontWeight": 800
    },
    "sectionTitle": {
      "fontSize": "17px",
      "lineHeight": "20px",
      "fontWeight": 800
    },
    "body": {
      "fontSize": "12px",
      "lineHeight": "16px",
      "fontWeight": 400
    },
    "labels": {
      "fontSize": "9px",
      "lineHeight": "12px",
      "fontWeight": 700
    },
    "caption": {
      "fontSize": "11px",
      "lineHeight": "14px",
      "fontWeight": 400
    },
    "metric": {
      "fontSize": "42px",
      "lineHeight": "48px",
      "fontWeight": 700
    }
  },
  "layout": {
    "frameWidth": "440px",
    "frameHeight": "956px",
    "paddingX": "20px",
    "mainCardPaddingX": "25px",
    "mainCardContentWidth": "390px",
    "largeCardRadius": "45px",
    "innerCardRadius": "43px",
    "buttonRadius": "15px",
    "tabItemRadius": "15px",
    "tabBarRadius": "45px 45px 0 0",
    "heavyBorderWidth": "4px",
    "tabBarHeight": "94px",
    "topBarHeight": "38px"
  },
  "spacing": {
    "space1": "4px",
    "space2": "8px",
    "space3": "12px",
    "space4": "16px",
    "space5": "20px",
    "space6": "24px",
    "space8": "32px",
    "space10": "40px"
  },
  "components": {
    "mainCard": {
      "width": "390px",
      "height": "394px",
      "innerWidth": "383px",
      "innerHeight": "388px"
    },
    "actionButton": {
      "width": "306px",
      "height": "50px"
    },
    "smallCards": {
      "rankingWidth": "188px",
      "chartWidth": "197px",
      "height": "216px"
    },
    "tabBar": {
      "height": "94px",
      "itemSize": "50px",
      "iconSize": "32px"
    },
    "notification": {
      "iconSize": "22px",
      "dotSize": "6px"
    }
  }
}
```
