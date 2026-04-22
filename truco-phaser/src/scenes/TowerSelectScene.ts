// =====================================================
// RETRUCO — TOWER SELECT SCENE
// =====================================================

import * as Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT, COLORS, COLOR_HEX } from '../config';
import { OPPONENTS } from '../data/opponents';

export class TowerSelectScene extends Phaser.Scene {
  private selectedRival: string | null = null;

  constructor() {
    super({ key: 'TowerSelectScene' });
  }

  create(): void {
    // Background
    this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, COLORS.DARK_BG);

    // Title
    const title = this.add.text(GAME_WIDTH / 2, 40, 'LA TORRE', {
      fontFamily: 'Arial Black, Impact, sans-serif',
      fontSize: '36px',
      color: COLOR_HEX.CYAN,
      stroke: '#000000',
      strokeThickness: 4,
    });
    title.setOrigin(0.5);

    // Subtitle
    const subtitle = this.add.text(GAME_WIDTH / 2, 75, 'ELEGÍ TU RIVAL', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '16px',
      color: '#888888',
    });
    subtitle.setOrigin(0.5);

    // Create opponent cards
    this.createOpponentGrid();

    // Back button
    this.createBackButton();

    // Fade in
    this.cameras.main.fadeIn(300, 0, 0, 0);
  }

  private createOpponentGrid(): void {
    const opponents = Object.entries(OPPONENTS);
    const cols = 5;
    const cardWidth = 120;
    const cardHeight = 150;
    const paddingX = 30;
    const paddingY = 20;
    const startX = (GAME_WIDTH - (cols * cardWidth + (cols - 1) * paddingX)) / 2 + cardWidth / 2;
    const startY = 160;

    opponents.forEach(([id, opp], index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      const x = startX + col * (cardWidth + paddingX);
      const y = startY + row * (cardHeight + paddingY);

      this.createOpponentCard(x, y, id, opp, cardWidth, cardHeight);
    });
  }

  private createOpponentCard(
    x: number,
    y: number,
    id: string,
    opp: typeof OPPONENTS[keyof typeof OPPONENTS],
    width: number,
    height: number
  ): void {
    const card = this.add.container(x, y);

    // Card background
    const bg = this.add.graphics();
    bg.fillStyle(COLORS.BUTTON_BG, 1);
    bg.fillRoundedRect(-width / 2, -height / 2, width, height, 8);
    bg.lineStyle(2, opp.color, 1);
    bg.strokeRoundedRect(-width / 2, -height / 2, width, height, 8);

    // Portrait (if exists)
    const portraitKey = `portrait_${id}`;
    if (this.textures.exists(portraitKey)) {
      const portrait = this.add.image(0, -20, portraitKey);
      portrait.setDisplaySize(60, 60);
      card.add(portrait);
    } else {
      // Placeholder
      const placeholder = this.add.circle(0, -20, 30, opp.color, 0.5);
      card.add(placeholder);
    }

    // Name
    const name = this.add.text(0, 35, opp.name, {
      fontFamily: 'Arial Black, sans-serif',
      fontSize: '12px',
      color: COLOR_HEX.WHITE,
    });
    name.setOrigin(0.5);

    // Role
    const role = this.add.text(0, 50, opp.role, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '9px',
      color: '#888888',
    });
    role.setOrigin(0.5);

    // Difficulty stars
    const stars = this.add.text(0, 65, '★'.repeat(opp.difficulty) + '☆'.repeat(5 - opp.difficulty), {
      fontFamily: 'Arial, sans-serif',
      fontSize: '10px',
      color: COLOR_HEX.GOLD,
    });
    stars.setOrigin(0.5);

    card.add([bg, name, role, stars]);
    card.setSize(width, height);
    card.setInteractive({ useHandCursor: true });

    // Hover effects
    card.on('pointerover', () => {
      bg.clear();
      bg.fillStyle(opp.color, 0.3);
      bg.fillRoundedRect(-width / 2, -height / 2, width, height, 8);
      bg.lineStyle(3, opp.color, 1);
      bg.strokeRoundedRect(-width / 2, -height / 2, width, height, 8);
      this.tweens.add({
        targets: card,
        y: y - 5,
        duration: 100,
      });
    });

    card.on('pointerout', () => {
      bg.clear();
      bg.fillStyle(COLORS.BUTTON_BG, 1);
      bg.fillRoundedRect(-width / 2, -height / 2, width, height, 8);
      bg.lineStyle(2, opp.color, 1);
      bg.strokeRoundedRect(-width / 2, -height / 2, width, height, 8);
      this.tweens.add({
        targets: card,
        y: y,
        duration: 100,
      });
    });

    card.on('pointerdown', () => {
      this.startGame(id);
    });
  }

  private createBackButton(): void {
    const button = this.add.text(50, GAME_HEIGHT - 40, '← VOLVER', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '16px',
      color: COLOR_HEX.CYAN,
    });
    button.setInteractive({ useHandCursor: true });

    button.on('pointerover', () => {
      button.setColor(COLOR_HEX.WHITE);
    });

    button.on('pointerout', () => {
      button.setColor(COLOR_HEX.CYAN);
    });

    button.on('pointerdown', () => {
      this.cameras.main.fadeOut(300, 0, 0, 0);
      this.time.delayedCall(300, () => {
        this.scene.start('MainMenuScene');
      });
    });
  }

  private startGame(rivalId: string): void {
    this.cameras.main.fadeOut(300, 0, 0, 0);
    this.time.delayedCall(300, () => {
      this.scene.start('GameScene', { rivalId });
    });
  }
}
