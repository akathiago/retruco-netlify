// =====================================================
// RETRUCO — GAME CONFIGURATION
// =====================================================

export const GAME_WIDTH = 800;
export const GAME_HEIGHT = 600;

// Colors from the original ReTruco identity
export const COLORS = {
  // Primary
  CYAN: 0x2bb8cd,
  DARK_BG: 0x0a0a0a,
  LIGHT_TEXT: 0xe0f7fa,

  // Accents
  GOLD: 0xffd700,
  GREEN: 0x2ecc71,
  RED: 0xff4757,
  BLOOD_RED: 0x8b0000,

  // UI
  BUTTON_BG: 0x1a1a2e,
  BUTTON_HOVER: 0x16213e,
  OVERLAY_BG: 0x000000,

  // Cards
  CARD_BG: 0xf5f0e1,
  CARD_BORDER: 0x333333,
} as const;

// Color hex strings for text
export const COLOR_HEX = {
  CYAN: '#2bb8cd',
  WHITE: '#ffffff',
  GOLD: '#ffd700',
  GREEN: '#2ecc71',
  RED: '#ff4757',
} as const;

// Animation timing
export const TIMING = {
  CARD_DEAL: 150,
  CARD_PLAY: 300,
  CARD_FLIP: 200,
  SPEECH_BUBBLE: 2500,
  CALL_OVERLAY: 1500,
  ROUND_DELAY: 800,
  CPU_THINK_MIN: 500,
  CPU_THINK_MAX: 1500,
} as const;

// Card dimensions (scaled from 1500x2400 originals)
export const CARD = {
  WIDTH: 100,
  HEIGHT: 160,
  SCALE: 0.067, // 100/1500
  SPACING: 20,
} as const;

// Layout positions
export const LAYOUT = {
  // Player hand (bottom)
  PLAYER_HAND_Y: 500,

  // CPU hand (top)
  CPU_HAND_Y: 80,

  // Play pile (center)
  PLAY_PILE_Y: 290,
  PLAY_PILE_PLAYER_X: 350,
  PLAY_PILE_CPU_X: 450,

  // Score display
  SCORE_Y: 20,

  // Opponent portrait
  PORTRAIT_X: 700,
  PORTRAIT_Y: 150,

  // Speech bubble
  SPEECH_X: 580,
  SPEECH_Y: 260,

  // Action bar
  ACTION_BAR_Y: 420,

  // Message
  MESSAGE_Y: 350,
} as const;

// Asset paths (relative to public/)
export const ASSETS = {
  CARDS_PATH: 'assets/cards/',
  CHARACTERS_PATH: 'assets/characters/',
  BACKGROUNDS_PATH: 'assets/backgrounds/',
  FONTS_PATH: 'assets/fonts/',
  AUDIO_PATH: 'assets/audio/',
} as const;

// Suits mapping
export const SUIT_FOLDER: Record<string, string> = {
  espadas: 'Espada',
  bastos: 'Basto',
  copas: 'Copa',
  oros: 'Oro',
};

export const SUIT_NAME: Record<string, string> = {
  espadas: 'Espada',
  bastos: 'Basto',
  copas: 'Copa',
  oros: 'Oro',
};
