import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "../../services/clients"; 
import { useAuth } from "../../contexts/AuthContext.jsx";
import { getPaymentPlans } from "../../services/gymPaymentPlan.js";

const CreateClientPage = () => {
  const [clientData, setClientData] = useState({
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
    idGym: null,
    idGymCustomPaymentPlan: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { idGym } = useAuth();
  const [paymentPlans, setPaymentPlans] = useState([]);

  useEffect(() => {
    loadPaymentPlans();
    console.log("ID del gimnasios segun auth:", idGym);
  }, []);

  const loadPaymentPlans = async () => {
    try {
      const data = await getPaymentPlans(idGym);
      setPaymentPlans(data);
    } catch (error) {
      console.error("Error cargando planes de pago:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectPlan = (planId) => {
    console.log("Plan seleccionado:", planId);
    setClientData((prevData) => ({
      ...prevData,
      idGym: idGym,
      idGymCustomPaymentPlan: planId,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Asegurar que idGym está bien asignado
    const finalClientData = { ...clientData, idGym };
    console.log("Enviando datos:", finalClientData);

    if (!finalClientData.idGym) {
        setError("El ID del gimnasio es inválido.");
        setLoading(false);
        return;
    }

    if (!clientData.idGymCustomPaymentPlan) {
      setError("Debes seleccionar un plan de pago.");
      setLoading(false);
      return;
    }

    try {
        await createClient(finalClientData);
        navigate("/gym/clients");
    } catch (err) {
        setError("Error al crear el cliente.");
        console.error(err);
    } finally {
        setLoading(false);
    }
};

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Crear Cliente</h2>
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            value={clientData.name}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="surname" className="block">Apellido</label>
          <input
            type="text"
            id="surname"
            name="surname"
            value={clientData.surname}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={clientData.email}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="phoneNumber" className="block">Número de Teléfono</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={clientData.phoneNumber}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          {paymentPlans.map((plan) => (
            <div
              key={plan.idGymCustomPaymentPlan}
              className={`bg-white shadow-lg rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer ${
                clientData.idGymCustomPaymentPlan === plan.idGymCustomPaymentPlan ? "border-red-500 border-2" : ""
              }`}
              
              onClick={() => handleSelectPlan(plan.idGymCustomPaymentPlan)}
            >
              <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
              <p className="text-gray-600 mt-2">{plan.price}€/{plan.period}</p>
              <div className="mt-4 text-sm text-gray-500">
                <p><strong>Description:</strong> {plan.description}</p>
                <p><strong>Basic Features:</strong> {plan.isBasic ? "✅" : "❌"}</p>
                <p><strong>Features</strong></p>
                {plan.features && plan.features.length > 0 ? (
                  plan.features.map((feature) => (
                    <p className="font-semibold text-gray-500">
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

        <div className="mt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
          >
            {loading ? "Creando..." : "Crear Cliente"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateClientPage;
