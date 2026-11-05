// src/api/courseApi.js
import { apiClient } from './apiClient';

export const courseApi = {
    /**
     * Obtiene el catalogo de cursos aplicando filtros (RF 04).
     * Sincronizado con course.controller.js de Express.
     */
    getCourses: async (params = {}) => {
        const queryParams = new URLSearchParams();

        // 1. Busqueda por texto
        if (params.search) queryParams.append('search', params.search);

        // 2. Filtro de Categoria (Sincronizado singular/plural)
        if (params.category) {
            queryParams.append('category', params.category);
        } else if (params.categories?.length) {
            queryParams.append('category', params.categories[0]);
            queryParams.append('categories', params.categories.join(','));
        }

        // 3. Filtro de Nivel (Sincronizado singular/plural)
        if (params.level) {
            queryParams.append('level', params.level);
        } else if (params.levels?.length) {
            queryParams.append('level', params.levels[0]);
            queryParams.append('levels', params.levels.join(','));
        }

        // 4. Parametros complementarios
        if (params.status) queryParams.append('status', params.status);
        if (params.sort) queryParams.append('sort', params.sort);
        if (params.page) queryParams.append('page', params.page);
        if (params.limit) queryParams.append('limit', params.limit || 50);

        const response = await apiClient.get(`/courses?${queryParams.toString()}`);
        return response.data;
    },

    /**
     * Obtiene la estructura de nodos y aristas desde Qdrant para la pestaña de Administrador
     * GET /api/v1/courses/graph
     */
    getCourseGraph: async () => {
        const response = await apiClient.get('/courses/graph');
        return response.data;
    },

    /**
     * Consulta el detalle de un curso especifico por ID (RF 03)
     */
    getCourseById: async (courseId) => {
        const response = await apiClient.get(`/courses/${courseId}`);
        return response.data;
    },

    /**
     * Sugerencias de busqueda ligeras
     */
    getSearchSuggestions: async (query) => {
        if (!query || query.trim().length < 2) return [];
        try {
            const response = await apiClient.get(`/courses?search=${encodeURIComponent(query)}&limit=5`);
            const courses = response.data?.data || [];
            return courses.map(c => c.title);
        } catch {
            return [];
        }
    },

    /**
     * Metadatos para los checkboxes del sidebar con fallback de seguridad
     */
    getCategoriesMetaData: async () => {
        try {
            const response = await apiClient.get('/courses/categories-meta');
            return response.data?.data || [];
        } catch {
            // Fallback con las 5 categorias oficiales de RutaIA
            return [
                { id: '1', name: 'Desarrollo Web', count: 4 },
                { id: '2', name: 'Inteligencia Artificial', count: 4 },
                { id: '3', name: 'Bases de Datos', count: 4 },
                { id: '4', name: 'Programacion', count: 4 },
                { id: '5', name: 'Automatizacion y Datos', count: 4 }
            ];
        }
    }
};

export default courseApi;