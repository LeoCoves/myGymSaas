import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from 'recharts';

const lineData = [
  { name: 'Ene', users: 240, sales: 100 },
  { name: 'Feb', users: 320, sales: 150 },
  { name: 'Mar', users: 280, sales: 200 },
  { name: 'Abr', users: 400, sales: 250 },
  { name: 'May', users: 460, sales: 300 },
  { name: 'Jun', users: 380, sales: 270 },
];

const barData1 = [
  { name: 'Plan Básico', usuarios: 120 },
  { name: 'Plan Pro', usuarios: 240 },
  { name: 'Plan Premium', usuarios: 180 },
];

const barData2 = [
  { name: 'Ene', ingresos: 500 },
  { name: 'Feb', ingresos: 800 },
  { name: 'Mar', ingresos: 700 },
  { name: 'Abr', ingresos: 1100 },
];

export default function DashboardAdminPage() {
  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-3xl font-bold text-black mb-8">Panel de Control</h1>

      {/* Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 p-5">
        <div className="bg-white rounded-2xl shadow-md p-6 border-t-4 border-red-600">
          <h2 className="text-sm text-gray-500">Usuarios Activos</h2>
          <p className="text-2xl font-bold text-gray-800 mt-2">1,205</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 border-t-4 border-orange-600">
          <h2 className="text-sm text-gray-500">Ventas</h2>
          <p className="text-2xl font-bold text-gray-800 mt-2">$8,420</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 border-t-4 border-red-600">
          <h2 className="text-sm text-gray-500">Nuevos Registros</h2>
          <p className="text-2xl font-bold text-gray-800 mt-2">342</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 border-t-4 border-orange-600">
          <h2 className="text-sm text-gray-500">Retención</h2>
          <p className="text-2xl font-bold text-gray-800 mt-2">89%</p>
        </div>
      </div>

      {/* Gráfico de Líneas */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-10">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Usuarios vs Ventas</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="users" stroke="#dc2626" strokeWidth={3} dot={{ r: 4 }} name="Usuarios" />
            <Line type="monotone" dataKey="sales" stroke="#ea580c" strokeWidth={3} dot={{ r: 4 }} name="Ventas" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Gráficos de Barras en una fila */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Barras 1 */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Usuarios por Plan</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData1}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="usuarios" fill="#dc2626" name="Usuarios" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de Barras 2 */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Ingresos Mensuales</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData2}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="ingresos" fill="#ea580c" name="Ingresos" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
