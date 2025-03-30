import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSupplierById, updateSupplier } from "../../services/suppliers.js";
import { useAuth } from "../../contexts/AuthContext.jsx";

const UpdateSupplierPage = () => {
  const { idGym, gymName } = useAuth();
  const { id } = useParams(); // Obtiene el ID del proveedor desde la URL
  const [supplierData, setSupplierData] = useState({
    name: "",
    email: "",
    numberPhone: "",
    idGym: idGym,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const supplier = await getSupplierById(id);
        setSupplierData(supplier);
      } catch (err) {
        setError("Error al obtener los datos del proveedor.");
        console.error(err);
      }
    };

    fetchSupplier();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSupplierData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await updateSupplier(id, supplierData);
      navigate(`/${gymName}/suppliers`); // Redirige a la lista de proveedores
    } catch (err) {
      setError("Error al actualizar el proveedor.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Actualizar Proveedor</h2>
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
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
            {loading ? "Actualizando..." : "Actualizar Proveedor"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateSupplierPage;