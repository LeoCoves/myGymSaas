import { useEffect, useState } from "react";
import { getGyms, deactivateGym } from "../../services/gyms";
import { getPaymentPlans } from "../../services/paymentPlans";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Link } from 'react-router-dom';

const GymPage = () => {
    const navigate = useNavigate();
    const [gyms, setGyms] = useState([]);
    const [paymentPlans, setPaymentPlans] = useState([]);  // Nuevo estado para los PaymentPlans

    useEffect(() => {
        loadGyms();
        loadPaymentPlans();  // Cargar los planes de pago
    }, []);

    // Función para cargar gimnasios
    const loadGyms = async () => {
        try {
            const data = await getGyms();
            setGyms(data);
        } catch (error) {
            console.error("Error cargando gimnasios:", error);
        }
    };

    // Función para cargar planes de pago
    const loadPaymentPlans = async () => {
        try {
            const data = await getPaymentPlans(); // Debes crear esta función en tu servicio
            setPaymentPlans(data);
        } catch (error) {
            console.error("Error cargando planes de pago:", error);
        }
    };

    const handleDeactivate = async (id) => {
        try {
            await deactivateGym(id);
            loadGyms();
        } catch (error) {
            console.error("Error desactivando gimnasio:", error);
        }
    };

    const handleClick = (id) =>{
        navigate(`/admin-dashboard/gym/${id}`)
    }

    return (
        <div className="flex-1 ml-40 p-6">
            
            <h1>Gestión de Gimnasios</h1>

            {/* Tabla de Gimnasios */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                {gyms.map((gym) => (
                    <div key={gym.idGym} className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-shadow">
                        <h3 className="text-lg font-semibold text-gray-900">{gym.name}</h3>
                        <p className="text-gray-600 mt-2">{gym.description}</p>
                        <div className="mt-4 text-sm text-gray-500">
                            <p><strong>Dirección:</strong> {gym.address}</p>
                            <p><strong>Email:</strong> {gym.email}</p>
                            <p><strong>Teléfono:</strong> {gym.numberPhone}</p>
                            <p><strong>Plan de Pago:</strong> {gym.paymentPlan ? gym.paymentPlan.name : "No asignado"}</p>
                            <p><strong>Estado:</strong> <span className={`font-semibold ${gym.isActive ? "text-green-500" : "text-red-500"}`}>
                                {gym.isActive ? "Activo" : "Inactivo"}
                            </span></p>
                        </div>
                        <div className="mt-4 flex gap-2 flex-wrap justify-center">
                            {/* Enlace para Detalles */}
                            <Link
                                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                                to={`/admin-dashboard/gym/${gym.idGym}`} // Ruta para detalles
                            >
                                Ver Detalles
                            </Link>
                            <Link
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                                to={`/admin-dashboard/gym/${gym.idGym}/edit`}
                            >
                                Editar
                            </Link>
                            {gym.isActive && (
                                <button 
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                                    onClick={() => handleDeactivate(gym.idGym)}
                                >
                                    Desactivar
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {/* <Outlet />  */}
        </div>
    );
};

export default GymPage;
