import { useState } from 'react'
import './App.css'

import { Routes, Route } from 'react-router-dom';
// Importar las páginas (vistas)
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

// // Importar componentes comunes
import ProtectedRoute from './components/ProtectedRoute.jsx'; // Importar el ProtectedRoute
import Header from './components/Header.jsx';
// import Sidebar from './components/Sidebar';

import {useAuth} from './contexts/AuthContext.jsx'


function App() {
  const { gymName } = useAuth();
  // const [count, setCount] = useState(0)

  // function handleClick() {
  //   const API_URL = 'https://localhost:7216/api/planes';

  //       fetch(API_URL)
  //         .then(res => res.json())
  //         .then(data => {
  //           console.log(data);
  //         })
  // }

  return (
    <>
          <Header/>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path={`/dashboard`}
              element={<ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>} // Aquí pasas la página
            />
            
          </Routes> 
    </>
  )
}

export default App
