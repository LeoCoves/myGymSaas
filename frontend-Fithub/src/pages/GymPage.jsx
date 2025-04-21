import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar.jsx';
import Header from '../components/Header.jsx';

function GymPage() {

  return (
    <>
      <Sidebar/>
      <section className="flex-1 ml-10">
        <Header classname="justify-center"/>
          <Outlet /> {/* Aquí se renderizará DashboardPage */}
      </section>
      
    </>
  );
}

export default GymPage;
