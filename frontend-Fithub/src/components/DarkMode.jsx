import React, { useState, useEffect } from 'react';

const DarkMode = () => {
  // Estado que determina si es modo noche o día
  const [darkMode, setDarkMode] = useState(false);

  // Cargar la preferencia desde el localStorage al iniciar
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
      setDarkMode(true);
    }
  }, []);

  // Cambiar el tema y guardar la preferencia en localStorage
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', !darkMode);
  };

  // Aplica las clases de Tailwind dependiendo del estado del modo oscuro
  const themeClass = darkMode ? 'dark' : ''; // 'dark' es la clase que activa el modo oscuro de Tailwind

  return (
    <div className={`${themeClass} min-h-screen bg-white dark:bg-gray-800 transition-all duration-500`}>
      <div className="p-4 text-gray-900 dark:text-white">
        <h1 className="text-3xl font-bold">Modo Noche/Día con React y Tailwind</h1>
        <p className="mt-4">¡Cambia entre el modo noche y el modo día!</p>
        
        <button
          onClick={toggleTheme}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Cambiar a {darkMode ? 'Modo Día' : 'Modo Noche'}
        </button>
      </div>
    </div>
  );
};

export default DarkMode;
