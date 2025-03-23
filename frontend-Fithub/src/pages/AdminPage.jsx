// pages/DashboardPage.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function AdminPage() {

  return (
    <>
      <Sidebar />
      <section className="flex-1 ml-40 p-6">
        {/* Aquí se renderiza el contenido de las rutas anidadas */}
        <Outlet />
      </section>
    </>
  );
}

export default AdminPage;