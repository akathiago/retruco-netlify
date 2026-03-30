# Documentación de ReTruco

**Última actualización:** 30 de Marzo, 2026

Bienvenido a la documentación completa de ReTruco. Aquí encontrarás guías, referencias técnicas y todo lo que necesitas saber para entender, jugar y desarrollar ReTruco.

---

## 📚 Índice General

### Para Jugadores

1. **[TRUCO_RULES.md](./TRUCO_RULES.md)** — Reglas completas del Truco
   - Cómo jugar
   - Sistema de Envido y Truco
   - Carteo (poder de cartas)
   - Estrategia básica
   - Cheat sheet

### Para Desarrolladores

2. **[README.md](../README.md)** — Guía principal del proyecto
   - Descripción general
   - Stack tecnológico
   - Estructura del proyecto
   - Guía de desarrollo
   - Deploy en Netlify
   - Roadmap

3. **[ARCHITECTURE.md](./ARCHITECTURE.md)** — Arquitectura técnica
   - Visión general del sistema
   - Diagrama de componentes
   - Flujo de datos
   - Módulos principales
   - Estados y ciclo de vida
   - Patrones de diseño

4. **[SHARED_JS_API.md](./SHARED_JS_API.md)** — API de shared.js
   - Referencia completa de constantes
   - Funciones de utilidad
   - Sistema de cartas
   - Cálculos de juego
   - Objeto OPPONENTS
   - Patrones de uso

5. **[CSS_GUIDE.md](./CSS_GUIDE.md)** — Guía de estilos
   - Sistema de diseño
   - Paleta de colores
   - Tipografía
   - Componentes CSS
   - Animaciones
   - Responsive design
   - Accesibilidad

---

## 🗂️ Estructura de Carpetas

```
retruco_netlify/
├── README.md                    # Guía principal
├── docs/
│   ├── INDEX.md                # Este archivo
│   ├── ARCHITECTURE.md          # Arquitectura técnica
│   ├── TRUCO_RULES.md          # Reglas del juego
│   ├── SHARED_JS_API.md        # Referencia de API
│   └── CSS_GUIDE.md            # Guía de estilos
├── index.html                   # Landing page
├── 404.html                     # Página de error
├── truco/                       # Minijuego
│   ├── index.html              # Selección de personajes
│   ├── juego.html              # Pantalla principal
│   ├── tutorial.html           # Tutorial
│   ├── shared.js               # Lógica compartida
│   ├── js/
│   │   ├── audio.js            # Gestor de audio
│   │   ├── animations.js       # Animaciones
│   │   └── particles.js        # Sistema de partículas
│   ├── css/
│   │   └── animations.css      # Keyframes
│   ├── audio/                  # Archivos de audio
│   ├── cartas/                 # Imágenes de cartas (40)
│   └── ...
├── imagenes/                    # Imágenes del sitio
├── fuentes/                     # Tipografías
├── favicon/                     # Icons y manifest
└── ...
```

---

## 🎯 Rutas de Lectura Recomendadas

### Para Entender el Juego

1. Comienza con **[TRUCO_RULES.md](./TRUCO_RULES.md)** — aprende las reglas
2. Juega algunas partidas en [retruco.xyz](https://retruco.xyz)
3. Revisa el **[README.md](../README.md)** — cómo se implementa

### Para Entender la Arquitectura

1. Lee **[ARCHITECTURE.md](./ARCHITECTURE.md)** — visión general
2. Revisa **[SHARED_JS_API.md](./SHARED_JS_API.md)** — constantes y funciones
3. Abre `truco/juego.html` en un editor — ve los patrones en acción

### Para Modificar Estilos

1. Lee **[CSS_GUIDE.md](./CSS_GUIDE.md)** — sistema de diseño
2. Abre `truco/css/animations.css` — ve los keyframes
3. Abre `truco/juego.html` — ve los estilos inline

### Para Modificar la IA

1. Lee **[SHARED_JS_API.md](./SHARED_JS_API.md)** — objeto OPPONENTS
2. Abre `truco/shared.js` — ve cómo están definidos los personajes
3. Modifica los parámetros en `ai: { ... }`

---

## 🚀 Quick Start para Desarrolladores

### 1. Configurar Entorno Local

```bash
# Clonar (si está en Git)
git clone https://github.com/tuuser/retruco.git
cd retruco_netlify

# Servir localmente
python -m http.server 8000
# O: npx http-server
# O: Live Server de VS Code

# Abrir en navegador
# http://localhost:8000
```

### 2. Explorar Archivos Clave

```
truco/shared.js          (867 líneas) — Toda la lógica compartida
truco/juego.html         (2,092 líneas) — Pantalla principal
truco/js/audio.js        (463 líneas) — Gestor de audio
truco/js/particles.js    (310 líneas) — Sistema de partículas
truco/css/animations.css  — Keyframes
```

### 3. Entender el Flujo

```
Usuario entra a /truco/
  → Selecciona personaje
  → Carga juego.html
  → Importa shared.js + audio.js + particles.js
  → Inicia GameManager
  → Reparte cartas
  → Loop: Envido → Truco → Juego → Fin mano
  → Gana quien llegue a 30 puntos
```

### 4. Hacer un Cambio Pequeño

**Ejemplo:** Cambiar color del turquesa a azul

```css
/* En truco/css/animations.css o en juego.html */
:root {
    --rust: #0066ff;  /* Azul en lugar de turquesa */
}
```

Actualizar navegador → ¡Cambio aplicado!

---

## 📖 Documentación por Componente

### Landing Page (index.html)

**Responsable:** Promoción y SEO
**Tamaño:** 110KB
**Tecnologías:** HTML + CSS inline

**Contenido documentado en:**
- [README.md](../README.md) — Descripción general
- [CSS_GUIDE.md](./CSS_GUIDE.md) — Estilos

### Minijuego (truco/)

**Responsable:** Lógica del juego

**Archivos:**
- `juego.html` — UI y GameManager
- `shared.js` — Constantes, IA, cálculos
- `js/audio.js` — AudioManager
- `js/particles.js` — ParticleSystem
- `css/animations.css` — Keyframes

**Documentado en:**
- [ARCHITECTURE.md](./ARCHITECTURE.md) — Estructura general
- [SHARED_JS_API.md](./SHARED_JS_API.md) — API de shared.js
- [CSS_GUIDE.md](./CSS_GUIDE.md) — Estilos
- [TRUCO_RULES.md](./TRUCO_RULES.md) — Reglas del juego

---

## 🔍 Búsqueda Rápida

### "¿Cómo...?"

**¿Cómo se calcula el Envido?**
→ [SHARED_JS_API.md — calcEnvido()](./SHARED_JS_API.md#calcenvido)

**¿Cómo se determina el poder de una carta?**
→ [SHARED_JS_API.md — POWER](./SHARED_JS_API.md#power) o [SHARED_JS_API.md — getPower()](./SHARED_JS_API.md#getpowercard)

**¿Cómo funciona el audio?**
→ [ARCHITECTURE.md — audio.js](./ARCHITECTURE.md#4-audiojs-463-líneas)

**¿Cómo se animan las partículas?**
→ [ARCHITECTURE.md — particles.js](./ARCHITECTURE.md#4-particlesjs-310-líneas)

**¿Cómo cambio los colores?**
→ [CSS_GUIDE.md — Paleta de Colores](./CSS_GUIDE.md#paleta-de-colores)

**¿Cómo modifico la IA de un personaje?**
→ [SHARED_JS_API.md — Parámetros de IA](./SHARED_JS_API.md#parámetros-de-ia-explicados)

**¿Cómo agrego un nuevo personaje?**
→ [SHARED_JS_API.md — Objeto OPPONENTS](./SHARED_JS_API.md#objeto-opponents) + copiar estructura de personaje existente

**¿Cómo deployo a Netlify?**
→ [README.md — Deploy en Netlify](../README.md#-deploy-en-netlify)

### "¿Dónde está...?"

**¿Dónde está la lógica del Truco?**
→ `truco/shared.js` (constantes, IA) y `truco/juego.html` (GameManager)

**¿Dónde están los personajes?**
→ `truco/shared.js` — constante `OPPONENTS`

**¿Dónde están los estilos?**
→ `index.html` (inline), `truco/juego.html` (inline), `truco/css/animations.css`

**¿Dónde está el audio?**
→ `truco/js/audio.js` (código) y `truco/audio/` (archivos)

**¿Dónde están las imágenes de cartas?**
→ `truco/cartas/` (40 PNG files)

---

## 🐛 Troubleshooting

### El juego no carga

1. Abre DevTools (F12)
2. Ve a Console
3. Busca errores rojos
4. Comprueba que `shared.js` se haya cargado

**Más info:** [README.md — Troubleshooting](../README.md#-troubleshooting)

### Las cartas no tienen imágenes

Las imágenes no están incluidas en el repo (tamaño). El juego muestra símbolos en su lugar (fallback intencional).

**Cómo agregar imágenes:**
1. Descarga imágenes de cartas españolas
2. Colócalas en `truco/cartas/` con nombres: `1deespada.png`, `2deespada.png`, etc.
3. Las imágenes se detectan automáticamente

### El audio no suena

1. Revisa que el volumen no esté silenciado
2. Abre DevTools → Console → busca `[AudioManager]`
3. Los archivos de audio deben estar en `truco/audio/`

---

## 📊 Estadísticas del Proyecto

| Métrica | Valor |
|---------|-------|
| **Líneas de código** | ~1,400 |
| **Líneas de documentación** | ~5,000+ |
| **Personajes jugables** | 10 |
| **Cartas en el mazo** | 40 |
| **Dependencias externas** | 0 |
| **Tamaño bundle (sin assets)** | ~200KB |
| **Accesibilidad (WCAG)** | AA |
| **Cobertura de tests** | N/A (vanilla JS) |

---

## 🎨 Paleta de Colores Rápida

| Color | Hex | Uso |
|-------|-----|-----|
| Turquesa (Principal) | `#2bb8cd` | Acentos, bordes |
| Negro (Fondo) | `#0a0a0a` | Fondos oscuros |
| Blanco (Texto) | `#f0f0f0` | Texto principal |
| Dorado (Envido) | `#d4af37` | Acentos |
| Verde (Victoria) | `#2ed573` | Estados positivos |
| Rojo (Derrota) | `#ff4757` | Estados negativos |

---

## 🔗 Enlaces Útiles

### Documentación Externa

- [MDN - JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/)
- [MDN - Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [MDN - Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [MDN - CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

### Reglas del Truco

- [Federación Argentina de Truco](https://www.trucofat.com.ar/)
- [Wikipedia - Truco](https://es.wikipedia.org/wiki/Truco)

### Herramientas

- [Google PageSpeed Insights](https://pagespeed.web.dev)
- [Netlify Deploy](https://app.netlify.com)

---

## ✍️ Contribuir a la Documentación

Si encuentras errores o quieres agregar información:

1. Edita el archivo `.md` correspondiente
2. Mantén el mismo estilo y estructura
3. Actualiza el "Última actualización" al inicio
4. Commit con mensaje descriptivo

---

## 📝 Historial de Cambios

| Fecha | Documento | Cambio |
|-------|-----------|--------|
| 30/03/2026 | Todos | Documentación inicial completa |

---

## 🎓 Próximos Pasos Recomendados

1. **Comienza por:** [README.md](../README.md) — Visión general
2. **Luego lee:** [ARCHITECTURE.md](./ARCHITECTURE.md) — Cómo está hecho
3. **Después:** [TRUCO_RULES.md](./TRUCO_RULES.md) — Aprende a jugar
4. **Finalmente:** [SHARED_JS_API.md](./SHARED_JS_API.md) — Detalle técnico

---

## 📞 Soporte

- **Bugs:** Reporta en GitHub Issues
- **Preguntas:** Revisa la documentación primero
- **Sugerencias:** Abre una Discussion

---

**Última actualización:** 30 de Marzo, 2026

**Versión:** 1.0 - MVP

**Estado:** Documentación completa ✅
