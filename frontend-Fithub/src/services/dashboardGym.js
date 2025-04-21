const API_URL = "https://localhost:7216/api/Dashboard";

// Obtener todos los clientes
export const getSummary = async (range, idGym) => {
    console.log("ID del gimnasio:", idGym); // Para depuración
    try {
        const response = await fetch(`${API_URL}/summary?range=${range}&idGym=${idGym}`);
        if (!response.ok) {
            throw new Error("Error obteniendo datos.");
        }
        return await response.json();
    } catch (error) {
        console.error("Error obteniendo datos del servidor:", error);
        throw error;
    }
};

// Obtener todos los clientes
export const getCashFlow = async (idGym, range = 'monthly') => {
    try {
        const response = await fetch(`${API_URL}/cashflow?idGym=${idGym}&range=${range}`);
        if (!response.ok) {
            throw new Error("No se encontro el cierre de caja.");
        }
        return await response.json();
    } catch (error) {
        console.error("Error obteniendo cierre de caja:", error);
        throw error;
    }
};
