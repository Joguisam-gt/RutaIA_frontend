import React, { useState } from 'react';
import { Modal } from '../../common/Modal/modal.jsx';
import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import { useNotification } from '../../../context/NotificationContext';

export const LessonModalEditor = ({ isOpen, onClose, onSave, initialData = null }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [duration, setDuration] = useState(initialData?.duration || '');
  const [videoUrl, setVideoUrl] = useState(initialData?.videoUrl || '');
  const { showError, showSuccess } = useNotification();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      showError('El título de la lección es obligatorio.');
      return;
    }

    onSave({
      id: initialData?.id || `lesson-${Date.now()}`,
      title,
      duration,
      videoUrl,
    });

    showSuccess(initialData ? 'Lección actualizada correctamente.' : 'Nueva lección creada.');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Editar Lección' : 'Agregar Nueva Lección'}
      subtitle="Define los detalles y material audiovisual del módulo."
      footer={
        <>
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" size="sm" onClick={handleSubmit}>
            Guardar Lección
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Título de la Lección"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ej: Introducción a Arquitectura Hexagonal"
          required
        />

        <Input
          label="Duración (minutos)"
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Ej: 15"
        />

        <Input
          label="URL del Video (HLS / Vimeo / YouTube)"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="https://..."
        />
      </form>
    </Modal>
  );
};

export default LessonModalEditor;