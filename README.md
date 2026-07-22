# ReTruco 🎴

> **Estado actual (22 de julio de 2026):** el minijuego de Truco anterior fue retirado junto con sus cartas y scripts. `/truco/` muestra una pantalla temporal hasta integrar el reemplazo. Las secciones históricas de este README que describen su IA, audio o gameplay ya no representan el código desplegado.

> Una historia bien criolla. Acción, sátira, barrio y delirio en formato videojuego.

ReTruco es una aventura satírica y bien argenta en Buenos Aires inspirada en South Park. Mezcla **Run & Gun**, **Beat 'Em Up** y **RPG** con humor absurdo, política criolla y nostalgia retro. Completamente gratuito. 100% online.

**🌐 Demo disponible:** [https://retruco.xyz](https://retruco.xyz)

---

## 📋 Contenido

- [Características](#características)
- [Stack tecnológico](#stack-tecnológico)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Guía de desarrollo](#guía-de-desarrollo)
- [Deploy en Netlify](#deploy-en-netlify)
- [Roadmap](#roadmap)
- [Licencia](#licencia)

---

## ✨ Características

### Truco

- El minijuego anterior fue retirado para evitar mantener y desplegar código que será reemplazado.
- `/truco/` conserva una pantalla temporal; las URLs antiguas de juego y tutorial redirigen allí.

### Landing Page

- **SEO completo** con meta tags, Open Graph, Twitter Cards
- **Schema.org JSON-LD** para indexación de videojuegos
- **Página 404 personalizada** con humor criollo
- **Responsive design** con fuentes personalizadas
- **Animaciones sutiles** en toda la interfaz

---

## 🛠️ Stack Tecnológico

| Tecnología | Uso |
|-----------|-----|
| **HTML5** | Estructura semántica |
| **CSS3** | Estilos, animaciones, gradientes |
| **JavaScript (Vanilla)** | Lógica del juego, IA, efectos |
| **Canvas API** | Sistema de partículas |
| **Web Audio API** | Gestión de audio y música |
| **Netlify** | Hosting, redirects, headers |

**Sin dependencias externas.** Todo código puro.

---

## 📁 Estructura del Proyecto

```
retruco_netlify/
├── index.html              # Landing page principal
├── 404.html                # Página de error personalizada
├── robots.txt              # SEO: robots.txt
├── sitemap.xml             # SEO: sitemap
├── _redirects              # Redirects de Netlify (www → no-www)
├── _headers                # Headers y cache de Netlify
│
├── favicon/                # Iconos y manifest PWA
│
├── assets/                 # Todos los recursos multimedia, agrupados
│   ├── imagenes/           # Imágenes del sitio y del juego (personajes, fondos, UI, sprites)
│   ├── fuentes/            # Tipografías (TREVOR.TTF, RoodrigueZ ornament.ttf, TrashHand.TTF)
│   └── songs/              # Soundtrack (.mp3 / .m4a)
│
├── truco/                  # Pantalla temporal para el futuro reemplazo
│   └── index.html
│
├── retrucocharacter/       # Character creator — "armá tu personaje" (vanilla JS)
│   ├── indexcharacter.html # App de página única
│   └── assets/             # Partes del personaje (ojos, boca, pelo, ropa, tonos…)
│
├── docs/                   # Documentación técnica
│   └── roadmap/            # Diseño narrativo NO implementado (guión y gameplay futuro)
│
└── _experiments/           # Prototipos de animación descartados (marquees, transiciones)
```

---

## 🧭 Notas para quien recibe el proyecto

Sitio **estático** (HTML/CSS/JS vanilla) con un build de Node sin dependencias de runtime. `npm run build` genera `dist/`, versiona los assets por contenido y valida las referencias antes del deploy.

**Convención de assets:** todo lo multimedia vive en `assets/` (`imagenes/`, `fuentes/`, `songs/`).
- Desde la raíz (`index.html`, `404.html`) se referencia como `assets/imagenes/...`
- Desde los subproyectos (`truco/`, `retrucocharacter/`) como `../assets/imagenes/...`
- Si movés o renombrás un asset, actualizá **ambas** formas y la regla de cache en `_headers`.

**Carpetas especiales:**
- `_experiments/` → prototipos viejos de animación, NO forman parte del sitio. Referencia/inspiración, descartables.
- `docs/roadmap/` → guión y gameplay de un juego de acción **que no está construido**. Es diseño a futuro, no refleja lo que hoy existe (landing + character creator + pantalla temporal de Truco).

**Comandos actuales:** `npm run check` valida el código fuente y `npm run build` produce el sitio listo para publicar en `dist/`.

---

## 🚀 Guía de Desarrollo

### Requisitos

- **Servidor HTTP local** (para testing de fuentes y fetch)
- **Navegador moderno** (Chrome, Firefox, Safari, Edge)
- **Editor de texto** (VS Code recomendado)

### Ejecutar localmente

#### Opción 1: Python

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### Opción 2: Node.js

```bash
npx http-server
```

#### Opción 3: VS Code Live Server

1. Instala la extensión "Live Server" de Ritwick Dey
2. Click derecho en `index.html` → "Open with Live Server"

Luego abre en el navegador:
```
http://localhost:8000
```

### Estructura de Archivos Importante

**Landing Page** (`index.html`):
- 110KB HTML con estilos inline
- Meta tags SEO completos
- Open Graph y Twitter Cards
- Schema.org JSON-LD

**Juego Truco** (`truco/juego.html`):
- 68KB HTML con UI del juego
- Estilos en `<style>` tag
- Lógica en JavaScript inline
- Importa `shared.js` para constantes e IA

**Lógica Compartida** (`truco/shared.js`):
- **Constantes del Truco:** palos, números, símbolos
- **Cálculo de poder:** sistema de ranking de cartas
- **Cálculo de Envido:** valores por número de carta
- **Rendering de cartas:** genera HTML con imágenes o símbolos
- **Gestión de mazo:** crear, mezclar
- **10 Personajes:** Abraham, Alfredito, Aliado, Cacho, El Tano, La Negra, Tití, Tordo, Varela, Yeyo
- **IA adaptativa:** thresholds, probabilidades, estrategias por personaje

---

## 🎮 Cómo Jugar al Truco

### Reglas Básicas

El Truco es un juego de cartas argentino para 2 jugadores. Se juega con una baraja española (40 cartas).

**Objetivo:** Ser el primero en llegar a 30 puntos.

### Fases del Juego

1. **Repartición:** Se reparten 3 cartas a cada jugador
2. **Envido:** Se canta el valor de dos cartas del mismo palo (máx 39)
3. **Truco:** Se apuesta por quién gana la mano actual
4. **Juego:** Se juegan hasta 3 manos

### Sistema de Poder (Jerarquía de Cartas)

| Carta | Poder | Carta | Poder |
|-------|-------|-------|-------|
| 1 Espadas | 14 | 7 Copas | 4 |
| 1 Bastos | 13 | 7 Bastos | 4 |
| 7 Espadas | 12 | 6 de cualquier palo | 3 |
| 7 Oros | 11 | 5 de cualquier palo | 2 |
| 3 de cualquier palo | 10 | 4 de cualquier palo | 1 |
| 2 de cualquier palo | 9 | Resto | 0 |

### Envido (Apuesta Extra)

- **Envido:** 2 puntos
- **Real Envido:** 3 puntos
- **Falta Envido:** Todos los puntos restantes

Se calcula sumando los valores de dos cartas del mismo palo (1=1, 2=2... 10=0, 11=0, 12=0).

### Truco (Apuesta Principal)

- **Truco:** 2 puntos
- **Retruco:** 3 puntos
- **Vale Cuatro:** 4 puntos

La mano actual vale estos puntos.

### Contrincantes y Dificultades

| Personaje | Rol | Dificultad | Tier |
|-----------|-----|-----------|------|
| Abraham | El Veterano | Fácil | Tier 1 |
| Alfredito | El Iniciador | Media | Tier 1 |
| Aliado | El Compañero | Media | Tier 2 |
| Cacho | El Pichiciago | Difícil | Tier 2 |
| El Tano | El Estratega | Difícil | Tier 2 |
| La Negra | La Matona | Difícil | Tier 3 |
| Tití | La Travesti | Muy Difícil | Tier 3 |
| Tordo | El Corrupto | Muy Difícil | Tier 3 |
| Varela | El Finlandés | Experto | Tier 4 |
| Yeyo | El Satánico | Experto | Tier 4 |

Cada personaje tiene:
- **Lore único** (quiénes son, por qué están en el juego)
- **IA diferente** con probabilidades personalizadas
- **Diálogos propios** para cada acción
- **Estrategia visual** (color, fondo, pose)

---

## 🎨 Guía de Estilos CSS

### Paleta de Colores

```css
--rust: #2bb8cd          /* Azul turquesa principal */
--paper: #f0f0f0         /* Blanco cálido para texto */
--ink: #0a0a0a           /* Negro puro para fondos */
--bg: #0a0a0a            /* Fondo oscuro */
--card-bg: #f5f0e1       /* Crema para cartas */
--gold: #d4af37          /* Dorado para acentos */
--red: #ff4757           /* Rojo para alertas */
--green: #2ed573         /* Verde para éxito */
--table-green: #1a5c3a   /* Verde mesa de juego */
```

### Componentes Principales

**Cartas:**
```css
.card {
    background: var(--card-bg);
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.4);
    transition: all 0.2s;
}

.card:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.6);
}
```

**Botones:**
```css
button {
    font-family: 'Trevor', sans-serif;
    background: rgba(0,0,0,0.7);
    border: 2px solid var(--rust);
    color: var(--rust);
    padding: 12px 24px;
    border-radius: 6px;
    transition: all 0.2s;
    letter-spacing: 2px;
}

button:hover {
    background: var(--rust);
    color: var(--ink);
    transform: scale(1.05);
}
```

**Headers:**
```css
.header {
    background: linear-gradient(180deg, rgba(0,0,0,0.8) 0%, transparent 100%);
    border-bottom: 1px solid rgba(43, 184, 205, 0.15);
    padding: 12px 20px;
}
```

---

## 🔊 Sistema de Audio

### Gestor de Audio (`truco/js/audio.js`)

Clase `AudioManager` que gestiona:
- **Música de fondo** (volumen 0.25x)
- **Efectos de sonido** (volumen 0.7x)
- **Persistencia** de preferencias (localStorage)
- **Controles de volumen** maestro y por tipo

### Sonidos Disponibles

| Sonido | Archivo | Uso |
|--------|---------|-----|
| `card-shuffle` | card-shuffle.mp3 | Mezcla del mazo |
| `card-deal` | card-deal.mp3 | Reparto de cartas |
| `card-play` | card-play.mp3 | Jugar una carta |
| `button-click` | button-click.mp3 | Click en botones |
| `truco-call` | truco-call.mp3 | Cantar Truco |
| `envido-call` | envido-call.mp3 | Cantar Envido |
| `win-round` | win-round.mp3 | Ganar una mano |
| `lose-round` | lose-round.mp3 | Perder una mano |
| `win-game` | win-game.mp3 | Ganar la partida |
| `lose-game` | lose-game.mp3 | Perder la partida |
| `opponent-speak` | opponent-speak.mp3 | Voz del rival |

Los archivos de audio se encuentran en `/truco/audio/` (no incluidos en este repo).

---

## ✨ Sistema de Animaciones

### Estilo Flash

Se usan:
- **CSS Keyframes** en `truco/css/animations.css`
- **Canvas 2D** para partículas en `truco/js/particles.js`
- **Transforms CSS** para efectos de entrada/salida

### Animaciones Disponibles

```javascript
// Entrada de cartas
@keyframes cardEntrance {
    from { opacity: 0; transform: scale(0.5) rotate(-45deg); }
    to { opacity: 1; transform: scale(1) rotate(0deg); }
}

// Hover de cartas
@keyframes cardHover {
    0% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0); }
}

// Ganador (Victory Burst)
particleSystem.burst('victory', x, y);

// Llamada de Truco
particleSystem.burst('trucoCall', x, y);

// Llamada de Envido
particleSystem.burst('envidoCall', x, y);
```

### Sistema de Partículas

Clase `ParticleSystem` que genera:
- **Victory:** 80 partículas multicolor con gravedad
- **cardPlay:** 12 partículas azules sutiles
- **trucoCall:** 40 cuadrados/diamantes azules
- **envidoCall:** 35 círculos/diamantes dorados
- **winRound:** 25 círculos verdes
- **loseRound:** 15 círculos rojos

---

## 🤖 Sistema de IA

### Arquitectura de Personajes

Cada personaje en `shared.js` tiene:

```javascript
{
    name: string,
    role: string,
    difficulty: number (1-3),
    tier: number (1-4),
    portrait: string (path a imagen),
    color: string (color tema),
    background: string (path a imagen fondo),
    lore: string (una línea de lore),
    bio: string (biografía completa),
    mission: string (consejos para jugador),
    traits: string[], (características),
    skills: object, (agresividad, farol, envido, estrategia),
    ai: object, (parámetros de decisión),
    lines: object, (diálogos para cada acción)
}
```

### Parámetros de IA

```javascript
ai: {
    envidoAcceptThreshold: 25,      // Valor mínimo para aceptar envido
    envidoRaiseThreshold: 31,       // Valor para subir apuesta
    envidoRaiseChance: 0.4,         // Probabilidad de subir
    trucoAcceptMinPower: 8,         // Poder mínimo para aceptar truco
    trucoBluffChance: 0.12,         // Probabilidad de fingir
    trucoProactiveChance: 0.25,     // Probabilidad de cantar primero
    trucoProactiveMinPower: 10,     // Poder mínimo para cantar
    trucoRaiseChance: 0.25,         // Probabilidad de subir
    trucoRaiseMinPower: 12,         // Poder mínimo para subir
    foldChance: 0.35,               // Probabilidad de pasar
    cardStrategy: 'conservative',   // Estrategia de juego
    randomVariance: 0,              // Variabilidad añadida
}
```

### Decisiones de IA

La IA evalúa:
1. **Poder de cartas** (sistema de ranking)
2. **Valor de Envido** (suma de dos cartas)
3. **Thresholds personalizados** por personaje
4. **Probabilidades de farol** según dificultad
5. **Historial de la mano** (qué se ha jugado)

---

## 🌐 Deploy en Netlify

### Configuración Actual

El sitio está deployado en **Netlify** con la siguiente config:

**`_headers`:**
```
# Cache estático (30 días)
/favicon/*
  Cache-Control: public, max-age=2592000

/assets/imagenes/*
  Cache-Control: public, max-age=2592000

# Gzip compression
/*
  Content-Encoding: gzip
```

**`_redirects`:**
```
https://www.retruco.xyz/* https://retruco.xyz/:splat 301!
```

Esto redirige `www.retruco.xyz` → `retruco.xyz`

### Paso a Paso para Deployar

1. **Conectar repositorio Git**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/tuusuario/retruco.git
   git push -u origin master
   ```

2. **En Netlify:**
   - Ir a [https://app.netlify.com](https://app.netlify.com)
   - Click "New site from Git"
   - Conectar GitHub/GitLab/Bitbucket
   - Seleccionar repositorio
   - Build Command: (dejar vacío - es sitio estático)
   - Publish Directory: `.` (raíz del proyecto)
   - Deploy

3. **Asignar dominio personalizado**
   - En Netlify → Site settings → Domain management
   - Agregar dominio personalizado
   - Seguir instrucciones de DNS

### Variables de Entorno (si se necesitan)

No se requieren para versión actual.

---

## 📊 Métricas del Proyecto

| Métrica | Valor |
|---------|-------|
| Líneas de HTML | ~2,100 (juego) + 110,000+ (landing) |
| Líneas de JavaScript | ~867 (shared) + 463 (audio) + 200+ (otras) |
| Líneas de CSS | ~500+ |
| Personajes | 10 |
| Cartas en el mazo | 40 |
| Efectos de sonido | 11+ |
| Dependencias externas | 0 |
| Tamaño bundle (sin imágenes) | ~200KB |

---

## 🗺️ Roadmap

### Versión Actual (MVP)
- ✅ Landing page SEO-optimizada
- ✅ Minijuego de Truco con 10 personajes
- ✅ Animaciones estilo Flash
- ✅ Sistema de audio completo
- ✅ Tutorial interactivo
- ✅ Página 404 personalizada

### Fase 2 - Expansión del Gameplay
- [ ] Más personajes (hasta 20+)
- [ ] Diferentes modos de juego (torneo, clásico)
- [ ] Sistema de logros y estadísticas
- [ ] Leaderboard online (si se agrega backend)
- [ ] Guardado de progreso en la nube

### Fase 3 - Contenido Adicional
- [ ] Campañas/Historia interactiva
- [ ] Mini-juegos adicionales (póker, chinchón)
- [ ] Sistema de skins para personajes
- [ ] Banda sonora expandida
- [ ] Cinematics/Cutscenes animadas

### Fase 4 - Comunidad
- [ ] Jugar contra otros usuarios (WebSocket)
- [ ] Chat integrado
- [ ] Torneos periódicos
- [ ] Sistema de ranking global
- [ ] Streaming en vivo integrado

### Técnico
- [ ] Refactor a TypeScript
- [ ] Bundler (Vite)
- [ ] Tests automatizados
- [ ] Progressive Web App (PWA)
- [ ] Soporte offline

---

## 📝 Convenciones de Código

### JavaScript

```javascript
// Naming: camelCase para variables y funciones
const playerScore = 0;
function calculateEnvido(hand) { ... }

// Constants: UPPER_SNAKE_CASE
const TRUCO_LEVELS = [ ... ];
const SUITS = ['espadas', 'bastos', 'copas', 'oros'];

// Objects: PascalCase para clases
class AudioManager { ... }
class ParticleSystem { ... }

// Comments: Explicar el "por qué", no el "qué"
// AI bluffea más en tier superior
const bluffChance = difficulty > 2 ? 0.15 : 0.05;
```

### CSS

```css
/* BEM naming convention */
.block { }
.block__element { }
.block--modifier { }

/* Variables CSS */
:root {
    --color-primary: #2bb8cd;
    --spacing-unit: 8px;
    --transition-base: all 0.2s ease;
}

/* Orden de propiedades */
.card {
    /* Display & Layout */
    display: flex;
    flex-direction: column;

    /* Sizing */
    width: 100%;
    height: auto;

    /* Spacing */
    margin: 0;
    padding: 12px;

    /* Visual */
    background: var(--card-bg);
    color: var(--ink);
    border-radius: 8px;

    /* Effects */
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    transition: var(--transition-base);
}
```

### HTML

```html
<!-- Semantic HTML -->
<header class="header">
    <nav role="navigation">
        <a href="/">Home</a>
    </nav>
</header>

<!-- BEM classes -->
<section class="card-hand">
    <div class="card-hand__card">
        <img src="..." alt="Descripción">
    </div>
</section>

<!-- Accessibility -->
<button aria-label="Aumentar volumen" aria-pressed="false">
    <span aria-hidden="true">🔊</span>
</button>
```

---

## 🐛 Troubleshooting

### El juego no carga

1. Abre la consola de dev (F12)
2. Busca errores rojos en Console
3. Verifica que todas las rutas de archivos sean correctas

Causas comunes:
- Path a `shared.js` incorrecto
- Imágenes de cartas no encontradas (fallback a símbolos)
- Audio no cargado (warning en consola, pero no bloquea)

### Las cartas no tienen imágenes

Si ves solo símbolos:
1. Verifica que `truco/cartas/*.png` existan
2. Abre Network tab (F12) para ver qué falló
3. El fallback a símbolos es intentional (accesibilidad)

### El audio no suena

1. Verifica que el navegador no esté silenciado
2. Abre DevTools → Console, busca `[AudioManager]` logs
3. Audio requiere interacción del usuario (primer click)
4. Los archivos deben estar en `/truco/audio/*.mp3`

### Performance baja

1. Desactiva efectos visuales (botón mute)
2. Cierra otras pestañas
3. En DevTools → Performance, graba una sesión
4. Busca spikes de CPU

---

## 📚 Referencias Externas

### Reglas del Truco
- [Federación Argentina de Truco](https://www.trucofat.com.ar/)
- [Wikipedia - Truco](https://es.wikipedia.org/wiki/Truco)

### Web APIs Utilizadas
- [MDN - Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [MDN - Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [MDN - Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)

### Performance
- [Google PageSpeed Insights](https://pagespeed.web.dev)
- [WebPageTest](https://www.webpagetest.org)

---

## 📄 Licencia

ReTruco © 2026 Underground. Todos los derechos reservados.

El código de este proyecto puede ser usado como referencia para proyectos personales.

---

## 👤 Autor

**Thiago** - Creator, Designer, Developer

- 🌐 [retruco.xyz](https://retruco.xyz)
- 📱 [@thiagomarxdev](https://twitter.com/thiagomarxdev)

---

## 🙏 Créditos

- Inspiración: South Park, Retro Games, Cultura Criolla
- Fuentes: [TREVOR.TTF](https://www.fontspace.com/), Google Fonts
- Audio: Sonidos creados y compilados para ReTruco
- Testing: Comunidad de jugadores de Truco

---

**Última actualización:** 30 de Marzo, 2026

Para reportar bugs o sugerencias, abre un issue en GitHub.

¡Que disfrutes ReTruco!
