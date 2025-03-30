const API_URL = "https://localhost:7216/api/Supplier"; // Reemplaza con tu URL real

// Obtener todos los proveedores
export const getSuppliers = async (idGym) => {
    try {
        const response = await fetch(`${API_URL}/${idGym}/suppliers`);
        if (!response.ok) throw new Error("Error al obtener los proveedores");
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

// Obtener un proveedor por ID
export const getSupplierById = async (idSupplier) => {
    try {
        const response = await fetch(`${API_URL}/${idSupplier}`);
        if (!response.ok) throw new Error("Error al obtener el proveedor");
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

// Crear un nuevo proveedor
export const createSupplier = async (supplierData) => {
    console.log("supplierData", supplierData);
    try {
        const response = await fetch(`${API_URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(supplierData),
        });

        if (!response.ok) throw new Error("Error al crear el proveedor");
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

// Actualizar un proveedor existente
export const updateSupplier = async (idSupplier, supplierData) => {
    try {
        const response = await fetch(`${API_URL}/${idSupplier}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(supplierData),
        });

        if (!response.ok) throw new Error("Error al actualizar el proveedor");
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

// Eliminar un proveedor
export const deleteSupplier = async (idSupplier) => {
    try {
        const response = await fetch(`${API_URL}/${idSupplier}`, {
            method: "DELETE",
        });

        if (!response.ok) throw new Error("Error al eliminar el proveedor");
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};