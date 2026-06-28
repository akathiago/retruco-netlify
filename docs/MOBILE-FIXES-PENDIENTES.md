# Mobile fixes pendientes — ReTruco

> Diagnóstico hecho cargando `index.html` dentro de un iframe de 375px (el browser del entorno no
> emula mobile por resize). Todo verificado visualmente. **El mobile YA está bastante bien**: viewport
> meta OK, sin overflow horizontal del body, sin texto diminuto/cortado. Lo que sigue son los pocos
> fixes puntuales que faltan. **Todo es aditivo y scoped a media queries ≤900/≤768/≤600 → no toca desktop.**

## Cómo aplicar
Pegar el bloque `<style>` de abajo **justo antes de `</body>`** (línea ~5002 de `index.html`).
Así queda último en orden de cascada y gana sin necesidad de `!important`.

## Qué arregla cada parte
- **C · DaroTV + Soundtrack potables en mobile** (estaban `display:none` ≤900px → ahora se muestran adaptados).
  - DaroTV: solo se des-oculta y se le da un poco más de alto (video del TV usable). VERIFICADO ✅
  - Soundtrack: el layout absoluto de desktop se rompía (texto de canciones a `clamp(1.93rem…)` se
    superponía en la caja angosta). Se convierte a layout vertical limpio: se ocultan el fondo y la lista
    dibujada (arte de desktop) y se muestra la lista clickeable + el disco centrado. VERIFICADO ✅
- **B · Tipografía**: la lista de canciones baja a 1.15rem para que no se solape.
- **D · Touch targets (≥44px)**: `.social-link` 40→44 (probado: NO desborda el nav), `li` de canciones
  con min-height 44, `.btn-crear` con min-height 44, `.scroll-indicator` con padding.
- **C · Preloader**: el personaje (600px) se recortaba en pantallas angostas → se capa a 92vw.

## Lo que NO hay que tocar
- `#construccion`: las cintas usan `width:150%` **a propósito** (se cruzan y el `overflow:hidden`
  las clipea — es el efecto buscado). No está roto. Única limitación: la interacción es `hover`, así que
  en touch no se "abren" las cintas. Es un easter-egg → potable como está. (Opcional futuro: toggle por tap.)
- `.section-personajes` (desktop) ya está bien resuelto: oculto en mobile y reemplazado por las cards de `#characters`.

## Bloque a pegar (antes de `</body>`)

```html
    <!-- ============================================================
         MOBILE FIXES — bloque consolidado, scoped 100% a mobile.
         No toca desktop (todo dentro de media queries).
         Ejes: B Tipografía · C Imágenes/Media · D Interacción
         ============================================================ -->
    <style>
    @media (max-width: 900px) {
        /* ---------- C · DaroTV + Soundtrack potables en mobile ---------- */
        .section-darotv,
        .section-soundtrack {
            display: block;
        }

        /* DaroTV: contenedor más alto para que el video del TV sea usable */
        .section-darotv {
            padding-bottom: 75%;
        }

        /* Soundtrack: layout absoluto de desktop -> vertical limpio.
           Ocultamos fondo y lista dibujada (arte desktop) y mostramos
           la lista clickeable + el disco. */
        .section-soundtrack {
            height: auto;
            padding-bottom: 0;
            min-height: 0;
            padding: 36px 20px 44px;
            background: linear-gradient(160deg, #1a1208, #0a0a0a);
            overflow: visible;
        }
        .section-soundtrack .soundtrack-bg,
        .section-soundtrack .soundtrack-lista {
            display: none;
        }
        .section-soundtrack .soundtrack-overlay {
            position: relative;
            top: auto;
            left: auto;
            width: 100%;
            height: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 24px;
        }
        .section-soundtrack .soundtrack-disco-wrapper {
            position: relative;
            right: auto;
            top: auto;
            left: auto;
            transform: none;
            width: 150px;
            max-width: 40vw;
            margin: 0 auto;
        }
        .section-soundtrack .soundtrack-songs {
            position: relative;
            left: auto;
            top: auto;
            transform: none;
            width: 100%;
            max-width: 340px;
            text-align: left;
        }

        /* ---------- B · Tipografía: lista de canciones legible en mobile ---------- */
        .section-soundtrack .soundtrack-songs li {
            font-size: 1.15rem;
            color: #e8c87a;
            padding: 11px 6px;
            border-bottom: 1px solid rgba(232, 200, 122, 0.15);
            text-shadow: none;
            /* D · touch target */
            min-height: 44px;
            display: flex;
            align-items: center;
        }
        .section-soundtrack .soundtrack-songs li:hover {
            transform: none; /* el translateX(10px) de desktop no aporta en touch */
        }

        /* ---------- D · Touch targets >= 44px ---------- */
        .nav-social .social-link {
            width: 44px;
            height: 44px;
        }
        .scroll-indicator {
            padding: 6px;
        }
    }

    /* Preloader: el personaje (600px) no se corta en pantallas angostas */
    @media (max-width: 768px) {
        .preloader-character {
            max-width: 92vw;
            max-height: 92vw;
        }
    }

    /* btn-crear: el bloque <=600 propio define posicion; aca solo garantizamos tap target >=44px */
    @media (max-width: 600px) {
        .btn-crear {
            min-height: 44px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }
    }
    </style>
```

## Verificación post-implementación (cuando lo apliques)
1. Desktop (>900px): que quede **idéntico** — todo está en media queries, no debería cambiar nada.
2. Mobile 375/390/414: scrollear DaroTV (video en el TV) y Soundtrack (lista + disco) → deben verse limpios.
3. Tocar una canción del soundtrack → debe reproducir audio (la lógica JS no se tocó).
4. Confirmar que no aparece scroll horizontal en ningún ancho.
