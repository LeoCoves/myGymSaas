// pages/DashboardPage.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function DashboardPage() {

  return (
    <>
      <Sidebar />
      <section className='relative m-0'>
        {/* Aquí se renderiza el contenido de las rutas anidadas */}
        <Outlet />
      </section>
    </>
  );
}

export default DashboardPage;