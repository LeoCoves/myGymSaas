import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Navbar.css';

function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');  // Estado para manejar el error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError(''); // Limpiar error previo

    try {
      await login(email, password);
      // Si el login es exitoso, puedes redirigir a otra página o hacer algo más
    } catch (err) {
      console.error('Login failed:', err);
      // Aquí manejamos el error y lo mostramos
      setLoginError(err.message || 'Invalid email or password');  // Usamos el mensaje del error lanzado
    }
  };

  return (
    <section>
      <div className="flex flex-col items-center justify-center">
        <Link to="/">
        <span className="logoHome">
          Fithub
        </span>
        </Link>
        <div className="w-full bg-white rounded-lg shadow md:mt-10 sm:max-w-lg xl:p-0 rounded shadow-lg">
          <div className="p-6 space-y-4 md:space-y-2 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Log in to your account
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-black"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-black"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {/* Mostrar el error si ocurre */}
              {loginError && (
                <div className="text-red-500 text-sm">
                  {loginError}
                </div>
              )}

              {/* Botón */}
              <button
                type="submit"
                className="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2 text-center"
              >
                Sign in
              </button>

              {/* Registro */}
              <p className="text-sm font-light text-gray-500">
                Don’t have an account yet?{" "}
                <a href="/register" className="font-medium text-gray-600 hover:underline">
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
