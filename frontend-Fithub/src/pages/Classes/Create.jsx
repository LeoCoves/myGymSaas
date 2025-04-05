import React, { useState, useEffect } from "react";
import { createClassTemplate } from "../../services/classes.js"; // Función de API para crear clases

const CreateClassModal = ({ isOpen, onClose, selectedDate }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startTime: selectedDate ? selectedDate.toLocaleTimeString() : "09:00:00",  // Hora seleccionada
    endTime: "10:00:00",  // Hora de finalización por defecto
  });

  useEffect(() => {
    if (selectedDate) {
      setFormData({
        ...formData,
        startTime: selectedDate.toLocaleTimeString(),  // Ajustamos la hora de inicio al slot seleccionado
      });
    }
  }, [selectedDate]);

    // Función para hacer el POST y manejar la respuesta
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const classData = {
            title: formData.title,
            description: formData.description,
            startTime: formData.startTime,
            endTime: formData.endTime,
            date: selectedDate.toISOString(),  // Convertimos la fecha seleccionada a ISO
          };
    
          // Llamamos a la función createClassTemplate para crear la clase
          const newClass = await createClassTemplate(classData);
          console.log("Clase creada:", newClass);
    
          // Si todo va bien, podemos actualizar los eventos o recargar la página

          onClose();  // Cerramos el modal
        } catch (error) {
          console.error("Error al crear la clase:", error);
        }
      };
    
      if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4">Crea una Nueva Clase</h2>
        <form onSubmit={handleSubmit}>
          <>
          <label className="block">Título de la clase:</label>
            <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="border p-2 w-full"
                placeholder="Título de la Clase o Actividad"
            />
          </>
          <div className="mt-4">
            <label className="block">Descripción:</label>
            <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="border p-2 w-full"
                placeholder="Descripción de la clase"
            />
          </div>
          <div className="mt-4">
            <label className="block">Hora de inicio:</label>
            <input
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                className="border p-2 w-full"
            />
          </div>
          <div className="mt-4">
            <label className="block">Hora de fin:</label>
            <input
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                className="border p-2 w-full"
            />
          </div>
          <button type="submit">Crear clase</button>
        </form>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default CreateClassModal;