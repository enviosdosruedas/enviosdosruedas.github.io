document.addEventListener('DOMContentLoaded', () => {
    // Objeto de utilidades para funciones comunes
    const utils = {
        toggleClass: (element, className, force) => {
            if (element) {
                if (force !== undefined) {
                    element.classList[force ? 'add' : 'remove'](className);
                } else {
                    element.classList.toggle(className);
                }
            }
        },
        addSafeEventListener: (element, event, callback) => {
            if (element) {
                element.addEventListener(event, callback);
            }
        },
        select: (selector, parent = document) => parent.querySelector(selector),
        selectAll: (selector, parent = document) => parent.querySelectorAll(selector)
    };

    // Animaciones al hacer scroll
    const initScrollAnimations = () => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    utils.toggleClass(entry.target, 'animate', true);
                }
            });
        }, observerOptions);

        // Observar elementos para animación
        utils.selectAll('.vision-card, .service-card, .feature-card, .feature, .emprendedores-desc, .emprendedores .text-accent').forEach(card => {
            observer.observe(card);
        });
    };

    // Botón volver arriba
    const initBackToTop = () => {
        const backToTop = document.getElementById('backToTop');

        if (backToTop) {
            window.addEventListener('scroll', () => {
                const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
                backToTop.classList.toggle('visible', scrollPosition > 20);
            });

            utils.addSafeEventListener(backToTop, 'click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    };

    // Función para manejar el menú móvil
    const initMobileMenu = () => {
        const mobileToggle = utils.select('.mobile-nav-toggle');
        const navMenu = utils.select('.nav-menu');
        const navOverlay = utils.select('.nav-overlay');
        const dropdowns = utils.selectAll('.dropdown');

        if (mobileToggle && navMenu) {
            utils.addSafeEventListener(mobileToggle, 'click', () => {
                utils.toggleClass(mobileToggle, 'active');
                utils.toggleClass(navMenu, 'active');
                utils.toggleClass(navOverlay, 'active');
                utils.toggleClass(document.body, 'no-scroll');
            });

            utils.addSafeEventListener(navOverlay, 'click', () => {
                utils.toggleClass(mobileToggle, 'active', false);
                utils.toggleClass(navMenu, 'active', false);
                utils.toggleClass(navOverlay, 'active', false);
                utils.toggleClass(document.body, 'no-scroll', false);
            });

            // Manejar dropdowns en móvil
            dropdowns.forEach(dropdown => {
                const trigger = dropdown.querySelector('a');
                utils.addSafeEventListener(trigger, 'click', (e) => {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        utils.toggleClass(dropdown, 'active');
                    }
                });
            });
        }
    };

    // Inicializar Swiper para la sección de emprendedores
    const initSwiper = () => {
        if (document.querySelector('.mySwiper')) {
            new Swiper(".mySwiper", {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
                autoplay: {
                    delay: 3500,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                breakpoints: {
                    640: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 1,
                    },
                    1024: {
                        slidesPerView: 1,
                    },
                },
            });
        }
    };

    // Inicializar todas las funciones
    initScrollAnimations();
    initBackToTop();
    initMobileMenu();
    initSwiper();
});