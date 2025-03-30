import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import '../styles/Navbar.css';
import { useLocation } from 'react-router-dom';


const Header = () => {
  const { user, gymName, role, logout } = useAuth();
  const location = useLocation();

  return (
    <header className="headerPage">
      <nav className='nav-header'>
        {
          location.pathname === "/" &&
          <h1 className='text-amber'>Fithub</h1>
        }
        <ul className='menu'>
          {!user ? (
            <>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          ) : (
            <>
              {location.pathname === "/" ? (
                role === "Admin" ? (
                  <li><Link to="/admin">Admin</Link></li>
                ) : (
                  <li><Link to={`/${gymName}`}>Dashboard</Link></li>
                )
              ) : (
                <li><button><Link to="/">Volver</Link></button></li>
              )}
              <li><button className='' onClick={logout}>Logout</button></li>
            </>
          )}
      </ul>

      </nav>
    </header>
  );
};

export default Header;