import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { getClients, activateClient, deactivateClient } from "../../services/clients.js"; // Usamos las funciones adecuadas
import { Link } from "react-router-dom";

const ClientsPage = () => {
    const { idGym, gymName } = useAuth(); // Obtener el id del gimnasio desde el contexto
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadClients();
    }, [idGym]);
    
    const loadClients = async () => {
        try {
            const data = await getClients(idGym);
            setLoading(false);
            setClients(data);
        } catch (error) {
                console.error("Error cargando gimnasios:", error);
        }
    };

    const handleToggleStatus = async (id, isActive) => {
            try {
                // Actualiza el estado local inmediatamente
            setClients((prevClients) =>
                prevClients.map((client) =>
                    client.idClient === id ? { ...client, isActive: !isActive } : client
                )
            );
    
            if (isActive) {
                await deactivateClient(id);
            } else {
                await activateClient(id);
            }
    
            // Cargar los gimnasios nuevamente para sincronizar con la base de datos
            loadClients();
            } catch (error) {
                console.error("Error al actualizar el cliente:", error);
            }
        };

    if (loading) return <p>Cargando clientes...</p>;

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Clientes de {gymName}</h2>

            <Link to={`/${gymName}/client/create`} className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 hover:text-light-500 text-white">
                Crea un nuevo cliente
            </Link>

            {clients.length === 0 ? (
                <p>No hay clientes registrados.</p>
            ) : (
                <ul>
                    {clients.map((client) => (
                        <li key={client.idClient} className="p-2 border-b flex justify-between items-center">
                            <div>
                                <strong>{client.name} {client.surname}</strong> - {client.email}
                                <span
                                    className={`px-2 py-0.5 ml-auto text-xs font-medium tracking-wide ${
                                        client.isActive ? 'text-green-500 bg-green-50' : 'text-red-500 bg-red-50'
                                    } rounded-full`}
                                    >
                                    {client.isActive ? "Activo" : "Inactivo"}
                                </span>

                            </div>
                            <div className="flex space-x-2">
                                {/* Botón para activar/desactivar */}
                                {/* Botón para activar/desactivar */}
                                <button
                                    className={`px-4 py-2 rounded-lg transition ${
                                        client.isActive ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                                    } text-white`}
                                    onClick={() => handleToggleStatus(client.idClient, client.isActive)}
                                >
                                    {client.isActive ? "Desactivar" : "Activar"}
                                </button>

                                {/* Botón para editar */}
                                <Link
                                    className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white"
                                    to={`/${gymName}/client/${client.idClient}/edit`}
                                >
                                    Editar
                                </Link>

                                {/* Botón para ver detalles */}
                                <Link
                                    className="px-4 py-2 rounded bg-yellow-500 hover:bg-yellow-600 text-white"
                                    to={`/${gymName}/client/${client.idClient}`}
                                >
                                    Ver detalles
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ClientsPage;
