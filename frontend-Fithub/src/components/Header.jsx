import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const { user, gymName, role, logout } = useAuth();
  const location = useLocation();

  return (
    <header className="shadow-mds w-full p-1">
      <nav className="flex justify-between items-center ">
        {location.pathname === "/" && (
          <span className="logoHome text-gradient-to-r from-red-500 to-orange-500">Fithub</span>
        )}


        {/* Menú de navegación a la derecha */}
        <ul className="flex space-x-5 justify-end items-center  w-full">
          {!user ? (
            <>
              <li><Link to="/" className="text-gray-700 hover:text-orange-500 transition duration-300">Home</Link></li>
              <li>
                <Link to="/login" className="text-gray-700 hover:text-orange-500 transition duration-300">
                Login
                </Link>
              </li>
              <li><Link to="/register" className="text-gray-700 hover:text-orange-500 transition duration-300">Register</Link></li>
            </>
          ) : (
            <>
              {location.pathname === "/" ? (
                role === "Admin" ? (
                  <li><Link to="/admin" className="bg-neutral-950 hover:bg-neutral-900 transition duration-300 p-3 rounded-md text-white hover:text-white text-md mx-3">Dashboard</Link></li>
                ) : (
                  <li><Link to={`/${gymName}`} className="bg-neutral-950 hover:bg-neutral-900 transition duration-300 p-3 rounded-md text-white hover:text-white text-md mx-3">Dashboard</Link></li>
                )
              ) : (
                <li className='bg-neutral-950 hover:bg-neutral-900 transition duration-300 p-2 rounded-md'>
                  <Link to="/" className="text-white hover:text-white text-lg mx-3 transition duration-300">Volver</Link></li>
              )}
              <li>
                <button 
                  onClick={logout} 
                  className="border border-black hover:text-white hover:bg-red-500 hover:border-transparent  transition duration-300"
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

