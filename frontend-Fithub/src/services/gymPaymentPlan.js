const API_URL = "https://localhost:7216/api/GymCustomPaymentPlan";

// Obtener todos los gimnasios
export const getPaymentPlans = async (idGym) => {
    try {
        const response = await fetch(`${API_URL}/gym/${idGym}`, { method: 'GET' });
        if (!response.ok) throw new Error(response.statusText);
        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Error obteniendo planes de pago:", error);
        throw error;
    }
};

// Obtener un gimnasio por ID
export const getPlanById = async (idPlan) => {
    try {
        const response = await fetch(`${API_URL}/${idPlan}`, { method: 'GET' });
        if (!response.ok) throw new Error(response.statusText);
        return await response.json();
    } catch (error) {
        console.error(`Error obteniendo el plan de pago ${idPlan}:`, error);
        throw error;
    }
};

export const createGymPlan = async (planData) => {
    console.log(planData);
    console.log(planData.Features)

    // Asegúrate de que "features" sea un arreglo no vacío
    if (!planData.Features || planData.Features.length === 0) {
        throw new Error('El plan debe tener al menos una característica.');
    }
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

export const updateGymPlan = async (id, planData) => {
    console.log("Cuerpo de la solicitud:", JSON.stringify(planData))
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(planData),
        });

        const responseText = await response.text(); // Obtener la respuesta como texto

        if (!response.ok) {
            console.error(`Error en la API (${response.status}):`, responseText);
            throw new Error(`Error ${response.status}: ${responseText}`);
        }

        return JSON.parse(responseText); // Convertir la respuesta a JSON solo si fue exitosa
    } catch (error) {
        console.error(`Error actualizando el plan ${id}:`, error);
        throw error;
    }
};


export const deletePlan = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),  // Envía un objeto con el id
        });

        if (!response.ok) throw new Error(response.statusText);

        // Si la respuesta es 204, no intentes leer el cuerpo
        if (response.status === 204) {
            return { success: true };  // Indica que la eliminación fue exitosa
        }

        // Si la respuesta no es 204, intenta analizar la respuesta como JSON
        return await response.json();

    } catch (error) {
        console.error(`Error eliminando el plan ${id}:`, error);
        throw error;
    }
};

