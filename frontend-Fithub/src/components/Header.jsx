import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import '../styles/Navbar.css';


const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="headerPage">
      <nav className='navPage'>
        <ul className='menu'>
          {!user ? (
            <>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          ) : (
            <>
              <li><button onClick={logout}>Logout</button></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;