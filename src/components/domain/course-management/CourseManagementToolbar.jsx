// src/components/domain/course-management/CourseManagementToolbar.jsx
import React from 'react';
import { Search, Plus, Filter } from 'lucide-react';

export const CourseManagementToolbar = ({
    tabs = [
        { id: 'all', label: 'Todos los Cursos' },
        { id: 'published', label: 'Publicados' },
        { id: 'draft', label: 'Borradores' }
    ],
    activeTab = 'all',
    onTabChange = () => {},
    searchQuery = '',
    onSearchChange = () => {},
    onNewCourseClick = () => {}
}) => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 shadow-xs">
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
                            activeTab === tab.id
                                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                    <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Buscar por título o tecnología..."
                        className="w-full pl-10 pr-4 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                </div>
                <a
                    href="/instructor/editor-curso"
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors flex items-center gap-2 shadow-sm shrink-0"
                >
                    <Plus size={16} />
                    <span>Nuevo Curso</span>
                </a>
            </div>
        </div>
    );
};

export default CourseManagementToolbar;