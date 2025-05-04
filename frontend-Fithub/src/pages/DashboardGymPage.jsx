import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
"use client"
import { getSummary, getCashFlow } from '../services/dashboardGym.js';
import {
    BarChart,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    ComposedChart,
    Bar,
} from 'recharts';
import { getClients } from '../services/clients.js'; // Importar la función para obtener clientes

import { useAuth } from '../contexts/AuthContext.jsx';

const DashboardGym = () => {
    const [clients, setClients] = useState([]);
    const [summaryData, setSummaryData] = useState(null);
    const [cashFlowData, setCashFlowData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [range, setRange] = useState('monthly');


    const { idGym } = useAuth();

    // Función para obtener el resumen
    const fetchSummary = async (range, idGym) => {
        try {
            const data = await getSummary(range, idGym);
            setSummaryData(data);
        } catch (error) {
            setError('Error al obtener el resumen.', error);
        }
    };

    // Función para obtener el flujo de caja
    const fetchCashFlow = async (idGym) => {
        try {
            const data = await getCashFlow(idGym, range);
            setCashFlowData(data);
        } catch (error) {
            setError('Error al obtener el flujo de caja.', error);
        }
    };

    useEffect(() => {
        if (!idGym) return;
    
        const loadData = async () => {
            setLoading(true);
            try {
                await fetchSummary(range, idGym);
                await fetchCashFlow(idGym); // Asumimos que `getCashFlow` trae todos los datos
                await loadClients(); // Cargar clientes aquí
            } catch (err) {
                console.error("Error cargando datos del dashboard:", err);
            } finally {
                setLoading(false);
            }
        };
    
        loadData();
    }, [idGym, range]); // <--- importante agregar 'range'
    
    const loadClients = async () => {
        try {
          const data = await getClients(idGym);
          setClients(data);
          setLoading(false);
        } catch (error) {
          console.error("Error cargando clientes:", error);
        }
      };

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const nuevos = summaryData.newClients || 0;
  const recurrentes = summaryData.recurringClients || summaryData.clients || 0;
  const inactivos = summaryData.inactiveClients || 0;

  const total = nuevos + recurrentes + inactivos || 1; // evitar división por cero

  const formatPercent = (val) => ((val / total) * 100).toFixed(2);

  const barData = [
    { label: 'Nuevos', value: nuevos, color: 'bg-emerald-400' },
    { label: 'Recurrentes', value: recurrentes, color: 'bg-blue-500' },
    { label: 'Inactivos', value: inactivos, color: 'bg-red-400' },
  ];

    return (
        <>
        <div className="flex justify-left mb-4 space-x-2">
            {['daily', 'monthly', 'yearly'].map((r) => (
                <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-4 py-1 text-sm font-medium rounded-lg border transition ${
                    range === r
                    ? 'bg-red-600 text-white border-gray-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                }`}
                >
                {r === 'daily' ? 'Diario' : r === 'monthly' ? 'Mensual' : 'Anual'}
                </button>
            ))}
            </div>
        <div className="flex flex-col lg:flex-row gap-6 p-6">
            

            {/* Resumen a la izquierda */}
            <section className="lg:w-1/3 space-y-4">
                <h2 className="text-lg font-semibold border-b pb-2">Resumen</h2>

                {/* Total Ingresos */}
                <div className="bg-white shadow-lg text-left rounded p-5">
                    <p className="font-bold pb-3">Facturación</p>
                    <p className="text-xl font-bold">{summaryData.total.toFixed(2)} €</p>
                    <p className="text-sm text-gray-500">+ 10% last month</p>
                </div>

                {/* Efectivo y Visa */}
                <div className="bg-white shadow-lg rounded p-4 text-left">
                    <p className="font-bold">Cash</p>
                    <div className='rounded bg-neutral-700 text-white p-2 m-2'>
                        <p className="text-xl font-bold">{summaryData.cash.toFixed(2)} €</p>
                    </div>
                    <p className="font-bold mt-2">Card</p>
                    <div className='rounded bg-red-700 text-white p-2 m-2'>
                        <p className="text-xl font-bold">{summaryData.visa.toFixed(2)} €</p>
                    </div>
                </div>

                <h2 className="text-xl font-semibold">Clientes</h2>
      {barData.map(({ label, value, color }) => (
        <div key={label}>
          <div className="flex justify-between mb-1">
            <span>{label}</span>
            <span>{value} ({formatPercent(value)}%)</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-4">
            <div
              className={`${color} h-4 rounded-full`}
              style={{ width: `${formatPercent(value)}%` }}
            ></div>
          </div>
        </div>
      ))}
            </section>

            {/* Gráficos a la derecha */}
            <section className="lg:w-2/3 flex flex-col gap-8">
                {/* Flujo de Caja */}
                <div className="bg-white shadow rounded-xl p-4">
                <h2 className="text-xl font-semibold mb-4">
                    Flujo de Caja {range === 'daily' ? 'Diario' : range === 'monthly' ? 'Mensual' : 'Anual'}
                </h2>

                    {cashFlowData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={220}>
                            <ComposedChart data={cashFlowData}>
                                <XAxis
                                    dataKey="date"
                                    tickFormatter={(str) => {
                                        const date = new Date(str);
                                        if (range === 'daily') return date.toLocaleDateString(); // Ej: 21/04/2025
                                        if (range === 'monthly') return date.toLocaleDateString('default', { month: 'short', year: 'numeric' }); // Ej: Abr 2025
                                        if (range === 'yearly') return date.getFullYear(); // Ej: 2025
                                    }}
                                    />

                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="cash" name="Efectivo" barSize={20} fill="#404040" />
                                <Bar dataKey="visa" name="Visa" barSize={20} fill="#B91C1C" />
                                <Line type="monotone" dataKey="total" name="Total" stroke="#ff7300" strokeWidth={2} />
                            </ComposedChart>
                        </ResponsiveContainer>
                    ) : (
                        <p className="text-sm text-gray-500">No se encontraron datos de flujo de caja.</p>
                    )}
                </div>
                    {/* Evolución de Ingresos */}
                    <div className="bg-white shadow rounded-xl p-4">
                        <h2 className="text-xl font-semibold mb-4">
                            Ingresos {range === 'daily' ? 'Diaria' : range === 'monthly' ? 'Mensual' : 'Anual'}
                        </h2>

                        {cashFlowData.length > 0 ? (
                            <ResponsiveContainer width="100%" height={220}>
                                <LineChart data={cashFlowData}>
                                    <XAxis
                                        dataKey="date"
                                        tickFormatter={(str) => {
                                            const date = new Date(str);
                                            if (range === 'daily') return date.toLocaleDateString(); // Ej: 21/04/2025
                                            if (range === 'monthly') return date.toLocaleDateString('default', { month: 'short', year: 'numeric' }); // Ej: Abr 2025
                                            if (range === 'yearly') return date.getFullYear(); // Ej: 2025
                                        }}
                                        />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="total" name="Ingresos Totales" stroke="#ff7300" strokeWidth={3} />
                                </LineChart>
                            </ResponsiveContainer>
                        ) : (
                            <p className="text-sm text-gray-500">No hay datos para mostrar la evolución.</p>
                        )}
                    </div>
            </section>

            {/* Clientes Entrenando */}
            <div className="bg-white shadow-lg rounded p-2">
              {clients.length > 0 ? (
                <>
                  <h2 className="text-xl font-semibold my-4">Clientes Entrenando</h2>
                  <table className="text-sm border border-gray-200 rounded-lg overflow-hidden w-full">
                    <thead className="bg-gray-100 text-left">
                      <tr>
                        <th className="py-2 px-2">Avatar</th>
                        <th className="px-2 py-2">Nombre</th>
                        <th className="px-2 py-2">Editar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clients.slice(0, 9).map((client) => (
                        <tr key={client.idClient} className="border-t hover:bg-gray-200 rounded">
                          <td className="px-2 py-2">
                            <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full">
                              <span className="font-medium text-gray-600">
                                {client.name.substring(0, 1)}
                                {client.surname.substring(0, 1)}
                              </span>
                            </div>
                          </td>
                          <td className="px-2 py-2 text-left">
                            <strong>
                              {client.name} {client.surname}
                            </strong>
                          </td>
                          <td className="px-2 py-2">
                            <Link to={`/${idGym}/client/${client.idClient}/edit`} className="text-center">
                              <svg className="w-6 h-6 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2M12 4v12m0-12 4 4m-4-4L8 8" />
                              </svg>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              ) : (
                <h2 className="text-xl font-semibold mb-4">👥 No hay clientes registrados</h2>
              )}
            </div>


        </div>
        </>
    );
};

export default DashboardGym;

