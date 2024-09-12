import React, { createContext, useState, useEffect } from 'react';

// Crear el contexto de autenticación
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ username: 'guest', token: '', token__refresh: '' });
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');

  // Cargar los datos del usuario desde localStorage cuando el componente se monta
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setAccessToken(parsedUser.token);
      setRefreshToken(parsedUser.token__refresh);
    }
  }, []);

  // Función para decodificar el JWT sin verificar la firma
  const decodeToken = (token) => {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  };

  // Verificar si el token ha expirado
  const isTokenExpired = (token) => {
    if (!token) return true;
    const decoded = decodeToken(token);
    const currentTime = Date.now() / 1000; // Tiempo en segundos
    return decoded.exp < currentTime;
  };

  // Función para renovar el access token usando el refresh token
  const refreshAccessToken = () => {

    return fetch('http://localhost:5000/api/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token__refresh: refreshToken }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.accessToken) {
          localStorage.setItem('token', data.accessToken);
          setAccessToken(data.accessToken);
          return data.accessToken;
        }
        throw new Error('No se pudo renovar el token');
      })
      .catch(err => {
        console.error('Error renovando token:', err);
        // Redirigir al login o manejar el error
      });
  };

  // Hacer una petición con verificación del token
  const fetchWithToken = (url, options = {}) => {
    // Verificar si el token ha expirado
    if (isTokenExpired(accessToken)) {
      return refreshAccessToken().then(newToken => {
        return fetch(url, {
          ...options,
          headers: {
            ...options.headers,
            'Authorization': `Bearer ${newToken}`,
          },
        });
      });
    }

    // Si el token no ha expirado, hacer la solicitud normal
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${accessToken}`,
      },
    });
  };

  return (
    <AuthContext.Provider value={{ fetchWithToken, accessToken, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
