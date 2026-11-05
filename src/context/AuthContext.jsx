// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';
import { authApi } from '../api/authApi';
import { authRegisterApi } from '../api/authRegisterApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        try {
            return savedUser ? JSON.parse(savedUser) : null;
        } catch {
            return null;
        }
    });
    const [loading, setLoading] = useState(false);

    // Funcion auxiliar para extraer token y usuario de multiples estructuras posibles
    const extractAuthData = (response) => {
        // Axios suele envolver en 'data', y nuestro backend de Express envuelve en 'data' otra vez.
        const rawPayload = response?.data?.data || response?.data || response;
        return {
            token: rawPayload?.token || response?.token,
            userData: rawPayload?.user || rawPayload?.data?.user || response?.user
        };
    };

    const login = async (email, password) => {
        setLoading(true);
        try {
            const response = await authApi.login({ email, password });
            console.log('[AuthContext] Respuesta de login:', response);

            const { token, userData } = extractAuthData(response);

            if (token && userData) {
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(userData));
                setUser(userData);
                return userData;
            } else {
                console.error('[AuthContext] Falta token o userData en la respuesta.');
                throw new Error('Estructura de respuesta invalida del servidor.');
            }
        } finally {
            setLoading(false);
        }
    };

    const register = async (userDataPayload) => {
        setLoading(true);
        try {
            const response = await authRegisterApi.registerStudent(userDataPayload);
            console.log('[AuthContext] Respuesta de registro:', response);

            const { token, userData } = extractAuthData(response);

            if (token && userData) {
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(userData));
                setUser(userData);
                return userData;
            } else {
                console.warn('[AuthContext] Registro exitoso, pero sin autologin.');
                return response;
            }
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;