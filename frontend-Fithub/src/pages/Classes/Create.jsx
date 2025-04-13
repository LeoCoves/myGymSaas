import React, { useState, useEffect } from "react";
import { createClassTemplate } from "../../services/classes.js";
import { useAuth } from "../../contexts/AuthContext.jsx";

const CreateClassModal = ({ isOpen, onClose, selectedDate, reloadClasses }) => {
  const { idGym } = useAuth();

  const daysOfWeek = [
    { value: 0, label: "Domingo" },
    { value: 1, label: "Lunes" },
    { value: 2, label: "Martes" },
    { value: 3, label: "Miércoles" },
    { value: 4, label: "Jueves" },
    { value: 5, label: "Viernes" },
    { value: 6, label: "Sábado" },
  ];

  const formatTime = (date) =>
    date.toTimeString().split(" ")[0]; // HH:mm:ss

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    instructor: "",
    idGym: idGym,
    dayOfWeek: selectedDate ? selectedDate.getDay() : "",
    startTime: selectedDate ? formatTime(selectedDate) : "09:00:00",
    endTime: selectedDate
      ? formatTime(new Date(selectedDate.getTime() + 30 * 60000))
      : "09:30:00",
  });

  useEffect(() => {
    if (selectedDate) {
      const newStartTime = formatTime(selectedDate);
      const newEndTime = formatTime(new Date(selectedDate.getTime() + 30 * 60000));

      setFormData((prev) => ({
        ...prev,
        startTime: newStartTime,
        endTime: newEndTime,
        dayOfWeek: selectedDate.getDay(),
      }));
    }
  }, [selectedDate]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      idGym: idGym,
    }));
  }, [idGym]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const classData = {
        title: formData.title,
        description: formData.description,
        instructor: formData.instructor,
        idGym: Number(formData.idGym),
        startTime: formData.startTime,
        endTime: formData.endTime,
        dayOfWeek: formData.dayOfWeek,
      };

      const newClass = await createClassTemplate(classData);
      console.log("Clase creada:", newClass);

      // Si tenés una función para refrescar la lista de clases:
      if (reloadClasses) reloadClasses();

      onClose();
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
          <div>
            <label className="block">Título de la clase:</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="border p-2 w-full"
              placeholder="Título de la Clase o Actividad"
            />
          </div>

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
            <label className="block">Instructor:</label>
            <input
              type="text"
              value={formData.instructor}
              onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
              className="border p-2 w-full"
              placeholder="Instructor de la clase"
            />
          </div>

          <div className="mt-4">
            <label className="block">Día de la semana:</label>
            <select
              value={formData.dayOfWeek}
              onChange={(e) => setFormData({ ...formData, dayOfWeek: Number(e.target.value) })}
              className="border p-2 w-full"
            >
              <option value="">Selecciona un día</option>
              {daysOfWeek.map((day) => (
                <option key={day.value} value={day.value}>
                  {day.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4">
            <label className="block">Hora de inicio:</label>
            <input
              type="time"
              value={formData.startTime.slice(0, 5)}
              onChange={(e) =>
                setFormData({ ...formData, startTime: `${e.target.value}:00` })
              }
              className="border p-2 w-full"
            />
          </div>

          <div className="mt-4">
            <label className="block">Hora de fin:</label>
            <input
              type="time"
              value={formData.endTime.slice(0, 5)}
              onChange={(e) =>
                setFormData({ ...formData, endTime: `${e.target.value}:00` })
              }
              className="border p-2 w-full"
            />
          </div>

          <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
            Crear clase
          </button>
        </form>
        <button onClick={onClose} className="mt-2 text-sm underline text-blue-500">
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default CreateClassModal;
