import { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import { format, parse, parseISO, startOfWeek, getDay } from "date-fns";
import es from "date-fns/locale/es"; // Para español
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getClassTemplates, getClassSessions } from "../services/classes.js"; // Funciones de API
import { useAuth } from "../contexts/AuthContext.jsx";
import CreateClassModal from "../pages/Classes/Create.jsx"; // Modal de creación
import DetailClassModal from "../pages/Classes/Detail.jsx"; // Modal de detalles de clase
import "../styles/Calendar.css"; // Estilos personalizados

const locales = { es: es };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

const ClassCalendar = () => {
  const [classTemplates, setClassTemplates] = useState([]); // Plantillas de clase
  const [events, setEvents] = useState([]); // Eventos del calendario
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedClassTemplate, setSelectedClassTemplate] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [view, setView] = useState(Views.WEEK);  // Solo semana
  const { idGym } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());


  const fetchClassTemplates = async () => {
    try {
      const data = await getClassTemplates(idGym);
      console.log("Plantillas de clases:", data.$values); // Para depuración
      setClassTemplates(data.$values);
    } catch (error) {
      console.error("Error al cargar las plantillas de clases:", error);
    }
  };
  // Cargar plantillas de clases
  useEffect(() => {
    fetchClassTemplates();
  }, [idGym]);

  // Cargar las sesiones de las plantillas de clases
  useEffect(() => {
    const fetchClassSessions = async () => {
      try {
        const allEvents = []; // Aquí almacenaremos todos los eventos
        for (const template of classTemplates) {
          const sessions = await getClassSessions(template.IdClassTemplate);
          sessions.forEach((session) => {
            // Verificar que las fechas están bien formateadas
            const sessionDate = session.sessionDate ? parseISO(session.sessionDate) : null;
            // Verificar que la fecha sea válida
            if (!isNaN(sessionDate)) {
                // Obtener las horas de inicio y fin de la plantilla de clase
                console.log("Entra?")
                    const startTime = template.StartTime;  // Ejemplo: '09:00:00'
                    const endTime = template.EndTime;      // Ejemplo: '10:00:00'

                    // Convertir las horas de inicio y fin en objetos Date
                    const startTimeParts = startTime.split(':');
                    const endTimeParts = endTime.split(':');

                    // Crear la fecha de inicio y fin combinando la fecha de la sesión con las horas
                    const startDateTime = new Date(sessionDate);
                    startDateTime.setHours(startTimeParts[0], startTimeParts[1], 0);  // Establecer hora, minutos, segundos

                    const endDateTime = new Date(sessionDate);
                    endDateTime.setHours(endTimeParts[0], endTimeParts[1], 0);  // Establecer hora, minutos, segundos
              // Convertir la sesión a un evento de calendario
              allEvents.push({
                title: template.Title || "Clase sin nombre",  // Título de la clase
                description: template.Description || "Sin descripción",  // Descripción
                start: startDateTime,  // Fecha de inicio
                end: endDateTime,    // Fecha de fin (puedes modificar si tienes horas de fin)
                idSession: session.id,  // ID de la sesión
                idClassTemplate: template.IdClassTemplate,  // ID de la plantilla de clase
                instructor: template.Instructor,  // Instructor
              });
            }
          });
        }
        setEvents(allEvents); // Actualizamos el estado con los eventos
        console.log("Eventos cargados:", allEvents); // Para depuración
      } catch (error) {
        console.error("Error al cargar las sesiones de clases:", error);
      }
    };
    if (classTemplates.length > 0) {
      fetchClassSessions();
    }
  }, [idGym, classTemplates]);

  const reloadCalendar = async () => {
    await fetchClassTemplates(); // Esto va a gatillar el otro useEffect que actualiza las sesiones
  };

  const handleSelectSlot = (info) => {
    console.log("Slot seleccionado:", info); // Para depuración
    setSelectedDate(info.start);  // Guardamos la fecha y hora seleccionada
    setShowCreateModal(true);     // Abrimos el modal de creación
  };

  // Función para manejar el clic en una sesión de clase (abre el modal de detalles)
  const handleEventClick = (session) => {
    setSelectedClassTemplate(session);
    setShowDetailModal(true);
  };

  return (
    <div>
      {/* Calendario */}
      <Calendar
        localizer={localizer}
        events={events}  // Mostrar los eventos generados
        startAccessor="start"
        endAccessor="end"
        views={['week', 'day']}  // Solo mostrar la vista semanal
        view={view}
        scrollToTime={new Date(2025, 3, 12, 7, 0)}  // Centrar en las 7:00 a.m.
        onView={setView}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleEventClick}
        style={{ height: '100vh' }}
        toolbar={true}
        selectable={true}
        onNavigate={setCurrentDate}
        date={currentDate}
      />

      {/* Modal para crear plantilla de clase */}
        <CreateClassModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        selectedDate={selectedDate}
        reloadClasses={reloadCalendar}
        />



      {/* Modal para ver detalles de clases */}
      <DetailClassModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        classTemplate={selectedClassTemplate}
        reloadClasses={reloadCalendar}
      />
    </div>
  );
};

export default ClassCalendar;
