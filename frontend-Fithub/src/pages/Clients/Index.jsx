import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { intervalToDuration } from 'date-fns';
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
  const [searchName, setSearchName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");

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
      setClients((prevClients) =>
        prevClients.map((client) =>
          client.idClient === id ? { ...client, isActive: !isActive } : client
        )
      );

      if (isActive) {
        await deactivateClient(id);
      } else {
        await activateClient(id);
      }

      loadClients();
    } catch (error) {
      console.error("Error al actualizar el cliente:", error);
    }
  };

  const filteredClients = clients.filter((client) => {
    const fullName = `${client.name} ${client.surname}`.toLowerCase();
    const email = client.email.toLowerCase();
    const nameMatch = fullName.includes(searchName.toLowerCase());
    const emailMatch = email.includes(searchEmail.toLowerCase());
    const statusMatch =
      statusFilter === "todos" ||
      (statusFilter === "activos" && client.isActive) ||
      (statusFilter === "inactivos" && !client.isActive);

    return nameMatch && emailMatch && statusMatch;
  });

  // Paginación
  const offset = currentPage * itemsPerPage;
  const currentClients = filteredClients.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredClients.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  if (loading) return <p className="p-4">Cargando clientes...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Clientes de {gymName}</h2>

      <div className="mb-4 flex flex-wrap gap-4 justify-between items-center">
        <input
          type="text"
          placeholder="Buscar por nombre"
          className="px-4 py-2 border rounded w-full sm:w-2/6"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Buscar por email"
          className="px-4 py-2 border rounded w-full sm:w-2/6"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />

        <select
          className="px-4 py-2 border rounded w-full sm:w-1/6"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="todos">Todos</option>
          <option value="activos">Activos</option>
          <option value="inactivos">Inactivos</option>
        </select>

        <Link
          to={`/${gymName}/client/create`}
          className="px-4 py-2 rounded bg-blue-700 hover:text-white hover:bg-blue-600 text-white  items-center"
        >
          Nuevo cliente
        </Link>
      </div>

      {clients.length === 0 ? (
        <p>No hay clientes registrados.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm mt-4">
              <thead className="text-left">
                <tr>
                  <th className="px-4 py-2 border-b">Nombre</th>
                  <th className="px-4 py-2 border-b">Email</th>
                  <th className="px-4 py-2 border-b">Fecha de inscripción</th>
                  <th className="px-4 py-2 border-b">Tiempo que lleva</th>
                  <th className="px-4 py-2 border-b">Estado</th>
                  <th className="px-4 py-2 border-b">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {currentClients.map((client) => {
                  // Cálculo de la duración antes del JSX
                  const startDate = new Date(client.firstDayInscription);
                  const endDate = new Date();

                  // Si la fecha de inscripción es válida
                  let durationText = "Fecha no válida";

                  // Asegúrate de que startDate no sea undefined y es válida
                  if (startDate && !isNaN(startDate)) {
                    const duration = intervalToDuration({
                      start: startDate,
                      end: endDate,
                    });

                    durationText = `${duration.years || 0} años, ${duration.months || 0} meses, ${duration.days || 0} días`;
                  } else {
                    // Si la fecha no es válida, asignamos duración 0 por defecto
                    durationText = "0 años, 0 meses, 0 días";
                  }


                  return (
                    <tr key={client.idClient} className="border-t">
                      <td className="px-4 py-2  text-left">
                        <strong>{client.name} {client.surname}</strong>
                      </td>
                      <td className="px-4 py-2  text-left">{client.email}</td>
                      <td className="px-4 py-2">{client.firstDayInscription?.split("T")[0]}</td>
                      <td className="px-4 py-2  text-left">{durationText}</td>
                      <td className="px-4 py-2  text-left">
                        <span
                          className={`px-2 py-0.5 text-xs font-medium tracking-wide rounded-full ${
                            client.isActive
                              ? "text-green-500 bg-green-50"
                              : "text-red-500 bg-red-50"
                          }`}
                        >
                          {client.isActive ? "Activo" : "Inactivo"}
                        </span>
                      </td>
                      <td className="px-4 py-2 space-x-1 text-right ">
                        <button
                          className={`px-3 py-1 rounded text-white  ${
                            client.isActive
                              ? "bg-red-500 hover:bg-red-600 text-md"
                              : "bg-green-500 hover:bg-green-600 text-md"
                          }`}
                          onClick={() => handleToggleStatus(client.idClient, client.isActive)}
                        >
                          {client.isActive ? "Desactivar" : "Activar"}
                        </button>

                        <Link
                          className="px-3 py-2 rounded bg-black hover:bg-neutral-900 hover:text-white text-md"
                          to={`/${gymName}/client/${client.idClient}/edit`}
                        >
                          Editar
                        </Link>

                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

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


        </>
      )}
    </div>
  );
};

export default ClientsPage;
