// =====================================================
// RETRUCO — TRUCO RULES ENGINE (Ported from shared.js)
// =====================================================

import { Card, Suit, CardNumber, SUITS, NUMBERS, POWER, ENVIDO_VAL } from './constants';

/**
 * Create a full deck of 40 Spanish cards
 */
export function createDeck(): Card[] {
  const deck: Card[] = [];
  for (const suit of SUITS) {
    for (const num of NUMBERS) {
      deck.push({
        number: num,
        suit: suit,
        key: `${num}-${suit}`,
      });
    }
  }
  return deck;
}

/**
 * Fisher-Yates shuffle
 */
export function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Get the power ranking of a card (14 = highest, 1 = lowest)
 */
export function getPower(card: Card): number {
  return POWER[card.key] || 0;
}

/**
 * Calculate envido value for a hand
 * - If 2+ cards of same suit: 20 + sum of 2 highest values
 * - Otherwise: highest single card value
 *
 * Card values for envido:
 * - 1-7: face value
 * - 10, 11, 12: 0
 */
export function calcEnvido(hand: Card[]): number {
  // Group cards by suit
  const bySuit: Record<string, Card[]> = {};
  for (const card of hand) {
    if (!bySuit[card.suit]) {
      bySuit[card.suit] = [];
    }
    bySuit[card.suit].push(card);
  }

  let best = 0;

  for (const suit of SUITS) {
    const cards = bySuit[suit];
    if (!cards) continue;

    // If 2+ cards of same suit
    if (cards.length >= 2) {
      const vals = cards
        .map(c => ENVIDO_VAL[c.number])
        .sort((a, b) => b - a);
      const pairScore = 20 + vals[0] + vals[1];
      if (pairScore > best) {
        best = pairScore;
      }
    }

    // Also consider single cards
    for (const card of cards) {
      const single = ENVIDO_VAL[card.number];
      if (single > best) {
        best = single;
      }
    }
  }

  return best;
}

/**
 * Compare two cards and determine winner
 * @returns 'first' if first card wins, 'second' if second wins, 'tie' if equal
 */
export function compareCards(first: Card, second: Card): 'first' | 'second' | 'tie' {
  const p1 = getPower(first);
  const p2 = getPower(second);

  if (p1 > p2) return 'first';
  if (p2 > p1) return 'second';
  return 'tie';
}

/**
 * Determine hand winner based on round results
 * Argentine Truco rules:
 * - First to win 2 rounds wins
 * - If 1-1 tie, third round decides
 * - If all rounds tied, first player (mano) wins
 */
export function determineHandWinner(
  roundResults: ('player' | 'cpu' | 'tie')[],
  manoPlayer: 'player' | 'cpu' = 'player'
): 'player' | 'cpu' | null {
  const playerWins = roundResults.filter(r => r === 'player').length;
  const cpuWins = roundResults.filter(r => r === 'cpu').length;

  // Clear winner with 2+ rounds
  if (playerWins >= 2) return 'player';
  if (cpuWins >= 2) return 'cpu';

  // All 3 rounds played
  if (roundResults.length >= 3) {
    if (playerWins > cpuWins) return 'player';
    if (cpuWins > playerWins) return 'cpu';

    // All ties or equal wins: mano advantage
    // First non-tie round determines winner
    for (const result of roundResults) {
      if (result !== 'tie') {
        return result;
      }
    }

    // All ties: mano wins
    return manoPlayer;
  }

  // Hand not decided yet
  return null;
}

/**
 * Calculate Falta Envido points
 * In Falta Envido, the winner gets all points needed to win the game
 */
export function calcFaltaEnvidoPoints(
  currentScore: number,
  winningScore: number
): number {
  return winningScore - currentScore;
}
