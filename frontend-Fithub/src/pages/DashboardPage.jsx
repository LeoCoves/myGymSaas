// pages/DashboardPage.js
import React from 'react';
import Sidebar from '../components/Sidebar';
import {useAuth} from '../contexts/AuthContext.jsx'

function DashboardPage() {
  const { gymName, user } = useAuth();

  return (
    <div>
      <Sidebar />
      <h1>Bienvenidooooooooooooooo, {user?.email}</h1>
      <p>Estás en el gimnasio: {gymName}</p>
    </div>
  );
}

export default DashboardPage;