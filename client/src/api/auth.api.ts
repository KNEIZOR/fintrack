import { apiClient } from '@/shared/api';

export interface AuthUser {
    id: string;
    email: string;
    name: string;
    currency: string;
    timezone: string;
}

interface LoginResponse {
    status: string;
    user: AuthUser;
}

interface RegisterResponse {
    status: string;
    user: AuthUser;
}

interface MeResponse {
    status: string;
    user: AuthUser;
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface RegisterInput {
    name: string;
    email: string;
    password: string;
}

export const login = async (data: LoginInput): Promise<AuthUser> => {
    const response = await apiClient<LoginResponse>('/api/auth/login', {
        method: 'POST',
        body: data,
    });

    return response.user;
};

export const register = async (data: RegisterInput): Promise<AuthUser> => {
    const response = await apiClient<RegisterResponse>('/api/auth/register', {
        method: 'POST',
        body: data,
    });

    return response.user;
};

export const getMe = async (): Promise<AuthUser> => {
    const response = await apiClient<MeResponse>('/api/auth/me');

    return response.user;
};

export const logout = async (): Promise<void> => {
    await apiClient('/api/auth/logout', {
        method: 'POST',
    });
};
