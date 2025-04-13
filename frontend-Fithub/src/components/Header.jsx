import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const { user, gymName, role, logout } = useAuth();
  const location = useLocation();

  return (
    <header className="bg-white p-4 w-full">
      <nav className="flex justify-between items-center">
        {/* Logo (Fithub) a la izquierda */}
        {location.pathname === "/" && (
          <h1 className="font-semibold text-amber-500">Fithub</h1>
        )}

        {/* Menú de navegación a la derecha */}
        <ul className="flex space-x-5 justify-end items-center">
          {!user ? (
            <>
              <li><Link to="/" className="text-gray-700 hover:text-orange-500 transition duration-300">Home</Link></li>
              <li><Link to="/login" className="text-gray-700 hover:text-orange-500 transition duration-300">Login</Link></li>
              <li><Link to="/register" className="text-gray-700 hover:text-orange-500 transition duration-300">Register</Link></li>
            </>
          ) : (
            <>
              {location.pathname === "/" ? (
                role === "Admin" ? (
                  <li><Link to="/admin" className="text-gray-700 hover:text-orange-500 transition duration-300">Admin</Link></li>
                ) : (
                  <li><Link to={`/${gymName}`} className="text-gray-700 hover:text-orange-500 transition duration-300">Dashboard</Link></li>
                )
              ) : (
                <li><Link to="/" className="text-gray-700 hover:text-orange-500 transition duration-300">Volver</Link></li>
              )}
              <li>
                <button 
                  onClick={logout} 
                  className="text-purple-700 hover:text-orange-500 transition duration-300"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

