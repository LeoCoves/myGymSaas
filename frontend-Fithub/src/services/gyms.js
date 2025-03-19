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

        const responseText = await response.text();

        // Verificamos si la respuesta tiene un cuerpo
        if (!response.ok) {
            console.error(`Error en la API (${response.status}):`, responseText);
            throw new Error(`Error ${response.status}: ${responseText}`);
        }

        // Si la respuesta está vacía (por ejemplo, código 204 No Content)
        if (!responseText) {
            return null;  // O algún valor por defecto, si es necesario
        }

        // Intentamos parsear el JSON solo si hay datos
        return JSON.parse(responseText);  // Convertir la respuesta a JSON solo si tiene cuerpo
    } catch (error) {
        console.error(`Error actualizando el gimnasio ${id}:`, error);
        throw error;
    }
};


export const deactivateGym = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}/deactivate`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Error desactivando el gimnasio');
        }
        return data;  // O el objeto de respuesta adecuado
    } catch (error) {
        throw new Error('Error al desactivar el gimnasio');
    }
};

export const activateGym = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}/activate`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Error activando el gimnasio');
        }
        return data;  // O el objeto de respuesta adecuado
    } catch (error) {
        throw new Error('Error al activar el gimnasio');
    }
};