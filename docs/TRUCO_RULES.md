# Reglas del Truco en ReTruco

**Última actualización:** 30 de Marzo, 2026

---

## Índice

1. [Introducción](#introducción)
2. [Preparación del juego](#preparación-del-juego)
3. [Estructura del juego](#estructura-del-juego)
4. [Fase de Envido](#fase-de-envido)
5. [Fase de Truco](#fase-de-truco)
6. [Fase de Juego](#fase-de-juego)
7. [Sistema de Puntos](#sistema-de-puntos)
8. [Carteo (Poder de Cartas)](#carteo-poder-de-cartas)
9. [Estrategia Básica](#estrategia-básica)
10. [Implementación en ReTruco](#implementación-en-retruco)

---

## Introducción

El **Truco** es un juego de cartas argentino clásico jugado entre dos personas. Se juega con una baraja española de 40 cartas.

### Objetivo

Ser el primero en alcanzar **30 puntos** ganando manos y apostando correctamente.

### Elemento Clave

El Truco combina **suerte** (las cartas que recibes), **habilidad** (qué cartas jugar) y **psicología** (cuándo blufear y cuándo creer).

---

## Preparación del Juego

### Baraja Española

Se usa una baraja de 40 cartas sin los 8s y 9s:

- **4 Palos:** Espadas, Bastos, Copas, Oros
- **10 Números por palo:** 1, 2, 3, 4, 5, 6, 7, 10, 11, 12
- **Total:** 40 cartas

```
Espadas: 1♠, 2♠, 3♠, 4♠, 5♠, 6♠, 7♠, 10♠, 11♠, 12♠
Bastos:  1♣, 2♣, 3♣, 4♣, 5♣, 6♣, 7♣, 10♣, 11♣, 12♣
Copas:   1♥, 2♥, 3♥, 4♥, 5♥, 6♥, 7♥, 10♥, 11♥, 12♥
Oros:    1♦, 2♦, 3♦, 4♦, 5♦, 6♦, 7♦, 10♦, 11♦, 12♦
```

### Reparto Inicial

1. Se mezcla el mazo
2. Se reparten **3 cartas** a cada jugador
3. Se colocan boca abajo frente a cada uno
4. El mazo restante queda en la mesa

---

## Estructura del Juego

Una **partida completa** se divide en:

```
┌─────────────────────────────────┐
│         PARTIDA (1-N)           │
│  (Jugar hasta 30 puntos)        │
├─────────────────────────────────┤
│      MANO (mejor de 3)          │
│  (Se juegan hasta 3 manos)      │
├──────────────────┬──────────────┤
│  FASE DE ENVIDO  │ FASE DE TRUCO │
├────────┬─────────┴──────────────┤
│        FASE DE JUEGO (3 vueltas)│
│        ├─ Vuelta 1              │
│        ├─ Vuelta 2              │
│        └─ Vuelta 3              │
├─────────────────────────────────┤
│     DETERMINAR GANADOR          │
│     (Quien ganó 2 de 3)         │
└─────────────────────────────────┘
```

---

## Fase de Envido

### ¿Qué es el Envido?

El **Envido** es una apuesta secundaria sobre el **valor de dos cartas del mismo palo**.

### Cálculo del Envido

Se suman los valores de las dos cartas más altas del mismo palo:

| Número | Valor |
|--------|-------|
| 1      | 1     |
| 2      | 2     |
| 3      | 3     |
| 4      | 4     |
| 5      | 5     |
| 6      | 6     |
| 7      | 7     |
| 10     | 0     |
| 11     | 0     |
| 12     | 0     |

**Ejemplos:**
- 3 Espadas + 5 Espadas = 3 + 5 = 8
- 7 Copas + 1 Copas = 7 + 1 = 8
- 12 Oros + 11 Oros = 0 + 0 = 0 (cartas altas no valen)
- 1 Bastos + 2 Bastos = 1 + 2 = 3

**Flor:** Si tienes dos cartas del mismo palo, sumas 20 + los valores:
- 3 Espadas + 5 Espadas = **20 + 3 + 5 = 28**
- 7 Copas + 4 Copas = **20 + 7 + 4 = 31**
- 1 Bastos + 2 Bastos = **20 + 1 + 2 = 23**

### Niveles de Envido

Se puede cantar en escalada:

| Apuesta | Puntos | Descripción |
|---------|--------|-------------|
| **Envido** | 2 | Apuesta básica |
| **Real Envido** | 3 | El doble de la apuesta |
| **Falta Envido** | Todos | Todo lo que resta para llegar a 30 |

**Ejemplo de escalada:**
```
Oponente: "ENVIDO" (2 puntos en juego)
Tú:       "REAL ENVIDO" (sube a 3)
Oponente: "FALTA ENVIDO" (sube a todos los puntos)
```

### Respuestas al Envido

Cuando te cantan Envido, puedes:

| Respuesta | Significado |
|-----------|-------------|
| **Quiero** | Aceptas la apuesta. Se comparan los envidos. |
| **No quiero** | Rechazas. El que cantó gana los puntos de la apuesta. |

**Ejemplo:**
```
Oponente canta: "ENVIDO"
Tú tienes: 7 Espadas + 3 Espadas = 20 + 7 + 3 = 30
Oponente tiene: 5 Bastos + 2 Bastos = 20 + 5 + 2 = 27

Tú dices: "QUIERO"
RESULTADO: Tú ganas 2 puntos
```

### Regla Especial: Envido sin Flor

Si tienes envido pero **no tienes dos cartas del mismo palo**, puedes decir:
- "Envido" de un solo número (el máximo de cualquier palo)

---

## Fase de Truco

### ¿Qué es el Truco?

El **Truco** es una apuesta sobre quién **gana la mano** (mejor de 3 juegos).

### Niveles de Truco

Se escaladan igual que Envido:

| Apuesta | Puntos | Descripción |
|---------|--------|-------------|
| **Truco** | 2 | Apuesta básica de la mano |
| **Retruco** | 3 | Subida de apuesta |
| **Vale Cuatro** | 4 | Apuesta máxima |

**Ejemplo de escalada en Truco:**
```
Oponente: "TRUCO" (la mano vale 2 puntos)
Tú:       "RETRUCO" (sube a 3)
Oponente: "VALE CUATRO" (sube a 4)
Tú:       "No quiero" (renuncias, oponente gana 4)
```

### Respuestas al Truco

| Respuesta | Significado |
|-----------|-------------|
| **Quiero** | Aceptas. Se juegan las cartas y quien gane se lleva los puntos. |
| **No quiero / Mazo** | Rechazas. El que cantó gana los puntos de la apuesta actual. |

**Nota:** Si rechazas una escalada, pierdes automáticamente. Pero si aceptas y pierdes, también pierdes esos puntos.

---

## Fase de Juego

### Estructura de una Mano

Se juegan **hasta 3 "vueltas"** o "juegos" dentro de la mano:

```
MANO
├─ VUELTA 1 (Cada uno juega 1 carta)
├─ VUELTA 2 (Cada uno juega 1 carta)
└─ VUELTA 3 (Cada uno juega 1 carta)

Gana la mano: quien gane 2 de 3 vueltas
```

### Cómo Jugar una Vuelta

1. **El jugador elige una carta** de sus 3 disponibles
2. **El oponente elige una carta** (automáticamente)
3. **Se comparan poderes:**
   - Mayor poder gana la vuelta
   - Se animan y se muestran en la mesa

### Poder de Cartas (Carteo)

Cada carta tiene un "poder" basado en su número y palo:

```
PODER MÁXIMO (Canela)
┌──────────────────────────────────┐
│ 1 Espadas      → Poder 14        │
│ 1 Bastos       → Poder 13        │
│ 7 Espadas      → Poder 12        │
│ 7 Oros         → Poder 11        │
│ 3 (cualquier)  → Poder 10        │
│ 2 (cualquier)  → Poder 9         │
│ 1 Copas        → Poder 8         │
│ 1 Oros         → Poder 8         │
│ 12 (cualquier) → Poder 7         │
│ 11 (cualquier) → Poder 6         │
│ 10 (cualquier) → Poder 5         │
│ 7 Copas        → Poder 4         │
│ 7 Bastos       → Poder 4         │
│ 6 (cualquier)  → Poder 3         │
│ 5 (cualquier)  → Poder 2         │
│ 4 (cualquier)  → Poder 1         │
└──────────────────────────────────┘
PODER MÍNIMO (sin poder)
```

### Ejemplo de Vuelta

```
Tú juegas: 3 Espadas (Poder 10)
Oponente: 5 Bastos (Poder 2)

GANADOR: Tú (10 > 2)
```

```
Tú juegas: 5 Copas (Poder 2)
Oponente: 7 Oros (Poder 11)

GANADOR: Oponente (11 > 2)
```

### Ganador de la Mano

El primero que **gane 2 de 3 vueltas** gana la mano y se lleva los puntos de la apuesta.

---

## Sistema de Puntos

### Puntos del Juego

Se suman los puntos ganados en cada mano:
- **Envido ganado:** 2, 3, o todos los puntos
- **Truco ganado:** 2, 3, o 4 puntos

### Victoria de la Partida

**Primer jugador en llegar a 30 puntos gana la partida.**

### Ejemplo de Partida Completa

```
INICIO: Tú 0 | Oponente 0

MANO 1:
├─ Envido: Tú cantas "Envido", oponente dice "No quiero"
│  → Tú ganas 2 puntos
├─ Truco: Oponente canta "Truco", tú dices "Quiero"
│  → Tú ganas 2 manos de 3
│  → Tú ganas 2 puntos
└─ PUNTUACIÓN: Tú 4 | Oponente 0

MANO 2:
├─ Envido: Oponente canta "Envido", tú dices "Quiero"
│  → Oponente tiene 28, tú tienes 20
│  → Oponente gana 2 puntos
├─ Truco: Tú cantas "Truco", oponente dice "Retruco"
│  → Tú dices "Vale Cuatro"
│  → Oponente gana 2 de 3
│  → Oponente gana 4 puntos
└─ PUNTUACIÓN: Tú 4 | Oponente 6

MANO 3:
├─ Envido: Tú cantas "Real Envido", oponente rechaza
│  → Tú ganas 3 puntos
├─ Truco: Sin cantar (se juega a 2 por defecto)
│  → Tú ganas 2 de 3
│  → Tú ganas 2 puntos
└─ PUNTUACIÓN: Tú 9 | Oponente 6

... (continúa hasta que alguien llegue a 30)

MANO 12:
└─ PUNTUACIÓN: Tú 28 | Oponente 27

MANO 13:
├─ Envido: Tú cantas "Envido", oponente rechaza
│  → Tú ganas 2 puntos
└─ FINAL: Tú 30 | Oponente 27

🎉 ¡GANASTE LA PARTIDA!
```

---

## Carteo (Poder de Cartas)

### Lógica del Sistema de Poder

El poder se basa en:
1. **Número de la carta** (algunos son más fuertes)
2. **Palo de la carta** (algunos números son más fuertes en ciertos palos)

### Cartas Especiales

#### El AS (1)
- **1 Espadas:** Poder 14 (LA MÁS FUERTE)
- **1 Bastos:** Poder 13
- **1 Copas:** Poder 8
- **1 Oros:** Poder 8

#### El SIETE (7)
- **7 Espadas:** Poder 12 (muy fuerte)
- **7 Oros:** Poder 11 (muy fuerte)
- **7 Copas:** Poder 4 (débil)
- **7 Bastos:** Poder 4 (débil)

#### El TRES (3)
- **3 de cualquier palo:** Poder 10 (muy fuerte siempre)

#### El RESTO
Los números 2, 4, 5, 6, 10, 11, 12 tienen poder basado solo en el número, no en el palo.

### Tabla Completa de Poderes

```
┌─────────────────┬──────┐
│ Carta           │ Poder│
├─────────────────┼──────┤
│ 1 Espadas       │  14  │
│ 1 Bastos        │  13  │
│ 7 Espadas       │  12  │
│ 7 Oros          │  11  │
│ 3 Espadas       │  10  │
│ 3 Bastos        │  10  │
│ 3 Copas         │  10  │
│ 3 Oros          │  10  │
│ 2 Espadas       │   9  │
│ 2 Bastos        │   9  │
│ 2 Copas         │   9  │
│ 2 Oros          │   9  │
│ 1 Copas         │   8  │
│ 1 Oros          │   8  │
│ 12 Espadas      │   7  │
│ 12 Bastos       │   7  │
│ 12 Copas        │   7  │
│ 12 Oros         │   7  │
│ 11 Espadas      │   6  │
│ 11 Bastos       │   6  │
│ 11 Copas        │   6  │
│ 11 Oros         │   6  │
│ 10 Espadas      │   5  │
│ 10 Bastos       │   5  │
│ 10 Copas        │   5  │
│ 10 Oros         │   5  │
│ 7 Copas         │   4  │
│ 7 Bastos        │   4  │
│ 6 Espadas       │   3  │
│ 6 Bastos        │   3  │
│ 6 Copas         │   3  │
│ 6 Oros          │   3  │
│ 5 Espadas       │   2  │
│ 5 Bastos        │   2  │
│ 5 Copas         │   2  │
│ 5 Oros          │   2  │
│ 4 Espadas       │   1  │
│ 4 Bastos        │   1  │
│ 4 Copas         │   1  │
│ 4 Oros          │   1  │
└─────────────────┴──────┘
```

---

## Estrategia Básica

### Ofensiva

**Cuándo cantar Envido:**
- Tienes 28+ de envido
- Esperas una mala respuesta del oponente
- Ya ganaste envido antes (confianza)

**Cuándo cantar Truco:**
- Tienes el 1 Espadas, 1 Bastos, o un 3
- Ya ganaste 1 vuelta
- El oponente parece débil

### Defensiva

**Cuándo rechazar Envido:**
- Tienes 20 o menos de envido
- El oponente suena confiado
- Ya rechazó antes (probablemente tiene flor)

**Cuándo rechazar Truco:**
- Tu mejor carta tiene poder bajo
- El oponente ya ganó 2 vueltas
- Es una escalada muy agresiva

### Lee al Oponente

En ReTruco, cada personaje tiene:
- **Líneas de diálogo** que revelan su ánimo
- **Probabilidades diferentes** de blufear
- **Estrategias únicas**

Por ejemplo:
- **Abraham:** Rara vez bluffea. Si canta Truco, probablemente tiene cartas buenas.
- **Alfredito:** Canta Truco con cualquier cosa. Rechaza sus blufeos.
- **Tití:** Maestra del juego psicológico. Difícil de leer.

---

## Implementación en ReTruco

### Cálculos del Sistema

```javascript
// Cálculo de Envido
function calcEnvido(hand) {
    const bySuit = {};
    hand.forEach(c => {
        if (!bySuit[c.suit]) bySuit[c.suit] = [];
        bySuit[c.suit].push(c);
    });

    let best = 0;
    for (const suit of SUITS) {
        const cards = bySuit[suit];
        if (!cards) continue;

        // Si tienes 2 cartas del mismo palo
        if (cards.length >= 2) {
            const vals = cards.map(c => ENVIDO_VAL[c.number]).sort((a, b) => b - a);
            const pairScore = 20 + vals[0] + vals[1]; // Flor
            if (pairScore > best) best = pairScore;
        }

        // Si tienes 1 sola carta de un palo
        cards.forEach(c => {
            const single = ENVIDO_VAL[c.number];
            if (single > best) best = single;
        });
    }

    return best;
}
```

```javascript
// Cálculo de Poder
const POWER = {
    '1-espadas': 14,
    '1-bastos': 13,
    '7-espadas': 12,
    '7-oros': 11,
    '3-espadas': 10,
    '3-bastos': 10,
    // ... más cartas
};

function getPower(card) {
    return POWER[card.key] || 0;
}
```

### Personajes y sus Estrategias

Cada personaje tiene `ai.trucoBluffChance` y `ai.trucoProactiveChance`:

```javascript
abraham: {
    ai: {
        trucoBluffChance: 0.03,      // 3% de bluffear
        trucoProactiveChance: 0.15,  // 15% de cantar primero
    }
},

alfredito: {
    ai: {
        trucoBluffChance: 0.12,      // 12% de bluffear (más que Abraham)
        trucoProactiveChance: 0.25,  // 25% de cantar primero
    }
},

titi: {
    ai: {
        trucoBluffChance: 0.35,      // 35% de bluffear (MAESTRA)
        trucoProactiveChance: 0.45,  // 45% de cantar primero
    }
}
```

---

## Cheat Sheet para Jugadores

### Jerarquía Rápida de Cartas

```
SUPER FUERTE: 1♠, 1♣, 7♠, 7♦, 3 de cualquier palo
FUERTE:       2 cualquier, 1♥, 1♦, 12 cualquier
MEDIA:        11 cualquier, 10 cualquier
DÉBIL:        7♥, 7♣, 6 cualquier, 5 cualquier
MUY DÉBIL:    4 cualquier
```

### Envido Rápido

```
Menos de 20:   Rechaza si te cantan
20-25:         Podés aceptar si confías
25-30:         Canta vos
31+:           Flor prácticamente garantizada
```

### Bluff del Truco

```
Bajo poder (5 o menos):    70% de rechazar
Poder medio (8-10):        Depende del oponente
Alto poder (12+):          90% aceptar
```

---

## Preguntas Frecuentes

**P: ¿Se puede cantar Envido después de Truco?**
A: Sí, en el orden real: primero Envido, después Truco, después juego.

**P: ¿Si rechazo el Envido, puedo rechazar el Truco?**
A: Sí, son apuestas independientes.

**P: ¿Qué pasa si ambos tienen el mismo envido?**
A: En ReTruco, se considera empate y no gana nadie los puntos.

**P: ¿Puedo jugar una carta que ya usé?**
A: No, cada carta se juega una sola vez.

**P: ¿Si rechazamos todos, cuántos puntos vale la mano?**
A: 1 punto por defecto (es "juego simple").

---

## Referencias

Para aprender más sobre el Truco auténtico:
- [Federación Argentina de Truco](https://www.trucofat.com.ar/)
- [Wikipedia - Truco](https://es.wikipedia.org/wiki/Truco)
- Videos en YouTube de jugadores clásicos
