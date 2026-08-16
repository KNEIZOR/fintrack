import { createContext } from 'react';

import type { AuthUser } from '@/api/auth.api';

interface LoginData {
    email: string;
    password: string;
}

export interface AuthContextValue {
    user: AuthUser | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (data: LoginData) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
