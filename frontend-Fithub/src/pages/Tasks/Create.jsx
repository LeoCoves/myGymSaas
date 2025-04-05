import { useState, useEffect } from "react";
import { format, isValid } from "date-fns";
import { useAuth } from "../../contexts/AuthContext.jsx"; // Importar el contexto de autenticación

const CreateTaskModal = ({ isOpen, onClose, onSave, selectedDate }) => {

  const [title, setTitle] = useState(""); // Nuevo campo para el título
  const [description, setDescription] = useState("");
  const [levelImportant, setLevelImportant] = useState(1);

  // Usamos selectedDate como fecha inicial, pero agregamos la hora actual para startDate
  const [startDate, setStartDate] = useState(() => {
    // Usamos solo la fecha de selectedDate y le asignamos la hora actual
    const start = selectedDate ? new Date(selectedDate) : new Date();
    start.setHours(new Date().getHours(), new Date().getMinutes(), 0, 0); // Seteamos la hora actual (sin segundos)
    return start;
  });

  // Establecemos el endDate 30 minutos después del startDate
  const [endDate, setEndDate] = useState(() => {
    const end = new Date(startDate.getTime() + 30 * 60000); // 30 minutos después
    return end;
  });
  const { idGym } = useAuth(); // Obtener el id del gimnasio del contexto
  const [error, setError] = useState("");

  useEffect(() => {
    setStartDate((prevStartDate) => {
      const newStartDate = new Date(selectedDate);
      newStartDate.setHours(prevStartDate.getHours(), prevStartDate.getMinutes(), 0, 0); // Mantener la hora actual
      return newStartDate;
    });

    setEndDate((prevEndDate) => {
      const newEndDate = new Date(selectedDate);
      newEndDate.setHours(prevEndDate.getHours(), prevEndDate.getMinutes(), 0, 0); // Mantener la hora actual
      return newEndDate;
    });
  }, [selectedDate]);



  // Función para guardar la tarea
  const handleSave = () => {
    if (!title.trim()) {
      setError("El título es obligatorio.");
      return;
    }

    // Validar que EndDate sea mayor que StartDate
    if (new Date(startDate) > new Date(endDate)) {
      console.log(startDate, endDate);
      setError("La fecha de fin debe ser mayor que la fecha de inicio.");
      return;
    }

    setError(""); // Limpiar error si todo está bien

    const newTask = {
      idGym,
      title, // Incluir el título
      description,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      levelImportant,
    };

    onSave(newTask);
    onClose();
  };

  // Función para formatear la fecha de manera segura
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
          <h2 className="text-xl font-bold mb-4">Crear Tarea</h2>

          {/* Campo Título */}
          <div>
            <label className="block">Título</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 w-full"
              placeholder="Título de la tarea"
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
              placeholder="Descripción de la tarea"
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
              <option value={1}>🟦 - Baja</option>
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
              onChange={(e) => setStartDate(new Date(e.target.value))}
              className="border p-2 w-full"
            />
          </div>

          {/* Campo Fecha de Fin */}
          <div className="mt-4">
            <label className="block">Fecha de Fin</label>
            <input
              type="datetime-local"
              value={safeFormat(endDate, "yyyy-MM-dd'T'HH:mm")}
              onChange={(e) => setEndDate(new Date(e.target.value))}
              className="border p-2 w-full"
            />
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <div className="flex gap-4 mt-4">
            <button onClick={onClose} className="bg-gray-500 text-white py-2 px-4 rounded">
              Cancelar
            </button>
            <button onClick={handleSave} className="bg-blue-500 text-white py-2 px-4 rounded">
              Guardar
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default CreateTaskModal;
