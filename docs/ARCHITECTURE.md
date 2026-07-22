# Arquitectura de ReTruco

**Última actualización:** 30 de Marzo, 2026

---

## Índice

1. [Visión general](#visión-general)
2. [Diagrama de componentes](#diagrama-de-componentes)
3. [Flujo de datos](#flujo-de-datos)
4. [Módulos principales](#módulos-principales)
5. [Estados y ciclo de vida](#estados-y-ciclo-de-vida)
6. [Patrones de diseño](#patrones-de-diseño)

---

## Visión General

ReTruco es un **sitio estático HTML5** compuesto por:

1. **Landing Page** - Promoción y SEO
2. **Minijuego Truco** - Sistema de cartas con IA

No hay backend, base de datos ni servidor. Todo ocurre en el navegador del cliente.

### Características Arquitectónicas

- **Modular:** Código separado por responsabilidad
- **Sin dependencias:** JavaScript vanilla, sin frameworks
- **Responsive:** Funciona en desktop y móvil
- **Offline-capable:** Funciona sin conexión (excepto audio)
- **Performante:** Bajo peso, sin bloqueadores

---

## Diagrama de Componentes

```
┌─────────────────────────────────────────────────────────┐
│                    USUARIO (NAVEGADOR)                  │
└─────────────────────────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
    ┌───▼────┐      ┌────▼────┐      ┌──▼───┐
    │ Landing│      │ Truco   │      │404   │
    │ Page   │      │ Game    │      │Error │
    │(HTML)  │      │(HTML)   │      │(HTML)│
    └────────┘      └────┬────┘      └──────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
    ┌────▼──────┐  ┌─────▼──────┐  ┌───▼─────┐
    │ shared.js │  │  audio.js  │  │particles│
    │ (Lógica)  │  │(Sonido)    │  │.js(FX) │
    └────┬──────┘  └────────────┘  └────────┘
         │
    ┌────▼──────────────────────────┐
    │   Librerias del Navegador     │
    │ - Canvas 2D (Partículas)      │
    │ - Web Audio API (Sonido)      │
    │ - Drag & Drop API (Cartas)    │
    │ - localStorage (Persistencia) │
    └───────────────────────────────┘
         │
    ┌────▼──────────────────────────┐
    │      Assets Estáticos         │
    │ - Imágenes (cartas, fondos)   │
    │ - Audios (SFX, música)        │
    │ - Fuentes TTF/WOFF            │
    └───────────────────────────────┘
```

---

## Flujo de Datos

### Landing Page

```
Carga index.html
    ├─ Parse CSS inline
    ├─ Carga fuentes (TREVOR.TTF, Google Fonts)
    ├─ Carga imágenes de hero
    ├─ Renderiza con animaciones CSS
    └─ Genera Open Graph / Schema.org JSON-LD
```

### Minijuego Truco

```
Usuario abre /truco/index.html
    │
    ├─ Renderiza pantalla de selección
    ├─ Carga imágenes de personajes
    │
    └─ Usuario selecciona personaje
         │
         ├─ Carga /truco/juego.html
         ├─ Importa shared.js (IA + constantes)
         ├─ Importa audio.js (AudioManager)
         ├─ Importa particles.js (ParticleSystem)
         │
         └─ INICIO DEL JUEGO
              │
              ├─ createDeck() → Mazo de 40 cartas
              ├─ shuffle() → Mezcla
              ├─ Reparte 3 cartas a cada jugador
              │
              └─ LOOP DE MANO
                   │
                   ├─ Fase de Envido
                   │  ├─ Calcula valor con calcEnvido()
                   │  ├─ IA decide (thresholds del personaje)
                   │  └─ Muestra partículas de envido
                   │
                   ├─ Fase de Truco
                   │  ├─ IA decide cantar (trucoProactiveChance)
                   │  ├─ Mostrar diálogos (lines.truco)
                   │  └─ Mostrar partículas de truco
                   │
                   ├─ Fase de Juego
                   │  ├─ Renderiza cartas jugables
                   │  ├─ Usuario arrastra/selecciona
                   │  ├─ IA juega automáticamente
                   │  ├─ Calcula poder con getPower()
                   │  └─ Determina ganador
                   │
                   ├─ Suma puntos
                   ├─ Anima partículas (victoria/derrota)
                   │
                   └─ ¿Alguien llegó a 30? NO → Repetir
                        │
                        └─ SÍ → Fin del juego
                             └─ Mostrar pantalla de victoria/derrota
                             └─ Opción de revancha
```

---

## Módulos Principales

### 1. `shared.js` (867 líneas)

**Responsabilidades:**
- Definir constantes del juego
- Rendering de cartas (HTML)
- Lógica de mazo (crear, mezclar)
- Cálculos (poder, envido)
- Definición de 10 personajes
- Parámetros de IA

**Exporta:**
```javascript
const SUITS              // ['espadas', 'bastos', 'copas', 'oros']
const NUMBERS           // [1, 2, 3, 4, 5, 6, 7, 10, 11, 12]
const SUIT_SYMBOLS      // { espadas: '⚔️', ... }
const SUIT_FILE         // { espadas: 'deespada', ... }
const POWER             // { '1-espadas': 14, ... }
const TRUCO_LEVELS      // [{ name: 'TRUCO', points: 2 }, ...]
const ENVIDO_LEVELS     // [{ name: 'ENVIDO', points: 2 }, ...]
const OPPONENTS         // { abraham: {...}, alfredito: {...}, ... }
const CARD_IMAGES       // Auto-loaded por detectCards()

function renderCard(card, playable)      // Genera HTML de carta
function createDeck()                    // Crea mazo completo
function shuffle(arr)                    // Mezcla aleatoria
function getPower(card)                  // Retorna poder 1-14
function calcEnvido(hand)                // Calcula valor envido
```

**Formato de Constantes:**

```javascript
// Carta
{ number: 1, suit: 'espadas', key: '1-espadas' }

// Personaje
{
    name: 'ABRAHAM',
    difficulty: 1,
    traits: ['Conservador', 'Paciente'],
    skills: { agresividad: 1, farol: 1, envido: 2, estrategia: 3 },
    ai: {
        envidoAcceptThreshold: 25,
        trucoBluffChance: 0.03,
        // ... 12 parámetros más
    },
    lines: {
        start: ['Sentate pibe...'],
        envido: ['Envido, pibe'],
        // ... 15 tipos de diálogos
    }
}
```

### 2. `juego.html` (68KB, 2,092 líneas)

**Estructura:**

```html
<!DOCTYPE html>
<head>
    <!-- Meta tags, favicon, fonts -->
    <link rel="stylesheet" href="css/animations.css">
</head>
<body>
    <!-- Header con score -->
    <div class="game-header">
        <div class="score-display">
            <span class="score-you">TÚ: {{ playerScore }}</span>
            <span class="score-sep">•</span>
            <span class="score-opponent">OPONENTE: {{ opponentScore }}</span>
        </div>
    </div>

    <!-- Main game area -->
    <main class="main">
        <!-- Zona del oponente -->
        <div class="opponent-area">
            <div class="opponent-hand">
                <!-- 3 cartas boca abajo -->
            </div>
        </div>

        <!-- Mesa de juego -->
        <div class="game-table">
            <!-- Cartas jugadas -->
        </div>

        <!-- Zona del jugador -->
        <div class="player-area">
            <div class="player-hand">
                <!-- 3 cartas jugables -->
            </div>
        </div>
    </main>

    <!-- Controles y diálogos -->
    <div class="controls">
        <div class="actions">
            <!-- Botones: Quiero, No Quiero, Mazo, etc -->
        </div>
    </div>

    <!-- Modal de acciones (Envido, Truco) -->
    <div class="modal" id="envidoModal">
        <!-- Botones para responder a Envido -->
    </div>

    <script src="../shared.js"></script>
    <script src="js/audio.js"></script>
    <script src="js/particles.js"></script>
    <script src="js/animations.js"></script>
    <!-- Lógica del juego inline -->
    <script>
        // GameManager class aquí
        // Event listeners
        // Game loop
    </script>
</body>
</html>
```

**Clases principales (inline):**

```javascript
class GameManager {
    constructor(opponentKey) {
        this.opponent = OPPONENTS[opponentKey];
        this.playerScore = 0;
        this.opponentScore = 0;
        this.playerHand = [];
        this.opponentHand = [];
        this.deck = createDeck();
        this.state = 'dealing'; // dealing, envido, truco, playing, endRound
        this.currentRound = 0;
        this.envidoWinner = null;
        this.trucoWinner = null;
        this.audioManager = new AudioManager();
        this.particleSystem = new ParticleSystem();
    }

    dealCards() { ... }
    askEnvido() { ... }
    acceptEnvido() { ... }
    playCard(card) { ... }
    determineWinner() { ... }
    endRound() { ... }
    endGame() { ... }
}
```

### 3. `audio.js` (463 líneas)

**Clase `AudioManager`:**

```javascript
class AudioManager {
    constructor() {
        this.sounds = {};           // Almacén de buffers de audio
        this.music = null;          // Audio de música
        this.musicVolume = 0.25;    // Volumen música (25%)
        this.sfxVolume = 0.7;       // Volumen SFX (70%)
        this.masterVolume = 1.0;    // Volumen maestro
        this.muted = false;         // Flag de silencio
        this.audioContext = null;   // Web Audio Context
        this.unlocked = false;      // Flag de primer click
    }

    async init()                    // Inicializar Web Audio API
    async preloadSounds()           // Cargar todos los SFX
    async loadSound(name, path)     // Cargar un SFX específico
    setupMusic()                    // Configurar música de fondo
    play(soundName, volume?)        // Reproducir SFX
    playMusic(loop = true)          // Reproducir música
    stopMusic()                     // Parar música
    setVolume(type, value)          // Cambiar volumen
    toggle()                        // Muteá/desmutea
    savePreferences()               // Guardar en localStorage
    loadPreferences()               // Cargar de localStorage
}
```

**Inicialización:**

```javascript
// AudioManager requiere un click del usuario para inicializar
document.addEventListener('click', async () => {
    if (!audioManager.initialized) {
        await audioManager.init();
    }
}, { once: true });
```

### 4. `particles.js` (310 líneas)

**Clase `ParticleSystem`:**

```javascript
class ParticleSystem {
    constructor(container = document.body) {
        this.container = container;
        this.canvas = null;         // Canvas element
        this.ctx = null;            // 2D context
        this.particles = [];        // Array activo
        this.animating = false;     // Flag de animación
    }

    init()                          // Crear canvas, resize
    getConfig(type)                 // Retorna config de tipo
    burst(type, x, y)               // Generar partículas
    emitFrom(element, type)         // Emitir desde elemento
    animate()                       // Loop de animación
    drawParticle(particle)          // Dibujar una partícula
    clear()                         // Limpiar todas
    destroy()                       // Destruir sistema
}
```

**Tipos de partículas:**

```javascript
{
    'victory': {        // 80 partículas multicolor
        count: 80,
        colors: ['#2ecc71', '#27ae60', '#f1c40f', ...],
        speed: { min: 6, max: 14 },
        gravity: 0.15,
        lifetime: { min: 80, max: 150 },
    },
    'cardPlay': { ... }, // 12 azules
    'trucoCall': { ... }, // 40 cuadrados
    'envidoCall': { ... }, // 35 dorados
    'winRound': { ... },   // 25 verdes
    'loseRound': { ... }   // 15 rojos
}
```

### 5. `animations.css`

**Keyframes principales:**

```css
@keyframes cardEntrance { ... }     /* Entrada de cartas */
@keyframes cardHover { ... }        /* Hover de cartas */
@keyframes fadeIn { ... }           /* Fade in genérico */
@keyframes slideDown { ... }        /* Slide down */
@keyframes pulse { ... }            /* Pulso de energía */
@keyframes shake { ... }            /* Shake de impacto */
@keyframes float { ... }            /* Float de diálogo */
@keyframes glow { ... }             /* Glow de acierto */
```

**Clases de utilidad:**

```css
.will-animate { animation-duration: 0.3s; }
.card-interactive { cursor: pointer; }
.playable { border: 2px solid var(--green); }
.disabled { opacity: 0.5; cursor: not-allowed; }
```

---

## Estados y Ciclo de Vida

### Estados del Juego

```
INIT
  │
  ├─ DEALING (repartiendo cartas)
  │   ├─ Crear mazo
  │   ├─ Mezclar
  │   ├─ Repartir 3 a cada uno
  │   └─ → ENVIDO_PHASE
  │
  ├─ ENVIDO_PHASE (fase de envido)
  │   ├─ Calcular Envido de ambos
  │   ├─ IA decide cantar (probabilidad)
  │   ├─ Mostrar modal si se canta
  │   ├─ Esperar respuesta del jugador
  │   └─ → TRUCO_PHASE
  │
  ├─ TRUCO_PHASE (fase de truco)
  │   ├─ IA decide cantar Truco (probabilidad)
  │   ├─ Mostrar modal
  │   ├─ Esperar respuesta del jugador
  │   └─ → PLAYING_PHASE
  │
  ├─ PLAYING_PHASE (jugando cartas)
  │   ├─ Renderizar cartas jugables
  │   ├─ Esperar que usuario seleccione
  │   ├─ IA elige automáticamente
  │   ├─ Comparar poder (getPower)
  │   ├─ Animar ganador de mano
  │   └─ ¿Tercera mano? NO → PLAYING_PHASE
  │       └─ SÍ → END_ROUND
  │
  ├─ END_ROUND (fin de ronda)
  │   ├─ Sumar puntos
  │   ├─ Animar partículas
  │   ├─ Mostrar diálogos
  │   └─ ¿Alguien >= 30? NO → DEALING
  │       └─ SÍ → END_GAME
  │
  └─ END_GAME (fin del juego)
      ├─ Mostrar pantalla de victoria/derrota
      ├─ Animar partículas finales
      ├─ Opción de revancha
      └─ → INIT (nueva partida) o salir
```

### Ciclo de Vida de una Mano

```
Inicio de Mano
  │
  ├─ Envido
  │  ├─ Calcular valor
  │  ├─ IA canta? (50% probabilidad base)
  │  ├─ If canta: Mostrar modal
  │  ├─ Esperando respuesta del jugador
  │  │  ├─ Quiero → Comparar envidos
  │  │  │  ├─ Ganador suma puntos
  │  │  │  └─ Siguiente fase
  │  │  └─ No quiero → Skip envido
  │  └─ → Siguiente fase
  │
  ├─ Truco
  │  ├─ IA canta? (probabilidad según oponente)
  │  ├─ If canta: Mostrar modal
  │  ├─ Esperando respuesta
  │  │  ├─ Quiero → Irá al ganador de esta mano
  │  │  ├─ Retruco? → Sube apuesta
  │  │  │  ├─ ¿Vale cuatro?
  │  │  │  └─ ...escalada
  │  │  └─ No quiero → Skip truco
  │  └─ → Siguiente fase
  │
  ├─ Juego de Cartas
  │  ├─ Render 3 cartas del jugador
  │  ├─ Esperar selección
  │  ├─ IA juega automáticamente
  │  ├─ Comparar poder
  │  ├─ Determinar ganador de mano
  │  ├─ Renderizar ganador
  │  ├─ Animar partículas
  │  └─ ¿Es la tercera? NO → Siguiente mano
  │     └─ SÍ → Determinar ganador general
  │
  └─ Fin de Mano
     ├─ Sumar puntos
     ├─ Limpiar mesa
     └─ → Siguiente mano o fin de juego
```

---

## Patrones de Diseño

### 1. Singleton Pattern

**AudioManager** y **ParticleSystem** se inicializan como singletons:

```javascript
const audioManager = new AudioManager();
window.audioManager = audioManager; // Global access

const particleSystem = new ParticleSystem();
window.particleSystem = particleSystem;
```

### 2. Data-driven Configuration

Los personajes usan configuración declarativa:

```javascript
const OPPONENTS = {
    abraham: {
        ai: { /* 12 parámetros */ },
        lines: { /* 15 tipos de diálogos */ }
    },
    // ... 9 personajes más
}
```

Esto permite fácil ajuste de dificultad sin tocar código.

### 3. Immutable Data Structures

Las cartas nunca se modifican, solo se copian:

```javascript
// ❌ WRONG
hand[0].played = true; // Mutación

// ✅ CORRECT
playerHand = playerHand.filter(c => c.key !== cardKey); // Nueva array
```

### 4. Event Delegation

Los eventos de cartas se delegan al contenedor:

```javascript
// En lugar de agregar listener a cada carta
playerHandEl.addEventListener('dragstart', (e) => {
    if (e.target.classList.contains('card')) {
        // Handle drag
    }
});
```

### 5. State Machine

El juego usa máquina de estados explícita:

```javascript
gameState = {
    phase: 'dealing', // 'dealing', 'envido', 'truco', 'playing', 'endRound'
    turn: 'player',   // 'player' o 'opponent'
    round: 0,
    envidoRound: 0,
}
```

---

## Flujo de Datos (Detallado)

### Fase de Envido

```javascript
// 1. Calcular envido del jugador
playerEnvido = calcEnvido(playerHand);
// Retorna: 0-39 (suma de dos cartas del mismo palo + 20)

// 2. Calcular envido del oponente
opponentEnvido = calcEnvido(opponentHand);

// 3. IA decide si cantar
if (opponentEnvido >= OPPONENT.ai.envidoAcceptThreshold) {
    canSing = Math.random() < OPPONENT.ai.envidoRaiseChance;
    if (canSing) {
        // Mostrar modal y esperar respuesta del jugador
        showEnvidoModal();
    }
}

// 4. Si jugador dice "Quiero"
if (playerEnvido > opponentEnvido) {
    playerScore += 2; // o 3 o todos (según nivel)
} else {
    opponentScore += 2;
}

// 5. Persistir estado
updateUI();
```

### Fase de Truco

```javascript
// 1. Calcular poder máximo de cada mano
playerMaxPower = Math.max(...playerHand.map(getPower));
opponentMaxPower = Math.max(...opponentHand.map(getPower));

// 2. IA decide si cantar Truco
shouldSingTruco = Math.random() < OPPONENT.ai.trucoProactiveChance
    && opponentMaxPower >= OPPONENT.ai.trucoProactiveMinPower;

// 3. Si se canta, mostrar modal
if (shouldSingTruco) {
    showTrucoModal(TRUCO_LEVELS[0]); // Comenzar con "TRUCO"
}

// 4. Escalada (si "Retruco")
if (playerRespondsWithRetruco) {
    canRaise = Math.random() < OPPONENT.ai.trucoRaiseChance
        && opponentMaxPower >= OPPONENT.ai.trucoRaiseMinPower;
    if (canRaise) {
        // Mostrar "Retruco"
        showTrucoModal(TRUCO_LEVELS[1]);
    }
}

// 5. Al final del Truco, sumar puntos al ganador
```

### Fase de Juego

```javascript
// 1. Iniciar primera mano (primera de tres)
currentHandNum = 0;

// 2. Loop de manos
while (currentHandNum < 3) {
    // Mostrar 3 cartas al jugador
    renderPlayerCards();

    // Esperar selección
    selectedCard = await waitForPlayerSelection();

    // IA juega
    aiCard = getAICard(currentHandNum);

    // Comparar poder
    playerCardPower = getPower(selectedCard);
    aiCardPower = getPower(aiCard);

    // Determinar ganador
    handWinner = playerCardPower > aiCardPower ? 'player' : 'opponent';

    // Animar ganador
    animateWinner(handWinner);
    particleSystem.burst(handWinner === 'player' ? 'winRound' : 'loseRound');

    // Ir a siguiente mano
    currentHandNum++;
}

// 3. Contar ganadas (mejor de 3)
if (playerWinsCount >= 2) {
    trucoWinner = 'player';
} else {
    trucoWinner = 'opponent';
}

// 4. Sumar puntos al ganador
pointsWon = getTrucoPoints(); // 2, 3, o 4 según nivel
if (trucoWinner === 'player') {
    playerScore += pointsWon;
} else {
    opponentScore += pointsWon;
}
```

---

## Optimizaciones Implementadas

1. **Lazy Loading de Audio:** Se carga al primer click
2. **Canvas Scaling:** DPI adjustment para retinas
3. **Particle Pooling:** Reutilizar contexto Canvas
4. **CSS Transforms:** Animar con GPU (not layouts)
5. **Event Delegation:** Un listener por tipo, no por elemento
6. **localStorage:** Persistencia local sin servidor

---

## Limitaciones Conocidas

1. **Mono-usuario:** No hay juego online
2. **No hay persistencia en la nube:** Solo localStorage
3. **Audio en fallback:** Si no carga, no bloquea juego
4. **Images fallback:** Si no cargan imágenes, muestra símbolos
5. **No responsive en móvil:** Touch support básico

---

## Próximas Mejoras Arquitectónicas

1. **TypeScript:** Agregar type safety
2. **Modular bundling:** Separar en módulos ES6
3. **Service Workers:** Soporte offline completo
4. **Backend API:** Para leaderboards y replays
5. **WebSocket:** Para juego online
> **Aviso (22 de julio de 2026):** la arquitectura del antiguo minijuego de Truco ya fue retirada. `/truco/` contiene únicamente una pantalla temporal hasta integrar su reemplazo.
