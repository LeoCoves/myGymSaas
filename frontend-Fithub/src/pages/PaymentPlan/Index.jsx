import { useEffect, useState } from "react";
import { getPaymentPlans } from "../../services/paymentPlans";
import { Link } from 'react-router-dom';

const PaymentPlansPage = () => {

    const [paymentPlans, setPaymentPlans] = useState([]);  // Nuevo estado para los PaymentPlans

    useEffect(() => {
        loadPaymentPlans();  // Cargar los planes de pago
    }, []);


    // Función para cargar planes de pago
    const loadPaymentPlans = async () => {
        try {
            const data = await getPaymentPlans(); // Debes crear esta función en tu servicio
            setPaymentPlans(data);
        } catch (error) {
            console.error("Error cargando planes de pago:", error);
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
                        <p className="text-gray-600 mt-2">{plan.description}</p>
                        <div className="mt-4 text-sm text-gray-500">
                            <p><strong>Precio:</strong> ${plan.price}</p>
                            <p><strong>Duración:</strong> {plan.duration} meses</p>
                            <p><strong>Estado:</strong> 
                                <span className={`font-semibold ${plan.isActive ? "text-green-500" : "text-red-500"}`}>
                                    {plan.isActive ? "Activo" : "Inactivo"}
                                </span>
                            </p>
                        </div>
                        <div className="mt-4 flex gap-2 flex-wrap justify-center">
                            {/* Enlace para Ver Detalles */}
                            <Link
                                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                                to={`/admin-dashboard/plans/${plan.idPaymentPlan}`}
                            >
                                Ver Detalles
                            </Link>
                            {/* Enlace para Editar */}
                            <Link
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                                to={`/admin-dashboard/plans/${plan.idPaymentPlan}/edit`}
                            >
                                Editar
                            </Link>
                            
                                
                            
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
    
};

export default PaymentPlansPage;
