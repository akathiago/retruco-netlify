// =====================================================
// RETRUCO — PRELOAD SCENE
// =====================================================

import * as Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT, COLORS, COLOR_HEX, ASSETS, SUIT_FOLDER, SUIT_NAME } from '../config';
import { SUITS, NUMBERS } from '../core/constants';

export class PreloadScene extends Phaser.Scene {
  private progressBar!: Phaser.GameObjects.Graphics;
  private progressBox!: Phaser.GameObjects.Graphics;
  private loadingText!: Phaser.GameObjects.Text;
  private percentText!: Phaser.GameObjects.Text;
  private assetText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload(): void {
    this.createLoadingUI();
    this.setupLoadingEvents();
    this.loadAssets();
  }

  private createLoadingUI(): void {
    const centerX = GAME_WIDTH / 2;
    const centerY = GAME_HEIGHT / 2;

    // Progress box (background)
    this.progressBox = this.add.graphics();
    this.progressBox.fillStyle(0x222222, 0.8);
    this.progressBox.fillRoundedRect(centerX - 160, centerY - 15, 320, 50, 10);

    // Progress bar (fill)
    this.progressBar = this.add.graphics();

    // Loading text
    this.loadingText = this.add.text(centerX, centerY - 50, 'CARGANDO...', {
      fontFamily: 'Arial Black, Impact, sans-serif',
      fontSize: '24px',
      color: COLOR_HEX.CYAN,
    });
    this.loadingText.setOrigin(0.5);

    // Percentage text
    this.percentText = this.add.text(centerX, centerY + 10, '0%', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '20px',
      color: COLOR_HEX.WHITE,
    });
    this.percentText.setOrigin(0.5);

    // Asset text
    this.assetText = this.add.text(centerX, centerY + 60, '', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      color: '#888888',
    });
    this.assetText.setOrigin(0.5);
  }

  private setupLoadingEvents(): void {
    this.load.on('progress', (value: number) => {
      this.percentText.setText(`${Math.floor(value * 100)}%`);

      this.progressBar.clear();
      this.progressBar.fillStyle(COLORS.CYAN, 1);
      this.progressBar.fillRoundedRect(
        GAME_WIDTH / 2 - 150,
        GAME_HEIGHT / 2 - 5,
        300 * value,
        30,
        5
      );
    });

    this.load.on('fileprogress', (file: Phaser.Loader.File) => {
      this.assetText.setText(file.key);
    });

    this.load.on('complete', () => {
      this.progressBar.destroy();
      this.progressBox.destroy();
      this.loadingText.destroy();
      this.percentText.destroy();
      this.assetText.destroy();
    });
  }

  private loadAssets(): void {
    // Load all 40 playing cards
    for (const suit of SUITS) {
      for (const num of NUMBERS) {
        const key = `card_${num}_${suit}`;
        const folder = SUIT_FOLDER[suit];
        const name = SUIT_NAME[suit];
        const path = `${ASSETS.CARDS_PATH}${folder}/${num} de ${name}.png`;
        this.load.image(key, path);
      }
    }

    // Card back
    this.load.image('card_back', `${ASSETS.CARDS_PATH}Atras.png`);

    // Character portraits
    const characters = [
      'abraham', 'alfredito', 'aliado', 'dario', 'momo',
      'littleboogie', 'wachin', 'chino', 'xiao', 'bignone', 'cesar'
    ];
    for (const char of characters) {
      this.load.image(`portrait_${char}`, `${ASSETS.CHARACTERS_PATH}${char}.png`);
    }

    // Backgrounds
    this.load.image('bg_game', `${ASSETS.BACKGROUNDS_PATH}fondotruco1.png`);
    this.load.image('bg_menu', `${ASSETS.BACKGROUNDS_PATH}fondoretrucoweb.png`);

    // UI elements (will create procedurally if not available)
  }

  create(): void {
    // Short delay then go to menu
    this.time.delayedCall(300, () => {
      this.scene.start('MainMenuScene');
    });
  }
}
