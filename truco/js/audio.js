/* ============================================
   TRUCO GAME - AUDIO MANAGER
   Background music + SFX system
   ============================================ */

class AudioManager {
    constructor() {
        this.sounds = {};
        this.music = null;
        this.musicVolume = 0.25;
        this.sfxVolume = 0.7;
        this.masterVolume = 1.0;
        this.muted = false;
        this.initialized = false;
        this.unlocked = false;
        this.audioContext = null;

        // OST Soundtrack playlist
        this.soundtrack = [
            { file: '../assets/songs/ReTruco Main -Double T.mp3', title: 'ReTruco Main', artist: 'Double T' },
            { file: '../assets/songs/Boliche Ambience 01 -Double T.mp3', title: 'Boliche Ambience', artist: 'Double T' },
            { file: '../assets/songs/Ciudad Porteña -Vava.m4a', title: 'Ciudad Porteña', artist: 'Vava' },
            { file: '../assets/songs/Communist song -Double T.mp3', title: 'Communist Song', artist: 'Double T' },
            { file: '../assets/songs/Ricky Fort Bossfight -necrofantasy.mp3', title: 'Ricky Fort Bossfight', artist: 'necrofantasy' },
        ];
        this.currentTrackIndex = 0;
        this.shuffle = false;
        this.shuffleHistory = [];

        // Sound file definitions
        this.soundFiles = {
            'card-shuffle': { file: 'card-shuffle', volume: 0.8 },
            'card-deal': { file: 'card-deal', volume: 0.5 },
            'card-play': { file: 'card-play', volume: 0.7 },
            'button-click': { file: 'button-click', volume: 0.4 },
            'truco-call': { file: 'truco-call', volume: 0.9 },
            'envido-call': { file: 'envido-call', volume: 0.9 },
            'win-round': { file: 'win-round', volume: 0.6 },
            'lose-round': { file: 'lose-round', volume: 0.5 },
            'win-game': { file: 'win-game', volume: 0.8 },
            'lose-game': { file: 'lose-game', volume: 0.7 },
            'opponent-speak': { file: 'opponent-speak', volume: 0.3 },
        };

        // Load saved preferences
        this.loadPreferences();
    }

    /* ============================================
       INITIALIZATION
       ============================================ */
    async init() {
        if (this.initialized) return true;

        try {
            // Create audio context
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();

            // Preload all sounds
            await this.preloadSounds();

            // Setup music
            this.setupMusic();

            this.initialized = true;
            console.log('[AudioManager] Initialized successfully');
            return true;

        } catch (error) {
            console.warn('[AudioManager] Init failed:', error);
            return false;
        }
    }

    /* ============================================
       PRELOAD SOUNDS
       ============================================ */
    async preloadSounds() {
        const basePath = 'audio/';
        const loadPromises = [];

        for (const [name, config] of Object.entries(this.soundFiles)) {
            const promise = this.loadSound(name, `${basePath}${config.file}`, config.volume);
            loadPromises.push(promise);
        }

        // Wait for all sounds to load (don't fail on individual errors)
        await Promise.allSettled(loadPromises);
    }

    async loadSound(name, basePath, defaultVolume = 1) {
        try {
            const audio = new Audio();

            // Try OGG first (better compression), then MP3, then WAV
            const formats = ['.ogg', '.mp3', '.wav'];

            for (const format of formats) {
                try {
                    audio.src = basePath + format;
                    await new Promise((resolve, reject) => {
                        audio.addEventListener('canplaythrough', resolve, { once: true });
                        audio.addEventListener('error', reject, { once: true });
                        audio.load();
                    });

                    this.sounds[name] = {
                        audio: audio,
                        defaultVolume: defaultVolume,
                    };

                    return true;
                } catch {
                    // Try next format
                }
            }

            console.warn(`[AudioManager] Could not load sound: ${name}`);
            return false;

        } catch (error) {
            console.warn(`[AudioManager] Error loading ${name}:`, error);
            return false;
        }
    }

    /* ============================================
       SETUP BACKGROUND MUSIC (OST Playlist)
       ============================================ */
    setupMusic() {
        this.music = new Audio();
        this.music.loop = false; // We handle track advancement ourselves
        this.music.volume = this.musicVolume * this.masterVolume;

        // Auto-advance to next track when current ends
        this.music.addEventListener('ended', () => {
            this.nextTrack();
        });

        // Load first track
        this.loadTrack(this.currentTrackIndex);
    }

    loadTrack(index) {
        if (index < 0 || index >= this.soundtrack.length) return;

        this.currentTrackIndex = index;
        const track = this.soundtrack[index];
        this.music.src = track.file;

        // Dispatch event for UI updates
        window.dispatchEvent(new CustomEvent('trackChange', {
            detail: {
                index: index,
                title: track.title,
                artist: track.artist,
                total: this.soundtrack.length
            }
        }));
    }

    getCurrentTrack() {
        return {
            ...this.soundtrack[this.currentTrackIndex],
            index: this.currentTrackIndex,
            total: this.soundtrack.length
        };
    }

    nextTrack() {
        let nextIndex;

        if (this.shuffle) {
            // Shuffle mode: pick random track (avoid immediate repeat)
            const availableIndices = this.soundtrack
                .map((_, i) => i)
                .filter(i => i !== this.currentTrackIndex);
            nextIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
            this.shuffleHistory.push(this.currentTrackIndex);
        } else {
            // Sequential mode
            nextIndex = (this.currentTrackIndex + 1) % this.soundtrack.length;
        }

        this.loadTrack(nextIndex);

        if (!this.muted && this.unlocked) {
            this.music.play().catch(() => {});
        }
    }

    previousTrack() {
        let prevIndex;

        if (this.shuffle && this.shuffleHistory.length > 0) {
            // Go back in shuffle history
            prevIndex = this.shuffleHistory.pop();
        } else {
            // Sequential mode
            prevIndex = (this.currentTrackIndex - 1 + this.soundtrack.length) % this.soundtrack.length;
        }

        this.loadTrack(prevIndex);

        if (!this.muted && this.unlocked) {
            this.music.play().catch(() => {});
        }
    }

    toggleShuffle() {
        this.shuffle = !this.shuffle;
        if (!this.shuffle) {
            this.shuffleHistory = [];
        }
        return this.shuffle;
    }

    /* ============================================
       UNLOCK AUDIO (Browser requirement)
       Must be called from user interaction
       ============================================ */
    async unlock() {
        if (this.unlocked) return true;

        try {
            // Resume audio context
            if (this.audioContext && this.audioContext.state === 'suspended') {
                await this.audioContext.resume();
            }

            // Play silent sound to unlock iOS
            const silentAudio = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA');
            await silentAudio.play().catch(() => {});

            this.unlocked = true;
            console.log('[AudioManager] Audio unlocked');
            return true;

        } catch (error) {
            console.warn('[AudioManager] Could not unlock audio:', error);
            return false;
        }
    }

    /* ============================================
       PLAY SOUND EFFECT
       ============================================ */
    play(name, volumeMultiplier = 1) {
        if (this.muted) return;
        if (!this.sounds[name]) {
            // Generate synthetic sound if audio file not found
            this.playSynthetic(name, volumeMultiplier);
            return;
        }

        try {
            // Clone audio for overlapping sounds
            const sound = this.sounds[name];
            const clone = sound.audio.cloneNode();

            clone.volume = Math.min(1, sound.defaultVolume * this.sfxVolume * this.masterVolume * volumeMultiplier);
            clone.play().catch(() => {});

            // Cleanup after playback
            clone.addEventListener('ended', () => {
                clone.remove();
            }, { once: true });

        } catch (error) {
            // Silently fail - audio is non-essential
        }
    }

    /* ============================================
       SYNTHETIC SOUNDS (Fallback)
       Generate sounds using Web Audio API
       ============================================ */
    playSynthetic(name, volumeMultiplier = 1) {
        if (this.muted || !this.audioContext || !this.unlocked) return;

        try {
            const ctx = this.audioContext;
            const now = ctx.currentTime;
            const volume = this.sfxVolume * this.masterVolume * volumeMultiplier * 0.3;

            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);

            // Different synth profiles for different sounds
            switch (name) {
                case 'card-deal':
                case 'card-play':
                    oscillator.type = 'sine';
                    oscillator.frequency.setValueAtTime(800, now);
                    oscillator.frequency.exponentialRampToValueAtTime(200, now + 0.1);
                    gainNode.gain.setValueAtTime(volume, now);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
                    oscillator.start(now);
                    oscillator.stop(now + 0.15);
                    break;

                case 'button-click':
                    oscillator.type = 'square';
                    oscillator.frequency.setValueAtTime(600, now);
                    gainNode.gain.setValueAtTime(volume * 0.5, now);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
                    oscillator.start(now);
                    oscillator.stop(now + 0.05);
                    break;

                case 'win-round':
                    oscillator.type = 'sine';
                    oscillator.frequency.setValueAtTime(523.25, now); // C5
                    oscillator.frequency.setValueAtTime(659.25, now + 0.1); // E5
                    oscillator.frequency.setValueAtTime(783.99, now + 0.2); // G5
                    gainNode.gain.setValueAtTime(volume, now);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
                    oscillator.start(now);
                    oscillator.stop(now + 0.4);
                    break;

                case 'lose-round':
                    oscillator.type = 'sine';
                    oscillator.frequency.setValueAtTime(400, now);
                    oscillator.frequency.exponentialRampToValueAtTime(200, now + 0.3);
                    gainNode.gain.setValueAtTime(volume, now);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
                    oscillator.start(now);
                    oscillator.stop(now + 0.3);
                    break;

                case 'truco-call':
                case 'envido-call':
                    // Dramatic chord
                    [440, 554.37, 659.25].forEach((freq, i) => {
                        const osc = ctx.createOscillator();
                        const gain = ctx.createGain();
                        osc.connect(gain);
                        gain.connect(ctx.destination);
                        osc.type = 'sawtooth';
                        osc.frequency.setValueAtTime(freq, now);
                        gain.gain.setValueAtTime(volume * 0.4, now);
                        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
                        osc.start(now);
                        osc.stop(now + 0.5);
                    });
                    break;

                case 'win-game':
                    // Victory fanfare
                    const notes = [523.25, 659.25, 783.99, 1046.50];
                    notes.forEach((freq, i) => {
                        const osc = ctx.createOscillator();
                        const gain = ctx.createGain();
                        osc.connect(gain);
                        gain.connect(ctx.destination);
                        osc.type = 'sine';
                        osc.frequency.setValueAtTime(freq, now + i * 0.15);
                        gain.gain.setValueAtTime(0, now);
                        gain.gain.setValueAtTime(volume, now + i * 0.15);
                        gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.15 + 0.3);
                        osc.start(now);
                        osc.stop(now + 1);
                    });
                    break;

                case 'lose-game':
                    // Sad trombone effect
                    oscillator.type = 'sawtooth';
                    oscillator.frequency.setValueAtTime(300, now);
                    oscillator.frequency.exponentialRampToValueAtTime(100, now + 0.8);
                    gainNode.gain.setValueAtTime(volume, now);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
                    oscillator.start(now);
                    oscillator.stop(now + 0.8);
                    break;

                default:
                    // Generic click
                    oscillator.type = 'sine';
                    oscillator.frequency.setValueAtTime(500, now);
                    gainNode.gain.setValueAtTime(volume * 0.3, now);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
                    oscillator.start(now);
                    oscillator.stop(now + 0.05);
            }

        } catch (error) {
            // Silently fail
        }
    }

    /* ============================================
       MUSIC CONTROLS
       ============================================ */
    playMusic() {
        if (this.muted || !this.music || !this.unlocked) return;

        this.music.volume = this.musicVolume * this.masterVolume;
        this.music.play().catch(() => {
            console.log('[AudioManager] Music autoplay blocked - will play on interaction');
        });
    }

    pauseMusic() {
        if (this.music) {
            this.music.pause();
        }
    }

    stopMusic() {
        if (this.music) {
            this.music.pause();
            this.music.currentTime = 0;
        }
    }

    /* ============================================
       VOLUME CONTROLS
       ============================================ */
    setMasterVolume(value) {
        this.masterVolume = Math.max(0, Math.min(1, value));
        this.updateMusicVolume();
        this.savePreferences();
    }

    setMusicVolume(value) {
        this.musicVolume = Math.max(0, Math.min(1, value));
        this.updateMusicVolume();
        this.savePreferences();
    }

    setSFXVolume(value) {
        this.sfxVolume = Math.max(0, Math.min(1, value));
        this.savePreferences();
    }

    updateMusicVolume() {
        if (this.music) {
            this.music.volume = this.musicVolume * this.masterVolume;
        }
    }

    /* ============================================
       MUTE TOGGLE
       ============================================ */
    toggleMute() {
        this.muted = !this.muted;

        if (this.muted) {
            this.pauseMusic();
        } else if (this.unlocked) {
            this.playMusic();
        }

        this.savePreferences();
        return this.muted;
    }

    setMute(muted) {
        this.muted = muted;

        if (this.muted) {
            this.pauseMusic();
        } else if (this.unlocked) {
            this.playMusic();
        }

        this.savePreferences();
    }

    /* ============================================
       PREFERENCES PERSISTENCE
       ============================================ */
    savePreferences() {
        try {
            const prefs = {
                masterVolume: this.masterVolume,
                musicVolume: this.musicVolume,
                sfxVolume: this.sfxVolume,
                muted: this.muted,
            };
            localStorage.setItem('trucoAudioPrefs', JSON.stringify(prefs));
        } catch {
            // localStorage not available
        }
    }

    loadPreferences() {
        try {
            const saved = localStorage.getItem('trucoAudioPrefs');
            if (saved) {
                const prefs = JSON.parse(saved);
                this.masterVolume = prefs.masterVolume ?? 1.0;
                this.musicVolume = prefs.musicVolume ?? 0.25;
                this.sfxVolume = prefs.sfxVolume ?? 0.7;
                this.muted = prefs.muted ?? false;
            }
        } catch {
            // Use defaults
        }
    }

    /* ============================================
       UI SETUP HELPER
       ============================================ */
    setupUI(muteButtonId, volumeSliderId) {
        const muteBtn = document.getElementById(muteButtonId);
        const volumeSlider = document.getElementById(volumeSliderId);

        if (muteBtn) {
            // Set initial state
            if (this.muted) {
                muteBtn.classList.add('muted');
            }

            muteBtn.addEventListener('click', () => {
                const muted = this.toggleMute();
                muteBtn.classList.toggle('muted', muted);
            });
        }

        if (volumeSlider) {
            volumeSlider.value = this.masterVolume * 100;

            volumeSlider.addEventListener('input', (e) => {
                this.setMasterVolume(e.target.value / 100);
            });
        }

        // OST controls (optional elements)
        const nextBtn = document.getElementById('ost-next');
        const prevBtn = document.getElementById('ost-prev');
        const shuffleBtn = document.getElementById('ost-shuffle');
        const trackDisplay = document.getElementById('ost-track-display');

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextTrack());
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousTrack());
        }

        if (shuffleBtn) {
            shuffleBtn.addEventListener('click', () => {
                const isShuffled = this.toggleShuffle();
                shuffleBtn.classList.toggle('active', isShuffled);
            });
        }

        // Update track display on track change
        if (trackDisplay) {
            window.addEventListener('trackChange', (e) => {
                const { title, artist, index, total } = e.detail;
                trackDisplay.innerHTML = `<span class="track-number">${index + 1}/${total}</span> ${title} <span class="track-artist">- ${artist}</span>`;
            });

            // Set initial display
            const track = this.getCurrentTrack();
            trackDisplay.innerHTML = `<span class="track-number">${track.index + 1}/${track.total}</span> ${track.title} <span class="track-artist">- ${track.artist}</span>`;
        }
    }
}

// Create singleton instance
const audioManager = new AudioManager();

// Expose globally
window.audioManager = audioManager;
window.AudioManager = AudioManager;

export default audioManager;
export { AudioManager };
