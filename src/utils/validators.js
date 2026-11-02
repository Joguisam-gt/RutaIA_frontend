/**
 * Valida el formato de correo electrónico.
 */
export const isValidEmail = (email) => {
    if (!email || typeof email !== 'string') return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
};

/**
 * Valida la fortaleza de una contraseña.
 * Requisitos: Mínimo 8 caracteres, al menos una letra mayúscula y un número.
 */
export const validatePassword = (password) => {
    if (!password || typeof password !== 'string') {
        return { isValid: false, message: 'La contraseña es requerida.' };
    }
    if (password.length < 8) {
        return { isValid: false, message: 'La contraseña debe tener al menos 8 caracteres.' };
    }
    if (!/[A-Z]/.test(password)) {
        return { isValid: false, message: 'Debe incluir al menos una letra mayúscula.' };
    }
    if (!/[0-9]/.test(password)) {
        return { isValid: false, message: 'Debe incluir al menos un número.' };
    }
    return { isValid: true, message: '' };
};

/**
 * Valida una URL estructurada (HTTP/HTTPS).
 */
export const isValidUrl = (url) => {
    if (!url || typeof url !== 'string') return false;
    try {
        const parsed = new URL(url);
        return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
        return false;
    }
};

/**
 * Valida una estructura preliminar de IBAN bancario.
 */
export const isValidIBAN = (iban) => {
    if (!iban || typeof iban !== 'string') return false;
    const cleanIBAN = iban.replace(/\s+/g, '').toUpperCase();
    const ibanRegex = /^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/;
    return ibanRegex.test(cleanIBAN);
};