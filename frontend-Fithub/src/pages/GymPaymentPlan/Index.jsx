import { useEffect, useState } from "react";
import { getPaymentPlans, deletePlan } from "../../services/gymPaymentPlan.js";
import { Link } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext.jsx";

const GymPaymentPlansPage = () => {
    const { idGym } = useAuth();
    const [paymentPlans, setPaymentPlans] = useState([]);

    useEffect(() => {
        loadPaymentPlans();
    }, []);

    // Cargar planes de pago
    const loadPaymentPlans = async () => {
        try {
            const data = await getPaymentPlans(idGym);
            console.log(data);
            setPaymentPlans(data);
        } catch (error) {
            console.error("Error cargando planes de pago:", error);
        }
    };

    // Eliminar un plan de pago
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este plan de pago?");
        if (!confirmDelete) return;

        try {
            await deletePlan(id);
            setPaymentPlans(paymentPlans.filter(plan => plan.idPaymentPlan !== id));  // Actualizar la lista
        } catch (error) {
            console.error("Error al eliminar el plan:", error);
        }
    };

    return (
        <div className="flex-1 ml-40 p-6">
            <h1>Gestión de Planes de Pago</h1>

            <Link
                to="/admin-dashboard/plans/create"
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
                Crear Plan de Pago
            </Link>

            {/* Tabla de Planes de Pago */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                {paymentPlans.map((plan) => (
                    <div key={plan.idPaymentPlan} className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-shadow">
                        <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                        <p className="text-gray-600 mt-2">{plan.price}€/{plan.period}</p>
                        <div className="mt-4 text-sm text-gray-500">
                            <p><strong>Description:</strong> {plan.description}</p>
                            <p><strong>Basic Feautures:</strong> {plan.isBasic ? "✅" : "❌"}</p>
                            <p><strong>Features</strong> </p>
                            {plan.features && plan.features.length > 0 ? (
                                plan.features.map((feature, index) => (
                                    <p key={index} className="font-semibold text-gray-500">
                                        {feature}
                                    </p>
                                ))
                            ) : (
                                <p>No features available</p>
                            )}
                            
                        </div>
                        <div className="mt-4 flex gap-2 flex-wrap justify-center">
                            {/* Ver Detalles */}
                            <Link
                                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                                to={`/admin-dashboard/plan/${plan.idPaymentPlan}`}
                            >
                                Ver Detalles
                            </Link>
                            {/* Editar */}
                            <Link
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                                to={`/admin-dashboard/plan/${plan.idPaymentPlan}/edit`}
                            >
                                Editar
                            </Link>
                            {/* Eliminar */}
                            <button
                                onClick={() => handleDelete(plan.idPaymentPlan)}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GymPaymentPlansPage;
