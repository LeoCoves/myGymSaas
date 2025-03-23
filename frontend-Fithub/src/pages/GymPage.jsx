import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar.jsx';

function GymPage() {

  return (
    <>
      <Sidebar/>
      <section className="flex-1 ml-40 p-6">
          <Outlet /> {/* Aquí se renderizará DashboardPage */}
      </section>
      
    </>
  );
}

export default GymPage;
