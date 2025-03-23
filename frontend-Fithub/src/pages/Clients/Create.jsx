import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "../../services/clients"; // Asumimos que tienes un servicio para crear el cliente

const CreateClientPage = () => {
  const [clientData, setClientData] = useState({
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
    idGymCustomPaymentPlan: null, // Suponiendo que es opcional
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Llamamos a la función de creación de cliente
      const response = await createClient(clientData); // Suponiendo que `createClient` hace la solicitud POST
      // Si la creación fue exitosa, redirigimos a la lista de clientes o a otra página
      navigate("/gym/clients"); // Cambia la ruta según lo necesites
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

        <div>
          <label htmlFor="idGymCustomPaymentPlan" className="block">Plan de Pago</label>
          <input
            type="number"
            id="idGymCustomPaymentPlan"
            name="idGymCustomPaymentPlan"
            value={clientData.idGymCustomPaymentPlan || ""}
            onChange={handleInputChange}
            className="p-2 border rounded"
            placeholder="ID del Plan de Pago"
          />
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
