import { useEffect, useState } from "react";
import { getPaymentPlans, deletePlan } from "../../services/paymentPlans";
import { Link } from 'react-router-dom';
import ConfirmModal from "../../components/ConfirmModal";

const PaymentPlansPage = () => {
  const [paymentPlans, setPaymentPlans] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    loadPaymentPlans();
  }, []);

  const loadPaymentPlans = async () => {
    try {
      const data = await getPaymentPlans();
      setPaymentPlans(data);
    } catch (error) {
      console.error("Error cargando planes de pago:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePlan(selectedId);
      setPaymentPlans(prev => prev.filter(plan => plan.idPaymentPlan !== selectedId));
    } catch (error) {
      console.error("Error al eliminar el plan:", error);
    } finally {
      setModalOpen(false);
    }
  };

  return (
    <div className="flex-1 ml-30 p-10">
      <h1 className="text-2xl font-bold mb-6">Gestión de Planes de Pago</h1>

      <Link
        to="/admin/plans/create"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition mb-8 inline-block"
      >
        Crear Plan de Pago
      </Link>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {paymentPlans.map((plan) => (
          <div
            key={plan.idPaymentPlan}
            className="flex flex-col justify-between rounded-3xl bg-white shadow-2xl p-8 ring-1 ring-gray-200 transition hover:shadow-3xl"
          >
            <div className="flex-1">
              <h3 className="text-base font-semibold text-red-600">{plan.name}</h3>
              <p className="mt-4 flex items-baseline gap-x-2">
                <span className="text-4xl font-semibold tracking-tight text-gray-900">
                  {(plan.price).toFixed(2)}€
                </span>
                <span className="text-base text-gray-500">/{plan.period}</span>
              </p>
              <p className="mt-4 text-gray-600">{plan.description}</p>
              <ul className="mt-6 space-y-3 text-sm text-gray-600">
                <li><strong>Básico:</strong> {plan.isBasic ? "✅" : "❌"}</li>
                {plan.features && plan.features.length > 0 ? (
                  plan.features.map((feature, i) => (
                    <li key={i} className="flex gap-x-3">
                      <svg
                        className="h-6 w-5 text-orange-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))
                ) : (
                  <li className="italic text-gray-500">No hay características</li>
                )}
              </ul>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-2 pt-4">
              <Link
                to={`/admin/plan/${plan.idPaymentPlan}/edit`}
                className="rounded-md px-3.5 py-2.5 text-sm font-semibold text-blue-600 ring-1 ring-blue-200 hover:ring-blue-300 hover:text-blue-600 hover:bg-gray-100"
              >
                Editar
              </Link>
              <button
                onClick={() => {
                  setSelectedId(plan.idPaymentPlan);
                  setModalOpen(true);
                }}
                className="rounded-md px-3.5 py-2.5 text-sm font-semibold text-red-600 ring-1 ring-red-200 hover:text-white hover:bg-red-600 hover:ring-red-300"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

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

export default PaymentPlansPage;
