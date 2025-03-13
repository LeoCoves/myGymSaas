import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(()=>{
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  }); 
  
  const [gymName, setGymName] = useState(()=>{
    const storedGymName = localStorage.getItem('gymName');
    return storedGymName ? JSON.parse(storedGymName) : null;
  }); 

  
  const navigate = useNavigate();

  useEffect(()=>{
    const storedUser = localStorage.getItem('user');
    const storedGymName = localStorage.getItem('gymName');

    if(storedUser) setUser(JSON.parse(storedUser));
    if(storedGymName) setGymName(JSON.parse(storedGymName));
  }, []);

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
    console.log(data);

    setUser(data.userName); // Puedes agregar más información de usuario si es necesario
    setGymName(data.GymName); // Guardar el nombre del gimnasio
    
    localStorage.setItem('user', JSON.stringify(data.userName));
    localStorage.setItem('gymName', JSON.stringify(data.gymName))
    localStorage.setItem('token', data.Token); // Guardar el token en el localStorage
    
    navigate(`/dashboard`); // Redirigir al dashboard o donde sea necesario
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    setGymName('');

    localStorage.removeItem('user');
    localStorage.removeItem('gymName');
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