# Audio Files para ReTruco

## Sonidos Requeridos

Coloca los siguientes archivos en esta carpeta (`truco/audio/`):

| Archivo | Descripcion | Duracion sugerida |
|---------|-------------|-------------------|
| `card-shuffle.mp3` | Sonido de barajar cartas | 0.5-1s |
| `card-deal.mp3` | Una carta siendo repartida | 0.1-0.2s |
| `card-play.mp3` | Carta golpeando la mesa | 0.1-0.3s |
| `button-click.mp3` | Click de boton UI | 0.05-0.1s |
| `truco-call.mp3` | Stinger dramatico para TRUCO | 0.5-1s |
| `envido-call.mp3` | Stinger dramatico para ENVIDO | 0.5-1s |
| `win-round.mp3` | Sonido positivo corto | 0.2-0.4s |
| `lose-round.mp3` | Sonido negativo corto | 0.2-0.4s |
| `win-game.mp3` | Fanfarria de victoria | 1-2s |
| `lose-game.mp3` | Sonido de derrota | 0.5-1s |
| `opponent-speak.mp3` | Murmullo corto de voz | 0.2-0.5s |
| `music-loop.mp3` | Musica de fondo (loop) | 30s-2min |

## Formatos Soportados

- **MP3** - Funciona en todos los navegadores
- **OGG** - Mejor compresion, no funciona en Safari
- **WAV** - Sin compresion, archivos grandes

El sistema intenta cargar en orden: OGG > MP3 > WAV

## Fuentes Gratuitas Recomendadas

1. **Pixabay** - https://pixabay.com/sound-effects/search/card/
   - Gratis, sin atribucion requerida
   - Buscar: "card shuffle", "card deal", "playing cards"

2. **ZapSplat** - https://www.zapsplat.com/sound-effect-packs/playing-cards/
   - 85 sonidos de cartas gratis
   - Requiere cuenta gratuita y atribucion

3. **Freesound** - https://freesound.org/search/?q=card+game
   - Comunidad de sonidos CC
   - Verificar licencia de cada sonido

4. **SoundJay** - https://www.soundjay.com/card-sounds-1.html
   - Sonidos de cartas gratuitos
   - MP3 y WAV disponibles

## Fallback

Si no hay archivos de audio, el juego usa **sonidos sinteticos** generados con Web Audio API. Suenan decentes pero no tan bien como audio real.

## Musica de Fondo

Para la musica de fondo (`music-loop.mp3`), buscar:
- "latin jazz loop"
- "tango instrumental"
- "acoustic guitar loop"
- "cafe music"

Fuentes:
- https://pixabay.com/music/search/latin/
- https://www.bensound.com/
- https://incompetech.com/music/
