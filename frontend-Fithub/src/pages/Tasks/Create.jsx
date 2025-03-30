import { useState } from 'react';
import { format } from "date-fns";
import { useAuth } from "../../contexts/AuthContext.jsx"; // Importar el contexto de autenticación

const CreateTaskModal = ({ isOpen, onClose, onSave, selectedDate }) => {
  const [description, setDescription] = useState('');
  const [levelImportant, setLevelImportant] = useState(1);
  const [startDate, setStartDate] = useState(selectedDate || new Date()); // Usar la fecha seleccionada si existe
  const [endDate, setEndDate] = useState(new Date(startDate.getTime() + 30 * 60000)); // Definir 30 minutos después de startDate por defecto
  const { idGym } = useAuth(); // Obtener el id del gimnasio del contexto

  const handleSave = () => {
    // Asegurarse de que las fechas están en formato ISO antes de enviarlas
    const newTask = {
      idGym: idGym,
      description,
      startDate: startDate.toISOString(),  // Convertir a ISO
      endDate: endDate.toISOString(),      // Convertir a ISO
      levelImportant
    };

    onSave(newTask);  // Llamamos a la función onSave para agregar la tarea
    onClose();        // Cerramos el modal después de guardar
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
          <h2 className="text-xl font-bold mb-4">Crear Tarea</h2>
          <div>
            <label className="block">Descripción</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 w-full"
              placeholder="Descripción de la tarea"
            />
          </div>
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

          <div className="flex gap-4 mt-4">
            <button onClick={onClose} className="bg-gray-500 text-white py-2 px-4 rounded">Cancelar</button>
            <button onClick={handleSave} className="bg-blue-500 text-white py-2 px-4 rounded">Guardar</button>
          </div>
        </div>
      </div>
    )
  );
};

export default CreateTaskModal;
