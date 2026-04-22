// =====================================================
// RETRUCO — MAIN ENTRY POINT
// =====================================================

import * as Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT, COLORS } from './config';
import { BootScene } from './scenes/BootScene';
import { PreloadScene } from './scenes/PreloadScene';
import { MainMenuScene } from './scenes/MainMenuScene';
import { TowerSelectScene } from './scenes/TowerSelectScene';
import { GameScene } from './scenes/GameScene';
import { GameOverScene } from './scenes/GameOverScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  parent: 'game-container',
  backgroundColor: COLORS.DARK_BG,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [
    BootScene,
    PreloadScene,
    MainMenuScene,
    TowerSelectScene,
    GameScene,
    GameOverScene,
  ],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
  input: {
    activePointers: 1,
  },
  render: {
    pixelArt: false,
    antialias: true,
  },
};

// Initialize game
const game = new Phaser.Game(config);

// Export for debugging
(window as unknown as { game: Phaser.Game }).game = game;
