// =====================================================
// RETRUCO — SHARED: CONSTANTS, OPPONENTS, CARD RENDER
// =====================================================

const SUITS = ['espadas', 'bastos', 'copas', 'oros'];
const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12];
const SUIT_SYMBOLS = { espadas: '\u{1F5E1}\uFE0F', bastos: '\u{1FAB5}', copas: '\u{1F3C6}', oros: '\u{1FA99}' };
const SUIT_FILE = { espadas: 'deespada', bastos: 'debasto', copas: 'decopa', oros: 'deoro' };

const ENVIDO_VAL = { 1:1, 2:2, 3:3, 4:4, 5:5, 6:6, 7:7, 10:0, 11:0, 12:0 };

const POWER = {
    '1-espadas':14,'1-bastos':13,'7-espadas':12,'7-oros':11,
    '3-espadas':10,'3-bastos':10,'3-copas':10,'3-oros':10,
    '2-espadas':9,'2-bastos':9,'2-copas':9,'2-oros':9,
    '1-copas':8,'1-oros':8,
    '12-espadas':7,'12-bastos':7,'12-copas':7,'12-oros':7,
    '11-espadas':6,'11-bastos':6,'11-copas':6,'11-oros':6,
    '10-espadas':5,'10-bastos':5,'10-copas':5,'10-oros':5,
    '7-copas':4,'7-bastos':4,
    '6-espadas':3,'6-bastos':3,'6-copas':3,'6-oros':3,
    '5-espadas':2,'5-bastos':2,'5-copas':2,'5-oros':2,
    '4-espadas':1,'4-bastos':1,'4-copas':1,'4-oros':1
};

const TRUCO_LEVELS = [
    { name: 'TRUCO', points: 2 },
    { name: 'RETRUCO', points: 3 },
    { name: 'VALE CUATRO', points: 4 }
];

const ENVIDO_LEVELS = [
    { name: 'ENVIDO', points: 2 },
    { name: 'REAL ENVIDO', points: 3 },
    { name: 'FALTA ENVIDO', points: 'falta' }
];

// =====================================================
// CARD IMAGES — using imagenes/cartastruco/ PNGs
// =====================================================
const CARD_IMAGES = {};
const _cardBasePath = (typeof CARD_BASE_PATH !== 'undefined') ? CARD_BASE_PATH : '../imagenes/cartastruco/';

// Mapping from internal suit names to folder/file names
const SUIT_FOLDER = { espadas: 'Espada', bastos: 'Basto', copas: 'Copa', oros: 'Oro' };
const SUIT_NAME = { espadas: 'Espada', bastos: 'Basto', copas: 'Copa', oros: 'Oro' };

// Card back image
const CARD_BACK = `${_cardBasePath}Atras.png`;

(function detectCards() {
    for (const s of SUITS) {
        for (const n of NUMBERS) {
            const key = `${n}-${s}`;
            // Format: ../imagenes/cartastruco/Espada/1 de Espada.png
            const file = `${_cardBasePath}${SUIT_FOLDER[s]}/${n} de ${SUIT_NAME[s]}.png`;
            const img = new Image();
            img.onload = function() { CARD_IMAGES[key] = file; };
            img.src = file;
        }
    }
})();

// =====================================================
// CARD RENDERING
// =====================================================
function renderCard(card, playable) {
    const imgSrc = CARD_IMAGES[card.key];
    const playableClass = playable ? 'playable card-interactive will-animate' : '';
    const draggableAttr = playable ? 'draggable="true"' : '';

    if (imgSrc) {
        return `<div class="card card-img ${playableClass}" data-key="${card.key}" ${draggableAttr}>
            <img src="${imgSrc}" alt="${card.number} de ${card.suit}" draggable="false">
            <div class="card-shine"></div>
        </div>`;
    }

    const sym = SUIT_SYMBOLS[card.suit];
    const faceNumber = card.number === 10 ? '10' : card.number === 11 ? 'S' : card.number === 12 ? 'R' : card.number;

    return `<div class="card ${playableClass} suit-${card.suit}" data-key="${card.key}" ${draggableAttr}>
        <div class="card-inner">
            <div class="card-corner"><span>${faceNumber}</span><br>${sym}</div>
            <div class="card-center">
                <div class="card-number">${faceNumber}</div>
                <div class="card-suit">${sym}</div>
            </div>
            <div class="card-corner-br"><span>${faceNumber}</span><br>${sym}</div>
        </div>
        <div class="card-shine"></div>
    </div>`;
}

// =====================================================
// DECK HELPERS
// =====================================================
function createDeck() {
    const deck = [];
    for (const s of SUITS) for (const n of NUMBERS) deck.push({ number: n, suit: s, key: `${n}-${s}` });
    return deck;
}

function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function getPower(c) { return POWER[c.key] || 0; }

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
        if (cards.length >= 2) {
            const vals = cards.map(c => ENVIDO_VAL[c.number]).sort((a, b) => b - a);
            const pairScore = 20 + vals[0] + vals[1];
            if (pairScore > best) best = pairScore;
        }
        cards.forEach(c => {
            const single = ENVIDO_VAL[c.number];
            if (single > best) best = single;
        });
    }
    return best;
}

// =====================================================
// OPPONENTS — 10 characters from the ReTruco universe
// =====================================================
const OPPONENTS = {
    abraham: {
        name: 'ABRAHAM',
        role: 'El Veterano',
        difficulty: 1,
        tier: 1,
        portrait: '../imagenes/abraham.png',
        placeholderPortrait: true,
        color: '#8B7355',
        background: '../imagenes/fondotruco1.png',
        lore: 'Viejo zorro del pabellón. Lleva 30 años jugando truco y nunca perdió una partida importante. Dicen que enseñó a jugar a medio penal.',
        bio: 'Abraham cayó en los 90 por un ajuste de cuentas que nunca quiso explicar. Desde entonces, el truco se convirtió en su religión. Cada carta que tira tiene 30 años de experiencia detrás. Los pibes nuevos lo buscan para aprender, los veteranos lo respetan. Nunca levanta la voz, pero cuando habla, todos escuchan.',
        mission: 'Abraham es tu primer rival. Jugá conservador, no te apures. Él rara vez bluffea, así que si canta truco, probablemente tenga cartas buenas. Aprendé a leer sus silencios.',
        traits: ['Conservador', 'Paciente', 'Maestro'],
        skills: { agresividad: 1, farol: 1, envido: 2, estrategia: 3 },
        ai: {
            envidoAcceptThreshold: 25,
            envidoRaiseThreshold: 31,
            envidoRaiseChance: 0.05,
            trucoAcceptMinPower: 9,
            trucoBluffChance: 0.03,
            trucoProactiveChance: 0.15,
            trucoProactiveMinPower: 12,
            trucoRaiseChance: 0.05,
            trucoRaiseMinPower: 14,
            foldChance: 0.4,
            cardStrategy: 'conservative',
            randomVariance: 0,
            envidoCallThresholdHigh: 30,
            envidoCallChanceHigh: 0.3,
            envidoCallThresholdLow: 28,
            envidoCallChanceLow: 0.15,
        },
        lines: {
            start: ['Sentate pibe, te voy a enseñar', 'A ver si aprendiste algo', 'Dale, jugá tranquilo', 'Hoy te doy una lección', 'Vas a aprender del mejor'],
            envido: ['Envido, pibe', 'Dale, envido'],
            realEnvido: ['Real envido, a ver qué tenés'],
            faltaEnvido: ['Falta envido... si te animás'],
            envidoQuiero: ['Quiero, mostrá', 'Dale, veamos'],
            envidoNoQuiero: ['No, paso...', 'Me guardo esta'],
            envidoWin: ['¿Viste pibe? Experiencia', 'Así se juega'],
            envidoLose: ['Bien, aprendiste algo', 'Esa estuvo buena'],
            truco: ['Truco, pibe', 'Te canto truco'],
            retruco: ['Retruco, atrevido'],
            valeCuatro: ['Vale cuatro, a ver si aguantás'],
            trucoQuiero: ['Quiero, jugá', 'Dale, quiero'],
            trucoNoQuiero: ['No quiero, pibe', 'Paso esta vez'],
            winRound: ['Así se hace', 'Experiencia mata juventud', '¿Viste?'],
            loseRound: ['Bien jugada, pibe', 'Esa no la vi venir', 'Aprendés rápido'],
            winHand: ['Todavía me queda cuerda', 'El viejo sigue firme'],
            loseHand: ['La próxima te enseño de vuelta', 'Bien, pibe, bien'],
            winGame: ['El veterano nunca pierde', 'Años de experiencia, pibe'],
            loseGame: ['Me ganaste... bien ahí pibe', 'Se ve que aprendiste'],
            mazo: ['Sabio, pibe. A veces hay que rajarse', 'Bien, sabés cuándo retirarte'],
        }
    },
    alfredito: {
        name: 'ALFREDITO',
        role: 'El Iniciador',
        difficulty: 2,
        tier: 1,
        portrait: '../imagenes/alfredito.png',
        color: '#2bb8cd',
        background: '../imagenes/fondotruco1.png',
        lore: 'El pibe más boca del patio. Siempre gritando, siempre cantando. No sabe perder pero tampoco sabe cuándo callarse.',
        bio: 'Alfredito tiene 23 años y cayó por robo de autos. Es el más joven del pabellón pero el que más ruido hace. Creció en la villa jugando truco con sus hermanos, y acá adentro encontró su escenario. Cada partida es un show para él. No le importa ganar o perder, le importa que todos lo miren.',
        mission: 'Alfredito es puro humo. Canta truco con cualquier cosa esperando que te asustes. Bancátela y vas a ver cómo se desinfla. Aceptá sus trucos cuando tengas cartas decentes.',
        traits: ['Bocón', 'Energético', 'Impredecible'],
        skills: { agresividad: 3, farol: 2, envido: 3, estrategia: 2 },
        ai: {
            envidoAcceptThreshold: 23,
            envidoRaiseThreshold: 29,
            envidoRaiseChance: 0.4,
            trucoAcceptMinPower: 8,
            trucoBluffChance: 0.12,
            trucoProactiveChance: 0.25,
            trucoProactiveMinPower: 10,
            trucoRaiseChance: 0.25,
            trucoRaiseMinPower: 12,
            foldChance: 0.35,
            cardStrategy: 'basic',
            randomVariance: 0,
            envidoCallThresholdHigh: 28,
            envidoCallChanceHigh: 0.6,
            envidoCallThresholdLow: 25,
            envidoCallChanceLow: 0.35,
        },
        lines: {
            start: ['Sentate que te enseño', 'Dale, arrancá', 'A ver qué tenés...', 'Hoy te rompo', 'Vamos de una'],
            envido: ['¡ENVIDO!', 'Envido, ¿te animás?', 'ENVIDO papá', 'Dale, envido'],
            realEnvido: ['¡REAL ENVIDO!', 'Real envido, sacá pecho'],
            faltaEnvido: ['¡FALTA ENVIDO! Todo o nada', 'FALTA ENVIDO, cagón'],
            envidoQuiero: ['Quiero, mostrá', 'Dale, quiero'],
            envidoNoQuiero: ['Paso el envido...', 'Na, me guardo'],
            envidoWin: ['¡MIS PUNTOS PAPÁ!', 'Jajaja envido mío', '¿Viste? Tengo flor en la mano'],
            envidoLose: ['Uff tuviste suerte', 'Grrr...'],
            truco: ['¡TRUCO papá!', 'TRUCAZO', '¿Querés? ¡TRUCO!', 'Te canto truco'],
            retruco: ['¡RETRUCO!', 'RETRUCO, ¿te la bancás?'],
            valeCuatro: ['¡VALE CUATRO!', 'VALE CUATRO o rajá'],
            trucoQuiero: ['Quiero, dale', 'Obvio que quiero'],
            trucoNoQuiero: ['No quiero...', 'Me guardo esta'],
            winRound: ['¡Tomá!', 'Jajaja', 'Papá...', 'Fácil', '¿Viste?'],
            loseRound: ['Uff', 'Zafaste', 'Hmm...', 'Bien jugada'],
            winHand: ['¡Soy tu papá!', 'Andá a practicar', 'Más fácil que respirar'],
            loseHand: ['La próxima no te va bien', 'Tuviste suerte', 'Grrr...'],
            winGame: ['¡CAMPEÓN! Jajaja', 'Nunca tuviste chance'],
            loseGame: ['REVANCHA YA', 'Hiciste trampa seguro'],
            mazo: ['¡Ja! Cobarde', 'Así me gusta, rendite', 'Flojo...'],
        }
    },
    aliado: {
        name: 'ALIADO',
        role: 'El Compañero',
        difficulty: 2,
        tier: 2,
        portrait: '../imagenes/aliado.png',
        placeholderPortrait: true,
        color: '#5DADE2',
        background: '../imagenes/fondotruco1.png',
        lore: 'Cayó por un error ajeno. Siempre tranquilo, siempre ayudando. El tipo que todos quieren de compañero pero nadie quiere de rival.',
        bio: 'Nadie sabe su nombre real. Le dicen "Aliado" porque siempre está ayudando a alguien. Cayó como cómplice de un robo que ni sabía que estaba pasando. No guarda rencor. En el pabellón es el que presta yerba, el que escucha, el que nunca juzga. Juega truco para pasar el tiempo, no para demostrar nada.',
        mission: 'Aliado no es agresivo pero tampoco es tonto. Juega honesto y espera que vos también. No te confíes por su actitud tranquila, sabe cuándo apretar.',
        traits: ['Tranquilo', 'Solidario', 'Humilde'],
        skills: { agresividad: 2, farol: 1, envido: 2, estrategia: 2 },
        ai: {
            envidoAcceptThreshold: 24,
            envidoRaiseThreshold: 30,
            envidoRaiseChance: 0.1,
            trucoAcceptMinPower: 8,
            trucoBluffChance: 0.05,
            trucoProactiveChance: 0.2,
            trucoProactiveMinPower: 11,
            trucoRaiseChance: 0.1,
            trucoRaiseMinPower: 13,
            foldChance: 0.35,
            cardStrategy: 'basic',
            randomVariance: 0,
            envidoCallThresholdHigh: 29,
            envidoCallChanceHigh: 0.4,
            envidoCallThresholdLow: 26,
            envidoCallChanceLow: 0.25,
        },
        lines: {
            start: ['Dale, vamos', 'Buena onda, arrancamos', 'A jugar tranqui', 'Suerte, eh', 'Vamo\' a ver'],
            envido: ['Envido, ¿dale?', 'Envido'],
            realEnvido: ['Real envido, a ver'],
            faltaEnvido: ['Falta envido... perdón'],
            envidoQuiero: ['Dale, quiero', 'Va, quiero'],
            envidoNoQuiero: ['No, paso', 'Esta vez no'],
            envidoWin: ['Bien ahí', 'Tuve suerte creo'],
            envidoLose: ['Bien vos, eh', 'Buena esa'],
            truco: ['Truco, ¿va?', 'Te canto truco, dale'],
            retruco: ['Retruco, va en serio'],
            valeCuatro: ['Vale cuatro, ¿te copa?'],
            trucoQuiero: ['Quiero, dale', 'Va, quiero'],
            trucoNoQuiero: ['No, paso esta', 'No quiero, no me da'],
            winRound: ['Bien ahí', 'Esa fue buena', 'Dale'],
            loseRound: ['Buena jugada', 'Bien hecha', 'Opa'],
            winHand: ['Bien, gané esta', 'Perdón, me tocaron buenas'],
            loseHand: ['Bien jugado, eh', 'Me ganaste limpio'],
            winGame: ['Gané, pero fue parejo', 'Bien ahí, jugas bien igual'],
            loseGame: ['Bien merecido, crack', 'Jugas muy bien'],
            mazo: ['Dale, sin drama', 'Tranqui, es parte del juego'],
        }
    },
    dario: {
        name: 'DARIO',
        role: 'El Cerebro',
        difficulty: 3,
        tier: 2,
        portrait: '../imagenes/dario.png',
        color: '#AF7AC5',
        background: '../imagenes/fondotruco1.png',
        lore: 'El genio del pabellón. Estudió contabilidad antes de caer. Calcula cada carta, cada probabilidad, cada jugada. Dicen que nunca pierde dos veces contra el mismo rival.',
        bio: 'Darío era contador en un estudio grande hasta que empezó a "redistribuir" fondos de sus clientes. Cayó por estafa pero acá adentro encontró su verdadera vocación: analizar todo. Calcula probabilidades de cada mano, estudia patrones de sus rivales. Tiene una libreta donde anota cada partida. Es frío, metódico, y casi nunca se equivoca.',
        mission: 'Darío te va a leer. No repitas patrones, sorprendelo. Bluffeá cuando menos lo espere, porque él está calculando basándose en tus jugadas anteriores. Rompé su sistema.',
        traits: ['Calculador', 'Analítico', 'Frío'],
        skills: { agresividad: 2, farol: 3, envido: 3, estrategia: 4 },
        ai: {
            envidoAcceptThreshold: 22,
            envidoRaiseThreshold: 27,
            envidoRaiseChance: 0.5,
            trucoAcceptMinPower: 7,
            trucoBluffChance: 0.18,
            trucoProactiveChance: 0.3,
            trucoProactiveMinPower: 9,
            trucoRaiseChance: 0.3,
            trucoRaiseMinPower: 11,
            foldChance: 0.3,
            cardStrategy: 'strategic',
            randomVariance: 0,
            envidoCallThresholdHigh: 27,
            envidoCallChanceHigh: 0.65,
            envidoCallThresholdLow: 24,
            envidoCallChanceLow: 0.4,
        },
        lines: {
            start: ['Dejame pensar...', 'Esto ya lo tenía calculado', 'A ver, cerebro vs suerte', 'Tranquilo, tengo un plan', 'Siempre estoy un paso adelante'],
            envido: ['Envido. Lo tenía pensado', 'ENVIDO, era obvio'],
            realEnvido: ['Real envido. Calculado.'],
            faltaEnvido: ['Falta envido. Todo según el plan'],
            envidoQuiero: ['Quiero. Ya lo sabía', 'Obvio, quiero'],
            envidoNoQuiero: ['No me conviene... paso', 'Los números no dan'],
            envidoWin: ['Calculado, como siempre', 'El cerebro no falla'],
            envidoLose: ['Mmm... error de cálculo', 'Imposible...'],
            truco: ['Truco. Lo tenía guardado', '¡TRUCO! ¿No lo veías venir?'],
            retruco: ['Retruco. Estaba esperando esto'],
            valeCuatro: ['Vale cuatro. Jaque mate.'],
            trucoQuiero: ['Quiero. Tengo todo armado', 'Dale, quiero'],
            trucoNoQuiero: ['No quiero. Hay que saber cuándo retirarse', 'Paso, es lo inteligente'],
            winRound: ['Calculado', 'Lo sabía', 'Fácil cuando pensás'],
            loseRound: ['Interesante...', 'No lo vi venir', 'Hmm, tengo que recalcular'],
            winHand: ['La inteligencia siempre gana', 'El cerebro manda'],
            loseHand: ['La culpa es tuya por confiar', 'Necesito recalibrar'],
            winGame: ['Maestro del truco y de la vida', 'El cerebro siempre gana'],
            loseGame: ['Imposible... hubo un error en la matrix', 'Revancha, tengo un plan nuevo'],
            mazo: ['Cobarde inteligente o valiente muerto?', 'Bien, el que huye vive para jugar otro día'],
        }
    },
    momo: {
        name: 'MOMO',
        role: 'El Pesado',
        difficulty: 3,
        tier: 3,
        portrait: '../imagenes/momo.png',
        placeholderPortrait: true,
        color: '#E74C3C',
        background: '../imagenes/fondotruco1.png',
        lore: 'El que menos habla es el que más pega. Momo cayó por una pelea y desde entonces no perdió una sola partida de truco. Su silencio intimida más que cualquier grito.',
        bio: 'Momo mide casi dos metros y pesa 120 kilos. Cayó por lesiones graves en una pelea de bar. No habla de su pasado, no habla de nada. Comunica con miradas. En el truco es igual: tira las cartas con violencia contenida. Nadie le discute una jugada. Nadie quiere.',
        mission: 'No te dejes intimidar por su presencia. Momo juega agresivo pero predecible. Esperá que cante truco con cartas mediocres y hacelo pagar. Su debilidad es el envido.',
        traits: ['Silencioso', 'Intimidante', 'Agresivo'],
        skills: { agresividad: 4, farol: 3, envido: 2, estrategia: 2 },
        ai: {
            envidoAcceptThreshold: 24,
            envidoRaiseThreshold: 28,
            envidoRaiseChance: 0.35,
            trucoAcceptMinPower: 6,
            trucoBluffChance: 0.30,
            trucoProactiveChance: 0.45,
            trucoProactiveMinPower: 8,
            trucoRaiseChance: 0.4,
            trucoRaiseMinPower: 10,
            foldChance: 0.2,
            cardStrategy: 'aggressive',
            randomVariance: 0,
            envidoCallThresholdHigh: 27,
            envidoCallChanceHigh: 0.5,
            envidoCallThresholdLow: 24,
            envidoCallChanceLow: 0.3,
        },
        lines: {
            start: ['...', 'Sentate.', 'Jugá.', 'Dale.', 'Hmm.'],
            envido: ['Envido.', 'ENVIDO.'],
            realEnvido: ['Real envido.'],
            faltaEnvido: ['Falta envido. No me hagas enojar.'],
            envidoQuiero: ['Quiero.', 'Dale.'],
            envidoNoQuiero: ['No.', 'Paso.'],
            envidoWin: ['Hmm.', 'Bien.'],
            envidoLose: ['...', 'Grr.'],
            truco: ['TRUCO.', 'Truco. ¿Algún problema?', 'TRUCO. No me mires así.'],
            retruco: ['RETRUCO.', 'Retruco. ¿Querés pelear?'],
            valeCuatro: ['VALE CUATRO. Última chance.'],
            trucoQuiero: ['Quiero.', 'Obvio.'],
            trucoNoQuiero: ['...no.', 'Paso.'],
            winRound: ['Hmm.', 'Bien.', 'Obvio.'],
            loseRound: ['...', 'Hmm.'],
            winHand: ['No me sorprende.', 'Fácil.'],
            loseHand: ['...la próxima.', 'Hmm.'],
            winGame: ['Se terminó.', 'No tenías chance.'],
            loseGame: ['...revancha. Ahora.', 'Hmm. Otra.'],
            mazo: ['Cobarde.', 'Rajá.', '...flojo.'],
        }
    },
    littleboogie: {
        name: 'LITTLE BOOGIE',
        role: 'El Rítmico',
        difficulty: 3,
        tier: 3,
        portrait: '../imagenes/littleboogie.png',
        placeholderPortrait: true,
        color: '#F39C12',
        background: '../imagenes/fondotruco1.png',
        lore: 'DJ de cumbia villera antes de caer. Le puso ritmo al pabellón y ahora le pone ritmo a cada partida. Impredecible como un beat trap, letal como un drop.',
        bio: 'Little Boogie era DJ en los bailes más pesados del conurbano. Cayó por tenencia después de un allanamiento en plena fiesta. Extraña los parlantes, el público, la noche. Acá adentro canta las cartas como si fueran lyrics, tira el truco con flow. Convirtió el pabellón en su escenario.',
        mission: 'Boogie es caótico. Cambia de estrategia como cambia de tema. No intentes predecirlo, fluí con el juego. A veces la mejor jugada es dejarlo que se maree solo.',
        traits: ['Impredecible', 'Carismático', 'Rítmico'],
        skills: { agresividad: 3, farol: 3, envido: 3, estrategia: 2 },
        ai: {
            envidoAcceptThreshold: 23,
            envidoRaiseThreshold: 28,
            envidoRaiseChance: 0.35,
            trucoAcceptMinPower: 7,
            trucoBluffChance: 0.2,
            trucoProactiveChance: 0.3,
            trucoProactiveMinPower: 9,
            trucoRaiseChance: 0.3,
            trucoRaiseMinPower: 10,
            foldChance: 0.3,
            cardStrategy: 'basic',
            randomVariance: 5,
            envidoCallThresholdHigh: 27,
            envidoCallChanceHigh: 0.5,
            envidoCallThresholdLow: 24,
            envidoCallChanceLow: 0.35,
        },
        lines: {
            start: ['Tiki-tiki-ta, arrancamos', 'La cumbia manda, dale', 'Ritmo y truco papá', 'Shh que suena', 'BUM BUM, vamos'],
            envido: ['Envido con ritmo', 'ENVIDO tiki-ta'],
            realEnvido: ['Real envido pa-pá'],
            faltaEnvido: ['FALTA ENVIDO boom boom'],
            envidoQuiero: ['Quiero que suene', 'Dale, va'],
            envidoNoQuiero: ['Nah, cambio de tema', 'Paso el track'],
            envidoWin: ['¡BOOM! Esos puntos suenan', 'Tiki-WIN'],
            envidoLose: ['Se desafinó...', 'Esa nota no era'],
            truco: ['¡TRUCO con flow!', 'Trucazo rítmico'],
            retruco: ['RETRUCO boom-bap'],
            valeCuatro: ['VALE CUATRO tiki-tiki-BOOM'],
            trucoQuiero: ['Quiero, dale que suena', 'Va ese beat'],
            trucoNoQuiero: ['Nah, silencio', 'Corto el tema'],
            winRound: ['¡Tiki-ta!', 'Boom!', 'Suena bien'],
            loseRound: ['Uy, desafinó', 'Se cortó el beat'],
            winHand: ['¡El ritmo siempre gana!', 'Boom boom papá'],
            loseHand: ['Se pinchó el parlante', 'Cambio de playlist...'],
            winGame: ['¡DJ BOOGIE CAMPEÓN!', 'La cumbia siempre gana'],
            loseGame: ['Bis bis revancha', 'El show debe continuar'],
            mazo: ['Se fue del baile', 'Chau, cortó el tema'],
        }
    },
    wachin: {
        name: 'WACHIN',
        role: 'Veterano del Pabellón',
        difficulty: 4,
        tier: 3,
        portrait: '../imagenes/wachin.png',
        placeholderPortrait: true,
        color: '#1ABC9C',
        background: '../imagenes/fondotruco1.png',
        lore: 'Heredó el apodo de su viejo, que también cayó por tramposo. Pero él no hace trampa: simplemente aprendió todos los trucos del oficio. El más respetado del pabellón.',
        bio: 'Su viejo era "El Wachin" original, leyenda del truco callejero. Cuando cayó él, heredó el nombre y la reputación. No hace trampa porque no la necesita. Conoce cada truco psicológico, cada forma de leer al rival. Es el jefe no oficial del pabellón. Todos le piden consejos.',
        mission: 'Wachin es completo: buen envido, buen truco, lee el bluff. No tiene punto débil obvio. Tenés que jugar tu mejor juego y esperar que las cartas te favorezcan.',
        traits: ['Respetado', 'Experimentado', 'Astuto'],
        skills: { agresividad: 3, farol: 3, envido: 3, estrategia: 3 },
        ai: {
            envidoAcceptThreshold: 21,
            envidoRaiseThreshold: 27,
            envidoRaiseChance: 0.45,
            trucoAcceptMinPower: 7,
            trucoBluffChance: 0.20,
            trucoProactiveChance: 0.35,
            trucoProactiveMinPower: 9,
            trucoRaiseChance: 0.35,
            trucoRaiseMinPower: 11,
            foldChance: 0.25,
            cardStrategy: 'strategic',
            randomVariance: 0,
            envidoCallThresholdHigh: 26,
            envidoCallChanceHigh: 0.6,
            envidoCallThresholdLow: 23,
            envidoCallChanceLow: 0.4,
        },
        lines: {
            start: ['Acá no se regala nada', 'Vení si te animás', 'Dale, mostrame qué tenés', 'El nombre se gana', 'A ver, nuevo...'],
            envido: ['Envido, guacho', 'ENVIDO, a ver'],
            realEnvido: ['Real envido, bancátela'],
            faltaEnvido: ['FALTA ENVIDO, todo o nada'],
            envidoQuiero: ['Quiero, mostrá', 'Va'],
            envidoNoQuiero: ['Paso... esta vez', 'No me cierra'],
            envidoWin: ['Así se juega acá adentro', '¿Aprendiste?'],
            envidoLose: ['Hmm, la tuviste', 'Esa no la esperaba'],
            truco: ['TRUCO, ¿te la bancás?', '¡Truco! Heredé el nombre, no la piedad'],
            retruco: ['RETRUCO, guacho'],
            valeCuatro: ['VALE CUATRO, última oportunidad'],
            trucoQuiero: ['Quiero, siempre quiero', 'Dale, vengo preparado'],
            trucoNoQuiero: ['No quiero... por ahora', 'Paso, ya vuelvo'],
            winRound: ['Así es acá', 'Tomá', '¿Viste?'],
            loseRound: ['Hmm, aprendiste', 'Esa estuvo bien'],
            winHand: ['El pabellón me enseñó', 'Nadie me gana dos veces'],
            loseHand: ['La próxima no te va tan bien', 'Bien... pero ojo'],
            winGame: ['El Wachin es el Wachin', 'Heredé el trono por algo'],
            loseGame: ['Revancha ya', 'Eso fue suerte, no talento'],
            mazo: ['Cobarde', 'Rajaste... típico', 'Flojo'],
        }
    },
    chino: {
        name: 'CHINO',
        role: 'El Estratega',
        difficulty: 4,
        tier: 4,
        portrait: '../imagenes/chino.png',
        placeholderPortrait: true,
        color: '#2ECC71',
        background: '../imagenes/fondotruco1.png',
        lore: 'Dicen que jugaba Go profesionalmente en Asia antes de terminar acá. Piensa tres jugadas adelante y nunca muestra emoción. El rival más difícil de leer.',
        bio: 'Llegó de Corea del Sur como importador de electrónicos. El negocio era fachada. Cayó por contrabando pero nunca delató a nadie. Aprendió truco en 6 meses y ya le gana a tipos que juegan hace décadas. Ve el juego como un tablero de Go: cada carta es una piedra, cada jugada construye hacia la victoria.',
        mission: 'Chino piensa a largo plazo. Te va a dejar ganar rondas para ganarte la mano. No te confíes con victorias tempranas. Forzalo a jugar reactivo, no le des tiempo a planear.',
        traits: ['Sereno', 'Estratégico', 'Paciente'],
        skills: { agresividad: 2, farol: 2, envido: 4, estrategia: 5 },
        ai: {
            envidoAcceptThreshold: 20,
            envidoRaiseThreshold: 26,
            envidoRaiseChance: 0.5,
            trucoAcceptMinPower: 7,
            trucoBluffChance: 0.15,
            trucoProactiveChance: 0.3,
            trucoProactiveMinPower: 9,
            trucoRaiseChance: 0.35,
            trucoRaiseMinPower: 11,
            foldChance: 0.2,
            cardStrategy: 'optimal',
            randomVariance: 0,
            envidoCallThresholdHigh: 26,
            envidoCallChanceHigh: 0.65,
            envidoCallThresholdLow: 23,
            envidoCallChanceLow: 0.45,
        },
        lines: {
            start: ['Tres jugadas adelante', 'Sentate, esto va a ser largo', 'Paciencia...', 'A ver qué nivel tenés', 'Cada carta cuenta'],
            envido: ['Envido.', 'Envido, ¿calculaste?'],
            realEnvido: ['Real envido. Pensalo bien.'],
            faltaEnvido: ['Falta envido. ¿Estás seguro?'],
            envidoQuiero: ['Quiero. Ya lo sabía.', 'Quiero.'],
            envidoNoQuiero: ['No. Los números dicen que no.', 'Paso.'],
            envidoWin: ['Calculado.', 'Tres jugadas adelante, te dije.'],
            envidoLose: ['Interesante...', 'No vi esa.'],
            truco: ['Truco.', 'Truco. Lo vi venir.'],
            retruco: ['Retruco. ¿Seguro?'],
            valeCuatro: ['Vale cuatro. Jaque.'],
            trucoQuiero: ['Quiero.', 'Dale.'],
            trucoNoQuiero: ['No. Estrategia.', 'Paso esta.'],
            winRound: ['Predecible.', 'Lo sabía.', 'Tres adelante.'],
            loseRound: ['Hmm.', 'Bien.'],
            winHand: ['La estrategia siempre gana', 'Imbatible al truco'],
            loseHand: ['Ajusto la estrategia...', 'Interesante oponente'],
            winGame: ['Mostrá tus cartas... ah, ya las vi', 'Nunca tuviste chance'],
            loseGame: ['Requiero revancha para recalcular', 'Imprevisto. Otra.'],
            mazo: ['Sabio.', 'Entendiste que no podías ganar.'],
        }
    },
    bignone: {
        name: 'BIGNONE',
        role: 'El Jefe Final',
        difficulty: 5,
        tier: 5,
        portrait: '../imagenes/bignone.png',
        color: '#E74C3C',
        background: '../imagenes/fondotruco1.png',
        lore: 'El viejo dictador del pabellón. Grita, insulta, pero juega como nadie. Lleva décadas adentro y nadie sabe exactamente por qué. Su ego es más grande que su condena.',
        bio: 'Bignone lleva más tiempo adentro que la mayoría de los guardias. Nadie pregunta por qué. Se autoproclamó "presidente" del pabellón y, de alguna forma, todos aceptaron. Controla todo: los cigarrillos, las visitas, las partidas de truco. Juega para humillar, no para ganar. Cada victoria es una demostración de poder.',
        mission: 'El jefe final. Bignone es agresivo, impredecible, y no acepta perder. Va a gritar, va a presionarte, va a intentar sacarte de tu juego. Mantené la calma. Usá su ego en su contra: aceptá sus trucos cuando tengas cartas buenas.',
        traits: ['Autoritario', 'Explosivo', 'Veterano'],
        skills: { agresividad: 5, farol: 4, envido: 3, estrategia: 3 },
        ai: {
            envidoAcceptThreshold: 19,
            envidoRaiseThreshold: 25,
            envidoRaiseChance: 0.6,
            trucoAcceptMinPower: 6,
            trucoBluffChance: 0.25,
            trucoProactiveChance: 0.50,
            trucoProactiveMinPower: 7,
            trucoRaiseChance: 0.5,
            trucoRaiseMinPower: 9,
            foldChance: 0.15,
            cardStrategy: 'aggressive',
            randomVariance: 2,
            envidoCallThresholdHigh: 25,
            envidoCallChanceHigh: 0.7,
            envidoCallThresholdLow: 22,
            envidoCallChanceLow: 0.5,
        },
        lines: {
            start: ['¡YO SOY EL PRESIDENTE!', '¡ARRANCÁ QUE NO TENGO TODO EL DÍA!', '¡VAMOS CARAJO!', '¡A VER QUIÉN MANDA ACÁ!', '¡ESTO ES MI MESA!'],
            envido: ['¡¡ENVIDO CARAJO!!', '¡ENVIDO! ¿QUÉ VAS A HACER?'],
            realEnvido: ['¡¡REAL ENVIDO!! ¡¡VAMOS!!'],
            faltaEnvido: ['¡¡FALTA ENVIDO!! ¡¡TODO O NADA CARAJO!!'],
            envidoQuiero: ['¡¡QUIERO!! ¡¡OBVIO QUE QUIERO!!', '¡¡SÍ SEÑOR!!'],
            envidoNoQuiero: ['¡¡NO QUIERO Y QUÉ!! ¡¡EH!!', '¡PASO PERO NO POR MIEDO!'],
            envidoWin: ['¡¡TOMÁAA!! ¡¡EL PRESIDENTE GANA!!', '¡¡JAJAJA MIS PUNTOS!!'],
            envidoLose: ['¡¡TRAMPA!! ¡¡ESTO ES TRAMPA!!', '¡¡IMPOSIBLE!!'],
            truco: ['¡¡¡TRUCOOOO!!!', '¡¡TRUCO CARAJO!! ¡¡DALE!!', '¿¿QUERÉS?? ¡¡TRUCO!!'],
            retruco: ['¡¡RETRUCO!! ¿¿TE LA BANCÁS??', '¡¡RETRUCOOO CARAJO!!'],
            valeCuatro: ['¡¡VALE CUATRO O NO SOS HOMBRE!!', '¡¡VALE CUATRO CARAJOOOO!!'],
            trucoQuiero: ['¡¡QUIERO!! ¡¡VENGAN DE A UNO!!', '¡¡SÍ SEÑOR QUIERO!!'],
            trucoNoQuiero: ['¡¡NO QUIERO PERO VOLVERÉ!!', '¡¡PASO ESTA VEZ!!'],
            winRound: ['¡¡TOMÁAA!!', '¡¡ASÍ SE GOBIERNA!!', '¡¡JAJAJA!!'],
            loseRound: ['¡¡QUÉ!!', '¡¡IMPOSIBLE!!', '¡¡TRAMPA!!'],
            winHand: ['¡¡EL PRESIDENTE SIEMPRE GANA!!', '¡¡ARRODILLATE!!'],
            loseHand: ['¡¡ESTO ES INADMISIBLE!!', '¡¡REVANCHA INMEDIATA!!'],
            winGame: ['¡¡SOY EL CAMPEÓN Y EL PRESIDENTE!!', '¡¡NUNCA TUVISTE CHANCE CONTRA MÍ!!'],
            loseGame: ['¡¡GOLPE DE ESTADO!! ¡¡REVANCHA!!', '¡¡HICISTE TRAMPA SEGURO!!'],
            mazo: ['¡¡COBARDE!! ¡¡VOLVÉ ACÁ!!', '¡¡ASÍ ME GUSTA, QUE TIEMBLEN!!'],
        }
    },
    xiao: {
        name: 'XIAO',
        role: 'La Sombra',
        difficulty: 5,
        tier: 4,
        portrait: '../imagenes/xiao.png',
        color: '#95A5A6',
        background: '../imagenes/fondotruco1.png',
        lore: 'Llegó de Shanghai sin hablar español. Ahora apenas habla, pero juega un truco letal. Sus silencios dicen más que mil palabras.',
        bio: 'Xiao llegó en un container junto con mercadería ilegal. Lo encontraron medio muerto y lo acusaron de tráfico. Nunca habló para defenderse. Aprendió español en el pabellón, pero prefiere no usarlo. Observa todo, procesa todo. Cuando juega truco, es como si supiera tus cartas.',
        mission: 'Xiao es casi imposible de leer. No reacciona, no muestra emoción. Tu única ventaja es que él tampoco puede leerte si mantenés la calma. Jugá random, confundilo.',
        traits: ['Misterioso', 'Letal', 'Silencioso'],
        skills: { agresividad: 3, farol: 4, envido: 4, estrategia: 5 },
        ai: {
            envidoAcceptThreshold: 18,
            envidoRaiseThreshold: 25,
            envidoRaiseChance: 0.55,
            trucoAcceptMinPower: 6,
            trucoBluffChance: 0.15,
            trucoProactiveChance: 0.35,
            trucoProactiveMinPower: 8,
            trucoRaiseChance: 0.4,
            trucoRaiseMinPower: 10,
            foldChance: 0.15,
            cardStrategy: 'optimal',
            randomVariance: 0,
            envidoCallThresholdHigh: 25,
            envidoCallChanceHigh: 0.7,
            envidoCallThresholdLow: 22,
            envidoCallChanceLow: 0.5,
        },
        lines: {
            start: ['...', 'Shanghai me enseñó paciencia', '...sentate', 'Las sombras juegan mejor', '...'],
            envido: ['Envido.', '...envido.'],
            realEnvido: ['Real envido.'],
            faltaEnvido: ['...falta envido.'],
            envidoQuiero: ['...quiero.', 'Sí.'],
            envidoNoQuiero: ['No.', '...'],
            envidoWin: ['...', 'Paciencia.'],
            envidoLose: ['...', 'Hmm.'],
            truco: ['Truco.', '...truco.'],
            retruco: ['Retruco.'],
            valeCuatro: ['Vale cuatro.'],
            trucoQuiero: ['Quiero.', '...sí.'],
            trucoNoQuiero: ['...no.', 'Paso.'],
            winRound: ['...', 'Hmm.'],
            loseRound: ['...'],
            winHand: ['No necesito cartas para ganar.', '...'],
            loseHand: ['...interesante.', '...'],
            winGame: ['Las sombras siempre ganan.', '...'],
            loseGame: ['...otra vez.', '...'],
            mazo: ['...sabio.', '...'],
        }
    }
};

// =====================================================
// LOCALSTORAGE PROGRESS HELPERS
// =====================================================
function getTrucoProgress() {
    try {
        return JSON.parse(localStorage.getItem('trucoProgress') || '{}');
    } catch (e) { return {}; }
}

// Legacy victory save (keeps track of all-time wins)
function saveTrucoVictory(rivalId) {
    const progress = getTrucoProgress();
    if (!progress.victories) progress.victories = {};
    progress.victories[rivalId] = (progress.victories[rivalId] || 0) + 1;

    // Calculate highest tier unlocked
    const defeated = Object.keys(progress.victories);
    let maxTier = 1;
    for (const id of defeated) {
        const opp = OPPONENTS[id];
        if (opp && opp.tier >= maxTier) maxTier = opp.tier + 1;
    }
    progress.highestTier = Math.min(maxTier, 5);
    localStorage.setItem('trucoProgress', JSON.stringify(progress));
    return progress;
}

// Tower mode: save victory in current run (sequential progression)
function saveTowerVictory(rivalId) {
    const progress = getTrucoProgress();

    // Initialize defeatedInRun array if not exists
    if (!progress.defeatedInRun) progress.defeatedInRun = [];

    // Add to defeated list if not already there
    if (!progress.defeatedInRun.includes(rivalId)) {
        progress.defeatedInRun.push(rivalId);
    }

    // Also track all-time victories
    if (!progress.victories) progress.victories = {};
    progress.victories[rivalId] = (progress.victories[rivalId] || 0) + 1;

    localStorage.setItem('trucoProgress', JSON.stringify(progress));
    return progress;
}

// Tower mode: reset all progress on loss (back to level 1)
function resetTowerProgress() {
    const progress = getTrucoProgress();

    // Clear the current run progress
    progress.defeatedInRun = [];

    // Keep all-time stats but reset current run
    localStorage.setItem('trucoProgress', JSON.stringify(progress));
    return progress;
}

// Get the current tower run progress
function getTowerDefeated() {
    const progress = getTrucoProgress();
    return progress.defeatedInRun || [];
}

// Check if a rival is next in sequence
function isRivalAvailable(rivalId) {
    const defeated = getTowerDefeated();
    const rival = OPPONENTS[rivalId];
    if (!rival) return false;

    // Get all rivals in this tier sorted by difficulty
    const tiersRivals = Object.entries(OPPONENTS)
        .filter(([_, r]) => r.tier === rival.tier)
        .sort((a, b) => a[1].difficulty - b[1].difficulty);

    // Check if previous tier is complete
    if (rival.tier > 1) {
        const prevTierRivals = Object.entries(OPPONENTS)
            .filter(([_, r]) => r.tier === rival.tier - 1);
        const prevTierComplete = prevTierRivals.every(([id]) => defeated.includes(id));
        if (!prevTierComplete) return false;
    }

    // Check if previous rivals in this tier are defeated
    for (const [id, _] of tiersRivals) {
        if (id === rivalId) return true;
        if (!defeated.includes(id)) return false;
    }

    return true;
}

function getHighestTier() {
    const p = getTrucoProgress();
    return p.highestTier || 1;
}

// =====================================================
// CARD STRATEGY FUNCTIONS
// =====================================================

// Basic: beat with lowest winner, dump lowest loser
function selectBasic(cpuHand, playerCard) {
    const pp = getPower(playerCard);
    const sorted = [...cpuHand].sort((a, b) => getPower(a) - getPower(b));
    return sorted.find(c => getPower(c) > pp) || sorted[0];
}

// Conservative: always play lowest card
function selectConservative(cpuHand, _playerCard) {
    const sorted = [...cpuHand].sort((a, b) => getPower(a) - getPower(b));
    return sorted[0];
}

// Aggressive: play highest card first
function selectAggressive(cpuHand, _playerCard) {
    const sorted = [...cpuHand].sort((a, b) => getPower(b) - getPower(a));
    return sorted[0];
}

// Strategic: play middle card first, save best for last
function selectStrategic(cpuHand, playerCard) {
    const pp = getPower(playerCard);
    const sorted = [...cpuHand].sort((a, b) => getPower(a) - getPower(b));

    if (cpuHand.length === 3) {
        // First round: play middle card
        return sorted[1];
    } else if (cpuHand.length === 2) {
        // Second round: play lowest that wins, else dump lowest
        return sorted.find(c => getPower(c) > pp) || sorted[0];
    }
    // Last card: only option
    return sorted[0];
}

// Optimal: calculate best play considering remaining rounds
function selectOptimal(cpuHand, playerCard, roundResults) {
    const pp = getPower(playerCard);
    const sorted = [...cpuHand].sort((a, b) => getPower(a) - getPower(b));

    if (cpuHand.length === 1) return cpuHand[0];

    const cpuWins = (roundResults || []).filter(r => r === 'cpu').length;
    const playerWins = (roundResults || []).filter(r => r === 'player').length;

    // If already won 1 round, just need 1 more — use minimum winner
    if (cpuWins >= 1) {
        const winner = sorted.find(c => getPower(c) > pp);
        return winner || sorted[0];
    }

    // If lost 1 round, must win remaining — use strongest that wins
    if (playerWins >= 1 && cpuHand.length >= 2) {
        const winners = sorted.filter(c => getPower(c) > pp);
        if (winners.length >= 1) {
            // Play lowest winner to save stronger cards
            return winners[0];
        }
        // Can't win this round, dump weakest
        return sorted[0];
    }

    // First round, no wins yet: play middle to probe
    if (cpuHand.length === 3) {
        const winner = sorted.find(c => getPower(c) > pp);
        if (winner && getPower(winner) === getPower(sorted[2])) {
            // Only strongest wins — save it, dump weakest
            return sorted[0];
        }
        return winner || sorted[1];
    }

    return sorted.find(c => getPower(c) > pp) || sorted[0];
}

function cpuSelectCard(cpuHand, playerCard, strategy, roundResults) {
    switch (strategy) {
        case 'conservative': return selectConservative(cpuHand, playerCard);
        case 'aggressive': return selectAggressive(cpuHand, playerCard);
        case 'strategic': return selectStrategic(cpuHand, playerCard);
        case 'optimal': return selectOptimal(cpuHand, playerCard, roundResults);
        default: return selectBasic(cpuHand, playerCard);
    }
}
