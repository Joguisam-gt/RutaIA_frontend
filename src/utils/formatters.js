// src/utils/formatters.js

/**
 * Formatea un valor numérico a moneda ($ USD por defecto).
 * Ej: "$49.99 USD"
 */
export const formatCurrency = (amount = 0, currency = 'USD') => {
    const numericAmount = Number(amount) || 0;
    const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(numericAmount);

    return `${formatted} ${currency}`;
};

/**
 * Formatea una fecha ISO a representación escrita legible. 
 * Ej: "28 Oct, 2026"
 */
export const formatDate = (dateString, options = {}) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Fecha inválida';

    const defaultOptions = {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        ...options,
    };

    return new Intl.DateTimeFormat('es-ES', defaultOptions).format(date);
};

/**
 * Formatea la duración en minutos u horas.
 * Ej: "18 horas" o "45 min"
 */
export const formatDuration = (totalMinutes = 0) => {
    const mins = Number(totalMinutes) || 0;
    if (mins < 60) {
        return `${mins} min`;
    }
    const hours = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    if (remainingMins === 0) {
        return `${hours} ${hours === 1 ? 'hora' : 'horas'}`;
    }
    return `${hours}h ${remainingMins}m`;
};

/**
 * Formatea un valor porcentual.
 * Ej: "85%"
 */
export const formatPercentage = (value = 0) => {
    const numericValue = Number(value) || 0;
    return `${Math.round(numericValue)}%`;
};