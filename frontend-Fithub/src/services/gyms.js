const API_URL = "https://localhost:7216/api/Gym";

// Obtener todos los gimnasios
export const getGyms = async () => {
    try {
        const response = await fetch(API_URL, { method: 'GET' });
        if (!response.ok) throw new Error(response.statusText);
        const data = await response.json()

        return await data;
    } catch (error) {
        console.error("Error obteniendo gimnasios:", error);
        throw error;
    }
};

// Obtener un gimnasio por ID
export const getGymById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'GET' });
        if (!response.ok) throw new Error(response.statusText);
        return await response.json();
    } catch (error) {
        console.error(`Error obteniendo el gimnasio ${id}:`, error);
        throw error;
    }
};

// Crear un nuevo gimnasio
export const createGym = async (gymData) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(gymData),
        });
        if (!response.ok) throw new Error(response.statusText);
        return await response.json();
    } catch (error) {
        console.error("Error creando el gimnasio:", error);
        throw error;
    }
};

// Actualizar un gimnasio existente
export const updateGym = async (id, gymData) => {
    try {
        console.log("ID del gimnasio a actualizar:", id);
        console.log("Datos del gimnasio:", gymData);
        console.log(`Actualizando gimnasio en URL: ${API_URL}/${id}`);


        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(gymData),
        });
        if (!response.ok) throw new Error(response.statusText);
        return await response.json();
    } catch (error) {
        console.error(`Error actualizando el gimnasio ${id}:`, error);
        throw error;
    }
};

// "Eliminar" un gimnasio (cambiar isActive a false)
export const deactivateGym = async (id) => {
    try {
        const gym = await getGymById(id); // Obtener los datos actuales
        gym.isActive = false; // Desactivar

        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(gym),
        });
        if (!response.ok) throw new Error(response.statusText);
        return await response.json();
    } catch (error) {
        console.error(`Error desactivando el gimnasio ${id}:`, error);
        throw error;
    }
};