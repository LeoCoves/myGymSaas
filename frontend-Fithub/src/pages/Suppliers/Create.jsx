import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSupplier } from "../../services/suppliers.js";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { Link } from "react-router-dom";

const CreateSupplierPage = () => {
    const { idGym, gymName } = useAuth();
  const [supplierData, setSupplierData] = useState({
    name: "",
    email: "",
    numberPhone: "",
    idGym: idGym
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSupplierData((prevData) => ({
      ...prevData,
      [name]: value,
      idGym: idGym // Asegúrate de que idGym se mantenga en el estado
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await createSupplier(supplierData);
      navigate(`/${gymName}/suppliers`); // Redirige a la lista de proveedores después de crear uno
    } catch (err) {
      setError("Error al crear el proveedor.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5 p-6 shadow-lg rounded-lg bg-white">
      <h2 className="text-2xl font-bold mb-4">Crear Proveedor</h2>
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="text-left space-y-4">
        <div>
          <label className="block">Nombre</label>
          <input
            type="text"
            name="name"
            value={supplierData.name}
            onChange={handleInputChange}
            className="p-2 border rounded w-full"
            required
          />
        </div>

        <div>
          <label className="block">Correo Electrónico</label>
          <input
            type="email"
            name="email"
            value={supplierData.email}
            onChange={handleInputChange}
            className="p-2 border rounded w-full"
            required
          />
        </div>

        <div>
          <label className="block">Número de Teléfono</label>
          <input
            type="tel"
            name="numberPhone"
            value={supplierData.numberPhone}
            onChange={handleInputChange}
            className="p-2 border rounded w-full"
            required
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
          >
            {loading ? "Creando..." : "Crear Proveedor"}
          </button>
          <Link to={`/${gymName}/suppliers`} className="ml-4 py-3 px-4 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700  hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500">
                        Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
};

export default CreateSupplierPage;
