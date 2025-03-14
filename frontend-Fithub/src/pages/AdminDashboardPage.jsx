// pages/DashboardPage.js
import React from 'react';
import Sidebar from '../components/Sidebar';
import {useAuth} from '../contexts/AuthContext.jsx'

function AdminDashboardPage() {
  const { user } = useAuth();

  return (
    <div>
      <Sidebar />
      <h1>Bienvenidooooooooooooooo, {user?.email}</h1>
      <p>Estás en el portal de admin: </p>
    </div>
  );
}

export default AdminDashboardPage;