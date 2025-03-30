import { useState, useEffect } from "react";
import { format } from "date-fns";

const DetailTaskModal = ({ isOpen, onClose, task, onEdit, onDelete }) => {
  const [description, setDescription] = useState('');
  const [levelImportant, setLevelImportant] = useState(1);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // Actualizar el estado cuando la tarea cambia
  useEffect(() => {
    if (task) {
      console.log("Tarea recibida en el modal: ", task);  // Verifica qué tarea recibes
      setDescription(task.description || '');
      setLevelImportant(task.levelImportant || 1);
      setStartDate(task.startDate ?? new Date());
      setEndDate(task.endDate ?? new Date());
    }
  }, [task]);

  const handleSave = () => {
    // Asegurarse de que las fechas y otros datos se envíen correctamente
    onEdit({ 
      ...task, 
      description, 
      levelImportant, 
      startDate: startDate.toISOString(), // Convertir a formato ISO para envío
      endDate: endDate.toISOString() // Convertir a formato ISO para envío
    });
    onClose(); // Cerrar el modal después de guardar
  };

  const handleDelete = () => {
    if (!task || !task.idTask) {
      console.error("No se puede eliminar la tarea: tarea no válida.");
      return;
    }
    onDelete(task.idTask);  // Pasar correctamente el idTask para eliminar
    onClose();  // Cerrar el modal después de eliminar
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
          <h2 className="text-xl font-bold mb-4">Detalles de la Tarea</h2>

          {/* Campo Descripción */}
          <div>
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
              <option value={1}>1 - Baja</option>
              <option value={2}>2 - Media</option>
              <option value={3}>3 - Alta</option>
              <option value={4}>4 - Muy Alta</option>
              <option value={5}>5 - Crítica</option>
            </select>
          </div>

          {/* Campo Fecha de Inicio */}
          <div className="mt-4">
            <label className="block">Fecha de Inicio</label>
            <input
              type="datetime-local"
              value={format(startDate, "yyyy-MM-dd'T'HH:mm")} // Mostrar correctamente la fecha
              onChange={(e) => setStartDate(new Date(e.target.value))} // Actualizar la fecha
              className="border p-2 w-full"
            />
          </div>

          {/* Campo Fecha de Fin */}
          <div className="mt-4">
            <label className="block">Fecha de Fin</label>
            <input
              type="datetime-local"
              value={format(endDate, "yyyy-MM-dd'T'HH:mm")} // Mostrar correctamente la fecha
              onChange={(e) => setEndDate(new Date(e.target.value))} // Actualizar la fecha
              className="border p-2 w-full"
            />
          </div>

          {/* Botones */}
          <div className="flex gap-4 mt-4">
            <button onClick={onClose} className="bg-gray-500 text-white py-2 px-4 rounded">Cancelar</button>
            <button onClick={handleSave} className="bg-blue-500 text-white py-2 px-4 rounded">Guardar Cambios</button>
            <button onClick={handleDelete} className="bg-red-500 text-white py-2 px-4 rounded">Eliminar</button>
          </div>
        </div>
      </div>
    )
  );
};

export default DetailTaskModal;