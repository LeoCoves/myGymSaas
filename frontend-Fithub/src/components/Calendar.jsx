import { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import es from "date-fns/locale/es"; // Para español
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getTasks, createTask, updateTask, deleteTask } from "../services/tasks.js"; 
import { useAuth } from "../contexts/AuthContext.jsx";
import CreateTaskModal from "../pages/Tasks/Create.jsx";
import DetailTaskModal from "../pages/Tasks/Detail.jsx";
import "../styles/Calendar.css"; 

const locales = { es: es };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

const MyCalendar = () => {
  const [tasks, setTasks] = useState([]);
  const [events, setEvents] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [view, setView] = useState(Views.MONTH);  // Establecer el estado de la vista inicial
  const { idGym } = useAuth(); 
  const [currentDate, setCurrentDate] = useState(new Date()); // Estado para la fecha actual

  // Cargar tareas
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks(idGym); 
        setTasks(data);
      } catch (error) {
        console.error("Error al cargar las tareas:", error);
      }
    };
    fetchTasks();
  }, [idGym]);

  // Convertir tareas en eventos de calendario
  useEffect(() => {
    const taskEvents = tasks.map(task => ({
      title: task.description, 
      description: task.description,
      startDate: new Date(task.startDate),
      endDate: new Date(task.endDate),
      idTask: task.idTask,  
      levelImportant: task.levelImportant,
    }));
    setEvents(taskEvents);
  }, [tasks]);

  // Función para manejar la selección de slot (abre el modal de creación)
  const handleSelectSlot = (info) => {
    console.log("Slot seleccionado:", info);
    const { start } = info;
    console.log("Fecha seleccionada:", start);
    setSelectedDate(start);
    setShowCreateModal(true); // Abrir el modal de creación
  };

  // Función para manejar el clic en tarea (abre el modal de detalles)
  const handleEventClick = (task) => {
    console.log("Evento seleccionado:", task);
    setSelectedTask(task);
    setShowDetailModal(true); // Abrir el modal de detalles
  };

  // Función para guardar una nueva tarea
  const handleCreateTask = async (newTask) => {
    console.log("Nueva tarea:", newTask);
    try {
      await createTask(newTask);
      setTasks((prevTasks) => [...prevTasks, newTask]); 
    } catch (error) {
      console.error("Error al crear tarea:", error);
    }
  };

  // Función para editar una tarea
const handleEditTask = async (updatedTask) => {
  console.log("Tarea actualizada:", updatedTask);
  
  // Asegurarnos de que el ID esté presente
  if (!updatedTask.idTask) {
    console.error("El ID de la tarea no está presente");
    return; // Si no hay ID, no continuar con la actualización
  }

  try {
    // Asegurémonos de que pasemos correctamente el ID a la API
    await updateTask(updatedTask.idTask, updatedTask, idGym);
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.idTask === updatedTask.idTask ? updatedTask : task
      )
    );
  } catch (error) {
    console.error("Error al actualizar tarea:", error);
  }
};

  // Función para eliminar una tarea
  const handleDeleteTask = async () => {
    try {
      if (!selectedTask) return;
      await deleteTask(selectedTask.idTask, idGym);
      setTasks((prevTasks) => prevTasks.filter((task) => task.idTask !== selectedTask.idTask));
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  };

  // Manejar cambio de vista (Mes, Semana, Día)
  const handleViewChange = (newView) => {
    setView(newView);
  };

  // Funciones para manejar la navegación (Next, Prev, Today)
  const handleNavigate = (date) => {
    setCurrentDate(date); // Actualiza la fecha actual
  };

  return (
    <div>
      {/* Calendario */}
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="startDate"
        endAccessor="endDate"
        views={['month', 'week', 'day']}
        view={view}  // Añadir el estado de la vista aquí
        onView={handleViewChange}  // Maneja el cambio de vista
        onSelectSlot={handleSelectSlot}  // Selecciona un slot vacío
        onSelectEvent={handleEventClick}  // Clic en un evento
        style={{ height: '100vh' }}
        toolbar={true}
        selectable={true}
        onNavigate={handleNavigate}  
        date={currentDate}
      />

      {/* Modal para crear tareas */}
      <CreateTaskModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleCreateTask}
        selectedDate={selectedDate}
      />

      {/* Modal para ver detalles de tareas */}
      <DetailTaskModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        task={selectedTask}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );
};

export default MyCalendar;
