# Guía de Estilos CSS — ReTruco

**Última actualización:** 30 de Marzo, 2026

---

## Índice

1. [Sistema de Diseño](#sistema-de-diseño)
2. [Paleta de Colores](#paleta-de-colores)
3. [Tipografía](#tipografía)
4. [Componentes](#componentes)
5. [Animaciones](#animaciones)
6. [Responsive Design](#responsive-design)
7. [Accesibilidad](#accesibilidad)
8. [Best Practices](#best-practices)

---

## Sistema de Diseño

### Filosofía

ReTruco utiliza un diseño **minimalista y oscuro** con acentos en turquesa brillante. La interfaz es limpia y enfocada en el gameplay.

### Estructura Base

```css
:root {
    /* COLORES */
    --rust: #2bb8cd;              /* Turquesa principal */
    --paper: #f0f0f0;             /* Blanco cálido */
    --ink: #0a0a0a;               /* Negro puro */
    --bg: #0a0a0a;                /* Fondo oscuro */
    --card-bg: #f5f0e1;           /* Crema para cartas */
    --gold: #d4af37;              /* Dorado */
    --red: #ff4757;               /* Rojo alerta */
    --green: #2ed573;             /* Verde éxito */
    --table-green: #1a5c3a;       /* Verde mesa */

    /* TAMAÑOS */
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;

    /* TIPOGRAFÍA */
    --font-primary: 'Montserrat', sans-serif;
    --font-display: 'Trevor', sans-serif;
    --font-size-sm: 0.75rem;
    --font-size-base: 1rem;
    --font-size-lg: 1.25rem;
    --font-size-xl: 1.5rem;
    --font-size-2xl: 2rem;

    /* EFECTOS */
    --transition-base: all 0.2s ease;
    --transition-slow: all 0.4s ease;
    --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
    --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.15);
    --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.2);
    --shadow-xl: 0 12px 32px rgba(0, 0, 0, 0.3);
}
```

---

## Paleta de Colores

### Colores Primarios

| Color | Código | Uso |
|-------|--------|-----|
| **Rust (Turquesa)** | `#2bb8cd` | Acentos, bordes, buttons hover |
| **Ink (Negro)** | `#0a0a0a` | Fondos oscuros, texto en light |
| **Paper (Blanco)** | `#f0f0f0` | Texto principal, fondos light |

### Colores de Soporte

| Color | Código | Uso |
|-------|--------|-----|
| **Card Bg (Crema)** | `#f5f0e1` | Fondo de cartas |
| **Gold** | `#d4af37` | Acentos dorados, envido |
| **Green** | `#2ed573` | Estados positivos, victoria |
| **Red** | `#ff4757` | Estados negativos, alerta |
| **Table Green** | `#1a5c3a` | Fondo de mesa de juego |

### Variaciones Transparentes

```css
rgba(43, 184, 205, 0.1)   /* Rust very light */
rgba(43, 184, 205, 0.5)   /* Rust medium */
rgba(43, 184, 205, 0.8)   /* Rust dark */
rgba(255, 255, 255, 0.05) /* White very light */
rgba(0, 0, 0, 0.7)        /* Black dark */
```

### Uso en Contexto

**Landing Page:**
- Fondo: `#0a0a0a`
- Texto: `#f0f0f0`
- Acentos: `#2bb8cd`

**Juego de Truco:**
- Mesa: `#1a5c3a`
- Cartas: `#f5f0e1`
- UI: `#0a0a0a`
- Highlights: `#2bb8cd`, `#ffd700`, `#2ed573`

**Botones:**
- Default: `rgba(0, 0, 0, 0.7)` border `#2bb8cd`
- Hover: bg `#2bb8cd`, color `#0a0a0a`
- Active: más saturado, shadow más marcada

---

## Tipografía

### Fuentes Utilizadas

#### Fuente Display: Trevor

```css
@font-face {
    font-family: 'Trevor';
    src: url('/fuentes/TREVOR.TTF') format('truetype');
    font-weight: bold;
    font-style: normal;
}
```

**Uso:** Títulos, headings, elementos prominentes
**Características:** Bold, all-caps friendly, retro

```html
<h1 style="font-family: 'Trevor'; letter-spacing: 3px;">RETRUCO</h1>
```

#### Fuente Primaria: Montserrat

```css
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');
```

**Uso:** Body text, UI elements
**Pesos disponibles:** 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

```html
<p style="font-family: 'Montserrat'; font-weight: 500;">Texto importante</p>
```

### Escalas Tipográficas

#### Landing Page

```css
.landing-h1 {
    font-family: 'Trevor', sans-serif;
    font-size: 3.5rem;
    font-weight: bold;
    letter-spacing: 2px;
    text-transform: uppercase;
}

.landing-h2 {
    font-family: 'Montserrat', sans-serif;
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: 1px;
}

.landing-body {
    font-family: 'Montserrat', sans-serif;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.6;
}
```

#### Juego

```css
.game-title {
    font-family: 'Trevor', sans-serif;
    font-size: 1.5rem;
    letter-spacing: 3px;
    text-transform: uppercase;
}

.game-body {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
}

.score-display {
    font-family: 'Trevor', sans-serif;
    font-size: 0.9rem;
    letter-spacing: 3px;
}
```

---

## Componentes

### Cartas

#### Estructura HTML

```html
<div class="card card-img playable" data-key="1-espadas" draggable="true">
    <img src="cartas/1deespada.png" alt="1 de Espadas" draggable="false">
    <div class="card-shine"></div>
</div>
```

#### Estilos Base

```css
.card {
    /* Layout */
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;

    /* Sizing */
    width: 80px;
    height: 120px;
    border-radius: 8px;

    /* Visual */
    background: var(--card-bg);
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: var(--shadow-md);

    /* Effects */
    transition: var(--transition-base);
    cursor: grab;
}

.card:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-lg);
}

.card:active {
    cursor: grabbing;
}
```

#### Con Imagen

```css
.card-img {
    overflow: hidden;
}

.card-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    user-select: none;
    pointer-events: none;
}
```

#### Shine Effect

```css
.card-shine {
    position: absolute;
    inset: 0;
    border-radius: 8px;
    background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.3) 0%,
        rgba(255, 255, 255, 0) 70%
    );
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s;
}

.card:hover .card-shine {
    opacity: 1;
}
```

#### Estados

```css
/* Carta jugable */
.card.playable {
    border: 2px solid var(--green);
    box-shadow: 0 0 12px rgba(46, 204, 113, 0.3);
}

/* Carta seleccionada */
.card.selected {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(43, 184, 205, 0.5);
}

/* Carta deshabilitada */
.card.disabled {
    opacity: 0.4;
    cursor: not-allowed;
    pointer-events: none;
}

/* Carta boca abajo */
.card.face-down {
    background: linear-gradient(135deg, #0a3a4a 0%, #0d5a6a 100%);
    border: 2px solid var(--rust);
}
```

### Botones

#### Base Button

```css
button {
    /* Styling */
    font-family: 'Montserrat', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 1px;

    /* Layout */
    padding: 12px 24px;
    border: 2px solid var(--rust);
    border-radius: 6px;

    /* Colors */
    background: rgba(0, 0, 0, 0.7);
    color: var(--rust);

    /* Effects */
    transition: var(--transition-base);
    cursor: pointer;
    text-transform: uppercase;

    /* Remove defaults */
    user-select: none;
    outline: none;
}

button:hover {
    background: var(--rust);
    color: var(--ink);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(43, 184, 205, 0.3);
}

button:active {
    transform: translateY(0);
}

button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
}
```

#### Button Variants

```css
/* Primary (Turquesa) */
.btn-primary {
    background: var(--rust);
    color: var(--ink);
}

.btn-primary:hover {
    background: #1a9ab6;
    box-shadow: 0 6px 16px rgba(43, 184, 205, 0.4);
}

/* Success (Verde) */
.btn-success {
    border-color: var(--green);
    color: var(--green);
}

.btn-success:hover {
    background: var(--green);
    color: var(--ink);
}

/* Danger (Rojo) */
.btn-danger {
    border-color: var(--red);
    color: var(--red);
}

.btn-danger:hover {
    background: var(--red);
    color: var(--paper);
}

/* Large */
.btn-lg {
    padding: 16px 32px;
    font-size: 1.1rem;
}

/* Small */
.btn-sm {
    padding: 8px 16px;
    font-size: 0.8rem;
}

/* Block (Full width) */
.btn-block {
    display: block;
    width: 100%;
}
```

### Modal / Dialog

```css
.modal {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.8);
    z-index: 1000;
    backdrop-filter: blur(4px);
}

.modal.hidden {
    display: none;
}

.modal-content {
    background: linear-gradient(135deg, #0a0a0a 0%, #1a2a3a 100%);
    border: 2px solid var(--rust);
    border-radius: 12px;
    padding: 32px;
    max-width: 500px;
    width: 90%;
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
    animation: slideDown 0.3s ease;
}

.modal-header {
    font-family: 'Trevor', sans-serif;
    font-size: 1.8rem;
    letter-spacing: 2px;
    margin-bottom: 16px;
    color: var(--rust);
}

.modal-body {
    font-size: 1rem;
    color: var(--paper);
    margin-bottom: 24px;
    line-height: 1.6;
}

.modal-footer {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
}
```

### Score Display

```css
.score-display {
    display: flex;
    gap: 12px;
    align-items: center;
    font-family: 'Trevor', sans-serif;
    font-size: 0.9rem;
    letter-spacing: 3px;
    white-space: nowrap;
    background: rgba(0, 0, 0, 0.6);
    padding: 12px 24px;
    border-radius: 30px;
    border: 1px solid rgba(255, 255, 255, 0.15);
}

.score-you {
    color: var(--green);
    text-shadow: 0 0 10px rgba(46, 204, 113, 0.4);
}

.score-opponent {
    color: var(--red);
    text-shadow: 0 0 10px rgba(255, 71, 87, 0.4);
}

.score-sep {
    color: rgba(255, 255, 255, 0.3);
    font-size: 1.2rem;
}
```

---

## Animaciones

### Keyframes Principales

#### Card Entrance

```css
@keyframes cardEntrance {
    from {
        opacity: 0;
        transform: scale(0.5) rotate(-45deg);
    }
    to {
        opacity: 1;
        transform: scale(1) rotate(0deg);
    }
}

.card.will-animate {
    animation: cardEntrance 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

#### Slide Down

```css
@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.modal-content {
    animation: slideDown 0.3s ease;
}
```

#### Fade In

```css
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.fade-in {
    animation: fadeIn 0.4s ease;
}
```

#### Pulse

```css
@keyframes pulse {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0.7;
    }
}

.pulse {
    animation: pulse 1s infinite;
}
```

#### Shake

```css
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
}

.shake {
    animation: shake 0.4s ease;
}
```

#### Glow

```css
@keyframes glow {
    0% {
        box-shadow: 0 0 5px var(--rust);
    }
    50% {
        box-shadow: 0 0 20px var(--rust), 0 0 30px var(--rust);
    }
    100% {
        box-shadow: 0 0 5px var(--rust);
    }
}

.glow {
    animation: glow 1s ease infinite;
}
```

### Uso de Animaciones

```css
.will-animate {
    animation-duration: 0.3s;
    animation-timing-function: ease-out;
}

.card.enter-slow {
    animation: cardEntrance 0.6s ease;
}

.opponent-speaks {
    animation: fadeIn 0.4s, slideDown 0.4s;
}
```

---

## Responsive Design

### Breakpoints

```css
/* Mobile First */
/* 0px - 640px: Mobile */
/* 640px - 1024px: Tablet */
/* 1024px+: Desktop */
```

### Media Queries

```css
/* Tablet y más grande */
@media (min-width: 640px) {
    .card {
        width: 100px;
        height: 150px;
    }
}

/* Desktop */
@media (min-width: 1024px) {
    .card {
        width: 120px;
        height: 180px;
    }

    button {
        padding: 14px 28px;
        font-size: 1rem;
    }
}
```

### Ejemplo: Game Layout

```css
/* Mobile: Vertical stack */
.game-container {
    display: flex;
    flex-direction: column;
}

.player-area {
    order: 3;
}

.game-table {
    order: 2;
}

.opponent-area {
    order: 1;
}

/* Desktop: Horizontal layout */
@media (min-width: 1024px) {
    .game-container {
        flex-direction: row;
    }

    .opponent-area { flex: 1; }
    .game-table { flex: 2; }
    .player-area { flex: 1; }
}
```

---

## Accesibilidad

### Colores

```css
/* Alto contraste */
.text-primary {
    color: var(--ink);
    background: var(--paper);
}

/* Suficiente contraste en dark mode */
.text-light {
    color: var(--paper);
    background: var(--ink);
}

/* Avisos de color */
.status-success {
    color: var(--green);
    /* Combinar con iconos, no solo color */
}

.status-error {
    color: var(--red);
    /* Combinar con iconos, no solo color */
}
```

### Focus States

```css
button:focus,
input:focus,
a:focus {
    outline: 2px solid var(--rust);
    outline-offset: 2px;
}

/* Para mouse, ocultar outline */
button:focus:not(:focus-visible) {
    outline: none;
}

button:focus-visible {
    outline: 2px solid var(--rust);
    outline-offset: 2px;
}
```

### Animaciones Reducidas

```css
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
```

### Etiquetas y ARIA

```html
<button aria-label="Aumentar volumen" aria-pressed="false">
    <span aria-hidden="true">🔊</span>
</button>

<div role="status" aria-live="polite">
    Has ganado 2 puntos por envido
</div>

<div class="card" role="img" aria-label="1 de Espadas">
    <img src="..." alt="1 de Espadas" />
</div>
```

---

## Best Practices

### 1. Uso de Variables CSS

```css
/* ✅ BIEN */
:root {
    --color-primary: #2bb8cd;
}

button {
    border-color: var(--color-primary);
}

/* ❌ MAL */
button {
    border-color: #2bb8cd;
}
```

### 2. Orden de Propiedades

```css
.elemento {
    /* Display & Layout */
    display: flex;
    flex-direction: column;

    /* Sizing */
    width: 100%;
    height: auto;
    max-width: 500px;

    /* Spacing */
    margin: 0;
    padding: 16px;
    gap: 8px;

    /* Visual */
    background: var(--bg);
    color: var(--paper);
    border: 2px solid var(--rust);
    border-radius: 8px;

    /* Effects */
    box-shadow: var(--shadow-md);
    transition: var(--transition-base);

    /* Positioning (si es necesario) */
    position: relative;
    z-index: 10;
}
```

### 3. Convención de Nombres BEM

```css
/* Block */
.card { }

/* Element */
.card__image { }
.card__title { }

/* Modifier */
.card--selected { }
.card--disabled { }

/* Uso en HTML */
<div class="card card--selected">
    <img class="card__image" src="..." />
    <h3 class="card__title">Título</h3>
</div>
```

### 4. Media Queries Mobile-First

```css
/* Base: Mobile */
.container {
    padding: 8px;
    font-size: 0.9rem;
}

/* Tablet y más */
@media (min-width: 640px) {
    .container {
        padding: 16px;
        font-size: 1rem;
    }
}

/* Desktop */
@media (min-width: 1024px) {
    .container {
        padding: 24px;
        font-size: 1.1rem;
    }
}
```

### 5. Evitar Z-index Mágicos

```css
/* ✅ BIEN: Z-index documentado */
:root {
    --z-base: 1;
    --z-elevated: 10;
    --z-modal: 100;
    --z-tooltip: 1000;
}

.card { z-index: var(--z-base); }
.modal { z-index: var(--z-modal); }

/* ❌ MAL */
.overlay { z-index: 9999; }
.tooltip { z-index: 10000; }
```

### 6. Performance: Animaciones GPU

```css
/* ✅ Usar transform y opacity (GPU) */
.card:hover {
    transform: translateY(-8px);
    opacity: 0.9;
}

/* ❌ Evitar cambiar layouts */
.card:hover {
    top: -8px;          /* Recalcula layout */
    padding: 20px;      /* Recalcula layout */
}
```

---

## Checklist para Nuevos Componentes

- [ ] ¿Usa variables CSS (--)?
- [ ] ¿Las propiedades están ordenadas?
- [ ] ¿Tiene estados (hover, active, disabled)?
- [ ] ¿Es responsive?
- [ ] ¿Tiene alto contraste?
- [ ] ¿Focus state visible?
- [ ] ¿Las animaciones son GPU-friendly?
- [ ] ¿Los tiempos de animación son < 400ms?
- [ ] ¿El código es reutilizable?

---

## Referencias

- [MDN - CSS Best Practices](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [Google Fonts](https://fonts.google.com/)
- [CSS Tricks](https://css-tricks.com/)
- [WCAG 2.1 Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
