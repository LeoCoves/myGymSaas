import React, { useEffect, useState } from "react";
import {
  getCashCounts,
  getCashCountById,
  getInscriptions,
  createCashCount,
} from "../services/cashCount.js";
import { useAuth } from "../contexts/AuthContext.jsx";

const CashCountPage = () => {
  const { idGym } = useAuth();

  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [subtotal, setSubtotal] = useState(0);
  const [iva, setIva] = useState(0);
  const [otherTaxes, setOtherTaxes] = useState(0);
  const [total, setTotal] = useState(0);
  const [cashCounts, setCashCounts] = useState([]);
  const [selectedCount, setSelectedCount] = useState(null);
  const [inscriptions, setInscriptions] = useState([]);
  const [error, setError] = useState("");
  
  const [page, setPage] = useState(1);
  const [cashCountsPerPage] = useState(5);

  const cashTotal = inscriptions
    .filter((inscription) => inscription.paymentMethod === "cash")
    .reduce((sum, ins) => sum + ins.payment, 0)
    .toFixed(2);

  const visaTotal = inscriptions
    .filter((inscription) => inscription.paymentMethod === "visa")
    .reduce((sum, ins) => sum + ins.payment, 0)
    .toFixed(2);

  const grandTotal = (parseFloat(cashTotal) + parseFloat(visaTotal)).toFixed(2);

  useEffect(() => {
    fetchCashCounts();
    fetchInscriptions();
  }, []);

  useEffect(() => {
    const ivaAmount = (parseFloat(subtotal) * (parseFloat(iva) / 100)) || 0;
    const otherTaxesAmount = (parseFloat(subtotal) * (parseFloat(otherTaxes) / 100)) || 0;
    const calculatedTotal = parseFloat(subtotal) - ivaAmount - otherTaxesAmount;
    setTotal(calculatedTotal.toFixed(2));
  }, [subtotal, iva, otherTaxes]);

  const fetchCashCounts = async () => {
    try {
      const data = await getCashCounts(idGym);
      setCashCounts(data);
    } catch (err) {
      console.error("Error fetching cash counts:", err);
    }
  };

  const fetchInscriptions = async () => {
    try {
      const data = await getInscriptions(idGym);
      setInscriptions(data);
    } catch (err) {
      console.error("Error fetching inscriptions:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    if (!date) return setError("Debes seleccionar una fecha.");
    if (isNaN(parseFloat(subtotal)) || isNaN(parseFloat(iva)) || isNaN(parseFloat(otherTaxes))) {
      return setError("Los valores de los impuestos deben ser números válidos.");
    }

    try {
      const newCashCount = {
        date, 
        subtotal: parseFloat(subtotal),
        iva: parseFloat(iva),
        otherTaxes: parseFloat(otherTaxes),
        total: parseFloat(total),
        idGym,
      };
  
      await createCashCount(newCashCount); 
      fetchCashCounts(); 
      setDate(new Date().toISOString().split("T")[0]); 
      setSubtotal(0);
      setIva(0);
      setOtherTaxes(0);
    } catch (err) {
      setError("Error al crear arqueo de caja.");
      console.error("Error: ", err);
    }
  };

  // Filtrado por fecha para cashCounts
  const filteredCashCounts = cashCounts.filter(entry =>
    entry.date.includes(date) // Filtra por fecha
  );

  // Paginación para la tabla de cashCounts
  const indexOfLastCashCount = page * cashCountsPerPage;
  const indexOfFirstCashCount = indexOfLastCashCount - cashCountsPerPage;
  const currentCashCounts = filteredCashCounts.slice(indexOfFirstCashCount, indexOfLastCashCount);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="max-w-6xl mx-auto p-5">
      <div className="flex">
        <div className="w-1/2 pr-4">
          <h2 className="text-xl font-semibold mb-4">Historial de Arqueos</h2>
          
          {/* Filtro por fecha para la tabla de arqueos */}
          <div className="mb-4">
            <label className="block">Filtrar por Fecha:</label>
            <input
              type="date"
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
              className="border p-2 rounded w-full"
            />
          </div>
          
          <table className="min-w-full table-auto bg-white rounded shadow-md">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 text-left">Fecha</th>
                <th className="py-2 px-4 text-left">Total (€)</th>
                <th className="py-2 px-4 text-left">IVA (€)</th>
                <th className="py-2 px-4 text-left">Otros Impuestos (€)</th>
              </tr>
            </thead>
            <tbody>
              {currentCashCounts.map((entry) => (
                <tr key={entry.idCashCount} className="hover:bg-gray-100">
                  <td className="py-2 px-4">{new Date(entry.date).toLocaleDateString()}</td>
                  <td className="py-2 px-4">€{parseFloat(entry.total).toFixed(2)}</td>
                  <td className="py-2 px-4">€{parseFloat(entry.iva).toFixed(2)}</td>
                  <td className="py-2 px-4">€{parseFloat(entry.otherTaxes).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Paginación */}
          <div className="mt-4 flex justify-center space-x-2">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="bg-gray-300 p-2 rounded"
            >
              Anterior
            </button>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={indexOfLastCashCount >= filteredCashCounts.length}
              className="bg-gray-300 p-2 rounded"
            >
              Siguiente
            </button>
          </div>

          {/* Detalle del Arqueo */}
          {selectedCount && (
            <div className="mt-6 p-4 bg-white shadow rounded">
              <h3 className="font-bold text-lg mb-2">Detalle del Arqueo</h3>
              <p><strong>Subtotal:</strong> €{selectedCount.subtotal}</p>
              <p><strong>IVA:</strong> €{selectedCount.iva}%</p>
              <p><strong>Otros:</strong> €{selectedCount.otherTaxes}%</p>
              <p><strong>Total:</strong> €{selectedCount.total}</p>
            </div>
          )}

          {/* Historial de Inscripciones */}
          <h2 className="mt-6 text-xl font-semibold mb-4">Historial de Inscripciones</h2>
          <table className="min-w-full table-auto bg-white rounded shadow-md">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 text-left">Cliente</th>
                <th className="py-2 px-4 text-left">Pago (€)</th>
                <th className="py-2 px-4 text-left">Método</th>
              </tr>
            </thead>
            <tbody>
              {inscriptions.map((entry) => (
                <tr key={entry.idInscription} className="hover:bg-gray-100">
                  <td className="py-2 px-4">{entry.idClient}</td>
                  <td className="py-2 px-4">€{parseFloat(entry.payment).toFixed(2)}</td>
                  <td className="py-2 px-4">{entry.paymentMethod}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="w-1/2 pl-4">
          <h1 className="text-2xl font-bold mb-4">Arqueo de Caja</h1>
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-4">
            <div>
              <label className="block">Fecha</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block">Subtotal (€)</label>
                <input
                  type="number"
                  value={subtotal}
                  onChange={(e) => setSubtotal(e.target.value)}
                  step="0.01"
                  className="border p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block">IVA (%)</label>
                <input
                  type="number"
                  value={iva}
                  onChange={(e) => setIva(e.target.value)}
                  step="0.01"
                  className="border p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block">Otros Impuestos (%)</label>
                <input
                  type="number"
                  value={otherTaxes}
                  onChange={(e) => setOtherTaxes(e.target.value)}
                  step="0.01"
                  className="border p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block">Total (€)</label>
                <input
                  type="number"
                  value={total}
                  step="0.01"
                  className="border p-2 rounded w-full bg-gray-100"
                  disabled
                />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
            >
              Registrar Arqueo
            </button>
          </form>

          {/* Totales en tres columnas */}
          <div className="mt-6 p-4 bg-white shadow rounded">
            <h3 className="font-bold text-lg">Totales</h3>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <p className="text-center">{cashTotal}€</p>
              </div>

              <div className="flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                </svg>
                <p className="text-center">{visaTotal}€</p>
              </div>

              <div className="flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 7.756a4.5 4.5 0 1 0 0 8.488M7.5 10.5h5.25m-5.25 3h5.25M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <p className="text-center"><strong>{grandTotal}€</strong></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashCountPage;
