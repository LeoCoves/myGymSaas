// src/pages/clients/EditClientPage.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { getClientById, updateClient } from "../../services/clients.js";

const EditClientPage = () => {
    const { idClient } = useParams();  // Obtener el id del cliente desde los parámetros de la URL
    const navigate = useNavigate();
    const { gymName } = useAuth();

    const [client, setClient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Obtener los datos del cliente
    useEffect(() => {
        const fetchClient = async () => {
            try {
                const clientData = await getClientById(idClient);
                setClient(clientData);
            } catch (err) {
                setError("Error al cargar los datos del cliente");
            } finally {
                setLoading(false);
            }
        };

        fetchClient();
    }, [idClient]);

    // Manejar el formulario de edición
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateClient(idClient, client); // Actualizar cliente
            navigate(`/clients/${idClient}`); // Redirigir a la página de detalles
        } catch (err) {
            setError("Error al actualizar el cliente");
        }
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Editar Cliente</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block">Nombre</label>
                    <input
                        type="text"
                        value={client.name}
                        onChange={(e) => setClient({ ...client, name: e.target.value })}
                        className="px-4 py-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block">Apellido</label>
                    <input
                        type="text"
                        value={client.surname}
                        onChange={(e) => setClient({ ...client, surname: e.target.value })}
                        className="px-4 py-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block">Correo Electrónico</label>
                    <input
                        type="email"
                        value={client.email}
                        onChange={(e) => setClient({ ...client, email: e.target.value })}
                        className="px-4 py-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block">Número de Teléfono</label>
                    <input
                        type="tel"
                        value={client.phoneNumber}
                        onChange={(e) => setClient({ ...client, phoneNumber: e.target.value })}
                        className="px-4 py-2 border rounded"
                    />
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700">Activo</label>
                    <input 
                        type="checkbox" 
                        name="isActive" 
                        checked={client.isActive} 
                        onChange={(e) => setClient({ ...client, isActive: e.target.value })}
                        className="px-4 h-5 w-5" />
                </div>
                <div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        Guardar cambios
                    </button>
                    <Link to={`/${gymName}/clients`} className="px-4 py-2 rounded bg-gray-500 hover:bg-gray-600 text-white">
                        Cancelar
                    </Link>
                </div>
            </form>
            
        </div>
    );
};

export default EditClientPage;
