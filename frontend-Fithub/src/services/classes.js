const API_URL = 'https://localhost:7216/api/Class'; // Reemplaza con la URL real de tu API

export async function getClassTemplates(gymId) {
    const response = await fetch(`${API_URL}/templates/${gymId}`);
    const data = await response.json();
    return data;
}

export async function createClassTemplate(dto) {
    const response = await fetch(`${API_URL}/template`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dto)
    });

    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        console.error('Error creando plantilla de clase');
    }
}

export async function getClassSessions(classTemplateId) {
    const response = await fetch(`${API_URL}/sessions/${classTemplateId}`);
    const data = await response.json();
    return data;
}

export async function addClientToSession(sessionId, clientId) {
    const response = await fetch(`${API_URL}/${sessionId}/clients/${clientId}`, {
        method: 'POST'
    });

    if (response.ok) {
        console.log('Cliente añadido con éxito');
    } else {
        console.error('Error añadiendo cliente a la sesión');
    }
}

export async function updateClassTemplate(id, dto) {
    const response = await fetch(`${API_URL}/templates/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dto)
    });

    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        console.error('Error actualizando plantilla de clase');
    }
}


export async function removeClientFromSession(sessionId, clientId) {
    const response = await fetch(`${API_URL}/${sessionId}/clients/${clientId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        console.log('Cliente eliminado de la sesión');
    } else {
        console.error('Error eliminando cliente de la sesión');
    }
}


export async function deleteClassTemplate(id) {
    const response = await fetch(`${API_URL}/templates/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        console.log('Plantilla de clase eliminada');
    } else {
        console.error('Error eliminando plantilla de clase');
    }
}






