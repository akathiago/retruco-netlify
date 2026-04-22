// =====================================================
// RETRUCO — GAME CONSTANTS (Ported from shared.js)
// =====================================================

// Card suits
export const SUITS = ['espadas', 'bastos', 'copas', 'oros'] as const;
export type Suit = typeof SUITS[number];

// Card numbers (8 and 9 don't exist in Spanish deck for Truco)
export const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12] as const;
export type CardNumber = typeof NUMBERS[number];

// Suit symbols for fallback rendering
export const SUIT_SYMBOLS: Record<Suit, string> = {
  espadas: '\u{1F5E1}\uFE0F',
  bastos: '\u{1FAB5}',
  copas: '\u{1F3C6}',
  oros: '\u{1FA99}',
};

// Envido values (10, 11, 12 count as 0)
export const ENVIDO_VAL: Record<CardNumber, number> = {
  1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7,
  10: 0, 11: 0, 12: 0,
};

// Card power hierarchy (14 = highest, 1 = lowest)
// This is the heart of Argentine Truco ranking
export const POWER: Record<string, number> = {
  // Las matas (top 4)
  '1-espadas': 14,    // Ancho de espadas (highest)
  '1-bastos': 13,     // Ancho de bastos
  '7-espadas': 12,    // Siete de espadas
  '7-oros': 11,       // Siete de oros (7 brava)

  // Los tres
  '3-espadas': 10, '3-bastos': 10, '3-copas': 10, '3-oros': 10,

  // Los dos
  '2-espadas': 9, '2-bastos': 9, '2-copas': 9, '2-oros': 9,

  // As falso (copas y oros)
  '1-copas': 8, '1-oros': 8,

  // Figuras (12 = Rey, 11 = Caballo, 10 = Sota)
  '12-espadas': 7, '12-bastos': 7, '12-copas': 7, '12-oros': 7,
  '11-espadas': 6, '11-bastos': 6, '11-copas': 6, '11-oros': 6,
  '10-espadas': 5, '10-bastos': 5, '10-copas': 5, '10-oros': 5,

  // Siete falso (copas y bastos)
  '7-copas': 4, '7-bastos': 4,

  // Bajas
  '6-espadas': 3, '6-bastos': 3, '6-copas': 3, '6-oros': 3,
  '5-espadas': 2, '5-bastos': 2, '5-copas': 2, '5-oros': 2,
  '4-espadas': 1, '4-bastos': 1, '4-copas': 1, '4-oros': 1,
};

// Truco escalation levels
export const TRUCO_LEVELS = [
  { name: 'TRUCO', points: 2 },
  { name: 'RETRUCO', points: 3 },
  { name: 'VALE CUATRO', points: 4 },
] as const;

// Envido escalation levels
export const ENVIDO_LEVELS = [
  { name: 'ENVIDO', points: 2 },
  { name: 'REAL ENVIDO', points: 3 },
  { name: 'FALTA ENVIDO', points: 'falta' as const },
] as const;

// Game end score
export const WINNING_SCORE = 15;

// Card interface
export interface Card {
  number: CardNumber;
  suit: Suit;
  key: string;
}

// Round result
export type RoundResult = 'player' | 'cpu' | 'tie';

// Game phase
export enum GamePhase {
  DEAL = 'deal',
  ENVIDO_AVAILABLE = 'envidoAvailable',
  ENVIDO_RESPONSE = 'envidoResponse',
  TRUCO_RESPONSE = 'trucoResponse',
  PLAYER_TURN = 'playerTurn',
  CPU_TURN = 'cpuTurn',
  RESOLVE_ROUND = 'resolveRound',
  END_HAND = 'endHand',
  END_GAME = 'endGame',
}

// Dialogue categories
export const DIALOGUE_CATEGORIES = [
  'start',
  'envido',
  'realEnvido',
  'faltaEnvido',
  'envidoQuiero',
  'envidoNoQuiero',
  'envidoWin',
  'envidoLose',
  'truco',
  'retruco',
  'valeCuatro',
  'trucoQuiero',
  'trucoNoQuiero',
  'winRound',
  'loseRound',
  'winHand',
  'loseHand',
  'winGame',
  'loseGame',
  'mazo',
] as const;

export type DialogueCategory = typeof DIALOGUE_CATEGORIES[number];
