/* ============================================
   TRUCO GAME - PARTICLE SYSTEM
   Celebration effects and visual feedback
   ============================================ */

class ParticleSystem {
    constructor(container = document.body) {
        this.container = container;
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.animating = false;
        this.animationId = null;

        this.init();
    }

    /* ============================================
       INITIALIZATION
       ============================================ */
    init() {
        // Create canvas
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'particle-canvas';
        this.canvas.style.cssText = `
            position: fixed;
            inset: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
        `;

        this.ctx = this.canvas.getContext('2d');
        this.container.appendChild(this.canvas);

        // Handle resize
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = window.innerWidth * dpr;
        this.canvas.height = window.innerHeight * dpr;
        this.ctx.scale(dpr, dpr);
    }

    /* ============================================
       PARTICLE CONFIGURATIONS
       ============================================ */
    getConfig(type) {
        const configs = {
            victory: {
                count: 80,
                colors: ['#2ecc71', '#27ae60', '#f1c40f', '#f39c12', '#2bb8cd', '#e74c3c'],
                speed: { min: 6, max: 14 },
                gravity: 0.15,
                size: { min: 4, max: 10 },
                shapes: ['square', 'circle', 'triangle'],
                lifetime: { min: 80, max: 150 },
                spread: { x: 0.8, y: 0.6 },
                spin: true,
            },

            cardPlay: {
                count: 12,
                colors: ['#2bb8cd', '#e0f7fa', 'rgba(43, 184, 205, 0.5)'],
                speed: { min: 2, max: 5 },
                gravity: -0.02,
                size: { min: 2, max: 5 },
                shapes: ['circle'],
                lifetime: { min: 30, max: 60 },
                spread: { x: 0.3, y: 0.3 },
                spin: false,
            },

            trucoCall: {
                count: 40,
                colors: ['#2bb8cd', '#1e90ff', '#00bfff', '#87ceeb'],
                speed: { min: 4, max: 10 },
                gravity: 0.08,
                size: { min: 3, max: 8 },
                shapes: ['square', 'diamond'],
                lifetime: { min: 60, max: 100 },
                spread: { x: 1, y: 0.8 },
                spin: true,
            },

            envidoCall: {
                count: 35,
                colors: ['#c9a227', '#f39c12', '#ffd700', '#daa520'],
                speed: { min: 4, max: 9 },
                gravity: 0.1,
                size: { min: 3, max: 7 },
                shapes: ['circle', 'diamond'],
                lifetime: { min: 50, max: 90 },
                spread: { x: 0.9, y: 0.7 },
                spin: true,
            },

            winRound: {
                count: 25,
                colors: ['#2ecc71', '#27ae60', '#58d68d'],
                speed: { min: 3, max: 7 },
                gravity: 0.1,
                size: { min: 3, max: 6 },
                shapes: ['circle', 'square'],
                lifetime: { min: 40, max: 70 },
                spread: { x: 0.5, y: 0.5 },
                spin: false,
            },

            loseRound: {
                count: 15,
                colors: ['#e74c3c', '#c0392b', '#7f8c8d'],
                speed: { min: 2, max: 5 },
                gravity: 0.2,
                size: { min: 2, max: 5 },
                shapes: ['circle'],
                lifetime: { min: 30, max: 50 },
                spread: { x: 0.4, y: 0.4 },
                spin: false,
            },
        };

        return configs[type] || configs.victory;
    }

    /* ============================================
       BURST PARTICLES
       ============================================ */
    burst(type, x = null, y = null) {
        const config = this.getConfig(type);

        // Default to center of screen
        const centerX = x !== null ? x : window.innerWidth / 2;
        const centerY = y !== null ? y : window.innerHeight / 2;

        for (let i = 0; i < config.count; i++) {
            // Random angle
            const angle = Math.random() * Math.PI * 2;

            // Random speed within range
            const speed = config.speed.min + Math.random() * (config.speed.max - config.speed.min);

            // Velocity with spread
            const vx = Math.cos(angle) * speed * config.spread.x;
            const vy = Math.sin(angle) * speed * config.spread.y - speed * 0.5; // Bias upward

            // Random size
            const size = config.size.min + Math.random() * (config.size.max - config.size.min);

            // Random lifetime
            const lifetime = config.lifetime.min + Math.random() * (config.lifetime.max - config.lifetime.min);

            // Random color
            const color = config.colors[Math.floor(Math.random() * config.colors.length)];

            // Random shape
            const shape = config.shapes[Math.floor(Math.random() * config.shapes.length)];

            this.particles.push({
                x: centerX,
                y: centerY,
                vx: vx,
                vy: vy,
                size: size,
                color: color,
                shape: shape,
                gravity: config.gravity,
                life: 1,
                maxLife: lifetime,
                decay: 1 / lifetime,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: config.spin ? (Math.random() - 0.5) * 0.3 : 0,
            });
        }

        if (!this.animating) {
            this.animate();
        }
    }

    /* ============================================
       EMIT FROM ELEMENT
       ============================================ */
    emitFrom(element, type) {
        const rect = element.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        this.burst(type, x, y);
    }

    /* ============================================
       ANIMATION LOOP
       ============================================ */
    animate() {
        this.animating = true;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles = this.particles.filter(p => {
            // Update position
            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.gravity;
            p.rotation += p.rotationSpeed;
            p.life -= p.decay;

            // Remove dead particles
            if (p.life <= 0) return false;

            // Draw particle
            this.drawParticle(p);

            return true;
        });

        if (this.particles.length > 0) {
            this.animationId = requestAnimationFrame(() => this.animate());
        } else {
            this.animating = false;
            this.animationId = null;
        }
    }

    /* ============================================
       DRAW PARTICLE
       ============================================ */
    drawParticle(p) {
        const ctx = this.ctx;
        ctx.save();

        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        switch (p.shape) {
            case 'circle':
                ctx.beginPath();
                ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
                ctx.fill();
                break;

            case 'square':
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                break;

            case 'triangle':
                ctx.beginPath();
                ctx.moveTo(0, -p.size / 2);
                ctx.lineTo(-p.size / 2, p.size / 2);
                ctx.lineTo(p.size / 2, p.size / 2);
                ctx.closePath();
                ctx.fill();
                break;

            case 'diamond':
                ctx.beginPath();
                ctx.moveTo(0, -p.size / 2);
                ctx.lineTo(p.size / 2, 0);
                ctx.lineTo(0, p.size / 2);
                ctx.lineTo(-p.size / 2, 0);
                ctx.closePath();
                ctx.fill();
                break;

            default:
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        }

        ctx.restore();
    }

    /* ============================================
       CLEAR ALL PARTICLES
       ============================================ */
    clear() {
        this.particles = [];
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        this.animating = false;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /* ============================================
       DESTROY
       ============================================ */
    destroy() {
        this.clear();
        window.removeEventListener('resize', this.resize);
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

// Create singleton instance
const particleSystem = new ParticleSystem();

// Expose globally
window.particleSystem = particleSystem;
window.ParticleSystem = ParticleSystem;

export default particleSystem;
export { ParticleSystem };
