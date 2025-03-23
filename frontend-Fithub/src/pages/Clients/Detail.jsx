// src/pages/clients/ClientDetailPage.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { getClientById } from "../../services/clients.js";
import { useAuth } from "../../contexts/AuthContext.jsx";

const DetailClientPage = () => {
    const { idClient } = useParams(); // Obtener el id del cliente desde los parámetros de la URL
    const [client, setClient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { gymName } = useAuth(); 

    // Obtener los detalles del cliente
    useEffect(() => {
        const fetchClient = async () => {
            try {
                const clientData = await getClientById(idClient);
                console.log(clientData)
                setClient(clientData);
            } catch (err) {
                setError("Error al cargar los datos del cliente");
            } finally {
                setLoading(false);
            }
        };

        fetchClient();
        
    }, [idClient]);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Detalles del Cliente</h2>
            <div className="space-y-4">
                <div><strong>Nombre:</strong> {client.name} {client.surname}</div>
                <div><strong>Correo Electrónico:</strong> {client.email}</div>
                <div><strong>Número de Teléfono:</strong> {client.phoneNumber}</div>
                <div><strong>Estado:</strong> {client.isActive ? "Activo" : "Inactivo"}</div>
                {/* Agrega más campos de detalle según sea necesario */}
                <Link
                    className="px-4 py-2 rounded bg-gray-500 hover:bg-gray-600 text-white"
                    to={`/${gymName}/clients`}
                >
                    Volver
                </Link>
                <Link
                    className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white"
                    to={`/${gymName}/client/${client.idClient}/edit`}
                >
                    Editar
                </Link>
            </div>
        </div>
    );
};

export default DetailClientPage;
