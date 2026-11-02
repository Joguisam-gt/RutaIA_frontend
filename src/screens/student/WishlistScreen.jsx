import React from 'react';
import { useWishlist } from '../../hooks/useWishlist';
import { Navbar } from '../../components/layout/Navbar/Navbar';
import { Sidebar } from '../../components/layout/Sidebar/Sidebar';
import { WishlistCourseCard } from '../../components/domain/wishlist/WishlistCourseCard';
import { WishlistToolbar } from '../../components/domain/wishlist/WishlistToolbar';
import { Heart, Loader2 } from 'lucide-react';

export const WishlistScreen = () => {
    const { items, loading, error, removeFromWishlist } = useWishlist();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
            <Navbar role="student" brandTitle="RutaIA" />

            <div className="flex">
                <Sidebar role="student" currentRoute="/app/favoritos" />

                <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-2xl font-black text-slate-900 dark:text-slate-50 flex items-center gap-2">
                                <Heart size={24} className="text-rose-500 fill-rose-500" />
                                <span>Lista de Deseos</span>
                            </h1>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                Cursos guardados para inscribirte o revisar mas adelante.
                            </p>
                        </div>
                    </div>

                    <WishlistToolbar totalItems={items.length} />

                    {loading ? (
                        <div className="py-12 flex flex-col items-center justify-center text-slate-400">
                            <Loader2 size={24} className="animate-spin mb-2 text-indigo-600" />
                            <span className="text-xs font-semibold">Cargando lista de deseos...</span>
                        </div>
                    ) : error ? (
                        <div className="p-4 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 rounded-2xl text-rose-600 dark:text-rose-400 text-xs">
                            {error}
                        </div>
                    ) : items.length === 0 ? (
                        <div className="py-16 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl bg-white dark:bg-slate-900 p-8">
                            <Heart size={36} className="mx-auto text-slate-300 dark:text-slate-700 mb-3" />
                            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">
                                Tu lista de deseos esta vacia
                            </h3>
                            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                                Explora el catalogo y guarda los cursos de tu interes para acceder facilmente a ellos.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                            {items.map((course) => (
                                <WishlistCourseCard
                                    key={course.id}
                                    course={course}
                                    onRemove={() => removeFromWishlist(course.id)}
                                />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default WishlistScreen;