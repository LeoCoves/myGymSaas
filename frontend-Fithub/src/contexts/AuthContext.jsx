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

  // Función para iniciar sesión
  const login = async (email, password) => {
    try {
      const response = await fetch('https://localhost:7216/api/Auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error('Error en el inicio de sesión');

      const data = await response.json();

      console.log(user);

      // Guardar en el estado y en localStorage
      setUser(data.userName);
      setGymName(data.gymName);
      setIdGym(data.idGym); // Almacenar idGym
      const userRole = (data.Role || data.role || "").trim();
      setRole(userRole);

      localStorage.setItem('user', JSON.stringify(data.userName));
      localStorage.setItem('gymName', JSON.stringify(data.gymName));
      localStorage.setItem('idGym', JSON.stringify(data.idGym)); // Almacenar idGym
      localStorage.setItem('role', userRole);
      localStorage.setItem('token', data.Token);

      // Redirección basada en el rol
      setTimeout(() => {
        if (userRole === "Admin") {
          navigate("/admin");
        } else if (data.gymName) {
          navigate(`/${data.gymName}`); // Redirección dinámica
        } else {
          navigate("/"); // Fallback si no hay gymName
        }
      }, 100);
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
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
