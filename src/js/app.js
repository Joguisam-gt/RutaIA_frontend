import { $, on } from './utils/dom.js';

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = $('#menuToggle');
    const navMenu = $('#navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle Menú Móvil
    if (menuToggle && navMenu) {
        on(menuToggle, 'click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('is-active');
        });

        // Cerrar menú al hacer clic en un link (UX móvil)
        navLinks.forEach(link => {
            on(link, 'click', () => {
                navMenu.classList.remove('is-active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
});