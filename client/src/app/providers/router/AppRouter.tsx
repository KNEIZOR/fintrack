import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { AppLayout } from '@/layouts/AppLayout/AppLayout';

import { DashboardPage } from '@/pages/DashboardPage';
import { AccountsPage } from '@/pages/AccountsPage';
import { CategoriesPage } from '@/pages/CategoriesPage/CategoriesPage';
import { TransactionsPage } from '@/pages/TransactionsPage/TransactionsPage';
import { LoginPage } from '@/pages/LoginPage';

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />

                <Route element={<AppLayout />}>
                    <Route path="/" element={<DashboardPage />} />

                    <Route path="/accounts" element={<AccountsPage />} />

                    <Route path="/categories" element={<CategoriesPage />} />

                    <Route
                        path="/transactions"
                        element={<TransactionsPage />}
                    />

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
