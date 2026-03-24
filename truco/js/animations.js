/* ============================================
   TRUCO GAME - ANIMATION CONTROLLER
   Flash-style professional animations
   ============================================ */

// Animation timing constants (in milliseconds)
const TIMING = {
    CARD_DEAL: 400,
    CARD_DEAL_STAGGER: 180,
    CARD_FLIP: 300,
    CARD_PLAY: 350,
    SCORE_UPDATE: 500,
    CALL_REVEAL: 600,
    CALL_DISPLAY: 1200,
    VICTORY: 800,
    THINKING_MIN: 600,
    THINKING_MAX: 1400,
    RIPPLE: 600,
    SPEECH_BUBBLE: 350,
};

class AnimationController {
    constructor() {
        this.isAnimating = false;
        this.queue = [];
        this.particles = null; // Set externally
    }

    // Utility: wait for duration
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Utility: wait for animation to complete
    waitForAnimation(element, animationName) {
        return new Promise(resolve => {
            const handler = (e) => {
                if (e.animationName === animationName) {
                    element.removeEventListener('animationend', handler);
                    resolve();
                }
            };
            element.addEventListener('animationend', handler);
        });
    }

    /* ============================================
       CARD DEALING ANIMATION
       Cascade cards from deck position
       ============================================ */
    async dealCards(handContainer, cards, createCardFn) {
        this.isAnimating = true;
        handContainer.innerHTML = '';

        for (let i = 0; i < cards.length; i++) {
            const cardEl = createCardFn(cards[i], true);
            cardEl.classList.add('card-dealing', 'will-animate');
            cardEl.style.animationDelay = `${i * TIMING.CARD_DEAL_STAGGER}ms`;

            handContainer.appendChild(cardEl);

            // Play deal sound for each card
            if (window.audioManager) {
                setTimeout(() => {
                    window.audioManager.play('card-deal', 0.6);
                }, i * TIMING.CARD_DEAL_STAGGER + 100);
            }
        }

        // Wait for all cards to finish dealing
        await this.delay(TIMING.CARD_DEAL + (cards.length - 1) * TIMING.CARD_DEAL_STAGGER);

        // Remove animation classes and enable interaction
        handContainer.querySelectorAll('.card').forEach(card => {
            card.classList.remove('card-dealing');
            card.classList.add('card-interactive');
            this.setupCardTilt(card);
        });

        this.isAnimating = false;
    }

    /* ============================================
       CARD TILT EFFECT
       Mouse-position based 3D tilt
       ============================================ */
    setupCardTilt(cardEl) {
        if (!cardEl.classList.contains('playable')) return;

        cardEl.addEventListener('mousemove', (e) => {
            if (!cardEl.classList.contains('playable')) return;

            const rect = cardEl.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Calculate rotation based on mouse position
            const rotateX = ((y - centerY) / centerY) * 12;
            const rotateY = ((centerX - x) / centerX) * 12;

            cardEl.style.transform = `
                perspective(800px)
                rotateX(${-rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-16px)
                scale(1.08)
            `;
        });

        cardEl.addEventListener('mouseleave', () => {
            cardEl.style.transform = '';
        });

        // Touch support
        cardEl.addEventListener('touchstart', () => {
            if (!cardEl.classList.contains('playable')) return;
            cardEl.style.transform = 'translateY(-12px) scale(1.06)';
        }, { passive: true });

        cardEl.addEventListener('touchend', () => {
            cardEl.style.transform = '';
        }, { passive: true });
    }

    /* ============================================
       CARD PLAY ANIMATION
       Arc from hand to table slot
       ============================================ */
    async playCardToTable(cardEl, targetSlot, onComplete) {
        this.isAnimating = true;

        const startRect = cardEl.getBoundingClientRect();
        const targetRect = targetSlot.getBoundingClientRect();

        // Calculate offset to target
        const deltaX = targetRect.left + targetRect.width / 2 - (startRect.left + startRect.width / 2);
        const deltaY = targetRect.top + targetRect.height / 2 - (startRect.top + startRect.height / 2);

        // Set CSS variables for animation
        cardEl.style.setProperty('--target-x', `${deltaX}px`);
        cardEl.style.setProperty('--target-y', `${deltaY}px`);
        cardEl.classList.add('card-playing');
        cardEl.classList.remove('playable', 'card-interactive');

        // Play sound
        if (window.audioManager) {
            window.audioManager.play('card-play');
        }

        // Wait for animation
        await this.delay(TIMING.CARD_PLAY);

        // Execute callback (usually moves card to table in DOM)
        if (onComplete) {
            onComplete();
        }

        this.isAnimating = false;
    }

    /* ============================================
       CARD SLAM ANIMATION
       Enhanced version for CPU plays
       ============================================ */
    async slamCard(cardEl) {
        cardEl.classList.add('card-slam');

        if (window.audioManager) {
            window.audioManager.play('card-play');
        }

        await this.delay(400);
        cardEl.classList.remove('card-slam');
    }

    /* ============================================
       3D CARD FLIP ANIMATION
       ============================================ */
    async flipCard(cardEl, newContentFn) {
        cardEl.classList.add('card-flipping');

        // At midpoint, swap content
        setTimeout(() => {
            if (newContentFn) {
                newContentFn(cardEl);
            }
        }, TIMING.CARD_FLIP / 2);

        await this.delay(TIMING.CARD_FLIP);
        cardEl.classList.remove('card-flipping');
    }

    /* ============================================
       DRAMATIC CALL REVEAL
       TRUCO! / ENVIDO! / QUIERO! / NO QUIERO!
       ============================================ */
    async showCall(text, type = 'truco') {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'call-overlay';
        overlay.innerHTML = `<div class="call-text ${type}">${text}</div>`;

        document.body.appendChild(overlay);

        // Play sound
        if (window.audioManager) {
            if (type === 'truco' || type === 'retruco' || type === 'vale-cuatro') {
                window.audioManager.play('truco-call');
            } else if (type === 'envido' || type === 'real-envido' || type === 'falta-envido') {
                window.audioManager.play('envido-call');
            } else if (type === 'quiero') {
                window.audioManager.play('button-click');
            } else if (type === 'no-quiero') {
                window.audioManager.play('button-click');
            }
        }

        // Trigger animation
        requestAnimationFrame(() => {
            overlay.classList.add('show');
        });

        // Wait for display
        await this.delay(TIMING.CALL_REVEAL + TIMING.CALL_DISPLAY);

        // Fade out
        overlay.classList.add('hide');
        overlay.classList.remove('show');

        await this.delay(300);
        overlay.remove();
    }

    /* ============================================
       OPPONENT THINKING ANIMATION
       ============================================ */
    showThinking(container) {
        // Remove any existing thinking dots
        this.hideThinking();

        const dots = document.createElement('span');
        dots.className = 'thinking-dots';
        dots.id = 'thinkingDots';
        dots.innerHTML = '<span></span><span></span><span></span>';

        container.appendChild(dots);

        // Also add class to avatar if exists
        const avatar = document.querySelector('.opponent-avatar');
        if (avatar) {
            avatar.classList.add('opponent-thinking');
        }
    }

    hideThinking() {
        const dots = document.getElementById('thinkingDots');
        if (dots) dots.remove();

        const avatar = document.querySelector('.opponent-avatar');
        if (avatar) {
            avatar.classList.remove('opponent-thinking');
        }
    }

    /* ============================================
       SCORE COUNTER ANIMATION
       Counting up/down effect
       ============================================ */
    async animateScore(element, fromValue, toValue) {
        const duration = TIMING.SCORE_UPDATE;
        const start = performance.now();
        const diff = toValue - fromValue;

        if (diff === 0) return;

        const direction = diff > 0 ? 'increasing' : 'decreasing';
        element.classList.add(`score-${direction}`);

        // Play sound
        if (window.audioManager) {
            window.audioManager.play(diff > 0 ? 'win-round' : 'lose-round', 0.5);
        }

        const animate = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(fromValue + (diff * eased));

            element.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.classList.remove(`score-${direction}`);
            }
        };

        requestAnimationFrame(animate);
        await this.delay(duration);
    }

    /* ============================================
       VICTORY / DEFEAT CELEBRATION
       ============================================ */
    async celebrate(isWin) {
        if (isWin) {
            // Victory effects
            document.body.classList.add('victory-flash');

            // Trigger particle burst
            if (this.particles) {
                this.particles.burst('victory');
            }

            // Play victory sound
            if (window.audioManager) {
                window.audioManager.play('win-game');
            }

            await this.delay(600);
            document.body.classList.remove('victory-flash');

        } else {
            // Defeat effects
            document.body.classList.add('defeat-shake');

            // Play defeat sound
            if (window.audioManager) {
                window.audioManager.play('lose-game');
            }

            await this.delay(600);
            document.body.classList.remove('defeat-shake');
        }
    }

    /* ============================================
       ROUND WIN/LOSE ANIMATION
       ============================================ */
    async roundResult(isWin) {
        if (isWin) {
            if (window.audioManager) {
                window.audioManager.play('win-round');
            }
        } else {
            if (window.audioManager) {
                window.audioManager.play('lose-round');
            }
        }
    }

    /* ============================================
       BUTTON RIPPLE EFFECT
       ============================================ */
    setupButtonRipples(container = document) {
        container.querySelectorAll('.btn-game, .btn-ripple').forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Create ripple element
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const ripple = document.createElement('span');
                ripple.className = 'ripple-effect';
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;

                btn.style.position = 'relative';
                btn.style.overflow = 'hidden';
                btn.appendChild(ripple);

                // Play click sound
                if (window.audioManager) {
                    window.audioManager.play('button-click', 0.4);
                }

                // Remove after animation
                setTimeout(() => ripple.remove(), TIMING.RIPPLE);
            });
        });
    }

    /* ============================================
       SPEECH BUBBLE ANIMATION
       ============================================ */
    async showSpeechBubble(bubbleEl) {
        bubbleEl.classList.add('speech-bubble-animated');

        if (window.audioManager) {
            window.audioManager.play('opponent-speak', 0.3);
        }

        // Remove animation class after it completes
        setTimeout(() => {
            bubbleEl.classList.remove('speech-bubble-animated');
        }, TIMING.SPEECH_BUBBLE);
    }

    /* ============================================
       OPPONENT REACTIONS
       ============================================ */
    setOpponentMood(mood) {
        const avatar = document.querySelector('.opponent-avatar');
        if (!avatar) return;

        // Remove all mood classes
        avatar.classList.remove('opponent-angry', 'opponent-happy', 'opponent-thinking');

        if (mood) {
            avatar.classList.add(`opponent-${mood}`);

            // Auto-remove after animation (except thinking)
            if (mood !== 'thinking') {
                setTimeout(() => {
                    avatar.classList.remove(`opponent-${mood}`);
                }, mood === 'angry' ? 1500 : 600);
            }
        }
    }

    /* ============================================
       ROUND ROW TRANSITIONS
       ============================================ */
    setRoundActive(roundIndex, totalRounds = 3) {
        for (let i = 0; i < totalRounds; i++) {
            const row = document.querySelector(`.round-row[data-round="${i}"]`);
            if (!row) continue;

            row.classList.add('round-row-animated');
            row.classList.remove('active', 'inactive', 'completed');

            if (i === roundIndex) {
                row.classList.add('active');
            } else if (i < roundIndex) {
                row.classList.add('completed');
            } else {
                row.classList.add('inactive');
            }
        }
    }

    /* ============================================
       BADGE POP ANIMATION
       ============================================ */
    async popBadge(badgeEl) {
        badgeEl.classList.add('badge-pop');
        await this.delay(400);
    }

    /* ============================================
       ENVIDO REVEAL
       ============================================ */
    async revealEnvido(element) {
        element.classList.add('envido-reveal');
        await this.delay(500);
    }

    /* ============================================
       LOADING SCREEN
       ============================================ */
    hideLoadingScreen() {
        const loading = document.getElementById('loadingScreen');
        if (loading) {
            loading.classList.add('hidden');
            // Remove from DOM after transition
            setTimeout(() => {
                loading.remove();
            }, 500);
        }
    }

    showLoadingScreen() {
        // Check if already exists
        if (document.getElementById('loadingScreen')) return;

        const loading = document.createElement('div');
        loading.id = 'loadingScreen';
        loading.className = 'loading-screen';
        loading.innerHTML = `
            <div class="loading-spinner"></div>
            <div class="loading-text">CARGANDO...</div>
        `;

        document.body.prepend(loading);
    }
}

// Export singleton instance
const animationController = new AnimationController();

// Expose globally for non-module scripts
window.animationController = animationController;
window.AnimationController = AnimationController;
window.ANIMATION_TIMING = TIMING;

export default animationController;
export { AnimationController, TIMING };
