# 📚 DOCUMENTACIÓN COMPLETA DE RETRUCO

**Última actualización:** 30 de Marzo, 2026

---

## 🎯 Quick Links

### Para Empezar Rápido

- **[README.md](./README.md)** — Guía principal del proyecto (725 líneas)
- **[docs/INDEX.md](./docs/INDEX.md)** — Índice navegable de toda la documentación

### Documentación Técnica Detallada

1. **[docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)** — 710 líneas
   - Visión general de la arquitectura
   - Diagrama de componentes
   - Flujo de datos completo
   - Módulos principales
   - Patrones de diseño

2. **[docs/SHARED_JS_API.md](./docs/SHARED_JS_API.md)** — 862 líneas
   - Referencia completa de `shared.js`
   - API de constantes y funciones
   - Sistema de personajes (IA)
   - Patrones de uso con ejemplos

3. **[docs/TRUCO_RULES.md](./docs/TRUCO_RULES.md)** — 586 líneas
   - Reglas completas del Truco
   - Sistema de Envido y Truco
   - Poder de cartas (carteo)
   - Estrategia básica
   - Implementación en ReTruco

4. **[docs/CSS_GUIDE.md](./docs/CSS_GUIDE.md)** — 945 líneas
   - Sistema de diseño completo
   - Paleta de colores
   - Tipografía
   - Componentes CSS
   - Animaciones y efectos
   - Best practices

---

## 📊 Estadísticas de Documentación

| Documento | Líneas | Contenido |
|-----------|--------|----------|
| README.md | 725 | Guía principal, setup, deploy |
| docs/INDEX.md | 371 | Índice navegable y rutas de lectura |
| docs/ARCHITECTURE.md | 710 | Arquitectura técnica del proyecto |
| docs/SHARED_JS_API.md | 862 | API de shared.js con ejemplos |
| docs/TRUCO_RULES.md | 586 | Reglas del juego y estrategia |
| docs/CSS_GUIDE.md | 945 | Guía de estilos y componentes |
| **TOTAL** | **4,199** | **Documentación completa** |

---

## 🗂️ Estructura de Carpetas Creada

```
retruco_netlify/
├── README.md                    ← NUEVO: Guía principal
├── DOCUMENTATION.md             ← NUEVO: Este archivo
│
└── docs/                        ← NUEVA CARPETA
    ├── INDEX.md                 ← NUEVO: Índice de documentación
    ├── ARCHITECTURE.md          ← NUEVO: Arquitectura técnica
    ├── TRUCO_RULES.md          ← NUEVO: Reglas del juego
    ├── SHARED_JS_API.md        ← NUEVO: API de shared.js
    └── CSS_GUIDE.md            ← NUEVO: Guía de estilos
```

---

## 🎓 Rutas de Lectura Recomendadas

### Para Jugadores

1. Lee [docs/TRUCO_RULES.md](./docs/TRUCO_RULES.md)
2. Juega en [retruco.xyz](https://retruco.xyz)
3. Aprende estrategia y "carteo"

### Para Desarrolladores Nuevos

1. Lee [README.md](./README.md) — Visión general
2. Lee [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) — Cómo está hecho
3. Lee [docs/SHARED_JS_API.md](./docs/SHARED_JS_API.md) — API detallada
4. Abre los archivos de código en tu editor

### Para Diseñadores

1. Lee [docs/CSS_GUIDE.md](./docs/CSS_GUIDE.md) — Estilos completos
2. Abre `truco/css/animations.css`
3. Abre `truco/juego.html` — ve los estilos inline

### Para Modificar la IA

1. Lee [docs/SHARED_JS_API.md](./docs/SHARED_JS_API.md#objeto-opponents)
2. Abre `truco/shared.js`
3. Modifica los parámetros en `ai: { ... }`

---

## 📝 Qué Se Documentó

### ✅ Completamente Documentado

- [x] **Visión general del proyecto** — Qué es ReTruco
- [x] **Stack tecnológico** — Tecnologías usadas
- [x] **Estructura de archivos** — Dónde está todo
- [x] **Arquitectura de software** — Cómo está diseñado
- [x] **API de shared.js** — Todas las funciones y constantes
- [x] **Sistema de cartas** — Poder, envido, carteo
- [x] **Personajes y IA** — 10 personajes con detalle
- [x] **Reglas del Truco** — Completas y con ejemplos
- [x] **Sistema de diseño** — Colores, tipografía, componentes
- [x] **Animaciones** — Keyframes y efectos
- [x] **Audio** — Cómo funciona AudioManager
- [x] **Partículas** — Sistema de efectos visuales
- [x] **Flujo de datos** — Cómo se comunican los módulos
- [x] **Patrones de diseño** — Singleton, data-driven, etc.
- [x] **Setup local** — Cómo ejecutar en tu máquina
- [x] **Deploy en Netlify** — Paso a paso
- [x] **Troubleshooting** — Solución de problemas comunes
- [x] **Best practices** — Convenciones de código
- [x] **Ejemplos de código** — Patrones de uso reales

---

## 🎯 Características de la Documentación

### Profesionalismo

✅ **Estructura clara:** Índices, tablas de contenido
✅ **Formato consistente:** Markdown con convenciones
✅ **Ejemplos prácticos:** Código ejecutable
✅ **Diagramas ASCII:** Flujos y arquitectura
✅ **Tablas de referencia:** Para búsqueda rápida

### Completitud

✅ **5 documentos principales** (4,199 líneas)
✅ **Cubre todas las áreas** del proyecto
✅ **Detalle técnico** sin ser abrumador
✅ **Información para jugadores y developers**
✅ **Guías prácticas** de implementación

### Usabilidad

✅ **Índice navegable** (docs/INDEX.md)
✅ **Enlaces internos** entre documentos
✅ **Tabla de contenidos** en cada documento
✅ **Búsqueda rápida** de temas comunes
✅ **Troubleshooting** incluido

### Energía

✅ **Tono conversacional** como Thiago
✅ **Emojis bien usados** (no abusados)
✅ **Lenguaje directo** sin fluff
✅ **Humor criollo** en contexos apropiados
✅ **Motivante** para que otros contribuyan

---

## 💡 Lo Destacable

### Documentación Única

- **Sistema de IA explicado en detalle:** Cada personaje tiene 10+ parámetros documentados
- **Carteo de cartas:** Sistema de poder (1-14) completamente explicado
- **Flujos de datos:** Diagramas ASCII de cómo fluye la información
- **Patrones de código:** Ejemplos reales de cómo usar shared.js
- **Guía de estilos:** Desde variables CSS hasta animaciones

### Fácil de Mantener

- Toda la documentación en un lugar (`docs/`)
- Archivo INDEX.md como punto de entrada
- Links cruzados entre documentos
- Timestamps de última actualización
- Checklist de implementación

### Listo para Colaboradores

- Cualquiera puede entender el proyecto en 30 minutos
- Instrucciones claras para setup local
- Ejemplos de cómo modificar cosas
- Troubleshooting para problemas comunes

---

## 🚀 Próximos Pasos (Para Ti)

### Inmediatos

1. **Leer [README.md](./README.md)**
   - 5-10 minutos
   - Visión completa del proyecto

2. **Explorar [docs/INDEX.md](./docs/INDEX.md)**
   - 5 minutos
   - Entender qué documentación existe

3. **Revisar uno de tus intereses:**
   - Quieres jugar: Lee [docs/TRUCO_RULES.md](./docs/TRUCO_RULES.md)
   - Quieres modificar IA: Lee [docs/SHARED_JS_API.md](./docs/SHARED_JS_API.md)
   - Quieres cambiar estilos: Lee [docs/CSS_GUIDE.md](./docs/CSS_GUIDE.md)

### A Corto Plazo

- [ ] Clonar/descargar el repo
- [ ] Ejecutar localmente (`python -m http.server 8000`)
- [ ] Explorar archivos en tu editor
- [ ] Hacer un cambio pequeño (p.ej., color)
- [ ] Commitear a Git

### A Mediano Plazo

- [ ] Leer [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) completamente
- [ ] Entender el flujo de datos
- [ ] Modificar parámetros de un personaje
- [ ] Agregar un nuevo personaje
- [ ] Crear un branch con cambios

---

## 📖 Índice Rápido de Temas

### Desarrollo

| Tema | Documento |
|------|-----------|
| Setup local | [README.md](./README.md#-guía-de-desarrollo) |
| Arquitectura | [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) |
| API de shared.js | [docs/SHARED_JS_API.md](./docs/SHARED_JS_API.md) |
| Estilos CSS | [docs/CSS_GUIDE.md](./docs/CSS_GUIDE.md) |
| Deploy a Netlify | [README.md](./README.md#-deploy-en-netlify) |

### Gameplay

| Tema | Documento |
|------|-----------|
| Reglas del Truco | [docs/TRUCO_RULES.md](./docs/TRUCO_RULES.md) |
| Sistema de Envido | [docs/TRUCO_RULES.md](./docs/TRUCO_RULES.md#fase-de-envido) |
| Poder de cartas | [docs/TRUCO_RULES.md](./docs/TRUCO_RULES.md#carteo-poder-de-cartas) |
| Estrategia | [docs/TRUCO_RULES.md](./docs/TRUCO_RULES.md#estrategia-básica) |

### Sistema de Juego

| Tema | Documento |
|------|-----------|
| Constantes | [docs/SHARED_JS_API.md](./docs/SHARED_JS_API.md#constantes) |
| Funciones | [docs/SHARED_JS_API.md](./docs/SHARED_JS_API.md#funciones-de-utilidad) |
| Personajes | [docs/SHARED_JS_API.md](./docs/SHARED_JS_API.md#objeto-opponents) |
| IA | [docs/SHARED_JS_API.md](./docs/SHARED_JS_API.md#parámetros-de-ia-explicados) |

---

## ✨ Resumen Visual

```
                    DOCUMENTACIÓN RETRUCO
                           (2026)

┌─────────────────────────────────────────┐
│         4,199 LÍNEAS DE DOCS            │
│         5 DOCUMENTOS MAESTROS           │
│         10+ TEMAS CUBIERTOS             │
│         100% PROFESIONAL                │
└─────────────────────────────────────────┘

    ┌─────────────────┬─────────────────┐
    │  Jugadores      │   Developers    │
    ├─────────────────┼─────────────────┤
    │ TRUCO_RULES     │ ARCHITECTURE    │
    │ Cómo jugar      │ Cómo está hecho │
    │ Estrategia      │                 │
    ├─────────────────┼─────────────────┤
    │                 │ SHARED_JS_API   │
    │                 │ Referencia API  │
    │                 │                 │
    │ README          │ CSS_GUIDE       │
    │ Visión gral     │ Estilos         │
    │                 │                 │
    └─────────────────┴─────────────────┘

ACCESO: /docs/INDEX.md ← PUNTO DE ENTRADA
```

---

## 📞 Soporte & Preguntas

### Si tienes una pregunta...

1. **Busca en docs/INDEX.md** (sección "Búsqueda Rápida")
2. **Revisa el documento relevante**
3. **Si no encuentras, crea un Issue**

### Si encontraste un error...

1. **Reporta en GitHub Issues**
2. **Menciona el documento y línea**
3. **Sugiere una corrección**

### Si quieres contribuir...

1. **Fork el repo**
2. **Edita el documento .md**
3. **Mantén el mismo estilo**
4. **Crea un Pull Request**

---

## 🎉 Conclusión

**ReTruco ahora tiene documentación profesional, completa y accesible.**

Cualquiera puede:
- 🎮 Entender cómo jugar
- 👨‍💻 Entender cómo está hecho
- 🔧 Modificar y extender el código
- 📚 Aprender patrones de desarrollo
- 🚀 Deployar su propia versión

**Comenzá por:** [docs/INDEX.md](./docs/INDEX.md)

---

**Status:** ✅ Documentación Completa
**Versión:** 1.0 - MVP
**Último update:** 30 de Marzo, 2026

---

**GET IT quick:** [README.md](./README.md) → [docs/INDEX.md](./docs/INDEX.md) → Play at [retruco.xyz](https://retruco.xyz)
> **Aviso (22 de julio de 2026):** el minijuego de Truco documentado aquí fue retirado y reemplazado temporalmente por `/truco/index.html`. Las referencias a `juego.html`, `shared.js`, audio, cartas e IA se conservan solo como documentación histórica.
