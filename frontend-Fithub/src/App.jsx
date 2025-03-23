import { Navigate } from 'react-router-dom';
import './App.css'

import { Routes, Route } from 'react-router-dom';
// Importar las páginas (vistas)
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import GymPage from './pages/GymPage.jsx';
import AdminPage from './pages/AdminPage.jsx';

//Administrador
import DashboardPage from './pages/DashboardPage.jsx';
import GymsPage from './pages/Gyms/Index.jsx';
import GymDetailPage from './pages/Gyms/Detail.jsx';
import GymEditPage from './pages/Gyms/Edit.jsx';

import PaymentPlansPage from './pages/PaymentPlan/Index.jsx';
import PaymentPlanDetail from './pages/PaymentPlan/Detail.jsx';
import CreatePaymentPlan from './pages/PaymentPlan/Create.jsx';
import EditPaymentPlan from './pages/PaymentPlan/Edit.jsx';


import ChatApp from './pages/ChatPage.jsx';
//Gimnasio

import ClientsPage from './pages/Clients/Index.jsx';
import CreateClientPage from './pages/Clients/Create.jsx';
import DetailClientPage from './pages/Clients/Detail.jsx';
import EditClientPage from './pages/Clients/Edit.jsx';

import GymPaymentPlansPage from './pages/GymPaymentPlan/Index.jsx';

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
        <Route path="/admin" element={<ProtectedRoute requiredRole="Admin"><AdminPage /></ProtectedRoute>}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route index path="dashboard" element={<DashboardPage />} />
          
          {/* Rutas para gimnasios */}
          <Route path="gyms" element={<GymsPage />} />
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
        <Route path="/:gym" element={<ProtectedRoute requiredRole="Gym"><GymPage /></ProtectedRoute>}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route index path="dashboard" element={<DashboardPage />} />


          <Route index path="clients" element={<ClientsPage />}/>
          <Route path="client/create" element={<CreateClientPage />} />
          <Route path="client/:idClient" element={<DetailClientPage />} />
          <Route path="client/:idClient/edit" element={<EditClientPage />} />

          <Route path="plans" element={<GymPaymentPlansPage />} />
        </Route>

        {/* Ruta por defecto si no encuentra ninguna */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );

}

export default App
