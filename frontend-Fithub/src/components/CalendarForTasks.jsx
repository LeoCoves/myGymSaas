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

const TaskCalendar = () => {
  const [tasks, setTasks] = useState([]);
  const [events, setEvents] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [view, setView] = useState(Views.MONTH);
  const { idGym } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());

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
      title: task.title || "Sin título", // Mostrar el título, si no tiene, mostrar "Sin título"
      description: task.description,
      start: new Date(task.startDate),
      end: new Date(task.endDate),
      idTask: task.idTask,
      levelImportant: task.levelImportant,
    }));
    setEvents(taskEvents);
  }, [tasks]);

  const getBackgroundColor = (levelImportant) => {
    switch (levelImportant) {
      case 1:
        return 'rgba(0, 159, 255, 0.5)';  // Baja
      case 2:
        return 'rgba(255, 236, 130, 0.59)';      // Media
      case 3:
        return 'rgba(236, 141, 0, 0.5)';      // Alta
      case 4:
        return 'rgba(239, 60, 60, 0.76)';         // Muy Alta
      case 5:
        return 'rgba(168, 16, 16, 0.79)';     // Crítica
      default:
        return 'rgb(210, 210, 210)';        // Por defecto
    }
  };

  // Función para manejar la selección de slot (abre el modal de creación)
  const handleSelectSlot = (info) => {
    setSelectedDate(info.start);
    setShowCreateModal(true);
  };

  // Función para manejar el clic en tarea (abre el modal de detalles)
  const handleEventClick = (task) => {
    setSelectedTask(task);
    setShowDetailModal(true);
  };

  // Función para guardar una nueva tarea
  const handleCreateTask = async (newTask) => {
    if (!newTask.title || newTask.title.trim() === "") {
      console.error("El título es obligatorio");
      return;
    }

    try {
      await createTask(newTask);
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error) {
      console.error("Error al crear tarea:", error);
    }
  };

  // Función para editar una tarea
  const handleEditTask = async (updatedTask) => {
    if (!updatedTask.idTask) {
      console.error("El ID de la tarea no está presente");
      return;
    }

    try {
      await updateTask(updatedTask.idTask, updatedTask);
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
    if (!selectedTask) return;

    try {
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
    setCurrentDate(date);
  };

  return (
    <div>
      {/* Calendario */}
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={['month', 'week', 'day']}
        view={view}
        scrollToTime={new Date(2025, 3, 12, 7, 0)}  // Centrar en las 7:00 a.m.
        onView={handleViewChange}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleEventClick}
        style={{ height: '100vh' }}
        toolbar={true}
        selectable={true}
        onNavigate={handleNavigate}
        date={currentDate}
        eventPropGetter={(event) => {
          // Cambiar el color según el nivel de importancia
          const backgroundColor = getBackgroundColor(event.levelImportant);
          return {
            className: `rbc-event`, // Clase dinámica
            style: { backgroundColor,
              color: 'white',
              borderRadius: '5px',
              padding: '10px',
              textAlign: 'left',
              fontSize: '0.8em',
              cursor: 'pointer',
              minHeight: '30px',
              maxWidth: '200px',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
              whiteSpace: 'normal', // <- permite múltiples líneas
              overflow: 'hidden',   // <- evita cortar el contenido
             }, // Opcionalmente también puedes agregar estilo directo
          };
        }}
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

export default TaskCalendar;
