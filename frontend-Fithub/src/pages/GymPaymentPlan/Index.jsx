import { useEffect, useState } from "react";
import { getPaymentPlans, deletePlan } from "../../services/gymPaymentPlan.js";
import { Link } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext.jsx";
import ConfirmModal from "../../components/ConfirmModal.jsx";

const GymPaymentPlansPage = () => {
    const { idGym, gymName } = useAuth();
    const [paymentPlans, setPaymentPlans] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
  
    useEffect(() => {
      loadPaymentPlans();
    }, [idGym]);
  
    const loadPaymentPlans = async () => {
      try {
        const data = await getPaymentPlans(idGym);
        setPaymentPlans(data);
      } catch (error) {
        console.error("Error cargando planes de pago:", error);
      }
    };
  
    const handleDelete = async () => {
      try {
        await deletePlan(selectedId);
        setPaymentPlans(paymentPlans.filter(plan => plan.idGymCustomPaymentPlan !== selectedId));  // Actualizar la lista
      } catch (error) {
        console.error("Error al eliminar el plan:", error);
      } finally {
        setModalOpen(false);  // Cerrar modal
      }
    };
  
    return (
      <div className="flex-1 ml-40 p-6">
        <h1>Gestión de Planes de Pago</h1>
  
        <Link
          to={`/${gymName}/plan/create`}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          Crear Plan de Pago
        </Link>
  
        {/* Tabla de Planes de Pago */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          {paymentPlans.map((plan) => (
            <div key={plan.idGymCustomPaymentPlan} className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
              <p className="text-gray-600 mt-2">{plan.price}€/{plan.period}</p>
              <div className="mt-4 text-sm text-gray-500">
                <p><strong>Description:</strong> {plan.description}</p>
                <p><strong>Basic Features:</strong> {plan.isBasic ? "✅" : "❌"}</p>
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
                  to={`/${gymName}/plan/${plan.idGymCustomPaymentPlan}`}
                >
                  Ver Detalles
                </Link>
                {/* Editar */}
                <Link
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  to={`/${gymName}/plan/${plan.idGymCustomPaymentPlan}/edit`}
                >
                  Editar
                </Link>
                {/* Eliminar */}
                <button
                  onClick={() => {
                    setSelectedId(plan.idGymCustomPaymentPlan);
                    setModalOpen(true);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
  
        {/* Modal de confirmación */}
        <ConfirmModal
          isOpen={modalOpen}
          title="Eliminar Plan de Pago"
          message="¿Estás seguro de que deseas eliminar este plan de pago? Esta acción no se puede deshacer."
          onConfirm={handleDelete}
          onCancel={() => setModalOpen(false)}
        />
      </div>
    );
  };

export default GymPaymentPlansPage;
