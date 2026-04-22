# RETRUCO - GAMEPLAY, DIÁLOGOS Y OBJETIVOS
## Documento de Diseño de Juego

> Diálogos in-game, objetivos de misión, triggers, y contenido jugable.

---

## ÍNDICE

1. [Sistema de Objetivos](#sistema-de-objetivos)
2. [Diálogos por Nivel](#diálogos-por-nivel)
3. [Barks y Frases Aleatorias](#barks-y-frases-aleatorias)
4. [Cinemáticas](#cinemáticas)
5. [UI y Mensajes del Sistema](#ui-y-mensajes-del-sistema)
6. [Decisiones del Jugador](#decisiones-del-jugador)

---

## SISTEMA DE OBJETIVOS

### Formato de Objetivos

```
[ICONO] OBJETIVO PRINCIPAL
    └── Sub-objetivo 1
    └── Sub-objetivo 2
    └── Sub-objetivo opcional (*)
```

### Tipos de Objetivos

| Icono | Tipo | Descripción |
|-------|------|-------------|
| ★ | Principal | Obligatorio para avanzar |
| ○ | Secundario | Opcional, da recompensas |
| ⚔ | Combate | Derrotar enemigos/boss |
| 🔍 | Exploración | Encontrar algo |
| 💬 | Diálogo | Hablar con alguien |
| ⏱ | Tiempo | Contrarreloj |
| 🔒 | Secreto | No se muestra hasta descubrirlo |

---

## NIVEL 1: "BIENVENIDO AL INFIERNO AMARILLO"
### Cárcel de Shanghai

---

### OBJETIVOS

```
★ ESCAPAR DE LA CÁRCEL
    └── Sobrevivir la rutina diaria
    └── Conseguir elementos para el escape
    └── Derrotar al jefe del pabellón
    └── Escapar por las cloacas

○ GANAR 3 PARTIDAS DE TRUCO
    └── Recompensa: +50 créditos, ítem "Naipe Manchado"

○ ENCONTRAR EL MATE DE ABRAHAM
    └── Recompensa: Historia de Abraham, pista del twist

🔒 DESCUBRIR EL SECRETO DEL GUARDIA
    └── El guardia menciona "el señor Chen"
    └── Recompensa: Diálogo extra, exp bonus
```

---

### DIÁLOGOS

#### INTRO - CELDA (Cinemática)

```
[INT. CELDA - NOCHE]
[César está sentado en un camastro. Luz de luna entra por una rendija.]

CÉSAR (V.O.):
"Tres meses. Tres meses en este agujero.
No sé cómo llegué acá. Bueno, sí sé.
Confié en el pelotudo equivocado."

[Flashback rápido: Darío sonriendo, un avión, esposas]

CÉSAR (V.O.):
"Darío me dijo que era un viaje de negocios.
'Vas, firmás, volvés', me dijo.
Lo único que firmé fue mi sentencia."

[Vuelve al presente. Un GUARDIA golpea los barrotes.]

GUARDIA:
"起来! (¡Levántate!) ¡Hora de trabajar, argentino!"

CÉSAR:
"Ya voy, ya voy..."

[El jugador toma control]
```

#### TUTORIAL - ABRAHAM

```
[César se encuentra con ABRAHAM en el patio]

ABRAHAM:
"Eh, vos. Sí, vos. El nuevo."

CÉSAR:
"¿Qué querés?"

ABRAHAM:
"Tranquilo, pibe. Soy Abraham. Argentino, como vos.
Estoy acá hace... ¿cuánto? Ya perdí la cuenta.
¿Sabés jugar al truco?"

    [OPCIÓN A] "Obvio, ¿por quién me tomás?"
        ABRAHAM: "Bien, bien. Acá el truco es moneda.
                  Ganás partidas, conseguís cosas.
                  Perdés... bueno, tratá de no perder."

    [OPCIÓN B] "Más o menos..."
        ABRAHAM: "Te enseño. Es fácil. Mentir con cara de piedra.
                  Acá adentro es una habilidad de supervivencia."

    [OPCIÓN C] "No me interesa."
        ABRAHAM: "Te va a interesar cuando necesites morfar, pibe.
                  Acá todo se consigue con cartas o con sangre.
                  Elegí."

ABRAHAM:
"Una cosa más. Cuidate del guardia Wang.
Ese tipo... recibe plata de afuera.
Alguien quiere que estés 'cómodo'.
Raro, ¿no?"

[OBJETIVO ACTUALIZADO: Investigar al guardia Wang]
```

#### PARTIDA DE TRUCO

```
[Durante el juego de truco, frases aleatorias]

CÉSAR (al ganar):
- "Tomá mate."
- "¿Viste? El que sabe, sabe."
- "Ni en China me ganan."
- "Gracias por la guita."

CÉSAR (al perder):
- "Me dormí."
- "La próxima no zafás."
- "Tuve un mal día."

ABRAHAM (al ganar):
- "Pibe, te falta cancha."
- "Acá no hay envido que valga mentir."
- "Cuando quieras la revancha, acá estoy."

ABRAHAM (al perder):
- "Bien jugada, César."
- "Me hiciste acordar a mi viejo."
- "Vas a sobrevivir acá adentro."
```

#### GUARDIA WANG (Pista del Twist)

```
[Si el jugador investiga al guardia]

[César se esconde y escucha al GUARDIA WANG hablando por teléfono]

GUARDIA WANG:
"是的，陈先生... (Sí, señor Chen...)
El argentino está bien.
Sí, está 'cómodo' como usted pidió.
¿Cuánto tiempo más?
...Entendido."

[El guardia cuelga. César se esconde.]

CÉSAR (V.O.):
"¿Señor Chen? ¿Quién carajo es el señor Chen?
¿Y por qué le importa que yo esté 'cómodo'?"

[OBJETIVO SECRETO COMPLETADO]
[+100 EXP]
[NOTA DEL DIARIO ACTUALIZADA: "Alguien llamado Chen paga para que me traten bien. ¿Por qué?"]
```

#### BOSS: RICARDO FORT (SUEÑO)

```
[César cae exhausto después de un día de trabajo. Se duerme.]

[TRANSICIÓN: Todo se vuelve dorado y brillante]

[INT. ESCENARIO GIGANTE - SUEÑO]

RICARDO FORT:
"¡¡BIENVENIDO AL SHOW, PAPÁ!!"

CÉSAR:
"¿Qué carajo...? ¿Ricardo Fort?"

FORT:
"¡EL COMANDANTE! ¡EN PERSONA!"
"Bueno, en tu cabeza. Pero es lo mismo."

CÉSAR:
"Pero vos estás..."

FORT:
"¿MUERTO? ¡JA! ¿Quién te dijo eso?"
"El Comandante nunca muere. El Comandante TRASCIENDE."

[Fort saca fajos de dólares]

FORT:
"Ahora... ¡BAILÁ PARA MÍ!"

[BOSS FIGHT COMIENZA]
```

**Durante la pelea:**

```
FORT (Fase 1):
- "¿Quién te conoce, papá?"
- "¡Esto es ENTRETENIMIENTO!"
- "¡MÁS PLATA! ¡MÁS SHOW!"

FORT (Fase 2 - invoca fans):
- "¡¡LOS PIBES!! ¡¡VENGAN A PAPÁ!!"
- "¿Ves esto? ESTO es ser famoso."
- "Ellos me aman. ¿A vos quién te ama?"

FORT (Fase 3 - transformación):
- "¡¡AHORA SÍ!! ¡¡MODO COMANDANTE!!"
- "¡¡VAS A CONOCER AL VERDADERO FORT!!"

FORT (al perder):
- "No... no puede ser..."
- "Pero yo soy... el Comandante..."
- "Bueno... bien jugada, pibe. Bien jugada."
- "Nos vemos en otro sueño... ¡PAPÁ!"

[César despierta. Era un sueño.]

CÉSAR:
"Qué viaje... Tengo que dejar de comer el rancho de acá."
```

---

## NIVEL 4: "LA PATAGONIA SALVAJE"
### Bariloche → El Bolsón → Villa la Angostura

---

### OBJETIVOS

```
★ CRUZAR LA PATAGONIA
    └── Sobrevivir el cruce de los Andes
    └── Conseguir transporte en Bariloche
    └── Infiltrar la comunidad mapuflogger
    └── Descubrir el bunker de Rodolfo Hilton
    └── Llegar al Glaciar Perito Moreno

○ GANAR LA COMPETENCIA DE POSES
    └── Mini-juego: poses de flogger contra Facuncho
    └── Recompensa: Vincha de glitter (+5 carisma)

○ AYUDAR A LOS TREKKERS ISRAELÍES
    └── Encontrar su mochila perdida
    └── Recompensa: Se vuelven aliados contra Hilton

○ PROBAR TODOS LOS CHOCOLATES DE BARILOCHE
    └── 5/5 chocolaterías
    └── Recompensa: +200 HP permanente, diabetes temporal

🔒 ENCONTRAR LA FOTO DE 1945
    └── En el bunker de Hilton
    └── Recompensa: Revelación de la historia, ítem "Foto Borrosa"
```

---

### DIÁLOGOS

#### LLEGADA A BARILOCHE

```
[EXT. BARILOCHE - DÍA]
[César baja de un micro. Montañas nevadas de fondo.]

CÉSAR:
"La Patagonia. Por fin algo lindo después de tanta mier..."

[Un grupo de TREKKERS ISRAELÍES lo atropella casi]

TREKKER 1:
"Sorry, achi! We are running to the hostel!"

TREKKER 2:
"The beds! We need the beds!"

[Corren hacia un hostel. César los mira.]

CÉSAR:
"¿Qué carajo fue eso?"

VENDEDOR DE CHOCOLATE:
"Israelíes. Terminan el servicio militar y vienen todos acá.
Son buena gente, pero... hay muchos. MUCHOS."

CÉSAR:
"¿Hay lugar en algún hostel?"

VENDEDOR:
"Jajaja. Qué gracioso. No."

[OBJETIVO: Conseguir alojamiento]
```

#### ENCUENTRO CON LOS MAPUFLOGGERS

```
[EXT. EL BOLSÓN - ATARDECER]
[César camina por la ruta. Escucha música electrónica a lo lejos.]

[Un grupo de MAPUFLOGGERS bloquea el camino]

MAPUFLOGGER 1:
"Alto ahí, huinca."

MAPUFLOGGER 2:
"¿De dónde venís? ¿Qué onda?"

CÉSAR:
"Soy de Buenos Aires. Estoy de paso."

MAPUFLOGGER 1:
"¿Buenos Aires? ¿El Abasto?"

CÉSAR:
"Eh... Flores, pero..."

MAPUFLOGGER 2:
"Abasto, Flores, lo mismo. Tierra de caretas."

[Aparece FACUNCHO JONES HUALA]

FACUNCHO:
"¿Qué pasa acá?"

MAPUFLOGGER 1:
"Un porteño, Lonko. Dice que está de paso."

FACUNCHO:
"¿De paso? Nadie pasa por acá sin mi permiso."
"Esta tierra es de mi pueblo. NUESTRA tierra."
"Antes me la querían sacar los caretas del Abasto."
"Ahora me la quieren sacar ustedes."

CÉSAR:
"Mirá, yo no quiero tierra. Solo quiero llegar al sur."

FACUNCHO:
"Ah, ¿sí? ¿Y qué me das a cambio del paso?"

    [OPCIÓN A] "Guita." (-500 créditos)
        FACUNCHO: "La guita del huinca está manchada.
                   Pero... mancha que limpia. Pasá."

    [OPCIÓN B] "Te gano al truco y me dejás pasar."
        FACUNCHO: "¿Truco? Jajaja. Dale, porteño.
                   Si ganás, pasás. Si perdés... te quedás acá. Para siempre."
        [MINI-JUEGO DE TRUCO]

    [OPCIÓN C] "Nada. Me abro paso."
        FACUNCHO: "Ah, sos de los duros. Me gusta.
                   Pero te voy a tener que enseñar respeto."
        [BOSS FIGHT]

    [OPCIÓN D - si encontraste la vincha] "Te devuelvo esto." (Vincha de Fotolog perdida)
        FACUNCHO: "...¿Dónde encontraste eso?"
        CÉSAR: "Tirada por ahí. ¿Es tuya?"
        FACUNCHO: "...Era de mi época anterior. Mi yo del pasado."
        "Sabés qué, porteño. Pasá. Y no le digas a nadie que viste eso."
        [EVITÁS EL COMBATE - BONUS EXP]
```

#### MINI-BOSS: FACUNCHO (Si peleás)

```
[Durante la pelea]

FACUNCHO (Fase 1):
- "¡¡LA TIERRA ES NUESTRA, HUINCA!!"
- "¡¡RESISTENCIA ANCESTRAL!!"
- "Mi abuelo peleó contra los huincas. Yo también."

FACUNCHO (Fase 2):
- "¡¡MODO FOTOLOG ANCESTRAL!!"
- "¡¡CUMBIO DAME TU FUERZA!!"
- "El glitter y la tierra son uno."

FACUNCHO (al perder):
- "Bien... bien jugada, huinca."
- "Podés pasar. Pero escuchame..."
- "Más al sur hay algo raro. Alemanes viejos. MUY viejos."
- "Si los encontrás... hacenos un favor a todos y rompeles la cara."

[OBJETIVO ACTUALIZADO: Investigar a los alemanes]
```

#### LOS TREKKERS ISRAELÍES

```
[César encuentra a los TREKKERS en un refugio de montaña]

TREKKER LÍDER (YONI):
"Ah, el argentino del hostel. Shalom."

CÉSAR:
"Hola. ¿Qué hacen acá arriba?"

YONI:
"Trekking. Is beautiful, no? The mountains."
"Pero tenemos problema. Nuestra amiga Shira...
perdió su mochila en el bosque."

TREKKER 2 (AVI):
"Inside the mochila is her grandfather's...
como se dice... reloj? Watch?"

YONI:
"Very important for her. Sentimental."

    [OPCIÓN A] "Puedo buscarla."
        YONI: "Really? Toda, achi. Thank you."
        "If you find it... we help you. Whatever you need."
        [QUEST ACEPTADA: Encontrar la mochila de Shira]

    [OPCIÓN B] "No tengo tiempo."
        YONI: "Okay, okay. Entiendo. Good luck."
        [Se van]
```

**Si encontrás la mochila:**

```
[César le devuelve la mochila a SHIRA]

SHIRA:
"Toda raba! Thank you so much!"
"My saba... my grandfather... he survived the war."
"This watch is all I have of him."

CÉSAR:
"De nada. Che, una pregunta..."
"¿Saben algo de unos alemanes viejos por acá?"

[Los trekkers se miran entre ellos. Se ponen serios.]

YONI:
"...What did you say?"

AVI:
"Alemanes? How old?"

CÉSAR:
"Muy viejos. Tipo... no sé, 130 años."

[Silencio tenso]

YONI:
"We heard stories. Old nazis hiding in the mountains."
"We thought it was... how you say... mito. Myth."

SHIRA:
"If this is true... we help you find them."
"For my saba. For all our sabas."

[LOS TREKKERS SE UNEN COMO ALIADOS]
[+3 combatientes temporales]
[Habilidad desbloqueada: "KRAV MAGA" - ataque grupal]
```

#### DESCUBRIENDO EL BUNKER

```
[César y los trekkers encuentran una puerta escondida en la montaña]

YONI:
"This is it. Nazi architecture. I recognize it."

AVI:
"From the movies, Yoni. You recognize it from movies."

YONI:
"Same thing."

[Entran al bunker. Decoración de los años 40. Fotos borrosas en las paredes.]

CÉSAR:
"Mirá esto... fotos de 1945. Bariloche."

SHIRA:
"Those uniforms... Dios mío."

[Se escucha una voz desde el fondo]

VOZ ANCIANA:
"Ah... tenemos visitas."

[Se encienden las luces. RODOLFO HILTON aparece en su silla de ruedas.]

RODOLFO:
"Bienvenidos a mi humilde hogar."
"Perdón el desorden. No esperaba compañía."
"Hace... ¿cuánto? ¿80 años que no tengo visitas?"

CÉSAR:
"¿Quién carajo sos vos?"

RODOLFO:
"Rodolfo Hilton. Como el hotel. Ninguna relación."
"Llegué a este hermoso país en 1945. Por turismo."

SHIRA:
"Turismo. Claro. Y mi abuelo se fue de Europa por el clima."

RODOLFO:
"Ah, eine jüdin... Una judía. Qué... interesante."
"Bueno. Ya que están acá..."
"...supongo que no van a irse callados, ¿no?"

[Se levanta de la silla. Camina perfectamente.]

RODOLFO:
"Entonces vamos a tener que hacer esto por las malas."

[Aprieta un botón. Puertas se cierran. Alarmas suenan.]

RODOLFO:
"¡¡NIETOS!! ¡¡A LAS ARMAS!!"

[Aparecen CLONES RUBIOS en lederhosen]

[BOSS FIGHT COMIENZA]
```

#### BOSS: RODOLFO HILTON

```
[Durante la pelea]

RODOLFO (Fase 1 - Silla de ruedas con armas):
- "¡¡En mis tiempos sabíamos tratar a los intrusos!!"
- "¿Ven esta silla? La construí yo. En 1946. CON MIS MANOS."
- "Mis nietos son perfectos. Los diseñé yo mismo."
- "¡¡FUEGO, NIETOS, FUEGO!!"

RODOLFO (Fase 2 - Se inyecta suero):
- "¿Pensaban que era un viejo indefenso?"
- "El suero del Dr. Richter... ¡¡FUNCIONA!!"
- "¡¡ME SIENTO JOVEN DE NUEVO!!"
- "Como en los viejos tiempos... los BUENOS tiempos."

RODOLFO (Fase 3 - Activa el mecha-águila):
- "¡¡ESTO ESTABA GUARDADO PARA UN MOMENTO ESPECIAL!!"
- "¡¡EL ÁGUILA DE HIELO RENACE!!"
- "¿Creyeron que perdimos? ¡¡SOLO ESPERAMOS!!"
- "¡¡NEIN NEIN NEIN!! Perdón... ¡¡NO NO NO!!"

RODOLFO (al perder):
- "No... no puede ser..."
- "El Reich... digo... mi familia..."
- "Estuve tan cerca..."
- "Mein... mi... chocolate barilochense..."
- "Al menos... el otro plan... sigue..."

[Rodolfo muere. El bunker empieza a colapsar.]

YONI:
"We need to go! Now!"

[César agarra una CARPETA que cayó de la mano de Rodolfo]

CÉSAR:
"¿Qué carajo es esto? 'Plan Dragón de Jade'... ¿Wa-Chin?"

[OBJETIVO ACTUALIZADO: Investigar el Plan Dragón de Jade]
[PISTA DEL TWIST: Conexión entre nazis y Wa-Chin]
```

---

## NIVEL 7: "LA VILLA DEL POGO"
### Villa 31 → Villa Crespo

---

### OBJETIVOS

```
★ ENCONTRAR A POGO
    └── Infiltrar la villa como comprador
    └── Ganarse la confianza de los soldaditos
    └── Llegar hasta Pogo
    └── Descubrir la verdad

○ GANAR BATALLA DE FREESTYLE
    └── Mini-juego de ritmo
    └── Recompensa: Respeto de la villa, acceso al VIP

○ ENCONTRAR AL DEALER ORIGINAL
    └── Hablar con 5 personas
    └── Recompensa: Info sobre la cadena de suministro

🔒 DARÍO REAPARECE
    └── Trigger: Llegar al centro de la villa
    └── Recompensa: Reunión con Darío, revelaciones
```

---

### DIÁLOGOS

#### ENTRADA A LA VILLA

```
[EXT. VILLA 31 - NOCHE]
[César camina por pasillos estrechos. Música de cumbia suena.]

SOLDADITO 1:
"Eh, ¿quién sos vos?"

CÉSAR:
"Vengo a comprar."

SOLDADITO 2:
"¿A comprar qué?"

CÉSAR:
"Lo que vendan."

[Los soldaditos se miran]

SOLDADITO 1:
"Jaja. Me cae bien este. Tiene huevos."
"¿Cuánto traés?"

    [OPCIÓN A] "Suficiente." (Necesitás +1000 créditos)
        SOLDADITO 1: "Mmm. Bueno. Seguime."
        [Entrás sin problemas]

    [OPCIÓN B] "No mucho, pero puedo conseguir más."
        SOLDADITO 2: "Ah, un emprendedor. Jaja."
        "Mirá, acá no fiamos. Volvé cuando tengas."
        [Tenés que buscar otra forma de entrar]

    [OPCIÓN C] "Quiero hablar con Pogo."
        [Los soldaditos sacan armas]
        SOLDADITO 1: "¿Cómo sabés ese nombre, gil?"
        SOLDADITO 2: "Nadie pregunta por Pogo. NADIE."
        [COMBATE]
```

#### REAPARICIÓN DE DARÍO

```
[César camina por la villa. Alguien lo agarra del brazo y lo mete en una casa.]

CÉSAR:
"¿Qué cara...? ¿DARÍO?"

DARÍO:
"¡Shh! ¡Callate!"

[Darío está desalineado, nervioso, ojeroso]

CÉSAR:
"Hijo de puta. Por tu culpa estuve en China."

DARÍO:
"Ya sé, ya sé. Escuchame..."

CÉSAR:
"No, escuchame VOS. Me cagaste la vida."

DARÍO:
"¡¡ESCUCHAME!!"

[Silencio]

DARÍO:
"Yo no sabía. Te juro que no sabía."
"El contacto en China... el que me pasó el dato..."
"Era Xiao. El chino del supermercado."

CÉSAR:
"¿Xiao? ¿El que me ayudó cuando caí?"

DARÍO:
"'Ayudó'. Jaja. César... él te puso ahí."
"Él planeó todo. La caída, la cárcel, tu escape."
"Todo."

CÉSAR:
"¿Y vos cómo sabés?"

DARÍO:
"Porque me lo dijo. Hace una semana."
"Me ofreció guita para entregarte."
"Mucha guita."

CÉSAR:
"...¿Y qué hiciste?"

[Pausa tensa]

DARÍO:
"Estoy acá, ¿no?"
"Por primera vez en mi vida... hice lo correcto."
"Vine a avisarte."

    [OPCIÓN A] "Gracias, Darío."
        DARÍO: "No me agradezcas todavía."
        "Pogo sabe algo. Algo grande."
        "Y Xiao quiere que nadie se entere."

    [OPCIÓN B] "No te creo."
        DARÍO: "No te pido que me creas. Te pido que me escuches."
        "Después de esto, hacé lo que quieras conmigo."
        "Pero primero... encontremos a Pogo."

    [OPCIÓN C] (Le pegás un puñetazo)
        [César le pega. Darío cae.]
        DARÍO: "...Me lo merecía."
        "¿Terminaste? Porque tenemos laburo."

[DARÍO SE UNE COMO ALIADO TEMPORAL]
```

#### ENCUENTRO CON POGO

```
[César y Darío llegan a una habitación en lo profundo de la villa]

[POGO está sentado. Es un flaquito de 19 años. Asustado.]

POGO:
"¿Quiénes son ustedes?"

CÉSAR:
"Soy el que Bignone mandó a buscarte."

[Pogo se para de golpe. Tiembla.]

POGO:
"No... no no no. Yo no hice nada."
"Bueno, hice cosas, pero... no fui yo."

DARÍO:
"¿Cómo que no fuiste vos?"

POGO:
"¡¡MI VIEJO era el Pogo de verdad!!"
"Yo solo heredé el nombre cuando lo mataron."
"Tenía 15 años. ¿Qué iba a hacer? ¿Decir que no?"

CÉSAR:
"¿Quién te da las órdenes?"

POGO:
"Un tipo. Un chino."
"Nunca lo vi en persona. Solo por teléfono."
"Pero tiene guita infinita. Armas. Contactos."
"Yo solo... hago lo que me dice."

CÉSAR:
"¿Cómo se llama?"

POGO:
"Xiao. O Wa-Chin. Le dicen de las dos formas."
"Tiene supermercados por todos lados."
"Pero eso es fachada. Lo que mueve por abajo..."

[Se escuchan sirenas. Gritos afuera.]

SOLDADITO (desde afuera):
"¡¡POGO!! ¡¡CAYÓ LA YUTA!! ¡¡Y HAY CHINOS CON ELLOS!!"

POGO:
"No... ¡¡ME ENCONTRARON!!"

CÉSAR:
"Vamos. Tenemos que salir de acá."

    [OPCIÓN A] "Venís con nosotros, Pogo."
        POGO: "¿Por qué me ayudarías?"
        CÉSAR: "Porque sos un pibe. Y no sos el malo acá."
        [POGO SE UNE TEMPORALMENTE]

    [OPCIÓN B] "Cada uno por su lado."
        POGO: "Pero... pero..."
        CÉSAR: "Suerte, pibe."
        [POGO DESAPARECE - Reaparece más tarde muerto]

[ESCAPE - SECUENCIA DE ACCIÓN]
```

---

## NIVEL 10: "DRAGÓN DE JADE" (FINAL)
### Puerto de Buenos Aires → Barco de Wa-Chin

---

### OBJETIVOS

```
★ DETENER A WA-CHIN
    └── Infiltrar el puerto
    └── Abordar el barco insignia
    └── Desactivar el sistema de control económico
    └── Derrotar a Wa-Chin

○ SALVAR A TODOS LOS REHENES (0/10)
    └── Recompensa: Ending especial

○ ENCONTRAR LAS PRUEBAS
    └── 3 documentos del Plan Dragón de Jade
    └── Recompensa: Diálogos extra en el boss fight
```

---

### DIÁLOGOS

#### CONFRONTACIÓN FINAL

```
[INT. BARCO DE WA-CHIN - SALA DE CONTROL]
[César entra. Wa-Chin está de espaldas, mirando pantallas.]

WA-CHIN:
"César. Por fin."
"Sabía que llegarías hasta acá."
"De hecho... contaba con eso."

[Se da vuelta. Sonríe.]

CÉSAR:
"Confié en vos. En China confié en vos."

WA-CHIN:
"Lo sé. Fue muy fácil."
"Un argentino perdido, desesperado..."
"Un poco de amabilidad y ya estabas en mi bolsillo."

CÉSAR:
"Me usaste."

WA-CHIN:
"Te INVERTÍ. Hay diferencia."
"Y debo decir... el retorno fue excelente."
"Cada paso que diste me benefició."

[Si tenés las pruebas:]

CÉSAR:
"Encontré tus documentos. El Plan Dragón de Jade."
"Controlar los supermercados. Los precios. La economía."
"¿Ese es tu plan? ¿Conquistar Argentina con fideos baratos?"

WA-CHIN:
"Jajaja. ¿Fideos? No, César."
"Los supermercados son solo el comienzo."
"El verdadero plan es más... elegante."

[Aprieta un botón. Las pantallas muestran gráficos económicos.]

WA-CHIN:
"Cuando controlo los precios, controlo la inflación."
"Cuando controlo la inflación, controlo la política."
"Cuando controlo la política... controlo TODO."
"¿Y sabés qué es lo mejor?"
"Los argentinos me van a agradecer."
"Porque por primera vez en décadas..."
"...los precios van a estar estables."

[Si Darío está vivo y con vos:]

DARÍO:
"Estás enfermo, chino de mierda."

WA-CHIN:
"Ah, Darío. Mi empleado menos confiable."
"Debí matarte cuando tuve la chance."

DARÍO:
"Pero no lo hiciste. Y ahora te vas a arrepentir."

[Wa-Chin saca una espada]

WA-CHIN:
"Basta de charla."
"En Shanghai me llamaban 'La Serpiente Silenciosa'."
"Ahora vas a entender por qué."

[BOSS FIGHT FINAL]
```

#### BOSS FIGHT: WA-CHIN

```
[Fase 1 - El Comerciante]

WA-CHIN:
- "¿Cuánto vale tu vida? Yo puedo comprarte."
- "Todo tiene un precio. Hasta vos."
- "¡¡OFERTA ESPECIAL: TU MUERTE!!"
- "Los números nunca mienten, César."

[Fase 2 - El Tríada]

WA-CHIN:
- "En Shanghai me enseñaron a matar antes de caminar."
- "La serpiente no avisa. Solo muerde."
- "¿Creíste que era un comerciante? Jajaja."
- "Mi familia lleva 500 años en este negocio."

[Fase 3 - El Dragón de Jade]

WA-CHIN:
- "¡¡AHORA VAS A CONOCER MI VERDADERO PODER!!"
- "¡¡EL DRAGÓN DESPIERTA!!"
- "¡¡ARGENTINA SERÁ EL PRIMER TERRITORIO DEL NUEVO IMPERIO!!"
- "¡¡LA PACIENCIA TODO LO CONSIGUE... Y MI PACIENCIA SE ACABÓ!!"

[Si lo derrotás sin items - Fase 4 Secreta]

WA-CHIN (herido, arrastrándose):
- "Je... jejeje..."
- "¿Creés que ganaste?"
- "Hay algo que no sabés, César."
- "El chip... el chip que controla todo..."
- "...está en VOS."
- "Lo tragaste en China. Sin saberlo."
- "Todo este tiempo... fuiste mi mula."
- "Mi caballo de Troya."
- "Matame si querés..."
- "...pero el plan ya está completo."

[REVELATION CRÍTICA]
```

---

## ENDING A: "ESTOS NO APRENDEN MÁS"

```
[EXT. PUERTO - AMANECER]
[César sale del barco destruido. Policías, periodistas, caos.]

PERIODISTA:
"¡¡Señor!! ¡¡Señor!! ¿Qué pasó ahí adentro?"

[César lo ignora. Camina.]

[MONTAJE - MESES DESPUÉS]

[Noticiero:]
"...el escándalo de corrupción más grande de la historia..."
"...el presidente Bignone intentó escapar en helicóptero..."

[El helicóptero despegando de Casa Rosada]

BIGNONE (dentro del helicóptero):
"¡¡JA!! ¡¡NO ME VAN A AGARRAR!!"

PILOTO:
"Señor... ¿cuándo fue el último service de esta cosa?"

BIGNONE:
"¿Service? ¿Para qué? Si casi no la uso."

[El helicóptero empieza a temblar. Piezas caen.]

BIGNONE:
"¿¿QUÉ CARAJO??"

[La hélice se despega. El helicóptero cae en espiral.]

BIGNONE:
"¡¡NOOOOOO...!!"

[EXPLOSIÓN contra el Obelisco]

[Noticiero:]
"...en noticias más positivas, las elecciones históricas..."
"...por primera vez en la historia, un candidato no humano..."
"...con el 89% de los votos, el nuevo presidente es..."

[Imagen de RAMBO, un Golden Retriever, sentado en el sillón de Rivadavia]

"...RAMBO."

[RAMBO ladra a cámara. La gente aplaude.]

---

[INT. DEPARTAMENTO HUMILDE - NOCHE]
[César y Darío sentados en un sillón. Mirando la tele.]

[En la pantalla: RAMBO en conferencia de prensa. Ladra.
Un traductor dice: "El presidente dice que vetará la ley."]

DARÍO:
"Mirá vos... un perro presidente."

CÉSAR:
"Y gobierna mejor que todos los otros."

[Silencio. Miran la tele.]

TV:
"...encuestas muestran 95% de aprobación..."
"...la economía crece por tercer trimestre consecutivo..."
"...los precios se mantienen estables..."

DARÍO:
"Che, César..."

CÉSAR:
"¿Qué?"

DARÍO:
"¿Vos creés que algún día vamos a aprender?"
"Digo... como país."

[César lo piensa]

CÉSAR:
"No sé, Darío. No sé."

[Pausa]

DARÍO:
"Estos no aprenden más, ¿no?"

[César mira a cámara. Sonríe. Saca un revólver de abajo del almohadón.]

CÉSAR:
"No. No aprenden."

[Apunta a cámara]

PUM.

[CORTE A NEGRO]

---

[CRÉDITOS con cumbia villera]

[Post-créditos: Ver GUION_RETRUCO.md - Escena de Mei-Ling]
```

---

## BARKS Y FRASES ALEATORIAS

### César (Exploración)
- "¿Dónde carajo estoy?"
- "Esto se pone cada vez peor."
- "Necesito un fernet."
- "Extraño mi casa."
- "La concha de la lora..."
- "Darío, si me estás escuchando... te odio."

### César (Combate)
- "¡Vení, dale!"
- "¿Eso es todo?"
- "¡Tomá!"
- "Más duro pegaba mi vieja."
- "¡Soy de Flores, hijo de puta!"

### César (Daño recibido)
- "¡Ahh!"
- "¡La puta madre!"
- "Eso dolió."
- "¡Casi!"

### César (Muerte)
- "No... así no..."
- "Mamá..."
- "Al final... era esto..."

### Enemigos Genéricos

**Soldaditos (Villa):**
- "¡¡EH GIL!!"
- "¡¡TE VOY A HACER MIERDA!!"
- "¿Quién te conoce?"

**Mapufloggers:**
- "¡¡HUINCA DE MIERDA!!"
- "¡¡LA TIERRA ES NUESTRA!!"
- "¡¡AGUANTE EL GLITTER!!"

**Clones de Hilton:**
- "Jawohl!"
- "Für das Vaterland!"
- "Sieg... digo... ¡VICTORIA!"

**Esbirros de Wa-Chin:**
- "老板会奖励我的!" (¡El jefe me recompensará!)
- "¡Por el Dragón de Jade!"
- "¡Precio especial: tu muerte!"

---

## UI Y MENSAJES DEL SISTEMA

### Pantalla de Guardado
```
GUARDANDO...
"La vida es como el truco: nunca sabés qué carta te toca."
```

### Pantalla de Carga
```
CARGANDO...
[Tips aleatorios:]
- "El fernet cura todo. Menos la resaca de fernet."
- "Nunca confíes en nadie que diga 'quedate tranqui'."
- "En Argentina, la inflación es un estilo de vida."
- "Los supermercados chinos nunca cierran. NUNCA."
- "Si perdés al truco, perdés el respeto."
```

### Game Over
```
MORISTE

"En el pabellón, los muertos no descansan.
Vuelven. Siempre vuelven."

[REINTENTAR] [CARGAR PARTIDA]
```

### Subida de Nivel
```
¡¡NIVEL [X]!!
"Ahora sí, estás más curtido."

+[X] HP
+[X] ATK
[Nueva habilidad desbloqueada]
```

---

## DECISIONES DEL JUGADOR

### Decisión 1: Pogo
| Decisión | Consecuencia Inmediata | Consecuencia Final |
|----------|------------------------|-------------------|
| Salvar a Pogo | Te ayuda a escapar, info extra | Aparece en el ending, te agradece |
| Dejarlo | Más fácil escapar | Aparece muerto en noticiero |

### Decisión 2: Darío
| Decisión | Consecuencia Inmediata | Consecuencia Final |
|----------|------------------------|-------------------|
| Perdonarlo | Se une como aliado | Ending A con él en el sillón |
| Rechazarlo | Pelea solo | Se sacrifica igual (Ending B) |
| Ignorarlo | No aparece más | Ending vacío |

### Decisión 3: Trekkers Israelíes
| Decisión | Consecuencia Inmediata | Consecuencia Final |
|----------|------------------------|-------------------|
| Ayudarlos | Te ayudan con Hilton | Easter egg: aparecen en créditos |
| Ignorarlos | Enfrentás a Hilton solo | Nada |

### Decisión 4: Rodolfo Hilton
| Decisión | Consecuencia Inmediata | Consecuencia Final |
|----------|------------------------|-------------------|
| Matarlo | Carpeta con pistas | Historia completa |
| Dejarlo escapar | Escapa | Aparece en post-créditos con Mei-Ling |

---

*Documento creado: Abril 2026*
*Versión: 1.0*

**ReTruco** © 2026 Underground. Todos los derechos reservados.
