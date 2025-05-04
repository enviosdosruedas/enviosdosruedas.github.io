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
        utils.selectAll('.vision-card, .service-card, .feature-card').forEach(card => {
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
                window.scrollTo({top: 0, behavior: 'smooth'});
            });
        }
    };

    // Inicializar todas las funciones
    initScrollAnimations();
    initBackToTop();
});