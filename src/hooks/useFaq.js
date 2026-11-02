import { useState, useEffect, useCallback } from 'react';
import { faqApi } from '../api/faqApi';

export const useFaq = () => {
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filtros y Búsqueda
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('cursos');
    const [suggestions, setSuggestions] = useState([]);
    const [isSearchingSuggestions, setIsSearchingSuggestions] = useState(false);

    // Estado de Acordeones Abiertos (Array de IDs)
    const [openFaqIds, setOpenFaqIds] = useState([]);

    // Registro de Votos de Utilidad por FAQ (id -> 'up' | 'down')
    const [userFeedback, setUserFeedback] = useState({});

    // Carga de preguntas desde Backend
    const fetchFaqs = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await faqApi.getFaqs({
                search,
                category: search ? 'all' : activeCategory,
            });

            setFaqs(res.data || []);

            // Abrir la primera pregunta por defecto si hay resultados
            if (res.data?.length > 0 && !search) {
                setOpenFaqIds([res.data[0].id || res.data[0]._id]);
            }
        } catch (err) {
            setError(err.message || 'Error al obtener las preguntas frecuentes.');
        } finally {
            setLoading(false);
        }
    }, [search, activeCategory]);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchFaqs();
        }, 300);
        return () => clearTimeout(timer);
    }, [fetchFaqs]);

    // Búsqueda Predictiva en Tiempo Real
    const handleSearchChange = async (value) => {
        setSearch(value);
        if (value.trim().length >= 2) {
            setIsSearchingSuggestions(true);
            try {
                const list = await faqApi.getPredictiveSuggestions(value);
                setSuggestions(list);
            } catch {
                setSuggestions([]);
            } finally {
                setIsSearchingSuggestions(false);
            }
        } else {
            setSuggestions([]);
        }
    };

    // Toggle de Acordeón
    const toggleAccordion = (id) => {
        setOpenFaqIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    // Envío de Voto de Utilidad
    const handleVote = async (faqId, isHelpful) => {
        const voteType = isHelpful ? 'up' : 'down';
        if (userFeedback[faqId] === voteType) return; // Evitar voto duplicado

        try {
            setUserFeedback((prev) => ({ ...prev, [faqId]: voteType }));
            await faqApi.submitFeedback(faqId, isHelpful);
        } catch (err) {
            // Revertir estado si falla
            setUserFeedback((prev) => {
                const copy = { ...prev };
                delete copy[faqId];
                return copy;
            });
        }
    };

    const categories = [
        { id: 'cursos', label: 'Cursos & Temario' },
        { id: 'pagos', label: 'Pagos & Suscripciones' },
        { id: 'certificados', label: 'Certificados Oficiales' },
        { id: 'cuenta', label: 'Cuenta & Perfil' },
        { id: 'tecnico', label: 'Requisitos Técnicos' },
    ];

    return {
        faqs,
        loading,
        error,
        search,
        handleSearchChange,
        suggestions,
        isSearchingSuggestions,
        activeCategory,
        setActiveCategory: (cat) => {
            setActiveCategory(cat);
            setSearch('');
            setSuggestions([]);
        },
        categories,
        openFaqIds,
        toggleAccordion,
        userFeedback,
        handleVote,
    };
};