# API de shared.js — Referencia Técnica

**Última actualización:** 30 de Marzo, 2026

---

## Índice

1. [Constantes](#constantes)
2. [Funciones de Utilidad](#funciones-de-utilidad)
3. [Sistema de Cartas](#sistema-de-cartas)
4. [Cálculos de Juego](#cálculos-de-juego)
5. [Objeto OPPONENTS](#objeto-opponents)
6. [Carga de Imágenes](#carga-de-imágenes)

---

## Constantes

### SUITS

**Tipo:** `Array<string>`

Los 4 palos de la baraja española.

```javascript
const SUITS = ['espadas', 'bastos', 'copas', 'oros'];
```

**Uso:**
```javascript
SUITS.forEach(suit => {
    console.log(`Palo: ${suit}`);
});
// Output:
// Palo: espadas
// Palo: bastos
// Palo: copas
// Palo: oros
```

---

### NUMBERS

**Tipo:** `Array<number>`

Los 10 números válidos de la baraja (sin 8, 9).

```javascript
const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12];
```

**Nota:** No incluye 8 ni 9 (se usan en otros tipos de Truco)

---

### SUIT_SYMBOLS

**Tipo:** `Object<string, string>`

Emojis/símbolos para cada palo.

```javascript
const SUIT_SYMBOLS = {
    espadas: '⚔️',    // Spada
    bastos: '🌿',     // Bastos (bastón)
    copas: '🏆',      // Copa
    oros: '🪙'        // Moneda (oro)
};
```

**Uso:**
```javascript
const card = { number: 3, suit: 'espadas', key: '3-espadas' };
const symbol = SUIT_SYMBOLS[card.suit];
console.log(`${card.number}${symbol}`);
// Output: 3⚔️
```

---

### SUIT_FILE

**Tipo:** `Object<string, string>`

Sufijos de archivo para las imágenes de cartas.

```javascript
const SUIT_FILE = {
    espadas: 'deespada',
    bastos: 'debasto',
    copas: 'decopa',
    oros: 'deoro'
};
```

**Uso:**
```javascript
// Construir path de imagen
const card = { number: 1, suit: 'espadas' };
const filePath = `cartas/${card.number}${SUIT_FILE[card.suit]}.png`;
console.log(filePath);
// Output: cartas/1deespada.png
```

---

### ENVIDO_VAL

**Tipo:** `Object<number, number>`

Valores de cada número para el cálculo de Envido.

```javascript
const ENVIDO_VAL = {
    1: 1,     2: 2,     3: 3,     4: 4,     5: 5,
    6: 6,     7: 7,
    10: 0,    11: 0,    12: 0    // Cartas altas no valen
};
```

**Nota:** Las figuras (10, 11, 12) valen 0 en Envido

**Uso:**
```javascript
const cardValue = ENVIDO_VAL[7];  // 7
const figureValue = ENVIDO_VAL[12]; // 0

// En cálculo de envido
const flor = 20 + ENVIDO_VAL[7] + ENVIDO_VAL[3];
console.log(flor);  // 20 + 7 + 3 = 30
```

---

### POWER

**Tipo:** `Object<string, number>`

Sistema de poder para cada carta (1-14).

```javascript
const POWER = {
    '1-espadas': 14,
    '1-bastos': 13,
    '7-espadas': 12,
    '7-oros': 11,
    '3-espadas': 10,
    '3-bastos': 10,
    '3-copas': 10,
    '3-oros': 10,
    '2-espadas': 9,
    '2-bastos': 9,
    '2-copas': 9,
    '2-oros': 9,
    '1-copas': 8,
    '1-oros': 8,
    '12-espadas': 7,
    '12-bastos': 7,
    '12-copas': 7,
    '12-oros': 7,
    '11-espadas': 6,
    '11-bastos': 6,
    '11-copas': 6,
    '11-oros': 6,
    '10-espadas': 5,
    '10-bastos': 5,
    '10-copas': 5,
    '10-oros': 5,
    '7-copas': 4,
    '7-bastos': 4,
    '6-espadas': 3,
    '6-bastos': 3,
    '6-copas': 3,
    '6-oros': 3,
    '5-espadas': 2,
    '5-bastos': 2,
    '5-copas': 2,
    '5-oros': 2,
    '4-espadas': 1,
    '4-bastos': 1,
    '4-copas': 1,
    '4-oros': 1
};
```

---

### TRUCO_LEVELS

**Tipo:** `Array<Object>`

Los 3 niveles de escalada de Truco.

```javascript
const TRUCO_LEVELS = [
    { name: 'TRUCO', points: 2 },
    { name: 'RETRUCO', points: 3 },
    { name: 'VALE CUATRO', points: 4 }
];
```

**Uso:**
```javascript
// Acceder al segundo nivel (Retruco)
console.log(TRUCO_LEVELS[1].name);    // 'RETRUCO'
console.log(TRUCO_LEVELS[1].points);  // 3
```

---

### ENVIDO_LEVELS

**Tipo:** `Array<Object>`

Los 3 niveles de escalada de Envido.

```javascript
const ENVIDO_LEVELS = [
    { name: 'ENVIDO', points: 2 },
    { name: 'REAL ENVIDO', points: 3 },
    { name: 'FALTA ENVIDO', points: 'falta' }
];
```

**Nota:** `FALTA ENVIDO` usa `'falta'` como placeholder (significa "todos los puntos restantes")

---

### CARD_IMAGES

**Tipo:** `Object<string, string>`

Auto-detecta y almacena paths de imágenes de cartas cargadas.

```javascript
const CARD_IMAGES = {
    '1-espadas': 'cartas/1deespada.png',  // Si la imagen se cargó
    '1-bastos': 'cartas/1debasto.png',
    // ... más cartas
};
```

**Nota:** Se llena automáticamente por la función `detectCards()` al cargar shared.js

---

## Funciones de Utilidad

### renderCard(card, playable)

Genera el HTML para renderizar una carta.

**Parámetros:**
- `card`: `Object` - Carta con propiedades `{number, suit, key}`
- `playable`: `boolean` - Si la carta es jugable (opcional, default: false)

**Retorna:** `string` - HTML de la carta

**Ejemplos:**

```javascript
// Carta no jugable (del oponente)
const html1 = renderCard({ number: 1, suit: 'espadas', key: '1-espadas' }, false);
// Output: <div class="card ..."><img src="cartas/1deespada.png" /></div>

// Carta jugable (del jugador)
const html2 = renderCard({ number: 3, suit: 'copas', key: '3-copas' }, true);
// Output: <div class="card card-img playable..." draggable="true">...</div>

// Insertar en el DOM
document.getElementById('hand').innerHTML += html2;
```

**Comportamiento:**

- Si existe imagen en `CARD_IMAGES`, la usa
- Si no existe, crea fallback con símbolos
- Si `playable=true`, agrega clases `playable`, `card-interactive`, `will-animate`
- Si `playable=true`, agrega atributo `draggable="true"`

---

### createDeck()

Crea una baraja completa de 40 cartas.

**Parámetros:** Ninguno

**Retorna:** `Array<Object>` - Array de 40 cartas

**Estructura de cada carta:**
```javascript
{
    number: number,    // 1-12 (sin 8, 9)
    suit: string,      // 'espadas', 'bastos', 'copas', 'oros'
    key: string        // '${number}-${suit}'
}
```

**Ejemplo:**
```javascript
const deck = createDeck();
console.log(deck.length);  // 40
console.log(deck[0]);      // { number: 1, suit: 'espadas', key: '1-espadas' }

// Iterar sobre el mazo
deck.forEach(card => {
    console.log(`${card.number} de ${card.suit}`);
});
```

---

### shuffle(arr)

Mezcla aleatoriamente un array (Fisher-Yates).

**Parámetros:**
- `arr`: `Array` - Array a mezclar

**Retorna:** `Array` - Nuevo array mezclado (no modifica el original)

**Ejemplo:**
```javascript
const deck = createDeck();
const shuffledDeck = shuffle(deck);

// El original no se modifica
console.log(deck === shuffledDeck);  // false

// Pero contiene los mismos elementos
console.log(deck.length === shuffledDeck.length);  // true
```

---

### getPower(card)

Retorna el poder (1-14) de una carta.

**Parámetros:**
- `card`: `Object` - Carta con propiedad `key`

**Retorna:** `number` - Poder de 1-14 (0 si no existe)

**Ejemplo:**
```javascript
const card1 = { number: 1, suit: 'espadas', key: '1-espadas' };
console.log(getPower(card1));  // 14 (LA MÁS FUERTE)

const card2 = { number: 5, suit: 'copas', key: '5-copas' };
console.log(getPower(card2));  // 2

const card3 = { number: 9, suit: 'espadas', key: '9-espadas' };
console.log(getPower(card3));  // 0 (no existe en baraja)
```

---

### calcEnvido(hand)

Calcula el valor de Envido de una mano (0-39).

**Parámetros:**
- `hand`: `Array<Object>` - Array de hasta 3 cartas

**Retorna:** `number` - Valor de envido (0-39)

**Lógica:**
1. Si tienes **2+ cartas del mismo palo:**
   - Suma los valores de las 2 más altas
   - Suma 20 (bonus de "flor")
   - Total: 20 + valor1 + valor2
2. Si tienes **1 sola carta de algún palo:**
   - Retorna su valor
3. Si tienes **múltiples palos:**
   - Retorna el máximo de todos

**Ejemplos:**
```javascript
// Flor (2 cartas del mismo palo)
const hand1 = [
    { number: 7, suit: 'espadas', key: '7-espadas' },
    { number: 3, suit: 'espadas', key: '3-espadas' },
    { number: 5, suit: 'copas', key: '5-copas' }
];
console.log(calcEnvido(hand1));  // 20 + 7 + 3 = 30

// Un número solamente
const hand2 = [
    { number: 1, suit: 'espadas', key: '1-espadas' },
    { number: 2, suit: 'bastos', key: '2-bastos' },
    { number: 4, suit: 'copas', key: '4-copas' }
];
console.log(calcEnvido(hand2));  // 1 (máximo)

// Figuras (valen 0 en envido)
const hand3 = [
    { number: 12, suit: 'espadas', key: '12-espadas' },
    { number: 11, suit: 'espadas', key: '11-espadas' },
    { number: 10, suit: 'espadas', key: '10-espadas' }
];
console.log(calcEnvido(hand3));  // 0 (todas valen 0)
```

---

## Sistema de Cartas

### Estructura de Card Object

Una carta se representa así:

```javascript
{
    number: number,    // 1, 2, 3, ... 12 (no 8, 9)
    suit: string,      // 'espadas', 'bastos', 'copas', 'oros'
    key: string        // '${number}-${suit}' para búsqueda rápida
}
```

**Ejemplo:**
```javascript
const card = {
    number: 3,
    suit: 'copas',
    key: '3-copas'
};

// Acceder a propiedades
console.log(card.number);  // 3
console.log(card.suit);    // 'copas'
console.log(card.key);     // '3-copas'
```

---

## Cálculos de Juego

### Cálculo de Envido Paso a Paso

```javascript
function calcEnvido(hand) {
    // 1. Agrupar cartas por palo
    const bySuit = {};
    hand.forEach(c => {
        if (!bySuit[c.suit]) bySuit[c.suit] = [];
        bySuit[c.suit].push(c);
    });

    // 2. Buscar mejor combinación
    let best = 0;

    for (const suit of SUITS) {
        const cards = bySuit[suit];
        if (!cards) continue;

        // Si hay 2+ cartas del mismo palo (Flor)
        if (cards.length >= 2) {
            const vals = cards.map(c => ENVIDO_VAL[c.number]).sort((a, b) => b - a);
            const pairScore = 20 + vals[0] + vals[1];
            if (pairScore > best) best = pairScore;
        }

        // Para cartas individuales
        cards.forEach(c => {
            const single = ENVIDO_VAL[c.number];
            if (single > best) best = single;
        });
    }

    return best;
}
```

### Cálculo de Ganador de Mano

```javascript
// Comparar poder de dos cartas
const playerCard = { number: 1, suit: 'espadas', key: '1-espadas' };
const opponentCard = { number: 7, suit: 'oros', key: '7-oros' };

const playerPower = getPower(playerCard);      // 14
const opponentPower = getPower(opponentCard);  // 11

if (playerPower > opponentPower) {
    console.log('Gana el jugador');
} else if (opponentPower > playerPower) {
    console.log('Gana el oponente');
} else {
    console.log('Empate (raro)');
}
```

---

## Objeto OPPONENTS

### Estructura General

Cada personaje tiene esta estructura:

```javascript
const OPPONENTS = {
    [key]: {
        // Identidad
        name: string,
        role: string,
        difficulty: number,      // 1-3
        tier: number,           // 1-4

        // Visuales
        portrait: string,        // path a imagen
        color: string,          // hex color
        background?: string,    // opcional: path a imagen de fondo del tablero

        // Lore
        lore: string,           // Una línea
        bio: string,            // Párrafo completo
        mission: string,        // Consejos para el jugador
        traits: Array<string>,  // Características
        skills: Object,         // Puntuaciones de habilidades

        // IA
        ai: Object,             // Parámetros de decisión

        // Diálogos
        lines: Object           // Textos para cada acción
    }
}
```

---

### Ejemplo Completo: Abraham

```javascript
abraham: {
    name: 'ABRAHAM',
    role: 'El Veterano',
    difficulty: 1,
    tier: 1,
    portrait: '../assets/imagenes/abraham.png',
    placeholderPortrait: true,
    color: '#8B7355',

    lore: 'Viejo zorro del pabellón. Lleva 30 años jugando truco y nunca perdió una partida importante.',

    bio: 'Abraham cayó en los 90 por un ajuste de cuentas que nunca quiso explicar. Desde entonces, el truco se convirtió en su religión. Cada carta que tira tiene 30 años de experiencia detrás. Los pibes nuevos lo buscan para aprender, los veteranos lo respetan. Nunca levanta la voz, pero cuando habla, todos escuchan.',

    mission: 'Abraham es tu primer rival. Jugá conservador, no te apures. Él rara vez bluffea, así que si canta truco, probablemente tenga cartas buenas. Aprendé a leer sus silencios.',

    traits: ['Conservador', 'Paciente', 'Maestro'],

    skills: {
        agresividad: 1,      // Muy bajo
        farol: 1,            // Casi no bluffea
        envido: 2,           // Bueno
        estrategia: 3        // Excelente
    },

    ai: {
        envidoAcceptThreshold: 25,      // Necesita 25+ para aceptar
        envidoRaiseThreshold: 31,       // Sube si tiene 31+
        envidoRaiseChance: 0.05,        // 5% de subir apuesta
        trucoAcceptMinPower: 9,         // Necesita poder 9+ para aceptar
        trucoBluffChance: 0.03,         // 3% de bluffear (MUY BAJO)
        trucoProactiveChance: 0.15,     // 15% de cantar primero
        trucoProactiveMinPower: 12,     // Necesita poder 12+
        trucoRaiseChance: 0.05,         // 5% de subir
        trucoRaiseMinPower: 14,         // Necesita poder 14
        foldChance: 0.4,                // 40% de pasar
        cardStrategy: 'conservative',   // Juega conservador
        randomVariance: 0,              // No agrega aleatoriedad extra
        envidoCallThresholdHigh: 30,
        envidoCallChanceHigh: 0.3,
        envidoCallThresholdLow: 28,
        envidoCallChanceLow: 0.15,
    },

    lines: {
        start: ['Sentate pibe, te voy a enseñar', ...],
        envido: ['Envido, pibe', ...],
        truco: ['Truco, pibe', ...],
        // ... más tipos de diálogos
    }
}
```

---

### Parámetros de IA Explicados

#### Envido

| Parámetro | Tipo | Rango | Significado |
|-----------|------|-------|------------|
| `envidoAcceptThreshold` | number | 0-39 | Mínimo de envido para aceptar |
| `envidoRaiseThreshold` | number | 0-39 | Mínimo para subir apuesta |
| `envidoRaiseChance` | number | 0-1 | Probabilidad de subir (0.05 = 5%) |
| `envidoCallThresholdHigh` | number | 0-39 | Threshold alto para cantar |
| `envidoCallChanceHigh` | number | 0-1 | Prob. de cantar con high |
| `envidoCallThresholdLow` | number | 0-39 | Threshold bajo para cantar |
| `envidoCallChanceLow` | number | 0-1 | Prob. de cantar con low |

#### Truco

| Parámetro | Tipo | Rango | Significado |
|-----------|------|-------|------------|
| `trucoAcceptMinPower` | number | 1-14 | Poder mínimo para aceptar truco |
| `trucoBluffChance` | number | 0-1 | Probabilidad de bluffear |
| `trucoProactiveChance` | number | 0-1 | Probabilidad de cantar primero |
| `trucoProactiveMinPower` | number | 1-14 | Poder mínimo para cantar |
| `trucoRaiseChance` | number | 0-1 | Probabilidad de subir escalada |
| `trucoRaiseMinPower` | number | 1-14 | Poder mínimo para subir |
| `foldChance` | number | 0-1 | Probabilidad de pasar |

#### General

| Parámetro | Tipo | Rango | Significado |
|-----------|------|-------|------------|
| `cardStrategy` | string | 'conservative' / 'balanced' / 'aggressive' | Estrategia de juego |
| `randomVariance` | number | 0+ | Aleatoriedad añadida (0 = ninguna) |

---

### Acceder a Parámetros de Oponente

```javascript
// Obtener oponente por clave
const opponent = OPPONENTS['abraham'];

console.log(opponent.name);              // 'ABRAHAM'
console.log(opponent.ai.trucoBluffChance);  // 0.03

// Usar en decisiones de IA
if (Math.random() < opponent.ai.trucoBluffChance) {
    console.log('El oponente bluffea!');
}

// Acceder a líneas
const randomLine = opponent.lines.start[
    Math.floor(Math.random() * opponent.lines.start.length)
];
console.log(randomLine);  // p.ej. "Sentate pibe, te voy a enseñar"
```

---

### Todos los Personajes (Resumen)

| Clave | Nombre | Tier | Dificultad |
|-------|--------|------|-----------|
| `abraham` | ABRAHAM | 1 | Fácil |
| `alfredito` | ALFREDITO | 1 | Media |
| `aliado` | ALIADO | 2 | Media |
| `cacho` | CACHO | 2 | Difícil |
| `tano` | EL TANO | 2 | Difícil |
| `lanegra` | LA NEGRA | 3 | Difícil |
| `titi` | TITÍ | 3 | Muy Difícil |
| `tordo` | TORDO | 3 | Muy Difícil |
| `varela` | VARELA | 4 | Experto |
| `yeyo` | YEYO | 4 | Experto |

---

## Carga de Imágenes

### CARD_BASE_PATH

Variable global que define la ruta base de las cartas.

```javascript
const CARD_BASE_PATH = typeof CARD_BASE_PATH !== 'undefined'
    ? CARD_BASE_PATH
    : 'cartas/';
```

**Puede ser overrideada:**
```html
<script>
    const CARD_BASE_PATH = '/custom/path/';
</script>
<script src="shared.js"></script>
```

---

### detectCards()

Función auto-ejecutable que detecta qué imágenes de cartas existen.

```javascript
(function detectCards() {
    for (const s of SUITS) {
        for (const n of NUMBERS) {
            const key = `${n}-${s}`;
            const file = `${_cardBasePath}${n}${SUIT_FILE[s]}.png`;

            const img = new Image();
            img.onload = function() {
                CARD_IMAGES[key] = file;
            };
            img.src = file;
        }
    }
})();
```

**Qué hace:**
1. Itera sobre todos los palos y números
2. Construye el path: `cartas/1deespada.png`
3. Intenta cargar la imagen
4. Si carga exitosamente, la guarda en `CARD_IMAGES[key]`
5. Si falla, `CARD_IMAGES[key]` queda `undefined` (usará fallback)

**Fallback (en renderCard):**
Si no existe imagen, se renderiza la carta con símbolos en su lugar.

---

## Patrones de Uso

### Pattern: Inicializar Juego

```javascript
// 1. Obtener oponente
const opponent = OPPONENTS['abraham'];

// 2. Crear mazo
let deck = createDeck();
deck = shuffle(deck);

// 3. Repartir 3 cartas
const playerHand = deck.splice(0, 3);
const opponentHand = deck.splice(0, 3);

// 4. Renderizar mano del jugador
const playerHTML = playerHand
    .map(card => renderCard(card, true))
    .join('');
document.getElementById('player-hand').innerHTML = playerHTML;
```

---

### Pattern: Calcular Ganador de Mano

```javascript
const playerCard = playerHand[selectedIndex];
const opponentCard = opponentHand[opponentIndex];

const playerPower = getPower(playerCard);
const opponentPower = getPower(opponentCard);

let handWinner;
if (playerPower > opponentPower) {
    handWinner = 'player';
} else {
    handWinner = 'opponent';
}

console.log(`Ganador: ${handWinner}`);
```

---

### Pattern: Decidir si IA Canta Truco

```javascript
const opponent = OPPONENTS['alfredito'];
const opponentBestCard = Math.max(
    ...opponentHand.map(getPower)
);

const shouldCantarTruco =
    Math.random() < opponent.ai.trucoProactiveChance &&
    opponentBestCard >= opponent.ai.trucoProactiveMinPower;

if (shouldCantarTruco) {
    console.log(`${opponent.name} canta TRUCO`);
    const line = opponent.lines.truco[
        Math.floor(Math.random() * opponent.lines.truco.length)
    ];
    console.log(`${opponent.name}: "${line}"`);
}
```

---

## Checklist de Implementación

Al usar shared.js en tu código:

- [ ] ¿Verificaste que `shared.js` se carga antes de tu código?
- [ ] ¿Usaste `createDeck()` y `shuffle()` para inicializar?
- [ ] ¿Usaste `getPower()` para comparar cartas?
- [ ] ¿Usaste `calcEnvido()` para calcular envido?
- [ ] ¿Usaste `renderCard()` para generar HTML?
- [ ] ¿Accediste a `OPPONENTS[key]` para obtener datos del personaje?
- [ ] ¿Usaste `OPPONENTS[key].ai` para decisiones de IA?
- [ ] ¿Usaste `OPPONENTS[key].lines` para diálogos?
- [ ] ¿Manejaste el fallback de imágenes?

---

## Troubleshooting

### Las imágenes de cartas no aparecen

```javascript
// Verificar si las imágenes se cargaron
console.log(CARD_IMAGES);

// Si está vacío, significa que las imágenes no se encontraron
// Fallback: renderCard() generará versión con símbolos
```

### Un personaje no tiene datos

```javascript
// Verificar que la clave es correcta
console.log(Object.keys(OPPONENTS));
// ['abraham', 'alfredito', 'aliado', ...]

// Acceder correctamente
const opp = OPPONENTS['abraham'];  // ✅ Correcto
// const opp = OPPONENTS.Abraham;  // ❌ Incorrecto
```

### calcEnvido retorna 0

```javascript
// Probablemente todas las cartas son figuras (10, 11, 12)
const hand = [
    { number: 10, suit: 'espadas', key: '10-espadas' },
    { number: 12, suit: 'bastos', key: '12-bastos' }
];

console.log(calcEnvido(hand));  // 0

// Figuras valen 0 en envido
console.log(ENVIDO_VAL[10]);   // 0
console.log(ENVIDO_VAL[12]);   // 0
```

---

## Próximos Pasos

Después de revisar esta documentación:

1. Lee [ARCHITECTURE.md](/docs/ARCHITECTURE.md) para ver cómo se integra shared.js
2. Lee [TRUCO_RULES.md](/docs/TRUCO_RULES.md) para entender la lógica del juego
3. Revisa `juego.html` para ver ejemplos reales de uso

---

**¿Preguntas?** Revisa el código en `shared.js` directamente — está bien comentado.
