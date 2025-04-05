// tasks.js
const API_URL = 'https://localhost:7216/api/Task'; // Reemplaza con la URL real de tu API

// Obtener todas las tareas
export const getTasks = async (idGym) => {
  try {
    const response = await fetch(`${API_URL}/${idGym}/tasks`);
    if (!response.ok) {
      throw new Error("Error al obtener las tareas");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en getTasks:", error);
    throw error;
  }
};

// Obtener una tarea específica
export const getTaskById = async (taskId) => {
  try {
    const response = await fetch(`${API_URL}/${taskId}`);
    if (!response.ok) {
      throw new Error("Error al obtener la tarea");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en getTaskById:", error);
    throw error;
  }
};

// Crear una nueva tarea
export const createTask = async (taskData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData), // data debe ser un objeto JSON
    });
    if (!response.ok) {
      throw new Error("Error al crear la tarea");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en createTask:", error);
    throw error;
  }
};

// Actualizar una tarea existente
export const updateTask = async (taskId, updatedTask) => {
  console.log("Actualizando tarea con ID:", taskId);
  console.log("Datos de la tarea actualizada:", updatedTask);
  try {
    const response = await fetch(`${API_URL}/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask), // data debe ser un objeto JSON
    });
    if (!response.ok) {
      throw new Error("Error al actualizar la tarea");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en updateTask:", error);
    throw error;
  }
};

// Eliminar una tarea
export const deleteTask = async (taskId) => {
  try {
    const response = await fetch(`${API_URL}/${taskId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error("Error al eliminar la tarea");
    }
    return await response.json(); // Puede ser un objeto vacío dependiendo de tu API
  } catch (error) {
    console.error("Error en deleteTask:", error);
    throw error;
  }
};
