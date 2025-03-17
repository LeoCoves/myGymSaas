import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getGymById } from "../../services/gyms.js";  // Asegúrate de importar la función

const GymDetailPage = () => {
    const { id } = useParams();  // Obtener el ID del gimnasio desde la URL
    const [gym, setGym] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Cargar los detalles del gimnasio
    useEffect(() => {
        const fetchGymDetails = async () => {
            try {
                const data = await getGymById(id);  // Usar la función del servicio
                setGym(data);  // Guardamos los datos del gimnasio en el estado
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGymDetails();
    }, [id]);  // Dependemos del ID del gimnasio para que se vuelva a cargar al cambiar

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold">{gym.name}</h2>
            <p className="mt-2 text-lg">{gym.description}</p>
            <p className="mt-4"><strong>Dirección:</strong> {gym.address}</p>
            <p><strong>Email:</strong> {gym.email}</p>
            <p><strong>Teléfono:</strong> {gym.numberPhone}</p>
            <p><strong>Estado:</strong> {gym.isActive ? "Activo" : "Inactivo"}</p>
            <p><strong>Plan de Pago:</strong> {gym.paymentPlan ? gym.paymentPlan.name : "No asignado"}</p>

            <Link
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            to={`/admin-dashboard/gyms`}
            >
                Volver
            </Link>
            <Link
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                to={`/admin-dashboard/gym/${gym.idGym}/edit`}
            >
                Editar
            </Link>
        </div>
    );
};

export default GymDetailPage;
