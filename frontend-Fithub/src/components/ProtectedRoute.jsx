import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { role } = useAuth();

  console.log("🔹 ProtectedRoute - Usuario con rol:", role);
  console.log("🔹 ProtectedRoute - Rol requerido:", requiredRole);

  if (!role) {
    console.warn("🔸 No hay rol, redirigiendo a /login...");
    return <Navigate to="/login" replace />;
  }

  if (role !== requiredRole) {
    console.warn(`🔸 Rol ${role} no tiene acceso a ${requiredRole}, redirigiendo a /`);
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;