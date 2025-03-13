import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(()=>{
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  }); // Guardar la información del usuario
  
  const [gymName, setGymName] = useState(()=>{
    const storedGymName = localStorage.getItem('gymName');
    return storedGymName ? JSON.parse(storedGymName) : null;
  }); // Guardar el nombre del gimnasio

  
  const navigate = useNavigate();

  // Función para iniciar sesión
  const login = async (email, password) => {
    const response = await fetch('https://localhost:7216/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Error en el inicio de sesión');
    }

    const data = await response.json();
    setUser({ email }); // Puedes agregar más información de usuario si es necesario
    setGymName(data.GymName); // Guardar el nombre del gimnasio
    localStorage.setItem('token', data.Token); // Guardar el token en el localStorage
    navigate(`/dashboard`); // Redirigir al dashboard o donde sea necesario
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    setGymName('');
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, gymName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para acceder al contexto
export const useAuth = () => useContext(AuthContext);