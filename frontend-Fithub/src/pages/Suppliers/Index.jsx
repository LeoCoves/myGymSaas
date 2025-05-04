import { useState, useEffect } from "react";
import { getSuppliers, deleteSupplier } from "../../services/suppliers.js";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
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

  const [searchName, setSearchName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 8;
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
      setSuppliers(prev => prev.filter(s => s.idSupplier !== selectedId));
      navigate(`/${gymName}/suppliers`);
    } catch (error) {
      console.error("Error al eliminar el proveedor:", error);
    } finally {
      setModalOpen(false);
    }
  };

  const filteredSuppliers = suppliers.filter(supplier => {
    return (
      supplier.name.toLowerCase().includes(searchName.toLowerCase()) &&
      supplier.email.toLowerCase().includes(searchEmail.toLowerCase())
    );
  });

  const offset = currentPage * itemsPerPage;
  const currentSuppliers = filteredSuppliers.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredSuppliers.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  if (loading) return <p className="text-center mt-4">Cargando proveedores...</p>;
  if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Lista de Proveedores</h2>

      <div className="mb-4 flex flex-wrap gap-4 items-center justify-between">
        <input
          type="text"
          placeholder="Buscar por nombre"
          className="px-4 py-2 border rounded w-full sm:w-1/3"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Buscar por correo"
          className="px-4 py-2 border rounded w-full sm:w-1/3"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />
        <Link
          to={`/${gymName}/supplier/create`}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 hover:text-white"
        >
          Crear Proveedor
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-b text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2 text-left">Nombre</th>
              <th className="border p-2 text-left">Correo Electrónico</th>
              <th className="border p-2 text-left">Teléfono</th>
              <th className="border p-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentSuppliers.length > 0 ? (
              currentSuppliers.map((supplier) => (
                <tr key={supplier.idSupplier} className="hover:bg-gray-100">
                  <td className="text-left p-2">{supplier.name}</td>
                  <td className="text-left p-2">{supplier.email}</td>
                  <td className="text-left p-2">{supplier.numberPhone}</td>
                  <td className="text-right p-2 space-x-2">
                    <Link
                      to={`/${gymName}/supplier/${supplier.idSupplier}/edit`}
                      className="bg-black text-white px-4 py-2 rounded hover:bg-neutral-800 hover:text-white"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => {
                        setSelectedId(supplier.idSupplier);
                        setModalOpen(true);
                      }}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
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

        <ReactPaginate
          previousLabel={"←"}
          nextLabel={"→"}
          breakLabel={"..."}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName="flex justify-center mt-6 space-x-2"
          pageClassName="border border-black rounded"
          pageLinkClassName="px-3 py-1 text-black hover:bg-gray-200 block"
          activeClassName="bg-red-600"
          activeLinkClassName="text-white"
          previousClassName="border border-black rounded"
          previousLinkClassName="px-3 py-1 text-black hover:bg-gray-200 block"
          nextClassName="border border-black rounded"
          nextLinkClassName="px-3 py-1 text-black hover:bg-gray-200 block"
          disabledClassName="cursor-not-allowed opacity-50"
        />
      </div>

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