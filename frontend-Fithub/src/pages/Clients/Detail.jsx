import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getClientById } from "../../services/clients.js";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { getPlanById } from "../../services/gymPaymentPlan.js";

const DetailClientPage = () => {
    const { idClient } = useParams();
    const [client, setClient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [plan, setPlan] = useState(null);
    const { gymName } = useAuth();

    useEffect(() => {
        const fetchClient = async () => {
            try {
                setLoading(true);
                const clientData = await getClientById(idClient);
                setClient(clientData);

                // Cargar el plan solo si el cliente tiene uno asociado
                if (clientData.idGymCustomPaymentPlan) {
                    const planData = await getPlanById(clientData.idGymCustomPaymentPlan);
                    setPlan(planData);
                }
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
                <div><strong>Nombre:</strong> {client?.name} {client?.surname}</div>
                <div><strong>Correo Electrónico:</strong> {client?.email}</div>
                <div><strong>Número de Teléfono:</strong> {client?.phoneNumber}</div>
                <div><strong>Estado:</strong> {client?.isActive ? "Activo" : "Inactivo"}</div>

                <div className="flex gap-2">
                    <Link className="px-4 py-2 rounded bg-gray-500 hover:bg-gray-600 text-white" to={`/${gymName}/clients`}>
                        Volver
                    </Link>
                    <Link className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white" to={`/${gymName}/client/${client?.idClient}/edit`}>
                        Editar
                    </Link>
                </div>
            </div>

            {plan && (
                <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer mt-6">
                    <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                    <p className="text-gray-600 mt-2">{plan.price}€/{plan.period}</p>
                    <div className="mt-4 text-sm text-gray-500">
                        <p><strong>Description:</strong> {plan.description}</p>
                        <p><strong>Basic Features:</strong> {plan.isBasic ? "✅" : "❌"}</p>
                        <p><strong>Features</strong></p>
                        {plan.features && plan.features.length > 0 ? (
                            plan.features.map((feature, index) => (
                                <p key={index} className="font-semibold text-gray-500">{feature}</p>
                            ))
                        ) : (
                            <p>No features available</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DetailClientPage;
