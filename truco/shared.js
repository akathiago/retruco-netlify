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
// CARD IMAGES — auto-detect available PNGs
// =====================================================
const CARD_IMAGES = {};
const _cardBasePath = (typeof CARD_BASE_PATH !== 'undefined') ? CARD_BASE_PATH : 'cartas/';

(function detectCards() {
    for (const s of SUITS) {
        for (const n of NUMBERS) {
            const key = `${n}-${s}`;
            const file = `${_cardBasePath}${n}${SUIT_FILE[s]}.png`;
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
    const clickHandler = playable ? `onclick="playCard('${card.key}')"` : '';

    if (imgSrc) {
        return `<div class="card card-img ${playableClass}" data-key="${card.key}" ${clickHandler}>
            <img src="${imgSrc}" alt="${card.number} de ${card.suit}" draggable="false">
            <div class="card-shine"></div>
        </div>`;
    }

    const sym = SUIT_SYMBOLS[card.suit];
    const faceNumber = card.number === 10 ? '10' : card.number === 11 ? 'S' : card.number === 12 ? 'R' : card.number;

    return `<div class="card ${playableClass} suit-${card.suit}" data-key="${card.key}" ${clickHandler}>
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
        role: 'El Viejo Exaltado',
        difficulty: 5,
        tier: 5,
        portrait: '../imagenes/bignone.png',
        color: '#E74C3C',
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
        role: 'El Chino',
        difficulty: 5,
        tier: 5,
        portrait: '../imagenes/xiao.png',
        color: '#95A5A6',
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
