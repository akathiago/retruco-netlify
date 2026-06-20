# RETRUCO - GUIÓN COMPLETO DEL VIDEOJUEGO
## Documento de Diseño Narrativo y Técnico

> "Una historia bien criolla. Acción, sátira, barrio, política y delirio en formato videojuego."

---

## ÍNDICE

1. [Sinopsis General](#sinopsis-general)
2. [Personajes Principales](#personajes-principales)
3. [Los 10 Niveles](#los-10-niveles)
4. [Arco Narrativo por Actos](#arco-narrativo-por-actos)
5. [Bossfights - Diseño Técnico](#bossfights---diseño-técnico)
6. [Objetos y Power-ups](#objetos-y-power-ups)
7. [Facciones y Worldbuilding](#facciones-y-worldbuilding)
8. [Diálogos Memorables](#diálogos-memorables)
9. [Referencias Culturales](#referencias-culturales)
10. [Especificaciones Técnicas](#especificaciones-técnicas)
11. [Bosses Alternativos (DLC/Updates)](#bosses-alternativos)
12. [Vocabulario Argentino Carcelario](#vocabulario-argentino)
13. [Misterios y Secretos](#misterios-y-secretos)
14. [Pistas del Plot Twist](#pistas-del-plot-twist)

---

## SINOPSIS GENERAL

**ReTruco** es una aventura satírica ambientada en una versión delirante de Argentina. El juego mezcla mecánicas de **Run & Gun**, **Beat 'Em Up** y **RPG** con el espíritu artístico de South Park.

### La Premisa

**César**, un pibe común de Buenos Aires, viaja a China buscando oportunidades. Pero cae preso en circunstancias misteriosas que involucran a su supuesto amigo **Xiao** (alias **Wa-Chin**).

Tras escapar de la cárcel china, César emprende un viaje épico: **China → Chile → Patagonia → Buenos Aires**.

Al llegar a Argentina, el ejército lo captura. El presidente **Bignone** (un viejo exaltado claramente no apto para el cargo) le ofrece un trato: libertad a cambio de desarticular una banda narco liderada por el misterioso **"Pogo"**.

### El Plot Twist

Lo que César descubre es mucho más grande: **Wa-Chin no es solo un comerciante chino inocente**. Detrás de su red de supermercados se esconde el **"Plan Dragón de Jade"**, un esquema para conquistar Argentina económica y políticamente. Wa-Chin es el verdadero enemigo.

---

## PERSONAJES PRINCIPALES

### CÉSAR - El Protagonista
**Rol:** El pibe metido en quilombo

**Biografía completa:**
César Aguirre, 24 años, de Flores. Laburaba en un call center, se rescataba, trataba de zafar como podía. Vivía con su vieja y soñaba con pegar un laburo afuera. Cuando le llegó la "oportunidad" de viajar a China por negocios (cortesía de Darío), no lo dudó.

Lo que no sabía es que lo estaban usando como mula sin saberlo. Cayó en cana en Shanghai acusado de tráfico. Pasó 2 años en una cárcel china donde aprendió a sobrevivir, a desconfiar, y a jugar al truco (que le enseñó un argentino preso, Abraham).

**Motivación:** Volver a casa, limpiar su nombre, y entender qué carajo pasó.

**Arco:** De pibe ingenuo a tipo curtido que entiende que en Argentina la corrupción tiene mil capas.

**Frases características:**
- "¿Por qué siempre me pasan estas cosas a mí?"
- "Mirá, yo solo quiero volver a mi casa y comerme un choripán en paz."
- "Confié en vos, la concha de tu madre."

---

### DARÍO - El Cerebro
**Rol:** El amigo que siempre la caga

**Biografía completa:**
Darío Mendoza, 26 años, de Caballito. Se cree el más vivo del barrio. Estudió dos años de administración antes de darse cuenta que "el sistema no era para él". Desde entonces vive de rebusques, contactos turbios, y planes que siempre parecen geniales hasta que explotan.

Fue él quien le consiguió a César el "laburo" en China. Él quien tiene los contactos con tipos turbios. Y él quien, sin querer (o queriendo, nunca se sabe), mete a César en cada quilombo.

**Motivación:** Hacer guita fácil y quedar como un capo.

**Arco:** Pasa de ser comic relief a tener que enfrentar las consecuencias de sus cagadas.

**El 90% de los quilombos:** Es literal. Cada vez que César está por zafar, aparece Darío con un "plan genial" que complica todo.

**Frases características:**
- "Quedate tranqui que esto lo tengo recontra controlado."
- "¿Viste? Te dije que iba a salir bien... bueno, más o menos."
- "No es mi culpa, ¿eh? Yo no sabía que iban a..."
- "Tengo un contacto que nos puede ayudar." (Siempre termina mal)

---

### XIAO / WA-CHIN - El Villano Secreto
**Rol:** El "amigo" que resulta ser el enemigo final

**Biografía completa:**
Xiao Chen, 35 años, llegó a Argentina hace 15 años "sin nada". Hoy es dueño de una red de 47 supermercados, bazares y restaurantes chinos en todo el país. Para todos, es un inmigrante exitoso. La realidad es otra.

Xiao es el líder de la **Tríada del Pacífico Sur**, una organización criminal que usa los supermercados como fachada para lavado de dinero, tráfico de productos ilegales, y un plan mayor: el **"Plan Dragón de Jade"** para controlar la economía argentina.

César lo conoció en China, donde Xiao fingió ayudarlo. En realidad, fue Xiao quien lo usó como mula y lo entregó a las autoridades cuando dejó de serle útil.

**El Plan Dragón de Jade:**
- Fase 1: Establecer red de supermercados (✓ Completado)
- Fase 2: Controlar cadena de distribución de alimentos
- Fase 3: Infiltrar sistema político (a través de sobornos)
- Fase 4: Control económico total
- Fase 5: "Fusión cultural" (eufemismo para dominación)

**Motivación:** Venganza por humillaciones sufridas, ambición de poder, y un nacionalismo extremo distorsionado.

**Frases características:**
- "..." (El silencio es su arma)
- "En Shanghai aprendí una cosa: la paciencia todo lo consigue."
- "¿Amigo? Yo no tengo amigos. Tengo inversiones."
- "Argentina es tierra fértil. Solo hay que... sembrar bien."

---

### BIGNONE - El Presidente
**Rol:** El viejo exaltado que gobierna el país

**Biografía completa:**
General (R) Benito Bignone, 78 años. Nadie sabe bien cómo llegó a presidente. Él menos. Está claramente senil, pero tiene momentos de lucidez aterradora. Gobierna desde la Casa Rosada rodeado de militares igual de locos.

Cree que "Pogo" (un narcotraficante menor) es la mayor amenaza para Argentina. No tiene idea de que Wa-Chin existe, o que la verdadera amenaza viene de otro lado.

**Motivación:** "Restaurar el orden" (según su visión distorsionada de lo que eso significa).

**Su Final (Sátira a De la Rúa):**
Cuando estalla la crisis y se revela que Xiao controlaba todo, Bignone intenta escapar en helicóptero desde la Casa Rosada. Pero el helicóptero, que no tenía mantenimiento hace décadas ("¿Para qué? Si total casi no lo uso"), empieza a desarmarse en el aire. Piezas caen, tornillos salen volando, la hélice se despega. El helicóptero choca contra el Obelisco (o algo igual de boludo) y explota en una bola de fuego.

**Frases características:**
- "¡¡EN MIS TIEMPOS ESTO NO PASABA!!"
- "¿Pogo? ¿POGO? ¡¡ESE COMUNISTA HIJO DE PUTA!!"
- "Vos, pibe... ¿cómo te llamabas? Da igual. Hacé lo que te digo."
- "¡¡VIVA LA PATRIA, CARAJO!!"
- (Antes de subir al helicóptero) "¡Me voy pero vuelvo! ¡¡ESTO NO TERMINA ACÁ!!"
- (Mientras el helicóptero se desarma) "¿¿QUÉ CARAJO?? ¡¡CUÁNDO FUE EL ÚLTIMO SERVICE DE ESTA PORQUERÍA!!"

---

### RAMBO - El Presidente (Post-Crisis)
**Rol:** El nuevo presidente de Argentina

**Descripción:**
Un Golden Retriever que fue elegido presidente después de la crisis. Es una sátira al perro CONAN y a la idea de que "cualquiera gobernaría mejor". Sorprendentemente, bajo su mandato el país mejora.

**Nota:** RAMBO es literalmente un perro. Ladra en las conferencias de prensa. Muerde a los diputados corruptos. La gente lo ama.

**Frases características:**
- "Guau."
- "Guau guau."
- (El traductor oficial): "El presidente dice que vetará la ley de aumento de impuestos."

---

## LOS 10 NIVELES

### NIVEL 1: "BIENVENIDO AL INFIERNO AMARILLO"
**Ubicación:** Cárcel de Shanghai, China

**Descripción:**
Cárcel de máxima seguridad china. Pasillos grises, celdas hacinadas, guardias brutales. El nivel tutorial donde César aprende las mecánicas básicas mientras intenta sobrevivir el día a día carcelario.

**Objetivos:**
1. Sobrevivir la rutina diaria (tutorial de combate)
2. Conseguir elementos para el escape (sigilo)
3. Derrotar al jefe del pabellón
4. Escapar por las cloacas

**BOSS: RICARDO FORT (En un sueño)**
César, exhausto, se duerme y tiene un sueño/pesadilla donde aparece Ricardo Fort como guardián de sus miedos. Es una batalla onírica y absurda.

- **Fase 1:** Fort ataca con fajos de dólares que explotan
- **Fase 2:** Invoca "los pibes" (ejército de fans zombies)
- **Fase 3:** Se transforma en "COMANDANTE FORT" con armadura dorada

**Frases del boss:**
- "¿Quién te conoce, papá?"
- "¡EL COMANDANTE NUNCA MUERE!"
- "¿Vos sabés quién soy yo? ¡SOY RICARDO FORT!"

**Mecánica especial:** Sueño lúcido - podés modificar partes del escenario.

**Referencias:** Ricardo Fort, cultura carcelaria, comida china, "fasos" como moneda.

---

### NIVEL 2: "ESCAPE DE ORIENTE"
**Ubicación:** Puerto de Shanghai → Barco carguero

**Descripción:**
César escapa de la cárcel y debe llegar al puerto para subirse a un barco que va a Sudamérica. Nivel de persecución y sigilo por las calles nocturnas de Shanghai.

**Objetivos:**
1. Llegar al puerto sin ser detectado
2. Sobornar/derrotar a los guardias del muelle
3. Esconderse en el container correcto
4. Sobrevivir el viaje en el barco

**BOSS: EL CAPITÁN WONG**
Capitán del barco que descubre a César como polizón. Ex-pirata reconvertido en comerciante "legal".

- **Fase 1:** Pelea en la cubierta del barco (el barco se mueve)
- **Fase 2:** El capitán usa un ancla como arma giratoria
- **Fase 3:** Pelea en la bodega entre containers

**Frases del boss:**
- "¡Polizón! ¡A los tiburones!"
- "En mis 40 años de mar, vi de todo. Pero un argentino escapando... eso es nuevo."

**Mecánica especial:** El barco se balancea, afectando la gravedad y el movimiento.

**Referencias:** Comercio internacional turbio, containers, vida en el mar.

---

### NIVEL 3: "CHILITO QUERIDO"
**Ubicación:** Valparaíso, Chile

**Descripción:**
El barco llega a Chile. César debe cruzar el país para llegar a Argentina, pero los chilenos no se lo van a hacer fácil. Nivel que parodia la rivalidad Argentina-Chile.

**Objetivos:**
1. Conseguir documentos falsos
2. Evitar a la policía chilena
3. Cruzar la ciudad hasta la terminal de buses
4. Sobrevivir el clásico asado chileno vs argentino

**BOSS: EL GRAN HUASO PINOCHET JR.**
Parodia de nacionalista chileno extremo. Monta un cóndor mecánico gigante.

- **Fase 1:** Te ataca desde el aire con el cóndor
- **Fase 2:** Baja y pelea con espuelas de rodeo gigantes
- **Fase 3:** El cóndor y él se fusionan en "MEGA-HUASO"

**Frases del boss:**
- "¡Argentino culiado! ¡Devuelvan las Malvinas... digo, la Patagonia!"
- "¡En Chile la hacemos mejor, weón!"
- "¿Messi? ¡ALEXIS SÁNCHEZ, PO!"

**Mecánica especial:** Terreno montañoso con desniveles que afectan el combate.

**Referencias:** Rivalidad Chile-Argentina, acento chileno, pisco vs fernet, empanadas.

---

### NIVEL 4: "LA PATAGONIA SALVAJE"
**Ubicación:** Patagonia Argentina (Bariloche → El Calafate → El Bolsón → Villa la Angostura)

**Descripción:**
César cruza los Andes y llega a la Patagonia. Paisajes impresionantes pero peligrosos. Debe atravesar bosques, lagos helados, y enfrentar la fauna local... los mapuches floggers de la R.A.M., grupos de sionistas haciendo trekking, y un misterioso anciano alemán que vive escondido en la montaña.

**Contexto satírico:**
La Patagonia es un quilombo de facciones:
- **Mapufloggers:** Ex-floggers que "descubrieron sus raíces" cuando cerró Fotolog. Liderados por Facuncho Jones Huala. (Sátira a Jones Huala)
- **Sionistas Trekkers:** Grupos de israelíes post-servicio militar que hacen trekking. Muy fit, muy bronceados, mochilas de 80 litros. Están en todos los hostels. No son enemigos pero tampoco ayudan.
- **La Colonia Alemana:** Descendientes de alemanes que llegaron "después de la guerra". No preguntes de qué guerra. Rodolfo Hilton es su líder secreto.

**Objetivos:**
1. Sobrevivir el cruce de los Andes
2. Conseguir transporte en Bariloche (evitando a los trekkers israelíes que coparon todos los hostels)
3. Infiltrar la comunidad mapuflogger
4. Descubrir el bunker secreto de Rodolfo Hilton
5. Llegar al Glaciar Perito Moreno para el encuentro

**MINI-BOSS: FACUNCHO JONES HUALA - "El Lonko Flogger"**
Líder de la R.A.M. (Resistencia Ancestral Mapuflogger). Ex-flogger del Abasto que "encontró su verdadera identidad" cuando cerró Fotolog. Pelo largo negro con reflejos de colores, vincha mapuche con glitter, poncho de colores fosforescentes, boleadoras con luces LED.

- **Fase 1:** Te ataca con guerreros mapufloggers que bailan electro mientras tiran piedras
- **Fase 2:** Activa el "MODO FOTOLOG ANCESTRAL" - invoca el espíritu de Cumbio fusionado con un ñire sagrado

**Frases de Facuncho:**
- "¡¡LA TIERRA ES DE LOS PUEBLOS ORIGINARIOS, HUINCA CARETA!!"
- "Antes juntaba firmas en Fotolog... ahora junto TIERRAS."
- "Mi abuelo era lonko. Mi yo del 2008 era flogger. HOY SOY AMBOS."
- "El glitter es sagrado para mi pueblo."

---

**BOSS PRINCIPAL: RODOLFO HILTON - "El Abuelo de la Montaña"**
Un anciano alemán de 130 años que vive en un bunker secreto en Villa la Angostura. Llegó a Argentina "en el '45, por turismo". Bigotito recortado, pelo peinado al costado, acento alemán muy fuerte. Tiene un ejército de clones jóvenes de sí mismo.

**(Sátira a las teorías conspirativas de que Hitler escapó a la Patagonia)**

- **Fase 1:** Ataca desde su silla de ruedas motorizada con ametralladoras. Invoca "nietos" (clones rubios en lederhosen)
- **Fase 2:** Se inyecta suero experimental y rejuvenece. Pelea con bastón-espada
- **Fase 3:** Activa el "ÚLTIMO RECURSO" - un mecha con forma de águila que estaba escondido en el glaciar desde 1945

**Frases de Rodolfo:**
- "Ah, ein argentino... ustedes siempre tan... hospitalarios."
- "¿Hitler? No, no... yo soy HILTON. Como el hotel. Ninguna relación."
- "Llegué en el '45. ¿La guerra? ¿Cuál guerra? Yo hacía turismo."
- "¡¡NEIN NEIN NEIN!! Perdón... quise decir... ¡NO NO NO!"
- "Mi plan de retiro fue... interrumpido. Pero ahora... AHORA ES EL MOMENTO."
- (Al morir) "Mein... digo... mi chocolate barilochense..."

**NPCs: LOS TREKKERS ISRAELÍES**
Grupos de 6-8 israelíes post-servicio militar. Están en TODOS lados. No son enemigos pero:
- Copan todos los hostels
- Hacen ruido a las 6am
- Te invitan a Shabat si sos amable
- Si mencionás a Rodolfo Hilton se ponen MUY serios y te ayudan a encontrarlo

**Frases de los trekkers:**
- "Achi, you want to come trekking? Is beautiful, the Patagonia."
- "The hostel is full. We are twenty. Sorry, achi."
- (Si mencionás a Hilton) "...What did you say? Where is this man?"

**Mecánica especial:**
- Clima extremo - la nieve reduce visibilidad
- Los trekkers pueden ser aliados si descubrís el bunker
- Algunos ataques de Facuncho se esquivan con poses de flogger (easter egg)

**Referencias:** Patagonia, chocolate barilochense, glaciares, Jones Huala, RAM, Fotolog, teorías conspirativas de nazis en Argentina, turismo israelí post-ejército, Villa la Angostura, Erich Priebke, Bariloche alemán.

---

### NIVEL 5: "RUTA 40 - ROAD TO HELL"
**Ubicación:** Ruta 40 (de sur a norte)

**Descripción:**
César consigue un auto destartalado y debe recorrer la Ruta 40 hasta Buenos Aires. Nivel de persecución/carreras con elementos de Mad Max argento.

**Objetivos:**
1. Sobrevivir los bandidos de la ruta
2. Conseguir nafta en estaciones abandonadas
3. Escapar de la policía provincial
4. Ganar la carrera clandestina para conseguir plata

**BOSS: EL GAUCHO MOTOQUERO**
Ex camionero convertido en señor de la guerra de la ruta. Maneja un camión modificado con cuernos de vaca gigantes.

- **Fase 1:** Persecución en la ruta (shooter desde el auto)
- **Fase 2:** El camión larga trampas y esbirros en motos
- **Fase 3:** Pelea mano a mano cuando chocan ambos vehículos

**Frases del boss:**
- "¡En la ruta mando yo, gringo de mierda!"
- "¿Viste? Acá no hay ACA que te salve."
- "¡CAMIONEROOOOO SOY, CAMIONEROOOOO!"

**Mecánica especial:** Combate vehicular, recursos limitados de nafta.

**Referencias:** Ruta 40, cultura camionera, ACA, estaciones de servicio YPF, paisaje pampeano.

---

### NIVEL 6: "BUENOS AIRES, TE EXTRAÑÉ"
**Ubicación:** Conurbano bonaerense → Entrada a Capital

**Descripción:**
César llega al conurbano pero es capturado por el ejército. Lo llevan ante Bignone, quien le propone el trato: libertad a cambio de capturar a "Pogo".

**Objetivos:**
1. [Cutscene] Captura por el ejército
2. [Cutscene] Reunión con Bignone
3. Escapar de los militares (no aceptás el trato inicialmente)
4. Sobrevivir en el conurbano hasta que te convencen

**BOSS: GENERAL MILICO-MAN**
Militar loco que quiere matarte aunque Bignone te necesita vivo. Usa un exoesqueleto de combate pintado de celeste y blanco.

- **Fase 1:** Te ataca con armamento pesado
- **Fase 2:** Llama refuerzos de soldados
- **Fase 3:** Activa "MODO PATRIA" y se vuelve invulnerable temporalmente

**Frases del boss:**
- "¡ORDEN Y DISCIPLINA!"
- "¡Los subversivos como vos destruyeron este país!"
- "¡POR LA PATRIA, MUERO!"

**Mecánica especial:** Cobertura obligatoria - el boss tiene demasiado poder de fuego.

**Referencias:** Militares, conurbano, La Matanza, colectivos, planes sociales.

---

### NIVEL 7: "LA VILLA DEL POGO"
**Ubicación:** Villa 31 → Villa Crespo

**Descripción:**
César acepta el trato de Bignone (no tiene opción) y debe infiltrar el territorio de Pogo. Pero las cosas no son lo que parecen. Darío reaparece para "ayudar".

**Objetivos:**
1. Infiltrar la villa como comprador
2. Ganarse la confianza de los soldaditos
3. Llegar hasta Pogo
4. Descubrir que Pogo es solo un perejil

**BOSS: POGO "EL TERRIBLE"**
Resulta ser un wachin de 19 años que heredó el apodo de su viejo. Es más víctima que victimario. Después de derrotarlo, revela información crucial: trabaja para un chino.

- **Fase 1:** Pelea contra sus soldaditos (él no pelea)
- **Fase 2:** Pogo intenta escapar (persecución)
- **Fase 3:** [OPCIONAL] Podés perdonarlo o entregarlo

**La Revelación:**
Después del combate, Pogo confiesa que él es solo un títere. Un "chino con mucha guita" financia todo: la droga, las armas, todo. Ese chino es **Xiao** (Wa-Chin), y Pogo le tiene más miedo a él que a Bignone.

**Frases del boss:**
- "¡Yo no quería esto, hermano! ¡Me obligaron!"
- "Mi viejo era el Pogo de verdad... yo solo heredé el quilombo."
- "Si me entregás, me matan. Si me dejás ir... capaz también."
- (Post-pelea) "Escuchame... hay un chino. Un chino que maneja TODO. Xiao le dicen. Ese tipo... ese tipo es el verdadero jefe."

**Mecánica especial:** Decisión moral que afecta el final.

**Referencias:** Villas, narcos, pibes chorros, trap argentino, Duki/L-Gante parodiados.

---

### NIVEL 8: "EL SUPERMERCADO DE LA MUERTE"
**Ubicación:** Supermercado chino de Wa-Chin, Belgrano

**Descripción:**
Siguiendo pistas, César descubre que Pogo recibía órdenes de... un supermercado chino. Infiltra el local y descubre el "Plan Dragón de Jade".

**Objetivos:**
1. Entrar al supermercado sin levantar sospechas
2. Encontrar la entrada al sótano secreto
3. Descubrir los planos del Plan Dragón de Jade
4. Escapar antes de que te atrapen

**BOSS: HERMANOS CHEN (Twin Fight)**
Dos matones gemelos de Wa-Chin. Uno usa cuchillas de carnicero, otro usa un wok gigante.

- **Fase 1:** Pelean juntos, se coordinan
- **Fase 2:** Si derrotás a uno, el otro se enoja y se hace más fuerte
- **Fase 3:** El sobreviviente invoca a empleados como zombies

**Frases del boss:**
- "¡Volvé mañana, cerrado!"
- "¿Buscás oferta? Te damos 2x1 en golpes."
- "Jefe Wa-Chin va a estar muy decepcionado..."

**Mecánica especial:** Usar el entorno del supermercado (latas, carritos, etc.) como armas.

**Referencias:** Supermercados chinos, productos truchos, "todo por 2 pesos".

---

### NIVEL 9: "LA ROSADA SANGRIENTA"
**Ubicación:** Casa Rosada, Buenos Aires

**Descripción:**
César intenta advertir a Bignone sobre el verdadero enemigo, pero descubre que Wa-Chin ya tiene infiltrado al gobierno. Debe escapar de una Casa Rosada tomada.

**Objetivos:**
1. Entrar a la Casa Rosada
2. Descubrir que Bignone fue "reemplazado" por un clon/doble
3. Rescatar al Bignone real
4. Escapar por los túneles secretos

**BOSS: BIGNONE-TRON (El Clon Robot)**
Un robot/clon de Bignone creado por Wa-Chin para controlar el gobierno.

- **Fase 1:** Actúa como Bignone normal, ataca con decretos explosivos
- **Fase 2:** Se revela como robot, saca armas del cuerpo
- **Fase 3:** "MODO DICTADOR SUPREMO" - se agranda y destruye el entorno

**Frases del boss:**
- "¡¡EN MIS TIEMPOS...!! Error de sistema. Recalibrando."
- "DEMOCRACIA: CONCEPTO NO ENCONTRADO"
- "ORDEN. DISCIPLINA. MUERTE."

**Mecánica especial:** El verdadero Bignone te da consejos (a veces útiles, a veces dementes).

**Referencias:** Casa Rosada, historia argentina, política, peronismo vs antiperonismo.

---

### NIVEL 10: "DRAGÓN DE JADE" (FINAL)
**Ubicación:** Puerto de Buenos Aires → Barco de Wa-Chin → Fortaleza flotante

**Descripción:**
César, con ayuda del Bignone real y Darío (redimido), debe detener a Wa-Chin antes de que active la fase final de su plan.

**Objetivos:**
1. Infiltrar el puerto
2. Abordar el barco insignia de Wa-Chin
3. Desactivar el "arma económica" (un sistema que controla todos los precios)
4. Enfrentar a Wa-Chin en combate final

**BOSS FINAL: WA-CHIN / XIAO SUPREME**
Wa-Chin revela su verdadera forma: un maestro de artes marciales con armadura de dragón tecnológica.

**Fase 1 - El Comerciante:**
Wa-Chin usa tácticas de negocios como ataques. Lanza productos, usa el dinero como proyectil.
- "¿Cuánto vale tu vida? Yo puedo comprarte."

**Fase 2 - El Tríada:**
Se quita el disfraz de comerciante. Pelea con espadas y habilidades de kung-fu.
- "En Shanghai me llamaban 'La Serpiente Silenciosa'. Ahora entendés por qué."

**Fase 3 - El Dragón de Jade:**
Activa su armadura completa. Se vuelve un mecha de dragón.
- "¡ARGENTINA SERÁ EL PRIMER TERRITORIO DEL NUEVO IMPERIO!"
- "¡LA PACIENCIA TODO LO CONSIGUE... Y MI PACIENCIA SE ACABÓ!"

**Fase 4 (Secreta) - La Verdad:**
Si le ganás sin usar items, Wa-Chin revela que César también fue parte del plan sin saberlo. Ending secreto.

**Mecánica especial:** Quick Time Events + combate tradicional.

---

## ARCO NARRATIVO POR ACTOS

### ACTO 1: ESCAPE (Niveles 1-3)
**Tema:** Supervivencia y descubrimiento

César pasa de ser víctima a luchador. Escapa de China, cruza Chile, sin entender todavía quién lo traicionó ni por qué. La esperanza de volver a casa lo mantiene en pie.

**Pistas del twist que se plantan:**
- En la cárcel, un guardia menciona que "el señor Chen" pagó para que César "estuviera cómodo"
- En el barco, el capitán dice que el cargamento es "para los supermercados de Sudamérica"
- En Chile, ves publicidad de "Supermercados Wa-Chin: Los más baratos del cono sur"

---

### ACTO 2: MISIÓN (Niveles 4-7)
**Tema:** Descubrimiento y complicación

César es forzado a trabajar para Bignone. Investiga a Pogo pero descubre que es solo un peón. Las piezas empiezan a encajar cuando Darío menciona que "un chino" financiaba a Pogo.

**Desarrollo de personajes:**
- César: Se vuelve más desconfiado, más duro
- Darío: Empieza a sentir culpa por el quilombo en China
- Bignone: Momentos de lucidez que revelan que no es tan idiota

**Pistas del twist:**
- Pogo menciona que su "proveedor" tiene "ojos rasgados"
- Encontrás productos de Wa-Chin en todos lados
- Darío admite que el "contacto en China" era... Xiao

---

### ACTO 3: VERDAD (Niveles 8-10)
**Tema:** Confrontación y resolución

**Flujo narrativo:**
1. César escapa de China (Niveles 1-2)
2. Arco de Bignone - lo captura, le da la misión (Niveles 5-6)
3. Llega a Pogo, que resulta ser un wachin que revela que trabaja para "un chino" (Nivel 7)
4. César se infiltra y descubre que ese chino es Xiao, alto mafioso (Nivel 8)
5. Estalla la crisis - todo el país en caos
6. Bignone intenta escapar en helicóptero, se desarma por falta de mantenimiento, explota (sátira a De la Rúa)
7. Bossfight final contra Xiao (Nivel 10)
8. Epílogo: RAMBO (un perro) es elegido presidente. César y Darío miran la tele. "Estos no aprenden más." César dispara a cámara. Créditos.

**Clímax emocional:**
- Darío se sacrifica para salvar a César (redención) [Ending B]
- Bignone, en su locura, es el único que ve la verdad claramente... y muere de forma patética
- César confronta a Wa-Chin: "Confié en vos. En CHINA confié en vos."

**Giro dramático final:**
Wa-Chin revela que César, sin saberlo, transportó el chip que controla el sistema económico. César fue la pieza clave del plan todo el tiempo.

---

## BOSSFIGHTS - DISEÑO TÉCNICO

### Sistema de Fases
Todos los bosses tienen mínimo 2 fases:
- **Fase 1:** Patrón predecible, aprender mecánicas
- **Fase 2:** Aumenta dificultad, agrega ataques
- **Fase 3 (bosses mayores):** Mecánica especial, momento espectacular

### Tabla de Bosses

| Nivel | Boss | Dificultad | Fases | Tiempo estimado |
|-------|------|------------|-------|-----------------|
| 1 | Ricardo Fort | 2/10 | 3 | 3-5 min |
| 2 | Capitán Wong | 3/10 | 3 | 4-6 min |
| 3 | Gran Huaso | 4/10 | 3 | 5-7 min |
| 4 | Facuncho Jones Huala (mini) + Rodolfo Hilton | 6/10 | 2+3 | 10-12 min |
| 5 | Gaucho Motoquero | 5/10 | 3 | 7-9 min |
| 6 | General Milico-Man | 6/10 | 3 | 6-8 min |
| 7 | Pogo | 3/10 | 2 | 3-5 min |
| 8 | Hermanos Chen | 7/10 | 3 | 8-10 min |
| 9 | Bignone-Tron | 8/10 | 3 | 8-10 min |
| 10 | Wa-Chin | 10/10 | 4 | 12-15 min |

---

## OBJETOS Y POWER-UPS

### Objetos de la Cárcel/Pabellón
| Objeto | Efecto | Referencia |
|--------|--------|------------|
| **Faso** | Restaura salud lentamente | La verde |
| **Fernet** | Daño x2 por 30 seg (riesgo: visión borrosa) | Cultura cordobesa |
| **Don Satur** | Restaura 25% vida | Galletitas |
| **Encendedor BIC** | Ataque de fuego | Ítem clásico |
| **Uzi** | Arma temporal | El fierro judío |
| **Mandarinas** | Restaura 10% vida | La fruta robada |
| **Sapphirus** | Bomba de humo | El perfume |

### Power-ups Especiales
| Power-up | Efecto | Ubicación |
|----------|--------|-----------|
| **Espíritu del Diego** | Invencibilidad 10 seg | Nivel 5 (secreto) |
| **Bendición de la Difunta Correa** | Revivir una vez | Nivel 4 |
| **Mate Infinito** | Stamina infinita 30 seg | Varios niveles |
| **Choripán del Pueblo** | Full vida + escudo | Nivel 6 |

---

## FACCIONES Y WORLDBUILDING

### Las Facciones del Juego

**1. La Tríada del Pacífico Sur (Wa-Chin)**
- Control: Red de supermercados, importación
- Territorio: Todo el país (infiltrados)
- Líder: Wa-Chin/Xiao
- Objetivo: Dominación económica

**2. El Gobierno de Bignone**
- Control: Fuerzas armadas, burocracia
- Territorio: Buenos Aires, bases militares
- Líder: General Bignone
- Objetivo: "Orden" (según su versión)

**3. Los Narcos Locales (Pogo)**
- Control: Villas, distribución menor
- Territorio: Conurbano
- Líder: Pogo (títere de Wa-Chin)
- Objetivo: Sobrevivir

**4. Los Gauchos de la Ruta**
- Control: Rutas provinciales
- Territorio: Pampa y Patagonia
- Líder: El Gaucho Motoquero
- Objetivo: Caos y libertad

**5. La R.A.M. (Resistencia Ancestral Mapuflogger)**
- Control: Zona cordillerana, tierras "recuperadas"
- Territorio: Neuquén, Río Negro, El Bolsón
- Líder: Facuncho Jones Huala (El Lonko Flogger)
- Objetivo: Recuperar tierras ancestrales (y revivir Fotolog)
- Nota: Todos son ex-floggers que "descubrieron sus raíces" en 2010

**6. La Colonia (Los Alemanes de la Montaña)**
- Control: Villa la Angostura, bunkers secretos en los glaciares
- Territorio: Zona lacustre, montañas inaccesibles
- Líder: Rodolfo Hilton ("El Abuelo de la Montaña")
- Objetivo: "Descansar tranquilos" (y quizás conquistar el mundo, si se da)
- Nota: Llegaron en 1945 "por turismo". No preguntes más.

**7. Los Trekkers (No-Facción)**
- Control: Todos los hostels de la Patagonia
- Territorio: Cada sendero, cada refugio, cada mirador
- Líder: No tienen, pero siempre hay uno que habla por todos
- Objetivo: Completar el trekking y subir fotos
- Nota: Israelíes post-servicio militar. Neutrales, pero si mencionás nazis se activan

---

## DIÁLOGOS MEMORABLES

### César
> "Mirá, yo no pedí nada de esto. Solo quería un laburo, una vida normal. Pero este país... este país te obliga a ser otra cosa."

> "¿Sabés qué aprendí en China? Que en todos lados hay soretes. La diferencia es el idioma."

> "Confiar es de boludo. Y yo fui el más boludo de todos."

### Darío
> "César, escuchame... esta vez es diferente. Esta vez el plan es infalible. Bueno, casi infalible. Bueno... no me mires así."

> "¿Yo? ¿La culpa? Mirá, si vos hubieras leído la letra chica del contrato..."

> (Momento serio) "Fui un cagón toda mi vida. Pero esta vez... esta vez voy a hacer algo bien."

### Wa-Chin
> "¿Amigos? La amistad es una inversión con mal rendimiento. Yo prefiero los activos tangibles."

> "Ustedes los argentinos se creen vivos. Pero llevan 200 años siendo estafados por los de adentro. Yo solo... diversifiqué el portfolio."

> "El truco está en las cartas que no mostrás. Vos deberías saberlo, César."

### Bignone
> "¡¡EN MIS TIEMPOS LOS PIBES RESPETABAN!! ¡¡Y LOS CHINOS VENDÍAN VERDURA, NO... no sé qué carajo venden ahora!!"

> (Momento de lucidez) "Pibe... yo sé que estoy loco. Pero no soy estúpido. Hay algo más grande acá."

> "¡¡VIVAAA LA PATRIAAA!! ...perdón, ¿qué estábamos hablando?"

---

## REFERENCIAS CULTURALES

### Por Nivel
| Nivel | Referencias principales |
|-------|------------------------|
| 1 | Ricardo Fort, cárcel, mate, truco |
| 2 | Comercio internacional, containers, puertos |
| 3 | Rivalidad ARG-CHI, pisco, Alexis Sánchez |
| 4 | Bariloche, Jones Huala, floggers, nazis exiliados, trekkers israelíes, Villa la Angostura |
| 5 | Ruta 40, camioneros, YPF, asado |
| 6 | Militares, conurbano, planes sociales |
| 7 | Villas, trap, pibes chorros, cumbia |
| 8 | Supermercados chinos, todo x 2 pesos |
| 9 | Casa Rosada, política, historia |
| 10 | Puerto, inmigración, globalización |

### Easter Eggs Planeados
- Poster de Maradona en cada nivel
- Sonido de "GOOOL" cuando agarrás power-up
- Graffiti de "MACRI GATO" en nivel 6
- Radio que pasa "La Mano de Dios" de Rodrigo
- Vendedor de choripán aparece en lugares imposibles
- Referencia a "La 12" en nivel 7
- Helicóptero de De la Rúa en el fondo del nivel 9
- Fotos de RAMBO candidato en el nivel final
- Perro que ladra igual que RAMBO aparece en varios niveles (foreshadowing)

### Sátiras Políticas Principales
| Elemento | Referencia Real |
|----------|-----------------|
| Bignone escapando en helicóptero | Fernando de la Rúa, 2001 |
| RAMBO presidente (perro) | Perro CONAN, figura mediática |
| "Estos no aprenden más" | Frase popular argentina |
| Helicóptero sin mantenimiento | Estado de las instituciones |

---

## ESPECIFICACIONES TÉCNICAS

### Motor: Clickteam Fusion 2.5+

### Resolución Base: 1920x1080

### Estilo Visual: Paper Cut-out (estilo South Park)
- Personajes 2D con animación frame-by-frame
- Fondos en capas para parallax
- Efectos de partículas para impactos

### Sistema de Combate
```
- ATAQUE BÁSICO: X
- ATAQUE FUERTE: Y (charge)
- ESQUIVAR: A
- AGARRAR: B
- ESPECIAL: LT + RT (cuando la barra está llena)
- ITEM: D-pad
```

### Sistema de Progresión
- EXP por enemigo derrotado
- Niveles desbloquean habilidades
- Sistema de equipamiento simple (arma + accesorio)

### Checkpoints
- Auto-save al inicio de cada sección
- Checkpoints manuales en puntos específicos
- Quick-save deshabilitado en bossfights

---

## ENDINGS

### Ending A: "Estos No Aprenden Más" (Default/Canon)

**Secuencia final:**

1. **Bossfight contra Xiao** - César lo enfrenta y lo derrota en combate épico.

2. **Bignone escapa** - Durante la crisis, Bignone intenta huir en helicóptero. El helicóptero, sin mantenimiento desde los 80s, empieza a desarmarse en el aire. Tornillos salen volando, piezas caen, la hélice se despega. Choca contra algo boludo (el Obelisco, una antena, una paloma gigante) y explota. (Sátira a De la Rúa)

3. **RAMBO Presidente** - Escena de noticiero: "En elecciones históricas, el pueblo argentino eligió como presidente a... RAMBO". Aparece un Golden Retriever sentado en el sillón de Rivadavia. El país, sorprendentemente, empieza a mejorar. (Sátira al perro CONAN)

4. **Escena Final** - Interior, departamento humilde. Darío y César están sentados en un sillón mirando la tele. En la pantalla, RAMBO ladra en una conferencia de prensa.

   **DARÍO:** "Mirá vos... un perro presidente."

   **CÉSAR:** "Y gobierna mejor que todos los otros."

   *Silencio. Miran la tele.*

   **TV:** "...las encuestas muestran 95% de aprobación para el presidente RAMBO..."

   **DARÍO:** "Che, César..."

   **CÉSAR:** "¿Qué?"

   **DARÍO:** "Estos no aprenden más, ¿no?"

   *César mira a cámara. Sonríe. Saca un revólver.*

   **CÉSAR:** "No. No aprenden."

   *Dispara a cámara.*

   **PUM.**

   *CORTE A NEGRO.*

5. **CRÉDITOS** - Ruedan con música de cumbia villera.

---

### Ending B: "El Precio" (Darío muere)
Darío se sacrifica para salvar a César durante el bossfight contra Xiao. La escena final es César solo mirando la tele. RAMBO sigue siendo presidente. César dispara a cámara, pero esta vez no sonríe.

### Ending C: "La Verdad" (Secreto)
Derrotás a Wa-Chin sin usar items. Se revela que todo fue orquestado por... [CONTINUARÁ EN RETRUCO 2]

### Ending D: "El Ciclo" (Malo)
Dejás escapar a Wa-Chin. Argentina cae bajo su control. César se exilia. RAMBO nunca llega a ser presidente.

---

## NOTAS FINALES

Este documento está vivo. Se actualizará a medida que el desarrollo avance.

**Prioridades:**
1. Nivel 1 funcionando (ya está)
2. Sistema de combate pulido
3. Los 10 niveles jugables (greybox)
4. Arte final
5. Audio y música
6. Pulido y testing

---

## BOSSES ALTERNATIVOS

> Bosses adicionales que pueden intercambiarse con los originales o agregarse como DLC/Updates.

### MIRTHA LEGRAND - "La Inmortal"

**Contexto:** En un programa especial de "La Noche de Mirtha", César es invitado como "el argentino que escapó de China". Pero Mirtha no es lo que parece - es un vampiro que lleva 500 años alimentándose de la energía vital de sus invitados.

**Diseño Visual:** Mirtha con vestido de gala rojo sangre, pero con colmillos, ojos que brillan, y tentáculos que salen de su peluca platinada. El escenario es el set de su programa convertido en arena de combate.

**Fases:**
- **Fase 1 "La Mesaza":** Ataca con preguntas incómodas (proyectiles sonoros), lanza platos de comida gourmet como armas.
- **Fase 2 "La Vampira":** Se transforma, ataca con mordiscos que roban vida, invoca "invitados" zombies.
- **Fase 3 "La Eterna":** Fusión total - tentáculos salen de todos lados, la mesa se convierte en criatura.

**Frases:**
- "Bienvenido a mi mesa, querido. Será tu último almuerzo."
- "Tengo 500 años, ¿pensás que me vas a ganar vos?"
- "Como dijo mi amigo Tutankamón..."
- Al morir: "Pero... el programa... quién va a preguntar... la edad..."

**Mecánica:** Tirarle platos de mala calidad la daña. La luz del reflector daña su forma vampira.

---

### EL DIEGO MECÁNICO - "D10S de Acero"

**Contexto:** FIFA Corp clonó a Maradona y lo convirtió en cyborg. El "Diego Mecánico" no tiene recuerdos, solo sabe destruir. César debe liberarlo.

**Diseño Visual:** Maradona con mitad del cuerpo robótico estilo Terminator. Brazo izquierdo (Mano de D10S) es un cañón. Pierna izquierda con pistón hidráulico. Ojo rojo láser. Camiseta de Argentina metalizada.

**Fases:**
- **Fase 1 "El Robot":** Movimientos mecánicos, dispara pelotas explosivas, "Mano de D10S" láser.
- **Fase 2 "Los Recuerdos":** Empieza a recordar, alterna entre modo robot y humano. Invoca "fantasmas de jugadas históricas".
- **Fase 3 "D10S Liberado":** Se convierte en mecha gigante (3 pantallas de alto).

**Frases:**
- "OBJETIVO: ELIMINACIÓN. INICIANDO PROTOCOLO."
- "Yo... yo conozco esta cancha... ESTE ES MI LUGAR"
- "ME CORTARON LAS PIERNAS... PERO YO SIGO GAMBETEANDO"
- Al morir: "Gracias... por liberarme... la pelota... no se mancha..."

**Mecánica:** Si recreás el gol a los ingleses (corrés en la dirección correcta), daño crítico masivo.

**Recompensa:** "Lágrima del Diego" (+10% daño permanente), habilidad "Gol del Siglo", el alma del Diego te sigue como fantasma consejero.

---

### MESSI-AS - "El Elegido"

**Contexto:** Una secta llamada "Los Pulgas de Dios" creó una versión mesiánica de Messi con poderes divinos que cree debe "purificar" Argentina.

**Diseño Visual:** Messi con aureola dorada, túnica blanca #10, ojos blancos brillantes, 6 brazos (deidad hindú) sosteniendo Balones de Oro. El escenario es una catedral con bancas que son gradas de estadio.

**Fases:**
- **Fase 1 "El Sermón":** Pases divinos (pelotas de luz), levita, "Gambeta Celestial" (teleport con afterimages).
- **Fase 2 "Los Milagros":** Recrea goles famosos como ataques - "Gol a los Ingleses", "Chilena de Champions".
- **Fase 3 "El Apocalipsis del Fútbol":** Copa del Mundo gigante dispara fuego. "Juicio Final" divide la pantalla en salvados/condenados.

**Frases:**
- "Has venido a ser purificado, hijo. O destruido."
- "Estos no son goles. Son MILAGROS."
- "EL MUNDIAL NOS DIO TODO. Y TODO LO TOMA."
- "Qué mirá' bobo, anda pa' allá"

**Mecánica:** Los monaguillos se pueden "convertir" a tu lado. Cada milagro tiene un "contra-milagro".

---

### NISMAN - "El Fiscal Fantasma"

**Contexto:** César invoca accidentalmente el fantasma de Nisman al investigar archivos clasificados. El fantasma corrupto cree que TODOS son culpables.

**Diseño Visual:** Fantasma translúcido con agujero de bala que funciona como tercer ojo, traje hecho de expedientes, cadenas de micrófonos de periodistas. Escenario: juzgado abandonado.

**Fases:**
- **Fase 1 "El Fiscal":** Documentos que persiguen, "Objeción" (grito sónico), invoca "testigos falsos".
- **Fase 2 "La Denuncia":** LA DENUNCIA cobra vida y ataca independientemente.
- **Fase 3 "La Verdad":** Tornado de papeles gigante. Debés encontrar "LA VERDAD REAL" escondida.

**Frases:**
- "Vos también... VOS TAMBIÉN SABÉS LA VERDAD"
- "LEAN LA DENUNCIA. LEANLA."
- "NO PUEDEN SILENCIARME DE NUEVO"
- Al morir: "Por fin... puedo descansar... aunque nunca sabrán... qué pasó..."

**Mecánica:** Puzzle de observación - hay 3 "verdades" pero solo una es real y brilla diferente por 0.5 segundos cada 10 segundos.

---

### LA YENNY Y EL KEVIN - "Los Pibes del Fondo"

**Contexto:** Pareja de villeros con poderes sobrenaturales tras tomar Manaos cortada con agua del Riachuelo. Lideran el tráfico de Criollitas falsificadas.

**Diseño Visual:**
- **Yenny:** Rubia con raíces negras, uñas esculpidas de 15cm con navajas, jean tiro bajo, carrito de bebé como arma.
- **Kevin:** Gorrita de Boca, campera Adidas trucha, zapatillas Topper fosforescentes, chumbo cromado, mullet glorioso.

**Fases:**
- **Fase 1 "El Cachengue":** Pelean coordinados. Kevin dispara mientras Yenny persigue con el carrito.
- **Fase 2 "La Junta":** Se suben al Fiat 147 tunneado que cobra vida. Dispara reggaeton sónico.
- **Fase 3 "El Paco Final":** Consumen paco, modo berserk. Se dañan entre ellos si chocan.

**Frases Kevin:**
- "EH AMEO QUÉ MIRA VO, TE VOY A LLENAR DE AGUJERO"
- Si muere Yenny: "YENNYYY NOOO... TE VOY A MATAR HIJO DE PUTA"

**Frases Yenny:**
- "QUIÉN E ESTE PELOTUDO AMOR? LO HACEMO MIERDA?"
- "ME ARRUINASTE LA UÑA FORRO"

**Mecánica:** EL ORDEN IMPORTA. Si matás primero a Kevin, Yenny entra en rage mode (más difícil, mejor loot). Si matás primero a Yenny, Kevin se deprime (más fácil, menos loot).

**Recompensa:** Fiat 147 como vehículo usable en ciertos niveles.

---

## VOCABULARIO ARGENTINO

### Jerga Carcelaria
| Término | Significado |
|---------|-------------|
| Caer en cana | Ir preso |
| El bondi | La camioneta de traslado |
| El pabellón | Sector de celdas |
| Rancho | Comida |
| Fajar | Golpear |
| Mandar en cana | Delatar |
| El tumbero | El preso |
| La yuta | La policía |
| Morfar | Comer |
| Afanar | Robar |
| El gil | El tonto |
| El chabón | El tipo |
| Trucho | Falso |
| Guita | Dinero |
| Mango | Peso (moneda) |
| Verde | Dólar |
| El garrón | Problema, quilombo |
| Zafar | Escapar de un problema |
| Quemar | Delatar / Arruinar |
| El dato | Información valiosa |

### Frases por Situación

**Al ganar al truco:**
- "¡Tomá mate y andá al baile!"
- "Esa la tenía guardada, maestro."
- "¿Viste? El que sabe, sabe."
- "Más truco que Houdini."

**Al perder:**
- "Me cagaste... pero la próxima no zafás."
- "Hoy tuviste suerte. Solo hoy."
- "Me dormí en esa."

**Al descubrir traición:**
- "Así que era vos... hijo de puta."
- "Me vendiste como a una vaquillona."
- "Yo te confiaba, la concha de tu madre."

---

## MISTERIOS Y SECRETOS

### El Misterio de "Pogo"

**Teorías que el jugador descubre:**
1. Pogo fue real: un preso que intentó asesinar a Bignone hace 40 años
2. Pogo es un símbolo de todos los que Bignone hizo desaparecer
3. Pogo es alguien actual en el pabellón
4. Pogo es César sin saberlo

**La Verdad (Acto III):** Pogo era un agente infiltrado que iba a testificar contra Bignone. Bignone lo mató en 1984. Pero Pogo escondió documentos que prueban todo - y contienen información sobre Wa-Chin.

### El Padre de César

**Lo que César sabe:** Su padre desapareció cuando él tenía 5 años. No hay fotos.

**La Verdad:** Osvaldo Ferreyra era periodista de investigación. En 1998 seguía la pista de una red de tráfico de personas conectada con empresarios chinos - la misma red que se convertiría en la operación de Wa-Chin. Fue asesinado. César fue marcado desde que nació.

### El Sótano

Debajo del pabellón hay un nivel que no aparece en los planos. Fue usado durante la dictadura para interrogatorios. Hay archivos, grabaciones, y una salida secreta que Bignone construyó hace décadas. César puede encontrarla si sobrevive lo suficiente.

---

## PISTAS DEL PLOT TWIST

> Señales sutiles que plantar durante el juego para que el jugador sospeche de Xiao/Wa-Chin.

| # | Momento | Pista | Significado Real |
|---|---------|-------|------------------|
| 1 | Nivel 1 | Xiao sabe el nombre de César sin que nadie se lo diga | Orquestó todo desde el principio |
| 2 | Nivel 2 | Xiao dice que los argentinos son "confiados" | Fue enviado para explotar esa confianza |
| 3 | Nivel 3 | Inconsistencias en su historia (tiempo preso) | No estuvo realmente preso, era montaje |
| 4 | Nivel 4 | Xiao desaparece cuando aparece el ejército | Tiene acuerdo con autoridades |
| 5 | Nivel 5 | Conexión narco con supermercados chinos | La red de Xiao es la de Pogo |
| 6 | Nivel 6 | Info DEMASIADO buena sobre Pogo | Xiao controla la información |
| 7 | Nivel 7 | Productos Wa-Chin en todos lados | Control total ya establecido |
| 8 | Nivel 8 | Darío admite que el contacto en China era Xiao | Conexión directa revelada |

### Diálogo Clave de Revelación

**"POGO" (Falso):** "Su verdadero nombre es Wa-Chin. Y vos, César... vos sos su mejor empleado."

**CÉSAR (voz en off):** "En ese momento, todo se derrumbó. Cada misión. Cada éxito. Todo era mentira. Yo no estaba cazando a Pogo. Estaba limpiándole el camino a Xiao para que tomara todo el mercado. Y lo peor... es que lo hice gratis."

---

## POST-CRÉDITOS

*Celda de máxima seguridad. Ushuaia. Wa-Chin mira por una pequeña ventana.*

**GUARDIA:** "Tenés visita."

*Entra una mujer china, elegante, fría.*

**MUJER:** "Hermano."

**WA-CHIN:** "... Mei-Ling."

**MEI-LING:** "El Partido está decepcionado con tu fracaso. Perdiste contra un kiosquero."

**WA-CHIN:** "Tuve... complicaciones."

**MEI-LING:** "Pero no te preocupes. Yo voy a terminar lo que empezaste. Solo que esta vez... no voy a subestimar a los argentinos."

*Wa-Chin mira por la ventana.*

**WA-CHIN:** "Pobre César. No tiene idea de lo que viene."

**FADE A NEGRO.**

**"CÉSAR VOLVERÁ EN: RETRUCO 2 - LA VENGANZA DEL DRAGÓN"**

---

*Documento creado: Abril 2026*
*Última actualización: Abril 2026*
*Versión: 2.0 - Expandida*

**ReTruco** © 2026 Underground. Todos los derechos reservados.
