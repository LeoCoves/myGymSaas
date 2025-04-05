import { useState, useEffect } from "react";
import { format, isValid } from "date-fns";

const DetailTaskModal = ({ isOpen, onClose, task, onEdit, onDelete }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [levelImportant, setLevelImportant] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Actualizar el estado cuando la tarea cambia
  useEffect(() => {
    if (task) {
      console.log("Tarea recibida en el modal: ", task); // Verifica qué tarea recibes
      setTitle(task.title || ""); // Nuevo campo de título
      setDescription(task.description || "");
      setLevelImportant(task.levelImportant || 1);
      setStartDate(task.start ? new Date(task.start) : new Date());
      setEndDate(task.end ? new Date(task.end) : new Date());
    }
  }, [task]);

  // Función para manejar el cambio de la fecha y hora de inicio (fecha completa)
  const handleStartDateChange = (e) => {
    const newStartDate = new Date(e.target.value);  // Convertir la cadena a fecha
    setStartDate(newStartDate); // Actualizamos el estado de la fecha de inicio
  };

  // Función para manejar el cambio de la fecha y hora de fin (fecha completa)
  const handleEndDateChange = (e) => {
    const newEndDate = new Date(e.target.value);  // Convertir la cadena a fecha
    setEndDate(newEndDate); // Actualizamos el estado de la fecha de fin
  };

  // Función para guardar la tarea editada
  const handleSave = () => {
    if (!title.trim()) {
      alert("El título es obligatorio");
      return;
    }

    // Validar que la fecha de fin sea mayor que la fecha de inicio
    if (new Date(endDate) <= new Date(startDate)) {
      alert("La fecha de fin debe ser mayor que la fecha de inicio.");
      return;
    }

    onEdit({
      ...task,
      title, // Guardar el título actualizado
      description,
      levelImportant,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    });

    onClose(); // Cerrar el modal después de guardar
  };

  // Función para eliminar la tarea
  const handleDelete = () => {
    if (!task || !task.idTask) {
      console.error("No se puede eliminar la tarea: tarea no válida.");
      return;
    }
    onDelete(task.idTask); // Pasar correctamente el idTask para eliminar
    onClose(); // Cerrar el modal después de eliminar
  };

  // Función para formatear la fecha y hora de manera segura
  const safeFormat = (date, formatString) => {
    if (isValid(date)) {
      return format(date, formatString);
    }
    return ""; // Devuelve un valor vacío si la fecha no es válida
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
          <h2 className="text-xl font-bold mb-4">Detalles de la Tarea</h2>

          {/* Campo Título */}
          <div>
            <label className="block">Título</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 w-full"
            />
          </div>

          {/* Campo Descripción */}
          <div className="mt-4">
            <label className="block">Descripción</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 w-full"
            />
          </div>

          {/* Campo Nivel de Importancia */}
          <div className="mt-4">
            <label className="block">Nivel de Importancia</label>
            <select
              value={levelImportant}
              onChange={(e) => setLevelImportant(Number(e.target.value))}
              className="border p-2 w-full"
            >
              <option value={1}>🟦- Baja</option>
              <option value={2}>🟨 - Media</option>
              <option value={3}>🟧 - Alta</option>
              <option value={4}>🟥 - Muy Alta</option>
              <option value={5}>♦️ - Crítica</option>
            </select>
          </div>

          {/* Campo Fecha de Inicio */}
          <div className="mt-4">
            <label className="block">Fecha de Inicio</label>
            <input
              type="datetime-local"
              value={safeFormat(startDate, "yyyy-MM-dd'T'HH:mm")}
              onChange={handleStartDateChange}
              className="border p-2 w-full"
            />
          </div>

          {/* Campo Fecha de Fin */}
          <div className="mt-4">
            <label className="block">Fecha de Fin</label>
            <input
              type="datetime-local"
              value={safeFormat(endDate, "yyyy-MM-dd'T'HH:mm")}
              onChange={handleEndDateChange}
              className="border p-2 w-full"
            />
          </div>

          {/* Botones */}
          <div className="flex gap-4 mt-4">
            <button onClick={onClose} className="bg-gray-500 text-white py-2 px-4 rounded">
              Cancelar
            </button>
            <button onClick={handleSave} className="bg-blue-500 text-white py-2 px-4 rounded">
              Guardar Cambios
            </button>
            <button onClick={handleDelete} className="bg-red-500 text-white py-2 px-4 rounded">
              Eliminar
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default DetailTaskModal;
