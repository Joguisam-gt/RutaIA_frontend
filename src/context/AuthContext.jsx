import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi } from '../api/authApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem('rutaia_token') || null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchCurrentUser = useCallback(async () => {
        if (!token) {
            setUser(null);
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            const userData = await authApi.getProfile();
            setUser(userData);
        } catch (err) {
            localStorage.removeItem('rutaia_token');
            setToken(null);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchCurrentUser();
    }, [fetchCurrentUser]);

    const login = async (credentials) => {
        const response = await authApi.login(credentials);
        const authToken = response.token;
        localStorage.setItem('rutaia_token', authToken);
        setToken(authToken);
        setUser(response.user);
        return response.user;
    };

    const logout = () => {
        localStorage.removeItem('rutaia_token');
        setToken(null);
        setUser(null);
    };

    const updateUserProfile = (updatedFields) => {
        setUser((prev) => (prev ? { ...prev, ...updatedFields } : null));
    };

    const value = {
        user,
        token,
        isLoading,
        isAuthenticated: Boolean(user && token),
        role: user?.role || 'student',
        login,
        logout,
        updateUserProfile,
        refetchUser: fetchCurrentUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
    }
    return context;
};