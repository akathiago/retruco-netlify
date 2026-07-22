(function() {
            const BREAKPOINT = 900;
            const aviso = document.getElementById('mobileAviso');
            const btn = document.getElementById('mobileAvisoBtn');
            const preloader = document.getElementById('preloader');
            if (!aviso || !btn) return;

            let overflowPrevio = '';

            function abrir() {
                if (aviso.classList.contains('active')) return;
                overflowPrevio = document.body.style.overflow;
                aviso.classList.add('active');
                document.body.style.overflow = 'hidden';
                btn.focus({ preventScroll: true });
            }

            function cerrar() {
                if (!aviso.classList.contains('active')) return;
                aviso.classList.remove('active');
                document.body.style.overflow = overflowPrevio;
            }

            // El preloader restaura body.overflow al terminar y tarda 0.5s en
            // desvanecerse, asi que hay que esperarlo: si no, pisa el bloqueo
            // de scroll y el aviso aparece encima del contador de carga.
            function alTerminarPreloader(cb) {
                if (!preloader || preloader.hidden || getComputedStyle(preloader).display === 'none') return cb();

                const FADE = 600; // 0.5s de transition + margen
                let disparado = false;
                let obs = null;
                let seguro = null;

                function listo() {
                    if (disparado) return;
                    disparado = true;
                    if (obs) obs.disconnect();
                    clearTimeout(seguro);
                    setTimeout(cb, FADE);
                }

                obs = new MutationObserver(function() {
                    if (preloader.style.opacity === '0') listo();
                });
                obs.observe(preloader, { attributes: true, attributeFilter: ['style'] });

                // El preloader tiene su propio tope de 15s; este es el colchon.
                seguro = setTimeout(listo, 20000);

                // Por si ya habia terminado antes de montar el observer
                if (preloader.style.opacity === '0') listo();
            }

            alTerminarPreloader(function() {
                if (window.innerWidth <= BREAKPOINT) abrir();
            });

            btn.addEventListener('click', cerrar);
            aviso.addEventListener('click', function(e) {
                if (e.target === aviso) cerrar();
            });
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') cerrar();
            });
            // Si pasa a desktop (rotacion o resize) ya no aplica el aviso
            window.addEventListener('resize', function() {
                if (window.innerWidth > BREAKPOINT) cerrar();
            });
        })();

(function() {
                const track = document.getElementById('cardsTrack');
                const cards = Array.from(track.children);
                // Duplicar las cartas x4 para el loop
                for (let i = 0; i < 4; i++) {
                    cards.forEach(c => track.appendChild(c.cloneNode(true)));
                }
                let pos = 0;
                let speed = 1;
                let paused = false;
                const setWidth = cards.length * (120 + 15);

                // Click en carta → burbuja
                track.addEventListener('click', function(e) {
                    const wrap = e.target.closest('.card-wrap');
                    if (!wrap) return;
                    // Crear o toggle burbuja
                    let bubble = wrap.querySelector('.card-bubble');
                    if (!bubble) {
                        bubble = document.createElement('div');
                        bubble.className = 'card-bubble';
                        bubble.innerHTML = '<div class="card-bubble-name">' + wrap.dataset.name + '</div><div class="card-bubble-msg">"' + wrap.dataset.msg + '"</div>';
                        wrap.appendChild(bubble);
                    }
                    bubble.classList.toggle('show');
                });

                function animate() {
                    if (!paused) {
                        pos -= speed;
                        if (Math.abs(pos) >= setWidth) {
                            pos += setWidth;
                        }
                        track.style.transform = 'translateX(' + pos + 'px)';
                    }
                    requestAnimationFrame(animate);
                }
                animate();
            })();

// OST Player
        (function() {
            // Placeholder tracks - reemplazar con los reales
            const tracks = [
                { name: 'ReTruco Main', artist: 'Double T', src: 'assets/songs/ReTruco Main -Double T.mp3' },
                { name: 'Boliche Ambience', artist: 'Double T', src: 'assets/songs/Boliche Ambience 01 -Double T.mp3' },
                { name: 'Ciudad Porteña', artist: 'Vava', src: 'assets/songs/Ciudad Porteña -Vava.m4a' },
                { name: 'Communist Song', artist: 'Double T', src: 'assets/songs/Communist song -Double T.mp3' },
                { name: 'Ricky Fort Bossfight', artist: 'necrofantasy', src: 'assets/songs/Ricky Fort Bossfight -necrofantasy.mp3' }
            ];

            let currentTrack = 0;
            let isPlaying = false;
            let audio = new Audio();
            audio.preload = 'none';
            audio.volume = 0.8;

            const playBtn = document.getElementById('playBtn');
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            const volumeBtn = document.getElementById('volumeBtn');
            const volumeSlider = document.getElementById('volumeSlider');
            const volumeSliderContainer = document.getElementById('volumeSliderContainer');
            const progressBar = document.getElementById('progressBar');
            const progressContainer = document.getElementById('progressContainer');
            const trackName = document.getElementById('trackName');
            const trackNumber = document.getElementById('trackNumber');
            const trackDuration = document.getElementById('trackDuration');
            const discImage = document.getElementById('discImage');
            // Disco PS2 replaces cassette reels
            const playlistItems = document.querySelectorAll('.playlist-item');

            function formatTime(seconds) {
                if (isNaN(seconds)) return '0:00';
                const mins = Math.floor(seconds / 60);
                const secs = Math.floor(seconds % 60);
                return mins + ':' + (secs < 10 ? '0' : '') + secs;
            }

            function updateTrackInfo() {
                trackName.textContent = tracks[currentTrack].name;
                trackNumber.textContent = String(currentTrack + 1).padStart(2, '0');

                playlistItems.forEach((item, index) => {
                    item.classList.toggle('active', index === currentTrack);
                });
            }

            function togglePlay() {
                if (!tracks[currentTrack].src) {
                    // No hay audio cargado, mostrar mensaje
                    // Track not loaded
                    return;
                }

                if (audio.dataset.trackIndex !== String(currentTrack)) {
                    audio.src = tracks[currentTrack].src;
                    audio.dataset.trackIndex = String(currentTrack);
                    audio.load();
                }

                if (isPlaying) {
                    audio.pause();
                    isPlaying = false;
                    playBtn.querySelector('.play-icon').style.display = 'block';
                    playBtn.querySelector('.pause-icon').style.display = 'none';
                    discImage.classList.remove('spinning');
                    // Disco stops spinning
                } else {
                    audio.play();
                    isPlaying = true;
                    playBtn.querySelector('.play-icon').style.display = 'none';
                    playBtn.querySelector('.pause-icon').style.display = 'block';
                    discImage.classList.add('spinning');
                    console.log('Disco spinning:', discImage);
                }
            }

            function loadTrack(index) {
                currentTrack = index;
                if (tracks[index].src) {
                    audio.src = tracks[index].src;
                    audio.dataset.trackIndex = String(index);
                    audio.load();
                }
                updateTrackInfo();
                progressBar.style.width = '0%';

                if (isPlaying && tracks[index].src) {
                    audio.play();
                }
            }

            function nextTrack() {
                currentTrack = (currentTrack + 1) % tracks.length;
                loadTrack(currentTrack);
            }

            function prevTrack() {
                currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
                loadTrack(currentTrack);
            }

            // Event Listeners
            playBtn.addEventListener('click', togglePlay);
            nextBtn.addEventListener('click', nextTrack);
            prevBtn.addEventListener('click', prevTrack);

            volumeBtn.addEventListener('click', () => {
                volumeSliderContainer.classList.toggle('active');
            });

            volumeSlider.addEventListener('input', (e) => {
                audio.volume = e.target.value / 100;
                const volumeOn = volumeBtn.querySelector('.volume-on');
                const volumeOff = volumeBtn.querySelector('.volume-off');
                if (audio.volume === 0) {
                    volumeOn.style.display = 'none';
                    volumeOff.style.display = 'block';
                } else {
                    volumeOn.style.display = 'block';
                    volumeOff.style.display = 'none';
                }
            });

            progressContainer.addEventListener('click', (e) => {
                if (!tracks[currentTrack].src) return;
                const rect = progressContainer.getBoundingClientRect();
                const percent = (e.clientX - rect.left) / rect.width;
                audio.currentTime = percent * audio.duration;
            });

            audio.addEventListener('timeupdate', () => {
                const percent = (audio.currentTime / audio.duration) * 100;
                progressBar.style.width = percent + '%';
                trackDuration.textContent = formatTime(audio.currentTime) + ' / ' + formatTime(audio.duration);
            });

            audio.addEventListener('ended', nextTrack);

            playlistItems.forEach((item, index) => {
                item.addEventListener('click', () => {
                    loadTrack(index);
                    if (!isPlaying) togglePlay();
                });
            });

            // Inicializar sólo la UI. El audio se solicita tras una interacción.
            updateTrackInfo();
        })();

(function() {
            const section = document.getElementById('construccion');
            const cinta2 = section.querySelector('.cinta-2');
            const cinta3 = section.querySelector('.cinta-3');
            let isOpen = false;
            let animations = [];

            function stopAnimations() {
                animations.forEach(animation => {
                    const element = animation.effect.target;
                    const currentTransform = getComputedStyle(element).transform;
                    animation.cancel();
                    element.style.transform = currentTransform;
                });
                animations = [];
            }

            function animateTo(element, transform, delay, easing) {
                const animation = element.animate([
                    { transform: getComputedStyle(element).transform },
                    { transform }
                ], {
                    duration: 800,
                    delay,
                    easing,
                    fill: 'forwards'
                });
                animation.addEventListener('finish', () => {
                    element.style.transform = transform;
                    animation.cancel();
                }, { once: true });
                animations.push(animation);
            }

            function openCintas() {
                if (isOpen) return;
                isOpen = true;
                stopAnimations();
                animateTo(cinta3, 'translate(-150%, 50%)', 0, 'cubic-bezier(0.4, 0, 1, 1)');
                animateTo(cinta2, 'translate(50%, 50%)', 200, 'cubic-bezier(0.4, 0, 1, 1)');
            }

            function closeCintas() {
                isOpen = false;
                stopAnimations();
                animateTo(cinta2, 'translate(-50%, -50%)', 0, 'cubic-bezier(0, 0, 0.2, 1)');
                animateTo(cinta3, 'translate(-50%, -50%)', 200, 'cubic-bezier(0, 0, 0.2, 1)');
            }

            cinta3.addEventListener('mouseenter', openCintas);
            section.addEventListener('mouseleave', closeCintas);
        })();

// Smooth scroll personalizado (más suave)
        function smoothScrollTo(targetPosition, duration = 1500) {
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            let startTime = null;

            function easeInOutCubic(t) {
                return t < 0.5
                    ? 4 * t * t * t
                    : 1 - Math.pow(-2 * t + 2, 3) / 2;
            }

            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);
                const ease = easeInOutCubic(progress);

                window.scrollTo(0, startPosition + distance * ease);

                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                }
            }

            requestAnimationFrame(animation);
        }

        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', e => {
                e.preventDefault();
                const target = document.querySelector(a.getAttribute('href'));
                if (target) {
                    smoothScrollTo(target.offsetTop, 1200);
                }
            });
        });

        // Scroll reveal
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) rotate(var(--r, 0deg))';
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.char-card, .about-img, .donate-card, .donate-img').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(40px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        // Parallax on hero + Nav logo visibility
        const navLogo = document.querySelector('.nav-logo');
        const heroSection = document.getElementById('hero');
        const cesarContainer = document.querySelector('.cesar-container');

        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const heroHeight = heroSection.offsetHeight;

            // Mostrar logo cuando pase el hero
            if (scrolled >= heroHeight - 100) {
                navLogo.classList.add('visible');
            } else {
                navLogo.classList.remove('visible');
            }

            // Parallax effect (solo en mobile donde el contenido es visible)
            if (cesarContainer && window.innerWidth <= 900 && scrolled < window.innerHeight) {
                cesarContainer.style.transform = `translateY(${scrolled * 0.15}px) rotate(2deg)`;
            }
        });

        // Gallery Lightbox
        const galleryImages = [
            'assets/imagenes/screenshot1.png',
            'assets/imagenes/screenshot2.png',
            'assets/imagenes/screenshot3.png',
            'assets/imagenes/screenshot4.png'
        ];
        let currentSlide = 0;

        function openGallery(index) {
            currentSlide = index;
            updateGallery();
            document.getElementById('galleryLightbox').classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeGallery() {
            document.getElementById('galleryLightbox').classList.remove('active');
            document.body.style.overflow = '';
        }

        function changeSlide(direction) {
            currentSlide += direction;
            if (currentSlide >= galleryImages.length) currentSlide = 0;
            if (currentSlide < 0) currentSlide = galleryImages.length - 1;
            updateGallery();
        }

        function updateGallery() {
            document.getElementById('galleryImage').src = galleryImages[currentSlide];
            document.getElementById('galleryCounter').textContent = (currentSlide + 1) + ' / ' + galleryImages.length;
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!document.getElementById('galleryLightbox').classList.contains('active')) return;
            if (e.key === 'Escape') closeGallery();
            if (e.key === 'ArrowLeft') changeSlide(-1);
            if (e.key === 'ArrowRight') changeSlide(1);
        });

        // Close on background click
        document.getElementById('galleryLightbox').addEventListener('click', (e) => {
            if (e.target.id === 'galleryLightbox') closeGallery();
        });

        // Character Modal
        const charData = {
            xiao: {
                name: 'XIAO',
                role: 'El Chino',
                text: 'Xiao llegó a Buenos Aires buscando una nueva vida, pero encontró algo muy diferente. Con su pasado misterioso en las calles de Shanghai, aprendió a moverse entre las sombras. En el pabellón, su silencio es su mayor arma. Nadie sabe exactamente qué negocios lo trajeron hasta acá, pero todos saben que es mejor no meterse con él.'
            },
            dario: {
                name: 'DARÍO',
                role: 'El Cerebro',
                text: 'Pese a ser opuestos, podés pensar que es el amigo de César. Estás en lo correcto, pero la confianza depositada en él es la que provoca el 90% de los quilombos, siempre. Aunque no deja de ser el cerebro de las operaciones.'
            },
            aliado: {
                name: 'ALIADO',
                role: 'El Compañero',
                text: 'Todo el mundo necesita alguien que le cuide las espaldas en este lugar. Este es de los pocos en los que podés confiar. No hace preguntas, no juzga, y cuando las papas queman, está ahí. En un mundo donde la traición es moneda corriente, un aliado así vale oro.'
            },
            chino: {
                name: 'CHINO',
                role: 'El Estratega',
                text: 'Le dicen Chino pero nadie sabe bien por qué. Lo que sí saben es que el tipo piensa tres jugadas adelante. En el truco es imbatible, y en la vida del pabellón aplica la misma lógica. Nunca muestra sus cartas hasta que es demasiado tarde para el otro.'
            },
            chino2: {
                name: 'CHINO 2',
                role: 'El Segundo',
                text: 'Siempre a la sombra del otro Chino, pero no te confundas: este tiene sus propios planes. Más callado, más paciente, y según algunos, más peligroso. Observa y aprende, esperando su momento.'
            },
            littleboogie: {
                name: 'LITTLE BOOGIE',
                role: 'El Rítmico',
                text: 'En otro mundo, Little Boogie hubiera sido músico. Acá adentro, el ritmo lo lleva en la sangre igual. Siempre tarareando algo, siempre moviéndose al compás de una melodía que solo él escucha. Pero no te dejes engañar por su aire despistado: cuando hay quilombo, sabe exactamente dónde pararse.'
            },
            momo: {
                name: 'MOMO',
                role: 'El Pesado',
                text: 'Momo no necesita hablar para hacerse respetar. Su presencia física impone silencio. Dicen que antes de caer fue patova en los boliches más pesados del conurbano. Ahora usa esa experiencia para mantener el orden... a su manera.'
            },
            abraham: {
                name: 'ABRAHAM',
                role: 'El Veterano',
                text: 'Abraham lleva más años adentro que muchos afuera. Vio caer a los más duros, sobrevivió a las peores épocas. Ahora pasa sus días jugando al truco y dando consejos que nadie pidió pero todos necesitan. Su palabra tiene peso porque la ganó con el tiempo.'
            },
            wachin2: {
                name: 'WACHIN',
                role: 'Veterano del Pabellón',
                text: 'El Wachin original ya no está, pero su legado vive en este. Heredó el apodo, el respeto y también los problemas. Trata de estar a la altura de una leyenda que nunca conoció, y eso a veces lo lleva a tomar decisiones arriesgadas.'
            },
            bignone: {
                name: 'BIGNONE',
                role: 'El Viejo Exaltado',
                text: '¿Debe ser el presidente? ¿Está cuerdo como para hacerlo? La verdad es que no, pero por algún motivo está ahí, molestando siempre. En algún momento podemos sacar lo bueno del viejo exaltado este.'
            },
            cesar: {
                name: 'CÉSAR',
                role: 'El Protagonista',
                text: 'César era un pibe común de Buenos Aires. Laburaba, se rescataba, trataba de zafar como podía. Pero un viaje a China le cambió la vida para siempre. Cayó en cana en circunstancias que todavía no entiende del todo. Ahora, de vuelta en su ciudad, tiene que sobrevivir a un sistema corrupto y cumplir una misión que no pidió. Cada decisión que tome puede ser la última.'
            },
            uzi: {
                name: 'UZI',
                role: 'El Fierro',
                text: 'El arma judía que reina en el bajo mundo de los porteños. Eficaz, rápida, pero traicionera; clásica de sus raíces.'
            },
            mandarinas: {
                name: 'MANDARINAS',
                role: 'La Fruta Prohibida',
                text: 'La fruta favorita de la gente de bien y de Wa-Chin, probablemente robadas de algún patio con vecino.'
            },
            plata: {
                name: 'PLATA',
                role: 'El Combustible',
                text: 'Pesos, dólares, lo que venga. La guita mueve todo adentro: compra protección, silencio, favores y hasta libertad anticipada si sabés a quién dársela. Sin plata no sos nadie, con plata... bueno, seguís siendo un preso, pero uno con opciones.'
            },
            encendedor: {
                name: 'ENCENDEDOR',
                role: 'La Chispa',
                text: 'Un simple encendedor BIC. Sirve para prender un pucho, calentar una lata, o empezar un incendio si las cosas se ponen feas. En el lugar correcto y el momento indicado, hasta lo más simple puede cambiar todo.'
            },
            estrelladavid: {
                name: 'ESTRELLA DE DAVID',
                role: 'El Símbolo',
                text: 'Mmmh... todavía no hablemos de esto.'
            },
            fernet: {
                name: 'FERNET BRANCA',
                role: 'El Néctar Cordobés',
                text: 'Difícil encontrar uno lleno. Agua para César, y tanto un peligro como un poder en los piquetes.'
            },
            sapphirus: {
                name: 'SAPPHIRUS',
                role: 'El Perfume',
                text: '¿Para qué? Olor a casa de vieja, a ropa limpia, y junto al encendedor el origen del bondi que te imagines y cuando lo imagines.'
            },
            donsatur: {
                name: 'DON SATUR',
                role: 'Las Galletitas',
                text: 'Un paquete de galletitas Don Satur. El sabor de la infancia, de las meriendas con la vieja, de una vida que quedó afuera. Acá adentro, compartir unas galletitas es un gesto de humanidad en medio del caos.'
            },
            laverde: {
                name: 'LA VERDE',
                role: 'El Faso',
                text: 'Bolsitas ziploc con marihuana. La moneda más estable del pabellón. Se fuma para relajar, se vende para sobrevivir, se intercambia por favores. El que controla la verde tiene poder, pero también tiene problemas. Siempre hay alguien que la quiere.'
            }
        };

        function openCharModal(character) {
            const data = charData[character];
            if (!data) return;

            document.getElementById('charModalName').textContent = data.name;
            document.getElementById('charModalRole').textContent = data.role;
            document.getElementById('charModalText').textContent = data.text;
            document.getElementById('charModal').classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeCharModal() {
            document.getElementById('charModal').classList.remove('active');
            document.body.style.overflow = '';
        }

        // Close modal on background click
        document.getElementById('charModal').addEventListener('click', (e) => {
            if (e.target.id === 'charModal') closeCharModal();
        });

        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && document.getElementById('charModal').classList.contains('active')) {
                closeCharModal();
            }
        });

        // ===== PRELOADER =====
        // Sólo acompaña la preparación del contenido crítico visible. Los assets
        // secundarios continúan cargando sin bloquear scroll ni interacción.
        (function initPreloader() {
            const counterElement = document.getElementById('counter');
            const preloader = document.getElementById('preloader');
            const cesarCharacter = document.querySelector('.preloader-character');
            const heroImage = document.querySelector('.hero-flyer');
            const startedAt = performance.now();
            let loadingComplete = false;
            let blinkTimer = null;

            if (!preloader || !counterElement) return;
            if (getComputedStyle(preloader).display === 'none') {
                preloader.hidden = true;
                return;
            }

            document.body.style.overflow = 'hidden';

            function cesarBlink() {
                if (!cesarCharacter || loadingComplete) return;
                cesarCharacter.classList.add('cesar-blinking');
                setTimeout(() => cesarCharacter.classList.remove('cesar-blinking'), 350);
            }

            function scheduleNextBlink() {
                blinkTimer = setTimeout(() => {
                    cesarBlink();
                    if (!loadingComplete) scheduleNextBlink();
                }, 500 + Math.random() * 1000);
            }

            function animateCounter(now) {
                if (loadingComplete) return;
                const elapsed = now - startedAt;
                counterElement.textContent = `${Math.min(90, Math.round(elapsed / 7))}%`;
                requestAnimationFrame(animateCounter);
            }

            function dismissPreloader() {
                if (loadingComplete) return;
                loadingComplete = true;
                clearTimeout(blinkTimer);
                counterElement.textContent = '100%';
                preloader.style.opacity = '0';
                preloader.style.pointerEvents = 'none';
                document.body.style.overflow = '';
                setTimeout(() => { preloader.hidden = true; }, 320);
            }

            const heroReady = !heroImage || heroImage.complete
                ? Promise.resolve()
                : new Promise(resolve => {
                    heroImage.addEventListener('load', resolve, { once: true });
                    heroImage.addEventListener('error', resolve, { once: true });
                });

            scheduleNextBlink();
            requestAnimationFrame(animateCounter);

            Promise.race([
                heroReady.then(() => {
                    if (heroImage && typeof heroImage.decode === 'function') {
                        return heroImage.decode().catch(() => {});
                    }
                }),
                new Promise(resolve => setTimeout(resolve, 100))
            ]).then(() => requestAnimationFrame(dismissPreloader));

            // Fallback independiente: el overlay nunca puede quedar trabado.
            setTimeout(dismissPreloader, 400);
        })();

        // Los fondos decorativos lejanos se solicitan recién al aproximarse.
        (function deferDecorativeBackgrounds() {
            const background = document.querySelector('.donate-bg-pattern');
            if (!background) return;
            if (!('IntersectionObserver' in window)) {
                background.classList.add('is-visible');
                return;
            }
            const observer = new IntersectionObserver(entries => {
                if (!entries[0].isIntersecting) return;
                background.classList.add('is-visible');
                observer.disconnect();
            }, { rootMargin: '800px 0px' });
            observer.observe(background);
        })();

        // Wachin Animation Loop (1-11-1 ping-pong)
        (function() {
            const wachinSprite = document.getElementById('wachinSprite');
            if (!wachinSprite) return;

            let frame = 1;
            let direction = 1;

            let animationTimer = null;

            function nextFrame() {
                wachinSprite.src = `assets/imagenes/${frame}wachin.png`;
                frame += direction;
                if (frame >= 11) direction = -1;
                if (frame <= 1) direction = 1;
            }

            function startAnimation() {
                if (!animationTimer) animationTimer = setInterval(nextFrame, 150);
            }

            function stopAnimation() {
                clearInterval(animationTimer);
                animationTimer = null;
            }

            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver(entries => {
                    entries[0].isIntersecting ? startAnimation() : stopAnimation();
                }, { rootMargin: '200px 0px' });
                observer.observe(wachinSprite);
            } else {
                startAnimation();
            }
        })();

        // Destello Animation on Logo Hover (1-9-1 ping-pong) - sigue el cursor
        (function() {
            const logoContainer = document.querySelector('.hero-logo-container');
            const destelloSprite = document.getElementById('destelloSprite');
            if (!logoContainer || !destelloSprite) return;

            // Secuencia ping-pong: 1,2,3,4,5,6,7,8,9,9,8,7,6,5,4,3,2 y repite
            const frames = [1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 8, 7, 6, 5, 4, 3, 2];
            let index = 0;
            let animationInterval = null;

            logoContainer.addEventListener('mouseenter', () => {
                index = 0;
                destelloSprite.src = `assets/imagenes/destello${frames[index]}.png`;
                animationInterval = setInterval(() => {
                    index = (index + 1) % frames.length;
                    destelloSprite.src = `assets/imagenes/destello${frames[index]}.png`;
                }, 80);
            });

            logoContainer.addEventListener('mousemove', (e) => {
                const rect = logoContainer.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                destelloSprite.style.left = x + 'px';
                destelloSprite.style.top = y + 'px';
                destelloSprite.style.transform = 'translate(-50%, -50%)';
            });

            logoContainer.addEventListener('mouseleave', () => {
                if (animationInterval) {
                    clearInterval(animationInterval);
                    animationInterval = null;
                }
                index = 0;
            });
        })();

(function() {
            const disco = document.getElementById('discoDisco');
            const songItems = document.querySelectorAll('.soundtrack-songs li');
            let currentAudio = null;
            let currentItem = null;
            let isPlaying = false;
            let rotation = 0;

            // === DRAG/SCRATCH VARIABLES ===
            let isDragging = false;
            let lastAngle = 0;
            let dragVelocity = 0;
            let smoothVelocity = 0;
            let momentumInterval = null;
            let playbackRecoveryInterval = null;

            // Sensibilidad del drag (menor = más suave)
            const DRAG_SENSITIVITY = 0.6;
            // Velocidad normal del disco cuando reproduce
            const NORMAL_SPIN_SPEED = 0.8;

            // === DJ SCRATCH/REWIND SFX SYSTEM (Web Audio API) ===
            let scratchCtx = null;
            let scratchOsc = null;
            let scratchOsc2 = null;
            let scratchNoise = null;
            let scratchNoiseBuffer = null;
            let scratchGain = null;
            let scratchFilter = null;
            let scratchDistortion = null;
            let lastDirection = 0;

            // Crear curva de distorsión para el sonido "sucio"
            function makeDistortionCurve(amount) {
                const samples = 44100;
                const curve = new Float32Array(samples);
                for (let i = 0; i < samples; i++) {
                    const x = (i * 2) / samples - 1;
                    curve[i] = ((3 + amount) * x * 20 * (Math.PI / 180)) / (Math.PI + amount * Math.abs(x));
                }
                return curve;
            }

            // Inicializar Web Audio para scratch
            function initScratchAudio() {
                if (scratchCtx) return;

                scratchCtx = new (window.AudioContext || window.webkitAudioContext)();

                // Buffer de ruido para textura
                const bufferSize = scratchCtx.sampleRate * 0.3;
                scratchNoiseBuffer = scratchCtx.createBuffer(1, bufferSize, scratchCtx.sampleRate);
                const noiseData = scratchNoiseBuffer.getChannelData(0);
                for (let i = 0; i < bufferSize; i++) {
                    noiseData[i] = (Math.random() * 2 - 1);
                }
            }

            // Empezar sonido de scratch DJ
            function startScratchSound() {
                if (!scratchCtx) initScratchAudio();
                if (scratchCtx.state === 'suspended') scratchCtx.resume();

                // Limpiar sonidos anteriores
                stopScratchSound();

                // === OSCILADOR PRINCIPAL (el "beeowww" del rewind) ===
                scratchOsc = scratchCtx.createOscillator();
                scratchOsc.type = 'sawtooth';
                scratchOsc.frequency.value = 200;

                // === OSCILADOR SECUNDARIO (armónico) ===
                scratchOsc2 = scratchCtx.createOscillator();
                scratchOsc2.type = 'square';
                scratchOsc2.frequency.value = 150;

                // === RUIDO (textura de vinilo) ===
                scratchNoise = scratchCtx.createBufferSource();
                scratchNoise.buffer = scratchNoiseBuffer;
                scratchNoise.loop = true;

                // === FILTRO (controla el brillo) ===
                scratchFilter = scratchCtx.createBiquadFilter();
                scratchFilter.type = 'lowpass';
                scratchFilter.frequency.value = 800;
                scratchFilter.Q.value = 8;

                // === DISTORSIÓN (sonido "sucio" de DJ) ===
                scratchDistortion = scratchCtx.createWaveShaper();
                scratchDistortion.curve = makeDistortionCurve(20);
                scratchDistortion.oversample = '2x';

                // === GAIN MASTER ===
                scratchGain = scratchCtx.createGain();
                scratchGain.gain.value = 0;

                // Gains individuales
                const oscGain = scratchCtx.createGain();
                oscGain.gain.value = 0.3;

                const osc2Gain = scratchCtx.createGain();
                osc2Gain.gain.value = 0.15;

                const noiseGain = scratchCtx.createGain();
                noiseGain.gain.value = 0.1;

                // Conectar todo
                scratchOsc.connect(oscGain);
                scratchOsc2.connect(osc2Gain);
                scratchNoise.connect(noiseGain);

                oscGain.connect(scratchFilter);
                osc2Gain.connect(scratchFilter);
                noiseGain.connect(scratchFilter);

                scratchFilter.connect(scratchDistortion);
                scratchDistortion.connect(scratchGain);
                scratchGain.connect(scratchCtx.destination);

                // Iniciar
                scratchOsc.start();
                scratchOsc2.start();
                scratchNoise.start();
            }

            // Actualizar scratch basado en velocidad - SONIDO DJ AGRESIVO
            function updateScratchSound(velocity) {
                if (!scratchGain || !scratchOsc || !scratchFilter) return;

                const absVel = Math.abs(velocity);
                const direction = velocity >= 0 ? 1 : -1;

                // Detectar cambio de dirección para "chirp"
                if (direction !== lastDirection && absVel > 0.5) {
                    // Chirp rápido al cambiar dirección
                    scratchFilter.frequency.setValueAtTime(2500, scratchCtx.currentTime);
                    scratchFilter.frequency.linearRampToValueAtTime(800, scratchCtx.currentTime + 0.05);
                }
                lastDirection = direction;

                // === VOLUMEN (más movimiento = más fuerte) ===
                const targetGain = Math.min(0.4, absVel * 0.06);
                scratchGain.gain.value = scratchGain.gain.value * 0.6 + targetGain * 0.4;

                // === PITCH del oscilador (velocidad = pitch) ===
                // Hacia adelante = sube pitch, hacia atrás = baja pitch
                const basePitch = 200;
                const pitchMod = velocity * 40;
                const targetPitch = Math.max(50, Math.min(1200, basePitch + pitchMod));

                scratchOsc.frequency.value = scratchOsc.frequency.value * 0.7 + targetPitch * 0.3;
                scratchOsc2.frequency.value = scratchOsc2.frequency.value * 0.7 + (targetPitch * 0.75) * 0.3;

                // === FILTRO (más rápido = más brillante) ===
                const targetFreq = 400 + absVel * 200;
                scratchFilter.frequency.value = Math.min(4000, targetFreq);

                // === Q del filtro (resonancia para ese sonido "wah") ===
                scratchFilter.Q.value = 5 + absVel * 2;
            }

            // Parar sonido de scratch
            function stopScratchSound() {
                if (scratchGain) {
                    scratchGain.gain.value = 0;
                }
                if (scratchOsc) {
                    try { scratchOsc.stop(); } catch(e) {}
                    scratchOsc = null;
                }
                if (scratchOsc2) {
                    try { scratchOsc2.stop(); } catch(e) {}
                    scratchOsc2 = null;
                }
                if (scratchNoise) {
                    try { scratchNoise.stop(); } catch(e) {}
                    scratchNoise = null;
                }
            }

            // Obtener centro del disco
            function getDiscCenter() {
                const rect = disco.getBoundingClientRect();
                return {
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2
                };
            }

            // Calcular ángulo desde el centro del disco al punto del cursor
            function getAngle(clientX, clientY) {
                const center = getDiscCenter();
                return Math.atan2(clientY - center.y, clientX - center.x) * (180 / Math.PI);
            }

            // Actualizar playbackRate del audio basado en velocidad del drag
            function updatePlaybackRate(velocity) {
                if (!currentAudio || currentAudio.paused) return;

                // Mapear velocidad del drag a playbackRate
                // velocity positivo = dirección normal, negativo = reversa
                // Rango de playbackRate: 0.25 a 3.0

                const normalizedVelocity = velocity / 8; // Normalizar
                let rate = 1 + normalizedVelocity;

                // Clampear entre 0.1 y 3.0 (browsers no soportan negativo)
                rate = Math.max(0.1, Math.min(3.0, rate));

                currentAudio.playbackRate = rate;
            }

            // Recuperar playbackRate gradualmente a 1.0
            function recoverPlaybackRate() {
                if (playbackRecoveryInterval) {
                    clearInterval(playbackRecoveryInterval);
                }

                playbackRecoveryInterval = setInterval(() => {
                    if (!currentAudio || currentAudio.paused) {
                        clearInterval(playbackRecoveryInterval);
                        playbackRecoveryInterval = null;
                        return;
                    }

                    const currentRate = currentAudio.playbackRate;
                    const diff = 1 - currentRate;

                    if (Math.abs(diff) < 0.02) {
                        currentAudio.playbackRate = 1;
                        clearInterval(playbackRecoveryInterval);
                        playbackRecoveryInterval = null;
                    } else {
                        // Volver suavemente a velocidad normal
                        currentAudio.playbackRate += diff * 0.15;
                    }
                }, 16);
            }

            // === DRAG HANDLERS ===
            function onDragStart(e) {
                e.preventDefault();
                isDragging = true;
                disco.style.cursor = 'grabbing';

                // Cancelar intervals existentes
                if (momentumInterval) {
                    clearInterval(momentumInterval);
                    momentumInterval = null;
                }
                if (playbackRecoveryInterval) {
                    clearInterval(playbackRecoveryInterval);
                    playbackRecoveryInterval = null;
                }

                const clientX = e.touches ? e.touches[0].clientX : e.clientX;
                const clientY = e.touches ? e.touches[0].clientY : e.clientY;
                lastAngle = getAngle(clientX, clientY);
                dragVelocity = 0;
                smoothVelocity = 0;

                // Iniciar sonido de scratch
                startScratchSound();
            }

            function onDragMove(e) {
                if (!isDragging) return;
                e.preventDefault();

                const clientX = e.touches ? e.touches[0].clientX : e.clientX;
                const clientY = e.touches ? e.touches[0].clientY : e.clientY;
                const currentAngle = getAngle(clientX, clientY);

                // Calcular diferencia de ángulo
                let delta = currentAngle - lastAngle;

                // Manejar el wrap-around de -180 a 180
                if (delta > 180) delta -= 360;
                if (delta < -180) delta += 360;

                // Aplicar sensibilidad (más suave)
                delta *= DRAG_SENSITIVITY;

                rotation += delta;
                dragVelocity = delta;

                // Suavizar velocidad para el audio
                smoothVelocity = smoothVelocity * 0.7 + dragVelocity * 0.3;

                disco.style.transform = 'rotate(' + rotation + 'deg)';

                // Afectar velocidad del audio
                updatePlaybackRate(smoothVelocity);

                // Actualizar sonido de scratch
                updateScratchSound(smoothVelocity);

                lastAngle = currentAngle;
            }

            function onDragEnd(e) {
                if (!isDragging) return;
                isDragging = false;
                disco.style.cursor = 'grab';

                // Parar sonido de scratch
                stopScratchSound();

                // Recuperar playbackRate gradualmente
                recoverPlaybackRate();

                // Aplicar momentum al disco
                if (Math.abs(dragVelocity) > 0.3) {
                    momentumInterval = setInterval(() => {
                        dragVelocity *= 0.92; // Fricción
                        rotation += dragVelocity;
                        disco.style.transform = 'rotate(' + rotation + 'deg)';

                        if (Math.abs(dragVelocity) < 0.05) {
                            clearInterval(momentumInterval);
                            momentumInterval = null;
                        }
                    }, 16);
                }
            }

            // === EVENT LISTENERS ===
            disco.style.cursor = 'grab';

            // Mouse events
            disco.addEventListener('mousedown', onDragStart);
            document.addEventListener('mousemove', onDragMove);
            document.addEventListener('mouseup', onDragEnd);

            // Touch events
            disco.addEventListener('touchstart', onDragStart, { passive: false });
            document.addEventListener('touchmove', onDragMove, { passive: false });
            document.addEventListener('touchend', onDragEnd);

            // Rotación con JavaScript (solo cuando no está dragging)
            function spinDisco() {
                if (isPlaying && !isDragging && !momentumInterval) {
                    rotation += NORMAL_SPIN_SPEED;
                    disco.style.transform = 'rotate(' + rotation + 'deg)';
                }
                requestAnimationFrame(spinDisco);
            }
            spinDisco();

            songItems.forEach(item => {
                item.addEventListener('click', function() {
                    const songSrc = this.getAttribute('data-song');

                    // Si clickeamos la misma canción que está sonando, la pausamos
                    if (currentItem === this && currentAudio && !currentAudio.paused) {
                        currentAudio.pause();
                        isPlaying = false;
                        this.classList.remove('active');
                        return;
                    }

                    // Parar canción anterior si existe
                    if (currentAudio) {
                        currentAudio.pause();
                        currentAudio = null;
                    }

                    // Quitar clase active de todos
                    songItems.forEach(s => s.classList.remove('active'));

                    // Reproducir nueva canción
                    currentAudio = new Audio(songSrc);
                    currentItem = this;

                    currentAudio.play().then(() => {
                        isPlaying = true;
                        this.classList.add('active');
                    }).catch(err => {
                        console.log('Error playing audio:', err);
                        isPlaying = false;
                    });

                    // Cuando termina la canción
                    currentAudio.addEventListener('ended', () => {
                        isPlaying = false;
                        this.classList.remove('active');
                        currentAudio = null;
                        currentItem = null;
                    });
                });
            });
        })();
