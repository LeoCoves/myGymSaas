import { useState, useEffect } from "react";
import {
  updateClassTemplate,
  deleteClassTemplate,
  getClassSessionById,
  addClientToSession,
  removeClientFromSession,
} from "../../services/classes.js";
import { getClients } from "../../services/clients.js";
import { useAuth } from "../../contexts/AuthContext";

const DetailClassModal = ({ isOpen, onClose, classTemplate, reloadClasses }) => {
  const formatTime = (date) => date.toTimeString().split(" ")[0];

  const { idGym } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [instructor, setInstructor] = useState("");
  const [idSession, setIdSession] = useState("");

  const [allClients, setAllClients] = useState([]);
  const [search, setSearch] = useState("");
  const [clientsInSession, setClientsInSession] = useState([]);

  // ✅ Seteamos datos de la clase y sesión cuando cambia classTemplate
  useEffect(() => {
    if (classTemplate) {
      setTitle(classTemplate.title || "");
      setDescription(classTemplate.description || "");
      setInstructor(classTemplate.instructor || "");
      setIdSession(classTemplate.idSession || "");
    }
  }, [classTemplate]);

  // ✅ Obtener clientes del gimnasio al abrir modal
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const clients = await getClients(idGym);
        setAllClients(clients.$values || clients);
      } catch (err) {
        console.error("Error cargando clientes:", err);
      }
    };

    if (isOpen) {
      fetchClients();
    }
  }, [isOpen, idGym]);

  // ✅ Función para cargar clientes asignados a la sesión
  const loadSessionClients = async () => {
    try {
      if (idSession) {
        const session = await getClassSessionById(idSession);
        setClientsInSession(session.clients || []);
      }
    } catch (error) {
      console.error("Error cargando sesión:", error);
    }
  };

  // ✅ Ejecutar cuando se abra el modal y haya idSession disponible
  useEffect(() => {
    if (idSession && isOpen) {
      loadSessionClients();
    }
  }, [idSession, isOpen]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedDTO = {
      id: classTemplate.idClassTemplate,
      title,
      description,
      instructor,
      idGym: classTemplate.idGym,
      dayOfWeek: classTemplate.dayOfWeek,
      startTime: formatTime(classTemplate.start),
      endTime: formatTime(classTemplate.end),
    };

    try {
      await updateClassTemplate(classTemplate.idClassTemplate, updatedDTO);
      reloadClasses?.();
      onClose();
    } catch (error) {
      console.error("Error actualizando clase:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteClassTemplate(classTemplate.idClassTemplate);
      reloadClasses?.();
      onClose();
    } catch (error) {
      console.error("Error eliminando clase:", error);
    }
  };

  const handleAddClient = async (clientId) => {
    try {
      await addClientToSession(idSession, clientId);
      await loadSessionClients();
    } catch (error) {
      console.error("Error añadiendo cliente:", error);
    }
  };

  const handleRemoveClient = async (clientId) => {
    try {
      await removeClientFromSession(idSession, clientId);
      await loadSessionClients();
    } catch (error) {
      console.error("Error eliminando cliente:", error);
    }
  };

  const availableClients = allClients.filter(
    c => !clientsInSession.some(s => s.idClient === c.idClient)
  );

  const filteredClients = availableClients.filter(c =>
    c.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-lg max-h-[90vh] overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Editar Clase</h2>

          <form onSubmit={handleUpdate} className="space-y-4">
            <input
              type="text"
              placeholder="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border p-2 rounded"
            />
            <input
              placeholder="Descripción"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Instructor"
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
              className="w-full border p-2 rounded"
            />

            <div className="flex justify-between mt-4">
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Actualizar
              </button>
              <button type="button" onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
                Eliminar
              </button>
              <button type="button" onClick={onClose} className="text-blue-500 underline">
                Cerrar
              </button>
            </div>
          </form>

          {/* Clientes asignados */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Clientes en esta clase</h3>
            {clientsInSession.length === 0 ? (
              <p className="text-gray-500">Ningún cliente asignado aún.</p>
            ) : (
              <>
                <ul className="space-y-1">
                  {clientsInSession.slice(0, 4).map(client => (
                    <li key={client.idClient} className="flex justify-between items-center border p-2 rounded">
                      <span>{client.name} ({client.email})</span>
                      <button
                        onClick={() => handleRemoveClient(client.idClient)}
                        className="text-sm bg-yellow-500 text-white px-2 py-1 rounded"
                      >
                        Quitar
                      </button>
                    </li>
                  ))}
                </ul>
                {clientsInSession.length > 4 && !search.trim() && (
                  <p className="text-sm text-gray-500 mt-2">
                    +{clientsInSession.length - 4} más asignados...
                  </p>
                )}
              </>
            )}
          </div>

          {/* Buscar y añadir clientes */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Buscar y añadir clientes</h3>
            <input
              type="text"
              placeholder="Buscar por nombre o email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border p-2 rounded mb-3"
            />
            {filteredClients.length === 0 ? (
              <p className="text-gray-400">No hay coincidencias.</p>
            ) : (
              <ul className="space-y-1">
                {filteredClients.map(client => (
                  <li key={client.idClient} className="flex justify-between items-center border p-2 rounded">
                    <span>{client.name} ({client.email})</span>
                    <button
                      onClick={() => handleAddClient(client.idClient)}
                      className="text-sm bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Añadir
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default DetailClassModal;
