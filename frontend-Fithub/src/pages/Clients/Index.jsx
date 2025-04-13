import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";
import {
  getClients,
  activateClient,
  deactivateClient,
} from "../../services/clients.js";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

const ClientsPage = () => {
  const { idGym, gymName } = useAuth();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 8;

  useEffect(() => {
    loadClients();
  }, [idGym]);

  const loadClients = async () => {
    try {
      const data = await getClients(idGym);
      setClients(data);
      setLoading(false);
    } catch (error) {
      console.error("Error cargando clientes:", error);
    }
  };

  const handleToggleStatus = async (id, isActive) => {
    try {
      // Cambia el estado local
      setClients((prevClients) =>
        prevClients.map((client) =>
          client.idClient === id ? { ...client, isActive: !isActive } : client
        )
      );

      // Llama al servicio correspondiente
      if (isActive) {
        await deactivateClient(id);
      } else {
        await activateClient(id);
      }

      // Refresca los datos
      loadClients();
    } catch (error) {
      console.error("Error al actualizar el cliente:", error);
    }
  };

  // Paginación
  const offset = currentPage * itemsPerPage;
  const currentClients = clients.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(clients.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  if (loading) return <p className="p-4">Cargando clientes...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Clientes de {gymName}</h2>

      <Link
        to={`/${gymName}/client/create`}
        className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white inline-block mb-4"
      >
        Crea un nuevo cliente
      </Link>

      {clients.length === 0 ? (
        <p>No hay clientes registrados.</p>
      ) : (
        <>
          <ul>
            {currentClients.map((client) => (
              <li
                key={client.idClient}
                className="p-2 border-b flex justify-between items-center"
              >
                <div>
                  <strong>
                    {client.name} {client.surname}
                  </strong>{" "}
                  - {client.email}
                  
                </div>

                <div className="flex items-end">
                <span
                    className={`px-2 py-0.5 ml-2 text-xs font-medium tracking-wide ${
                      client.isActive
                        ? "text-green-500 bg-green-50"
                        : "text-red-500 bg-red-50"
                    } rounded-full`}
                  >
                    {client.isActive ? "Activo" : "Inactivo"}
                  </span>
                </div>

                <div className="flex space-x-2">
                  <button
                    className={`px-4 py-2 rounded-lg transition ${
                      client.isActive
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                    } text-white`}
                    onClick={() =>
                      handleToggleStatus(client.idClient, client.isActive)
                    }
                  >
                    {client.isActive ? "Desactivar" : "Activar"}
                  </button>

                  <Link
                    className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white"
                    to={`/${gymName}/client/${client.idClient}/edit`}
                  >
                    Editar
                  </Link>

                  <Link
                    className="px-4 py-2 rounded bg-yellow-500 hover:bg-yellow-600 text-white"
                    to={`/${gymName}/client/${client.idClient}`}
                  >
                    Ver detalles
                  </Link>
                </div>
              </li>
            ))}
          </ul>

          <ReactPaginate
            previousLabel={"←"}
            nextLabel={"→"}
            breakLabel={"..."}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"flex justify-center mt-6 space-x-2"}
            pageClassName={"px-3 py-1 border rounded hover:bg-gray-200"}
            activeClassName={"bg-gray-300 text-white"}
            previousClassName={"px-3 py-1 border rounded hover:bg-gray-200"}
            nextClassName={"px-3 py-1 border rounded hover:bg-gray-200"}
            disabledClassName={"opacity-50 cursor-not-allowed"}
          />
        </>
      )}
    </div>
  );
};

export default ClientsPage;
