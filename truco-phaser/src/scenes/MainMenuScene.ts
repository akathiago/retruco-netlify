// =====================================================
// RETRUCO — MAIN MENU SCENE
// =====================================================

import * as Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT, COLORS, COLOR_HEX } from '../config';

export class MainMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainMenuScene' });
  }

  create(): void {
    // Background
    if (this.textures.exists('bg_menu')) {
      const bg = this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, 'bg_menu');
      bg.setDisplaySize(GAME_WIDTH, GAME_HEIGHT);
      bg.setAlpha(0.7);
    }

    // Dark overlay
    this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x000000, 0.5);

    // Title
    const title = this.add.text(GAME_WIDTH / 2, 150, 'RETRUCO', {
      fontFamily: 'Arial Black, Impact, sans-serif',
      fontSize: '72px',
      color: COLOR_HEX.CYAN,
      stroke: '#000000',
      strokeThickness: 8,
    });
    title.setOrigin(0.5);

    // Subtitle
    const subtitle = this.add.text(GAME_WIDTH / 2, 220, 'TRUCO ARGENTINO', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '24px',
      color: COLOR_HEX.WHITE,
    });
    subtitle.setOrigin(0.5);

    // Play button
    this.createButton(GAME_WIDTH / 2, 350, 'JUGAR', () => {
      this.cameras.main.fadeOut(300, 0, 0, 0);
      this.time.delayedCall(300, () => {
        this.scene.start('TowerSelectScene');
      });
    });

    // Tutorial button
    this.createButton(GAME_WIDTH / 2, 420, 'TUTORIAL', () => {
      // TODO: Implement tutorial
      console.log('Tutorial coming soon');
    });

    // Fade in
    this.cameras.main.fadeIn(500, 0, 0, 0);
  }

  private createButton(x: number, y: number, text: string, callback: () => void): void {
    const button = this.add.container(x, y);

    // Button background
    const bg = this.add.graphics();
    bg.fillStyle(COLORS.BUTTON_BG, 1);
    bg.fillRoundedRect(-100, -25, 200, 50, 10);
    bg.lineStyle(2, COLORS.CYAN, 1);
    bg.strokeRoundedRect(-100, -25, 200, 50, 10);

    // Button text
    const label = this.add.text(0, 0, text, {
      fontFamily: 'Arial Black, sans-serif',
      fontSize: '24px',
      color: COLOR_HEX.WHITE,
    });
    label.setOrigin(0.5);

    button.add([bg, label]);
    button.setSize(200, 50);
    button.setInteractive({ useHandCursor: true });

    // Hover effects
    button.on('pointerover', () => {
      bg.clear();
      bg.fillStyle(COLORS.CYAN, 0.3);
      bg.fillRoundedRect(-100, -25, 200, 50, 10);
      bg.lineStyle(3, COLORS.CYAN, 1);
      bg.strokeRoundedRect(-100, -25, 200, 50, 10);
      this.tweens.add({
        targets: button,
        scaleX: 1.05,
        scaleY: 1.05,
        duration: 100,
      });
    });

    button.on('pointerout', () => {
      bg.clear();
      bg.fillStyle(COLORS.BUTTON_BG, 1);
      bg.fillRoundedRect(-100, -25, 200, 50, 10);
      bg.lineStyle(2, COLORS.CYAN, 1);
      bg.strokeRoundedRect(-100, -25, 200, 50, 10);
      this.tweens.add({
        targets: button,
        scaleX: 1,
        scaleY: 1,
        duration: 100,
      });
    });

    button.on('pointerdown', callback);
  }
}
