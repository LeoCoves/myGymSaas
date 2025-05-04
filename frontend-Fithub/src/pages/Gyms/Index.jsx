import { useEffect, useState } from "react";
import { getGyms, deactivateGym, activateGym } from "../../services/gyms";
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

            loadGyms();
        } catch (error) {
            console.error("Error al actualizar el gimnasio:", error);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Gestión de Gimnasios</h1>

            <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm text-gray-600">
                    <thead>
                        <tr className="border-b border-gray-300 text-gray-900">
                            <th className="py-2 px-4">Nombre</th>
                            <th className="py-2 px-4">Descripción</th>
                            <th className="py-2 px-4">Dirección</th>
                            <th className="py-2 px-4">Email</th>
                            <th className="py-2 px-4">Teléfono</th>
                            <th className="py-2 px-4">Plan de Pago</th>
                            <th className="py-2 px-4">Estado</th>
                            <th className="py-2 px-4 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gyms.map((gym) => (
                            <tr key={gym.idGym} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-3 px-4">{gym.name}</td>
                                <td className="py-3 px-4">{gym.description}</td>
                                <td className="py-3 px-4">{gym.address}</td>
                                <td className="py-3 px-4">{gym.email}</td>
                                <td className="py-3 px-4">{gym.numberPhone}</td>
                                <td className="py-3 px-4">
                                    {gym.paymentPlan ? gym.paymentPlan.name : "No asignado"}
                                </td>
                                <td className="py-3 px-4">
                                    <span className={`font-semibold ${gym.isActive ? "text-green-500" : "text-red-500"}`}>
                                        {gym.isActive ? "Activo" : "Inactivo"}
                                    </span>
                                </td>
                                <td className="flex py-3 px-4 space-x-2 text-center">
                                    <Link
                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 hover:text-white transition"
                                        to={`/admin/gym/${gym.idGym}/edit`}
                                    >
                                        Editar
                                    </Link>
                                    <button
                                        className={`px-3 py-1 rounded text-white transition ${
                                            gym.isActive ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                                        }`}
                                        onClick={() => handleToggleStatus(gym.idGym, gym.isActive)}
                                    >
                                        {gym.isActive ? "Desactivar" : "Activar"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GymsPage;
