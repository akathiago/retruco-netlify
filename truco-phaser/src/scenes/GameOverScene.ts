// =====================================================
// RETRUCO — GAME OVER SCENE
// =====================================================

import * as Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT, COLORS, COLOR_HEX } from '../config';
import { OPPONENTS } from '../data/opponents';

interface GameOverData {
  winner: 'player' | 'cpu';
  playerScore: number;
  cpuScore: number;
  rivalId: string;
}

export class GameOverScene extends Phaser.Scene {
  private data!: GameOverData;

  constructor() {
    super({ key: 'GameOverScene' });
  }

  init(data: GameOverData): void {
    this.data = data;
  }

  create(): void {
    const opponent = OPPONENTS[this.data.rivalId] || OPPONENTS.alfredito;

    // Background
    this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, COLORS.DARK_BG);

    // Result text
    const isWin = this.data.winner === 'player';
    const resultText = isWin ? '¡GANASTE!' : 'PERDISTE...';
    const resultColor = isWin ? COLOR_HEX.GREEN : COLOR_HEX.RED;

    const title = this.add.text(GAME_WIDTH / 2, 150, resultText, {
      fontFamily: 'Arial Black, Impact, sans-serif',
      fontSize: '64px',
      color: resultColor,
      stroke: '#000000',
      strokeThickness: 6,
    });
    title.setOrigin(0.5);

    // Score
    const scoreText = this.add.text(
      GAME_WIDTH / 2,
      230,
      `VOS ${this.data.playerScore} - ${this.data.cpuScore} ${opponent.name}`,
      {
        fontFamily: 'Arial, sans-serif',
        fontSize: '28px',
        color: COLOR_HEX.WHITE,
      }
    );
    scoreText.setOrigin(0.5);

    // Opponent portrait
    const portraitKey = `portrait_${this.data.rivalId}`;
    if (this.textures.exists(portraitKey)) {
      const portrait = this.add.image(GAME_WIDTH / 2, 330, portraitKey);
      portrait.setDisplaySize(80, 80);
    }

    // Message from opponent
    const lines = isWin ? opponent.lines.loseGame : opponent.lines.winGame;
    const line = Phaser.Utils.Array.GetRandom(lines || ['...']);

    const speechBubble = this.add.text(GAME_WIDTH / 2, 400, `"${line}"`, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '16px',
      color: '#aaaaaa',
      fontStyle: 'italic',
    });
    speechBubble.setOrigin(0.5);

    // Buttons
    this.createButton(GAME_WIDTH / 2 - 110, 500, 'REVANCHA', () => {
      this.scene.start('GameScene', { rivalId: this.data.rivalId });
    });

    this.createButton(GAME_WIDTH / 2 + 110, 500, 'TORRE', () => {
      this.scene.start('TowerSelectScene');
    });

    // Fade in
    this.cameras.main.fadeIn(500, 0, 0, 0);
  }

  private createButton(x: number, y: number, text: string, callback: () => void): void {
    const button = this.add.container(x, y);

    const bg = this.add.graphics();
    bg.fillStyle(COLORS.BUTTON_BG, 1);
    bg.fillRoundedRect(-80, -20, 160, 40, 8);
    bg.lineStyle(2, COLORS.CYAN, 1);
    bg.strokeRoundedRect(-80, -20, 160, 40, 8);

    const label = this.add.text(0, 0, text, {
      fontFamily: 'Arial Black, sans-serif',
      fontSize: '18px',
      color: COLOR_HEX.WHITE,
    });
    label.setOrigin(0.5);

    button.add([bg, label]);
    button.setSize(160, 40);
    button.setInteractive({ useHandCursor: true });

    button.on('pointerover', () => {
      bg.clear();
      bg.fillStyle(COLORS.CYAN, 0.3);
      bg.fillRoundedRect(-80, -20, 160, 40, 8);
      bg.lineStyle(2, COLORS.CYAN, 1);
      bg.strokeRoundedRect(-80, -20, 160, 40, 8);
    });

    button.on('pointerout', () => {
      bg.clear();
      bg.fillStyle(COLORS.BUTTON_BG, 1);
      bg.fillRoundedRect(-80, -20, 160, 40, 8);
      bg.lineStyle(2, COLORS.CYAN, 1);
      bg.strokeRoundedRect(-80, -20, 160, 40, 8);
    });

    button.on('pointerdown', callback);
  }
}
