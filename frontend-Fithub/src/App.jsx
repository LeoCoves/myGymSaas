import { Navigate } from 'react-router-dom';
import './App.css'

import { Routes, Route } from 'react-router-dom';
// Importar las páginas (vistas)
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import AdminDashboardPage from './pages/AdminDashboardPage.jsx';


import GymPage from './pages/Gyms/Index.jsx';
import GymDetailPage from './pages/Gyms/Detail.jsx';
import GymEditPage from './pages/Gyms/Edit.jsx';

import PaymentPlansPage from './pages/PaymentPlan/Index.jsx';
import PaymentPlanDetail from './pages/PaymentPlan/Detail.jsx';
import CreatePaymentPlan from './pages/PaymentPlan/Create.jsx';
import EditPaymentPlan from './pages/PaymentPlan/Edit.jsx';

import ChatApp from './pages/ChatPage.jsx';

import NotFoundPage from './pages/NotFoundPage.jsx';

// // Importar componentes comunes
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Header from './components/Header.jsx';
import Dashboard from './components/Dashboard.jsx';

// import Sidebar from './components/Sidebar';

// import {useAuth} from './contexts/AuthContext.jsx'


function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Rutas protegidas para Admin */}
        <Route path="/admin-dashboard" element={<ProtectedRoute requiredRole="Admin"><AdminDashboardPage /></ProtectedRoute>}>
          
          {/* Rutas para gimnasios */}
          <Route path="gyms" element={<GymPage />} />
          <Route path="gym/:id" element={<GymDetailPage />} />
          <Route path="gym/:id/edit" element={<GymEditPage />} />

          {/* Rutas para planes de pago */}
          <Route path="plans" element={<PaymentPlansPage />} />
          <Route path="plan/:id" element={<PaymentPlanDetail />} />
          <Route path="plans/create" element={<CreatePaymentPlan />} />
          <Route path="plan/:id/edit" element={<EditPaymentPlan />} />

          {/*Rutas para el chat */}
          <Route path="chat" element={<ChatApp />} />
        </Route>

        {/* Rutas protegidas para Gym */}
        <Route path="/dashboard" element={<ProtectedRoute requiredRole="Gym"><DashboardPage /></ProtectedRoute>}>
          <Route path="home" element={<Dashboard />} />
        </Route>

        {/* Ruta por defecto si no encuentra ninguna */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );

}

export default App
