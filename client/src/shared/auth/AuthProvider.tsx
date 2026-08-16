import { useEffect, useState, type ReactNode } from 'react';

import { getMe, login, logout, type AuthUser } from '@/api/auth.api';

import { AuthContext, type AuthContextValue } from './AuthContext';

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<AuthUser | null>(null);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const restoreSession = async () => {
            try {
                const currentUser = await getMe();

                setUser(currentUser);
            } catch {
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        restoreSession();
    }, []);

    const handleLogin: AuthContextValue['login'] = async (data) => {
        const currentUser = await login(data);

        setUser(currentUser);
    };

    const handleLogout: AuthContextValue['logout'] = async () => {
        try {
            await logout();
        } finally {
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                isAuthenticated: user !== null,
                login: handleLogin,
                logout: handleLogout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
