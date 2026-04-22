// =====================================================
// RETRUCO — GAME SCENE (Main Gameplay)
// =====================================================

import * as Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT, COLORS, COLOR_HEX, LAYOUT, CARD } from '../config';
import { OPPONENTS, Opponent } from '../data/opponents';
import { Card, GamePhase, WINNING_SCORE } from '../core/constants';
import { createDeck, shuffle, getPower, calcEnvido } from '../core/TrucoRules';

export class GameScene extends Phaser.Scene {
  // Game state
  private rivalId!: string;
  private opponent!: Opponent;
  private playerScore = 0;
  private cpuScore = 0;
  private currentPhase: GamePhase = GamePhase.DEAL;

  // Cards
  private deck: Card[] = [];
  private playerHand: Card[] = [];
  private cpuHand: Card[] = [];
  private playerCardSprites: Phaser.GameObjects.Container[] = [];
  private cpuCardSprites: Phaser.GameObjects.Container[] = [];

  // Round state
  private currentRound = 0;
  private roundResults: ('player' | 'cpu' | 'tie')[] = [];
  private playerTurn = true;
  private handPoints = 1;

  // Truco state
  private trucoLevel = -1;
  private envidoLevel = -1;
  private envidoResolved = false;

  // UI elements
  private scoreText!: Phaser.GameObjects.Text;
  private messageText!: Phaser.GameObjects.Text;
  private opponentPortrait!: Phaser.GameObjects.Image;
  private speechBubble!: Phaser.GameObjects.Container;

  constructor() {
    super({ key: 'GameScene' });
  }

  init(data: { rivalId: string }): void {
    this.rivalId = data.rivalId || 'alfredito';
    this.opponent = OPPONENTS[this.rivalId] || OPPONENTS.alfredito;
    this.playerScore = 0;
    this.cpuScore = 0;
  }

  create(): void {
    this.createBackground();
    this.createUI();
    this.createOpponentDisplay();
    this.createActionBar();

    // Start the game
    this.deal();

    // Fade in
    this.cameras.main.fadeIn(300, 0, 0, 0);
  }

  private createBackground(): void {
    if (this.textures.exists('bg_game')) {
      const bg = this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, 'bg_game');
      bg.setDisplaySize(GAME_WIDTH, GAME_HEIGHT);
    } else {
      this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x1a472a);
    }

    // Overlay for better card visibility
    this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x000000, 0.3);
  }

  private createUI(): void {
    // Score display
    this.scoreText = this.add.text(GAME_WIDTH / 2, LAYOUT.SCORE_Y, '', {
      fontFamily: 'Arial Black, sans-serif',
      fontSize: '24px',
      color: COLOR_HEX.WHITE,
      stroke: '#000000',
      strokeThickness: 3,
    });
    this.scoreText.setOrigin(0.5, 0);
    this.updateScoreDisplay();

    // Message text
    this.messageText = this.add.text(GAME_WIDTH / 2, LAYOUT.MESSAGE_Y, '', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '18px',
      color: COLOR_HEX.CYAN,
      stroke: '#000000',
      strokeThickness: 2,
    });
    this.messageText.setOrigin(0.5);
  }

  private createOpponentDisplay(): void {
    // Portrait
    const portraitKey = `portrait_${this.rivalId}`;
    if (this.textures.exists(portraitKey)) {
      this.opponentPortrait = this.add.image(LAYOUT.PORTRAIT_X, LAYOUT.PORTRAIT_Y, portraitKey);
      this.opponentPortrait.setDisplaySize(100, 100);
    }

    // Name
    this.add.text(LAYOUT.PORTRAIT_X, LAYOUT.PORTRAIT_Y + 60, this.opponent.name, {
      fontFamily: 'Arial Black, sans-serif',
      fontSize: '14px',
      color: COLOR_HEX.WHITE,
    }).setOrigin(0.5);

    // Speech bubble container
    this.speechBubble = this.add.container(LAYOUT.SPEECH_X, LAYOUT.SPEECH_Y);
    this.speechBubble.setVisible(false);
  }

  private createActionBar(): void {
    // Action buttons will be created dynamically based on game state
    // This is a placeholder - will be implemented in Phase 7
  }

  private updateScoreDisplay(): void {
    this.scoreText.setText(`VOS ${this.playerScore} - ${this.cpuScore} ${this.opponent.name}`);
  }

  private setMessage(text: string): void {
    this.messageText.setText(text);
  }

  // =====================================================
  // GAME FLOW
  // =====================================================

  private deal(): void {
    // Create and shuffle deck
    this.deck = shuffle(createDeck());

    // Deal 3 cards each
    this.playerHand = this.deck.splice(0, 3);
    this.cpuHand = this.deck.splice(0, 3);

    // Reset round state
    this.currentRound = 0;
    this.roundResults = [];
    this.playerTurn = true;
    this.handPoints = 1;
    this.trucoLevel = -1;
    this.envidoLevel = -1;
    this.envidoResolved = false;

    // Clear previous cards
    this.clearCardSprites();

    // Render hands
    this.renderPlayerHand();
    this.renderCpuHand();

    // Opponent start dialogue
    this.opponentSay('start');

    // Set phase
    this.currentPhase = GamePhase.PLAYER_TURN;
    this.setMessage('ELEGÍ UNA CARTA');
  }

  private clearCardSprites(): void {
    this.playerCardSprites.forEach(s => s.destroy());
    this.cpuCardSprites.forEach(s => s.destroy());
    this.playerCardSprites = [];
    this.cpuCardSprites = [];
  }

  private renderPlayerHand(): void {
    const startX = GAME_WIDTH / 2 - (this.playerHand.length - 1) * (CARD.WIDTH + CARD.SPACING) / 2;

    this.playerHand.forEach((card, index) => {
      const x = startX + index * (CARD.WIDTH + CARD.SPACING);
      const sprite = this.createCardSprite(card, x, LAYOUT.PLAYER_HAND_Y, true);
      this.playerCardSprites.push(sprite);
    });
  }

  private renderCpuHand(): void {
    const startX = GAME_WIDTH / 2 - (this.cpuHand.length - 1) * (CARD.WIDTH + CARD.SPACING) / 2;

    this.cpuHand.forEach((card, index) => {
      const x = startX + index * (CARD.WIDTH + CARD.SPACING);
      // CPU cards show back
      const sprite = this.createCardSprite(card, x, LAYOUT.CPU_HAND_Y, false, true);
      this.cpuCardSprites.push(sprite);
    });
  }

  private createCardSprite(
    card: Card,
    x: number,
    y: number,
    playable: boolean,
    showBack = false
  ): Phaser.GameObjects.Container {
    const container = this.add.container(x, y);

    // Card image
    const textureKey = showBack ? 'card_back' : `card_${card.number}_${card.suit}`;
    let cardImage: Phaser.GameObjects.Image | Phaser.GameObjects.Rectangle;

    if (this.textures.exists(textureKey)) {
      cardImage = this.add.image(0, 0, textureKey);
      cardImage.setDisplaySize(CARD.WIDTH, CARD.HEIGHT);
    } else {
      // Fallback: create simple card
      cardImage = this.add.rectangle(0, 0, CARD.WIDTH, CARD.HEIGHT, COLORS.CARD_BG);
      (cardImage as Phaser.GameObjects.Rectangle).setStrokeStyle(2, COLORS.CARD_BORDER);

      // Add text for card value
      if (!showBack) {
        const cardText = this.add.text(0, 0, `${card.number}\n${card.suit.charAt(0).toUpperCase()}`, {
          fontFamily: 'Arial, sans-serif',
          fontSize: '14px',
          color: '#000000',
          align: 'center',
        });
        cardText.setOrigin(0.5);
        container.add(cardText);
      }
    }

    container.add(cardImage);
    container.setSize(CARD.WIDTH, CARD.HEIGHT);
    container.setData('card', card);
    container.setData('playable', playable);

    if (playable) {
      container.setInteractive({ useHandCursor: true, draggable: true });
      this.setupCardInteraction(container);
    }

    return container;
  }

  private setupCardInteraction(container: Phaser.GameObjects.Container): void {
    const startY = container.y;

    container.on('pointerover', () => {
      if (this.currentPhase !== GamePhase.PLAYER_TURN) return;
      this.tweens.add({
        targets: container,
        y: startY - 20,
        duration: 100,
      });
    });

    container.on('pointerout', () => {
      this.tweens.add({
        targets: container,
        y: startY,
        duration: 100,
      });
    });

    container.on('pointerdown', () => {
      if (this.currentPhase !== GamePhase.PLAYER_TURN) return;
      const card = container.getData('card') as Card;
      this.playCard(card, container);
    });
  }

  private playCard(card: Card, sprite: Phaser.GameObjects.Container): void {
    if (this.currentPhase !== GamePhase.PLAYER_TURN) return;

    // Remove from hand
    this.playerHand = this.playerHand.filter(c => c.key !== card.key);
    this.playerCardSprites = this.playerCardSprites.filter(s => s !== sprite);

    // Animate to play pile
    this.tweens.add({
      targets: sprite,
      x: LAYOUT.PLAY_PILE_PLAYER_X,
      y: LAYOUT.PLAY_PILE_Y,
      rotation: Phaser.Math.FloatBetween(-0.1, 0.1),
      duration: 300,
      ease: 'Power2',
      onComplete: () => {
        sprite.setInteractive(false);
        this.onPlayerCardPlayed(card, sprite);
      },
    });
  }

  private onPlayerCardPlayed(card: Card, sprite: Phaser.GameObjects.Container): void {
    this.currentPhase = GamePhase.CPU_TURN;
    this.setMessage(`${this.opponent.name} PIENSA...`);

    // CPU plays after delay
    const thinkTime = Phaser.Math.Between(500, 1500);
    this.time.delayedCall(thinkTime, () => {
      this.cpuPlayCard(card, sprite);
    });
  }

  private cpuPlayCard(playerCard: Card, playerSprite: Phaser.GameObjects.Container): void {
    // Simple AI: find lowest card that beats player, or dump lowest
    const cpuCard = this.selectCpuCard(playerCard);

    // Find sprite
    const cpuSpriteIndex = this.cpuHand.findIndex(c => c.key === cpuCard.key);
    const cpuSprite = this.cpuCardSprites[cpuSpriteIndex];

    // Remove from hand
    this.cpuHand = this.cpuHand.filter(c => c.key !== cpuCard.key);
    this.cpuCardSprites = this.cpuCardSprites.filter(s => s !== cpuSprite);

    // Flip card (show face)
    const textureKey = `card_${cpuCard.number}_${cpuCard.suit}`;
    if (this.textures.exists(textureKey)) {
      const img = cpuSprite.getAt(0) as Phaser.GameObjects.Image;
      img.setTexture(textureKey);
    }

    // Animate to play pile
    this.tweens.add({
      targets: cpuSprite,
      x: LAYOUT.PLAY_PILE_CPU_X,
      y: LAYOUT.PLAY_PILE_Y,
      rotation: Phaser.Math.FloatBetween(-0.1, 0.1),
      duration: 300,
      ease: 'Power2',
      onComplete: () => {
        this.resolveRound(playerCard, cpuCard, playerSprite, cpuSprite);
      },
    });
  }

  private selectCpuCard(playerCard: Card): Card {
    // Basic strategy: beat with lowest winner, or dump lowest
    const playerPower = getPower(playerCard);
    const sorted = [...this.cpuHand].sort((a, b) => getPower(a) - getPower(b));

    // Find lowest card that wins
    const winner = sorted.find(c => getPower(c) > playerPower);
    return winner || sorted[0];
  }

  private resolveRound(
    playerCard: Card,
    cpuCard: Card,
    playerSprite: Phaser.GameObjects.Container,
    cpuSprite: Phaser.GameObjects.Container
  ): void {
    const playerPower = getPower(playerCard);
    const cpuPower = getPower(cpuCard);

    let result: 'player' | 'cpu' | 'tie';
    if (playerPower > cpuPower) {
      result = 'player';
      this.setMessage('¡GANASTE LA RONDA!');
      this.opponentSay('loseRound');
    } else if (cpuPower > playerPower) {
      result = 'cpu';
      this.setMessage(`${this.opponent.name} GANA LA RONDA`);
      this.opponentSay('winRound');
    } else {
      result = 'tie';
      this.setMessage('¡PARDA!');
    }

    this.roundResults.push(result);
    this.currentRound++;

    // Check if hand is over
    this.time.delayedCall(1000, () => {
      // Clear played cards
      playerSprite.destroy();
      cpuSprite.destroy();

      const handWinner = this.checkHandWinner();
      if (handWinner) {
        this.endHand(handWinner);
      } else {
        // Continue to next round
        this.currentPhase = GamePhase.PLAYER_TURN;
        this.setMessage('ELEGÍ UNA CARTA');
      }
    });
  }

  private checkHandWinner(): 'player' | 'cpu' | null {
    const playerWins = this.roundResults.filter(r => r === 'player').length;
    const cpuWins = this.roundResults.filter(r => r === 'cpu').length;

    if (playerWins >= 2) return 'player';
    if (cpuWins >= 2) return 'cpu';

    // If all 3 rounds played
    if (this.currentRound >= 3) {
      if (playerWins > cpuWins) return 'player';
      if (cpuWins > playerWins) return 'cpu';
      // Tie-breaker: first round winner
      if (this.roundResults[0] === 'player') return 'player';
      if (this.roundResults[0] === 'cpu') return 'cpu';
      return 'player'; // Default
    }

    return null;
  }

  private endHand(winner: 'player' | 'cpu'): void {
    this.currentPhase = GamePhase.END_HAND;

    if (winner === 'player') {
      this.playerScore += this.handPoints;
      this.setMessage(`¡GANASTE ${this.handPoints} PUNTO${this.handPoints > 1 ? 'S' : ''}!`);
      this.opponentSay('loseHand');
    } else {
      this.cpuScore += this.handPoints;
      this.setMessage(`${this.opponent.name} GANA ${this.handPoints} PUNTO${this.handPoints > 1 ? 'S' : ''}`);
      this.opponentSay('winHand');
    }

    this.updateScoreDisplay();

    // Check game end
    if (this.playerScore >= WINNING_SCORE || this.cpuScore >= WINNING_SCORE) {
      this.time.delayedCall(2000, () => {
        this.endGame(this.playerScore >= WINNING_SCORE ? 'player' : 'cpu');
      });
    } else {
      // New hand after delay
      this.time.delayedCall(2000, () => {
        this.deal();
      });
    }
  }

  private endGame(winner: 'player' | 'cpu'): void {
    this.currentPhase = GamePhase.END_GAME;

    if (winner === 'player') {
      this.opponentSay('loseGame');
    } else {
      this.opponentSay('winGame');
    }

    this.cameras.main.fadeOut(500, 0, 0, 0);
    this.time.delayedCall(500, () => {
      this.scene.start('GameOverScene', {
        winner,
        playerScore: this.playerScore,
        cpuScore: this.cpuScore,
        rivalId: this.rivalId,
      });
    });
  }

  private opponentSay(category: string): void {
    const lines = this.opponent.lines[category as keyof typeof this.opponent.lines];
    if (!lines || lines.length === 0) return;

    const line = Phaser.Utils.Array.GetRandom(lines);

    // Clear previous
    this.speechBubble.removeAll(true);

    // Background
    const bg = this.add.graphics();
    bg.fillStyle(0xffffff, 0.95);
    bg.fillRoundedRect(-100, -30, 200, 60, 10);

    // Text
    const text = this.add.text(0, 0, line, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '12px',
      color: '#000000',
      wordWrap: { width: 180 },
      align: 'center',
    });
    text.setOrigin(0.5);

    this.speechBubble.add([bg, text]);
    this.speechBubble.setVisible(true);
    this.speechBubble.setAlpha(0);

    // Animate in
    this.tweens.add({
      targets: this.speechBubble,
      alpha: 1,
      y: LAYOUT.SPEECH_Y - 10,
      duration: 200,
    });

    // Hide after delay
    this.time.delayedCall(2500, () => {
      this.tweens.add({
        targets: this.speechBubble,
        alpha: 0,
        duration: 200,
        onComplete: () => {
          this.speechBubble.setVisible(false);
          this.speechBubble.y = LAYOUT.SPEECH_Y;
        },
      });
    });
  }
}
