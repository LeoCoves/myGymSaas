const API_URL = "https://localhost:7216/api/plans";

// Obtener todos los gimnasios
export const getPaymentPlans = async () => {
    try {
        const response = await fetch(API_URL, { method: 'GET' });
        if (!response.ok) throw new Error(response.statusText);
        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Error obteniendo planes de pago:", error);
        throw error;
    }
};

// Obtener un gimnasio por ID
export const getPlanById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'GET' });
        if (!response.ok) throw new Error(response.statusText);
        return await response.json();
    } catch (error) {
        console.error(`Error obteniendo el plan de pago ${id}:`, error);
        throw error;
    }
};

// Crear un nuevo gimnasio
export const createPlan = async (planData) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(planData),
        });
        if (!response.ok) throw new Error(response.statusText);
        return await response.json();
    } catch (error) {
        console.error("Error creando el plan:", error);
        throw error;
    }
};

// Actualizar un gimnasio existente
export const updatePlan = async (id, planData) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(planData),
        });
        if (!response.ok) throw new Error(response.statusText);
        return await response.json();
    } catch (error) {
        console.error(`Error actualizando el plan ${id}:`, error);
        throw error;
    }
};

// "Eliminar" un plan
export const deletePlan = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(id),
        });
        if (!response.ok) throw new Error(response.statusText);
        return await response.json();
    } catch (error) {
        console.error(`Error eliminando el plan ${id}:`, error);
        throw error;
    }
};