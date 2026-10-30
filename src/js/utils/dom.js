/**
 * Helper para selección de elementos
 */
export const $ = (selector, context = document) => context.querySelector(selector);

/**
 * Helper para selección múltiple
 */
export const $$ = (selector, context = document) => context.querySelectorAll(selector);

/**
 * Agrega eventos con delegación o directo
 */
export const on = (element, event, handler) => {
    if (element) {
        element.addEventListener(event, handler);
    }
};