import React from 'react';
import { Code, Users, Award, Clock } from 'lucide-react';

export const ValuePropsGrid = () => {
  const valueProps = [
    {
      id: 'practical',
      title: 'Proyectos Reales',
      description: 'Aprende construyendo aplicaciones del mundo real con estándares de la industria.',
      icon: Code,
    },
    {
      id: 'mentorship',
      title: 'Mentoría Guiada',
      description: 'Accede a retroalimentación continua y acompañamiento de instructores experimentados.',
      icon: Users,
    },
    {
      id: 'certification',
      title: 'Certificación Validada',
      description: 'Obtén diplomas acreditados con verificación digital para tu perfil profesional.',
      icon: Award,
    },
    {
      id: 'flexible',
      title: 'Ritmo Adaptativo',
      description: 'Estudia a tu propio ritmo con planes estructurados según tu disponibilidad de tiempo.',
      icon: Clock,
    },
  ];

  return (
    <section className="space-y-6">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-slate-50">
          ¿Por qué aprender en RutaIA?
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
          Diseñado para transformar tu aprendizaje en habilidades prácticas y empleables.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {valueProps.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 hover:border-indigo-500/40 transition-colors shadow-xs"
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <IconComponent size={22} />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {item.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ValuePropsGrid;