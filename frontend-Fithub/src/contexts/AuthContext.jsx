import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // Estado inicial desde localStorage
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem('user')) || null;
  });

  const [gymName, setGymName] = useState(() => {
    return JSON.parse(localStorage.getItem('gymName')) || null;
  });

  const [idGym, setIdGym] = useState(() => {
    return JSON.parse(localStorage.getItem('idGym')) || null;
  });

  const [role, setRole] = useState(() => {
    return localStorage.getItem('role') || null;
  });

  // Actualiza el estado si hay cambios en localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedGymName = JSON.parse(localStorage.getItem('gymName'));
    const storedGymId = JSON.parse(localStorage.getItem('idGym')); // Obtener idGym
    const storedRole = localStorage.getItem('role');

    setUser(storedUser);
    setGymName(storedGymName);
    setIdGym(storedGymId); // Almacenar idGym
    setRole(storedRole);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch('https://localhost:7216/api/Auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        // Si la respuesta no es "OK", obtenemos el mensaje de error
        const errorData = await response.json();
        throw new Error(errorData.message || 'Invalid credentials');  // Asegúrate de que el backend envíe "message"
      }
  
      const data = await response.json();
  
      // Guardamos los datos del usuario y rol
      setUser(data.userName);
      setGymName(data.gymName);
      setIdGym(data.idGym);
      setRole(data.Role || data.role);
  
      // Guardar en localStorage
      localStorage.setItem('user', JSON.stringify(data.userName));
      localStorage.setItem('gymName', JSON.stringify(data.gymName));
      localStorage.setItem('idGym', JSON.stringify(data.idGym));
      localStorage.setItem('role', data.Role || data.role);
      localStorage.setItem('token', data.Token);
  
      // Redirigir según el rol
      setTimeout(() => {
        if (data.role === "Admin") {
          navigate("/admin");
        } else if (data.gymName) {
          navigate(`/${data.gymName}`);
        } else {
          navigate("/");  // Fallback si no hay gymName
        }
      }, 100);
    } catch (error) {
      error.message = 'Email and password are incorrect';  // Asegúrate de que el backend envíe "message"
      console.error("Error en el inicio de sesión:", error);
      throw error;  // Lanza el error para ser manejado por el componente
    }
  };
  

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    setGymName(null);
    setRole(null);

    localStorage.removeItem('user');
    localStorage.removeItem('gymName');
    localStorage.removeItem('idGym');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, gymName, idGym, login, logout, role }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para acceder al contexto
export const useAuth = () => useContext(AuthContext);
