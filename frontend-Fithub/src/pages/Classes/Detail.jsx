import { useState } from "react";
import { updateClassTemplate, deleteClassTemplate, addClientToSession, removeClientFromSession } from "../../services/classes.js"; // Funciones de API

const DetailClassModal = ({ isOpen, onClose, classTemplate }) => {
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [instructor, setInstructor] = useState(null);

  const handleUpdate = async () => {
    const updatedClassTemplate = {
      ...classTemplate,
      name,
      description,
      instructor,
    };

    try {
      await updateClassTemplate(updatedClassTemplate);
      onClose(); // Cerrar modal después de actualizar
    } catch (error) {
      console.error("Error al actualizar plantilla de clase:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteClassTemplate(classTemplate.id);
      onClose(); // Cerrar modal después de eliminar
    } catch (error) {
      console.error("Error al eliminar plantilla de clase:", error);
    }
  };

  const handleAddClient = async (clientId) => {
    try {
      await addClientToSession(classTemplate.id, clientId);
    } catch (error) {
      console.error("Error al añadir cliente:", error);
    }
  };

  const handleRemoveClient = async (clientId) => {
    try {
      await removeClientFromSession(classTemplate.id, clientId);
    } catch (error) {
      console.error("Error al eliminar cliente:", error);
    }
  };

  return (
    isOpen && (
      <div className="modal">
        <h2>Detalles de la clase</h2>
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="text"
            value={instructor}
            onChange={(e) => setInstructor(e.target.value)}
            required
          />
          <button type="submit">Actualizar</button>
          <button type="button" onClick={handleDelete}>Eliminar</button>
          <button type="button" onClick={onClose}>Cerrar</button>
        </form>
        {/* Aquí puedes añadir la funcionalidad para agregar o quitar clientes */}
      </div>
    )
  );
};

export default DetailClassModal;
