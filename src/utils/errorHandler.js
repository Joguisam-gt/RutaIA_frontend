import { HTTP_STATUS } from '../constants/queryStatus';

/**
 * Extrae y estandariza mensajes de error legibles desde respuestas de API u objetos Error.
 * Mensaje de error formateado para el usuario.
 */
export const parseApiError = (error) => {
    if (typeof error === 'string') return error;

    if (error?.response) {
        const { status, data } = error.response;

        if (data?.message) {
            return data.message;
        }

        switch (status) {
            case HTTP_STATUS.BAD_REQUEST:
                return 'La solicitud contiene datos inválidos. Revisa la información ingresada.';
            case HTTP_STATUS.UNAUTHORIZED:
                return 'Tu sesión ha expirado o no estás autorizado. Por favor, inicia sesión nuevamente.';
            case HTTP_STATUS.FORBIDDEN:
                return 'No tienes permisos suficientes para realizar esta acción.';
            case HTTP_STATUS.NOT_FOUND:
                return 'El recurso solicitado no fue encontrado.';
            case HTTP_STATUS.UNPROCESSABLE_ENTITY:
                return 'Ocurrió un error de validación en el servidor.';
            case HTTP_STATUS.INTERNAL_SERVER_ERROR:
                return 'Error interno del servidor. Por favor, intenta de nuevo más tarde.';
            default:
                return `Error del servidor (${status}). Intenta nuevamente.`;
        }
    }

    if (error?.request) {
        return 'No se pudo conectar con el servidor. Revisa tu conexión a internet.';
    }

    return error?.message || 'Ha ocurrido un error inesperado. Intenta de nuevo.';
};