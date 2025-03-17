import { useState } from 'react'
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
import CreatePaymentPlan from './pages/PaymentPlan/Create.jsx'
import EditPaymentPlan from './pages/PaymentPlan/Edit.jsx'

import NotFoundPage from './pages/NotFoundPage.jsx';

// // Importar componentes comunes
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Header from './components/Header.jsx';
import Dashboard from './components/Dashboard.jsx';

// import Sidebar from './components/Sidebar';

// import {useAuth} from './contexts/AuthContext.jsx'


function App() {
  // const { gymName } = useAuth();

  return (
    < >
          <Header/>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route 
              path="/admin-dashboard" 
              element={<ProtectedRoute 
              requiredRole="Admin">
                <AdminDashboardPage />
                </ProtectedRoute>} 
            >
              {/* Rutas anidadas dentro del AdminDashboard */}
              <Route path="gyms" element={<GymPage />}/>
              <Route path="gym/:id" element={<GymDetailPage/>} />
              <Route path="gym/:id/edit" element={<GymEditPage/>}/>

              <Route path="plans" element={<PaymentPlansPage />} >
              
              <Route path="plans/create" element={<CreatePaymentPlan/>}/>
              <Route path="plans/:id/edit" element={<EditPaymentPlan/>}/>
                
            </Route>
            </Route>
            <Route
              path={`/dashboard`}
              element={<ProtectedRoute
                requiredRole="Gym">
                <DashboardPage />
              </ProtectedRoute>} // Aquí pasas la página
            >
               {/* Rutas anidadas dentro del Dashboard */}
               <Route path="home" element={<Dashboard />} />
              {/* <Route path="messages" element={<Messages />} />
              <Route path="notifications" element={<Notifications />} /> */}
            </Route>
            
          </Routes> 
          
    </>
  )
}

export default App
