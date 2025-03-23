import { useEffect, useState } from "react";
import { getGyms, deactivateGym, activateGym } from "../../services/gyms"; // Asegúrate de importar activateGym también
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const GymsPage = () => {
    const navigate = useNavigate();
    const [gyms, setGyms] = useState([]);
    const [paymentPlans, setPaymentPlans] = useState([]);

    useEffect(() => {
        loadGyms();
        loadPaymentPlans();
    }, []);

    const loadGyms = async () => {
        try {
            const data = await getGyms();
            setGyms(data);
        } catch (error) {
            console.error("Error cargando gimnasios:", error);
        }
    };

    const loadPaymentPlans = async () => {
        try {
            const data = await getPaymentPlans();
            setPaymentPlans(data);
        } catch (error) {
            console.error("Error cargando planes de pago:", error);
        }
    };

    const handleToggleStatus = async (id, isActive) => {
        try {
            // Actualiza el estado local inmediatamente
        setGyms((prevGyms) =>
            prevGyms.map((gym) =>
                gym.idGym === id ? { ...gym, isActive: !isActive } : gym
            )
        );

        if (isActive) {
            await deactivateGym(id);
        } else {
            await activateGym(id);
        }

        // Cargar los gimnasios nuevamente para sincronizar con la base de datos
        loadGyms();
        } catch (error) {
            console.error("Error al actualizar el gimnasio:", error);
        }
    };
    
    


    return (
        <div>
            <h1>Gestión de Gimnasios</h1>

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                {gyms.map((gym) => (
                    <div
                        key={gym.idGym}
                        className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-shadow"
                    >
                        <h3 className="text-lg font-semibold text-gray-900">{gym.name}</h3>
                        <p className="text-gray-600 mt-2">{gym.description}</p>
                        <div className="mt-4 text-sm text-gray-500">
                            <p>
                                <strong>Dirección:</strong> {gym.address}
                            </p>
                            <p>
                                <strong>Email:</strong> {gym.email}
                            </p>
                            <p>
                                <strong>Teléfono:</strong> {gym.numberPhone}
                            </p>
                            <p>
                                <strong>Plan de Pago:</strong> {gym.paymentPlan ? gym.paymentPlan.name : "No asignado"}
                            </p>
                            <p>
                                <strong>Estado:</strong>{" "}
                                <span
                                    className={`font-semibold ${gym.isActive ? "text-green-500" : "text-red-500"}`}
                                >
                                    {gym.isActive ? "Activo" : "Inactivo"}
                                </span>
                            </p>
                        </div>
                        <div className="mt-4 flex gap-2 flex-wrap justify-center">
                            {/* Ver Detalles */}
                            <Link
                                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                                to={`/admin-dashboard/gym/${gym.idGym}`}
                            >
                                Ver Detalles
                            </Link>
                            <Link
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                                to={`/admin-dashboard/gym/${gym.idGym}/edit`}
                            >
                                Editar
                            </Link>
                            {/* Botón para activar/desactivar */}
                            <button
                                className={`px-4 py-2 rounded-lg transition ${
                                    gym.isActive ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                                } text-white`}
                                onClick={() => handleToggleStatus(gym.idGym, gym.isActive)}
                            >
                                {gym.isActive ? "Desactivar" : "Activar"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GymsPage;
