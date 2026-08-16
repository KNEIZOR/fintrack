import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/shared/auth';

export const PublicRoute = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return null;
    }

    if (user) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};
