import { useState, useEffect } from "react";
import { getSuppliers, deleteSupplier } from "../../services/suppliers.js";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <p className="text-gray-600 mb-4">{message}</p>
        <div className="flex justify-end space-x-4">
          <button onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded">Confirmar</button>
        </div>
      </div>
    </div>
  );
};

const SuppliersPage = () => {
  const { idGym, gymName } = useAuth();
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    loadSuppliers();
  }, [idGym]);

  const loadSuppliers = async () => {
    try {
      const data = await getSuppliers(idGym);
      setSuppliers(data);
    } catch (error) {
      setError("Error cargando proveedores.");
      console.error("Error cargando proveedores:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteSupplier(selectedId);
      setSuppliers((prevSuppliers) => prevSuppliers.filter(supplier => supplier.idSupplier !== selectedId));
      navigate(`/${gymName}/suppliers`);
    } catch (error) {
      console.error("Error al eliminar el proveedor:", error);
    } finally {
      setModalOpen(false);
    }
  };

  if (loading) return <p className="text-center mt-4">Cargando proveedores...</p>;
  if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Lista de Proveedores</h2>
      <div className="overflow-x-auto">
        <Link 
          to={`/${gymName}/supplier/create`} 
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-blue-600 transition"
        >
          Crear Proveedor
        </Link>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2 text-left">Nombre</th>
              <th className="border p-2 text-left">Correo Electrónico</th>
              <th className="border p-2 text-left">Teléfono</th>
              <th className="border p-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.length > 0 ? (
              suppliers.map((supplier) => (
                <tr key={supplier.idSupplier} className="hover:bg-gray-100">
                  <td className="border p-2">{supplier.name}</td>
                  <td className="border p-2">{supplier.email}</td>
                  <td className="border p-2">{supplier.numberPhone}</td>
                  <td className="border p-2">
                    <Link
                      to={`/${gymName}/supplier/${supplier.idSupplier}/edit`}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-blue-600 transition"
                    >
                      Editar
                    </Link>

                    <button
                      onClick={() => {
                        setSelectedId(supplier.idSupplier);
                        setModalOpen(true);
                      }}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="border p-4 text-center">
                  No hay proveedores disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de confirmación reutilizable */}
      <ConfirmModal
        isOpen={modalOpen}
        title="Eliminar Proveedor"
        message="¿Estás seguro de que deseas eliminar este proveedor? Esta acción no se puede deshacer."
        onConfirm={handleDelete}
        onCancel={() => setModalOpen(false)}
      />
    </div>
  );
};

export default SuppliersPage;
