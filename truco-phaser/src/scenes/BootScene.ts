// =====================================================
// RETRUCO — BOOT SCENE
// =====================================================

import * as Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT, COLORS, COLOR_HEX } from '../config';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload(): void {
    // Load only essential assets for the preloader
    // Logo and loading bar graphics will be created procedurally
  }

  create(): void {
    // Display quick loading text
    const text = this.add.text(
      GAME_WIDTH / 2,
      GAME_HEIGHT / 2,
      'RETRUCO',
      {
        fontFamily: 'Arial Black, Impact, sans-serif',
        fontSize: '48px',
        color: COLOR_HEX.CYAN,
        stroke: '#000000',
        strokeThickness: 4,
      }
    );
    text.setOrigin(0.5);

    // Fade in and transition
    this.cameras.main.fadeIn(300, 0, 0, 0);

    this.time.delayedCall(500, () => {
      this.scene.start('PreloadScene');
    });
  }
}
