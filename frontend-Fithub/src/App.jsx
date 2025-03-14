import { useState } from 'react'
import './App.css'

import { Routes, Route } from 'react-router-dom';
// Importar las páginas (vistas)
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import AdminDashboardPage from './pages/AdminDashboardPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

// // Importar componentes comunes
import ProtectedRoute from './components/ProtectedRoute.jsx'; // Importar el ProtectedRoute
import Header from './components/Header.jsx';
// import Sidebar from './components/Sidebar';

// import {useAuth} from './contexts/AuthContext.jsx'


function App() {
  // const { gymName } = useAuth();

  return (
    <>
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
            />
            <Route
              path={`/dashboard`}
              element={<ProtectedRoute
                requiredRole="Gym">
                <DashboardPage />
              </ProtectedRoute>} // Aquí pasas la página
            />
            
          </Routes> 
          
    </>
  )
}

export default App
