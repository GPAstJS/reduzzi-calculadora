/** @format */

import { useState, createContext } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [userContext, setUserContext] = useState(null);
    // const [loading, setLoading] = useState(false);

    const getLogin = async () => {
        window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
    };

    const value = {
        userContext,
        setUserContext,
        getLogin,
    };

    return (
        <AuthContext.Provider value={{ ...value }}>
            {children}
        </AuthContext.Provider>
    );
}
