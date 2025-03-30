import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPlanById } from "../../services/gymPaymentPlan.js";  // Importa la función de la API

const GymPaymentPlanDetail = () => {
    const { id } = useParams();  // Obtener el ID del plan desde la URL
    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Cargar los detalles del plan
    useEffect(() => {
        const fetchPlanDetails = async () => {
            try {
                const data = await getPlanById(id);  // Usar la función del servicio
                setPlan(data);  // Guardamos los datos en el estado
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPlanDetails();
    }, [id]);  // Dependemos del ID para recargar al cambiar

    if (loading) return <p className="text-center text-gray-500">Cargando...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 text-center">{plan.name}</h2>
            <p className="mt-2 text-lg text-gray-700">{plan.description}</p>

            <div className="mt-4 space-y-2">
                <p><strong>Precio:</strong> ${plan.price}</p>
                <p><strong>Duración:</strong> {plan.duration} meses</p>
                <p><strong>Estado:</strong> {plan.isActive ? "Activo ✅" : "Inactivo ❌"}</p>
            </div>

            <div className="flex justify-between mt-6">
                <Link
                    to="/admin-dashboard/plans"
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                >
                    Volver
                </Link>
                <Link
                    to={`/admin-dashboard/plans/${plan.id}/edit`}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    Editar
                </Link>
            </div>
        </div>
    );
};

export default GymPaymentPlanDetail;
