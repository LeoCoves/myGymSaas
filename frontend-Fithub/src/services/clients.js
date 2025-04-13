const API_URL = "https://localhost:7216/api/clients";

// Obtener todos los clientes
export const getClients = async (idGym) => {
    try {
        const response = await fetch(`${API_URL}/gym/${idGym}`);
        if (!response.ok) {
            throw new Error("No se encontraron clientes.");
        }
        return await response.json();
    } catch (error) {
        console.error("Error obteniendo clientes:", error);
        throw error;
    }
};

// Obtener un cliente por ID
export const getClientById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'GET' });
       
        if (!response.ok) throw new Error(response.statusText);
        const data = await response.json()
        console.log(data);
        return await data;
    } catch (error) {
        console.error(`Error obteniendo el cliente ${id}:`, error);
        throw error;
    }
};

// Crear un nuevo cliente
export const createClient = async (clientData) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(clientData),
        });
        if (!response.ok) throw new Error(response.statusText);
        return await response.json();
    } catch (error) {
        console.error("Error creando el cliente:", error);
        throw error;
    }
};

export const updateClient = async (id, clientData) => {
    try {
        console.log("ID del cliente a actualizar:", id);
        console.log("Datos del cliente:", clientData);
        console.log(`Actualizando cliente en URL: ${API_URL}/${id}`);

        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(clientData),
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
        console.error(`Error actualizando el cliente ${id}:`, error);
        throw error;
    }
};

export const getInscriptionByClient = async (idClient) => {
    try {
        const response = await fetch(`${API_URL}/${idClient}/inscription`);
        if (!response.ok) {
            throw new Error("Error al obtener los datos de inscripción");
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.error("Error obteniendo la inscripción:", err);
        throw err;
    }
};

// Crear una inscripcion para el cliente
export const createInscription = async (idClient, inscriptionData) => {
    try {
        const response = await fetch(`${API_URL}/${idClient}/inscriptions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inscriptionData),
        });
        if (!response.ok) throw new Error(response.statusText);
        return await response.json();
    } catch (error) {
        console.error("Error creando la inscripcion:", error);
        throw error;
    }
};


export const deactivateClient = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}/deactivate`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Error desactivando el cliente');
        }
        return data;  // O el objeto de respuesta adecuado
    } catch (error) {
        throw new Error('Error al desactivar el cliente');
    }
};

export const activateClient = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}/activate`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Error activando el cliente');
        }
        return data;  // O el objeto de respuesta adecuado
    } catch (error) {
        throw new Error('Error al activar el cliente');
    }
};