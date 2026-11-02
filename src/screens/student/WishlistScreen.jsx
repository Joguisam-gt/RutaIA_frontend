import React from 'react';
import { useWishlist } from '../../hooks/useWishlist';
import { HeaderControls } from '../../components/common/HeaderControls';
import { WishlistToolbar } from '../../components/domain/wishlist/WishlistToolbar';
import { WishlistCourseCard } from '../../components/domain/wishlist/WishlistCourseCard';
import { WishlistUndoToast } from '../../components/domain/wishlist/WishlistUndoToast';
import { Loader2, Heart, ArrowLeft } from 'lucide-react';

export const WishlistScreen = () => {
    const {
        wishlistItems,
        loading,
        error,
        viewMode,
        setViewMode,
        sortBy,
        setSortBy,
        undoToast,
        dismissToast,
        removeItem,
        undoRemove,
        clearAll,
    } = useWishlist();

    // Fallback estático en caso de carga inicial sin datos de backend
    const fallbackItems = [
        {
            id: 'c-201',
            title: 'Agentes de IA y Orquestación RAG con n8n y LangChain',
            category: 'Artificial Intelligence',
            thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500',
            rating: 4.9,
            reviewsCount: 142,
            duration: '22 horas',
            totalLessons: 28,
            price: 34.99,
            originalPrice: 59.99,
            isEnrolled: false,
            slug: 'agentes-ia-rag-n8n-langchain',
        },
        {
            id: 'c-202',
            title: 'Desarrollo de Aplicaciones Móviles con React Native y Expo',
            category: 'Mobile Dev',
            thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500',
            rating: 4.8,
            reviewsCount: 210,
            duration: '16 horas',
            totalLessons: 20,
            price: 29.99,
            originalPrice: 44.99,
            isEnrolled: false,
            slug: 'react-native-expo-mobile',
        },
    ];

    const displayItems = wishlistItems.length > 0 ? wishlistItems : fallbackItems;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors">
            {/* Header Fijo */}
            <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 px-6 py-4">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <a href="/app/dashboard" className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                            <ArrowLeft size={18} />
                        </a>
                        <span className="text-lg font-black tracking-tight text-indigo-600 dark:text-indigo-400">
                            RutaIA — Mis Favoritos
                        </span>
                    </div>
                    <HeaderControls />
                </div>
            </header>

            {/* Main Container */}
            <main className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Toolbar con total de guardados, selector de orden, switcher Grid/Lista y vaciado */}
                <WishlistToolbar
                    totalItems={displayItems.length}
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                    viewMode={viewMode}
                    onViewModeChange={setViewMode}
                    onClearAll={clearAll}
                />

                {/* Estado de Carga o Lista Vacía */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                        <Loader2 size={36} className="text-indigo-500 animate-spin mb-3" />
                        <span className="text-xs font-medium">Cargando tus cursos guardados...</span>
                    </div>
                ) : error ? (
                    <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-center text-xs font-semibold max-w-xl mx-auto my-12">
                        {error}
                    </div>
                ) : displayItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 max-w-lg mx-auto">
                        <div className="w-16 h-16 rounded-3xl bg-rose-50 dark:bg-rose-950/60 text-rose-500 flex items-center justify-center mb-4 border border-rose-200 dark:border-rose-900/40">
                            <Heart size={32} />
                        </div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
                            Tu lista de deseos está vacía
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 max-w-sm">
                            Explora nuestro catálogo y guarda los cursos que deseas estudiar más adelante haciendo clic en el icono de corazón.
                        </p>
                        <a
                            href="/cursos"
                            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                        >
                            Explorar Cursos Disponible
                        </a>
                    </div>
                ) : (
                    <div
                        className={
                            viewMode === 'grid'
                                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                                : 'space-y-4'
                        }
                    >
                        {displayItems.map((course) => (
                            <WishlistCourseCard
                                key={course.id}
                                course={course}
                                viewMode={viewMode}
                                onRemove={removeItem}
                            />
                        ))}
                    </div>
                )}
            </main>

            {/* Toast Notificación de Deshecho (Undo Toast) */}
            <WishlistUndoToast
                toastData={undoToast}
                onUndo={undoRemove}
                onDismiss={dismissToast}
            />
        </div>
    );
};

export default WishlistScreen;