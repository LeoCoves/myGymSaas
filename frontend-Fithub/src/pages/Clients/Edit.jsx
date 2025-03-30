import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { getClientById, updateClient } from "../../services/clients.js";
import { getPaymentPlans } from "../../services/gymPaymentPlan.js";

const EditClientPage = () => {
    const { idClient } = useParams();
    const navigate = useNavigate();
    const { gymName, idGym } = useAuth();

    const [client, setClient] = useState(null);
    const [paymentPlans, setPaymentPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Obtener detalles del cliente
                const clientData = await getClientById(idClient);
                setClient(clientData);

                // Obtener planes de pago
                const plansData = await getPaymentPlans(idGym);
                setPaymentPlans(plansData);
            } catch (err) {
                setError("Error al cargar los datos");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [idClient, idGym]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setClient((prevClient) => ({
            ...prevClient,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (e) => {
        setClient((prevClient) => ({
            ...prevClient,
            isActive: e.target.checked,
        }));
    };

    const handleSelectPlan = (planId) => {
        setClient((prevClient) => ({
            ...prevClient,
            idGymCustomPaymentPlan: planId,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateClient(idClient, client);
            navigate(`/${gymName}/client/${idClient}`);
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
                        name="name"
                        value={client?.name || ""}
                        onChange={handleInputChange}
                        className="px-4 py-2 border rounded w-full"
                    />
                </div>
                <div>
                    <label className="block">Apellido</label>
                    <input
                        type="text"
                        name="surname"
                        value={client?.surname || ""}
                        onChange={handleInputChange}
                        className="px-4 py-2 border rounded w-full"
                    />
                </div>
                <div>
                    <label className="block">Correo Electrónico</label>
                    <input
                        type="email"
                        name="email"
                        value={client?.email || ""}
                        onChange={handleInputChange}
                        className="px-4 py-2 border rounded w-full"
                    />
                </div>
                <div>
                    <label className="block">Número de Teléfono</label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={client?.phoneNumber || ""}
                        onChange={handleInputChange}
                        className="px-4 py-2 border rounded w-full"
                    />
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700">Activo</label>
                    <input
                        type="checkbox"
                        name="isActive"
                        checked={client?.isActive || false}
                        onChange={handleCheckboxChange}
                        className="ml-2 h-5 w-5"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6">
                    {paymentPlans.map((plan) => (
                        <div
                            key={plan.idGymCustomPaymentPlan}
                            className={`bg-white shadow-lg rounded-2xl p-6 border hover:shadow-xl transition-shadow cursor-pointer ${
                                client?.idGymCustomPaymentPlan === plan.idGymCustomPaymentPlan ? "border-red-500" : "border-gray-200"
                            }`}
                            onClick={() => handleSelectPlan(plan.idGymCustomPaymentPlan)}
                        >
                            <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                            <p className="text-gray-600 mt-2">{plan.price}€/{plan.period}</p>
                            <div className="mt-4 text-sm text-gray-500">
                                <p><strong>Description:</strong> {plan.description}</p>
                                <p><strong>Basic Features:</strong> {plan.isBasic ? "✅" : "❌"}</p>
                                <p><strong>Features:</strong></p>
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
                        </div>
                    ))}
                </div>

                <div className="flex gap-2">
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
