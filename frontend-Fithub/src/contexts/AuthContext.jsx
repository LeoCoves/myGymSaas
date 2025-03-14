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

  const [role, setRole] = useState(()=>{
    const storedRole = localStorage.getItem('role');
    return storedRole ? storedRole : null;
  });

  
  const navigate = useNavigate();

  useEffect(()=>{
    const storedUser = localStorage.getItem('user');
    const storedGymName = localStorage.getItem('gymName');
    const storedRole = localStorage.getItem('role');

    if(storedUser) setUser(JSON.parse(storedUser));
    if(storedGymName) setGymName(JSON.parse(storedGymName));
    if(storedRole) setRole((storedRole))
  }, [user]);

  // Función para iniciar sesión
  const login = async (email, password) => {
    const response = await fetch('https://localhost:7216/api/Auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Error en el inicio de sesión');
    }

    const data = await response.json();
    
    setUser(data.userName); // Puedes agregar más información de usuario si es necesario
    setGymName(data.gymName);

    const userRole = (data.Role || data.role || "").trim();

    if(userRole){
      setRole(data.role) 
      localStorage.setItem("role", data.role);
    }

    
    
    localStorage.setItem('user', JSON.stringify(data.userName));
    localStorage.setItem('gymName', JSON.stringify(data.gymName))
    localStorage.setItem('token', data.Token); // Guardar el token en el localStorage
    
    
    setTimeout(() => {
    
      if (userRole === "Admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }
    }, 100);
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    setGymName('');
    setRole(null);

    localStorage.removeItem('user');
    localStorage.removeItem('gymName');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, gymName, login, logout, role }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para acceder al contexto
export const useAuth = () => useContext(AuthContext);