import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { AppLayout } from '@/layouts/AppLayout/AppLayout';

import { AccountsSkeleton } from '@/pages/AccountsPage/ui/AccountsSkeleton/AccountsSkeleton';
import { CategoriesSkeleton } from '@/pages/CategoriesPage/ui/CategoriesSkeleton/CategoriesSkeleton';
import { DashboardSkeleton } from '@/pages/DashboardPage/ui/DashboardSkeleton/DashboardSkeleton';
import { TransactionsSkeleton } from '@/pages/TransactionsPage/ui/TransactionsSkeleton/TransactionsSkeleton';

import { PageSkeleton } from '@/shared/ui/PageSkeleton/PageSkeleton';

import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';

const LoginPage = lazy(() => import('@/pages/LoginPage'));

const RegisterPage = lazy(() => import('@/pages/RegisterPage'));

const DashboardPage = lazy(() => import('@/pages/DashboardPage'));

const AccountsPage = lazy(() => import('@/pages/AccountsPage'));

const CategoriesPage = lazy(() => import('@/pages/CategoriesPage'));

const TransactionsPage = lazy(() => import('@/pages/TransactionsPage'));

export const AppRouter = () => {
    return (
        <Suspense fallback={<PageSkeleton />}>
            <Routes>
                {/* Public routes */}
                <Route element={<PublicRoute />}>
                    <Route path="/login" element={<LoginPage />} />

                    <Route path="/register" element={<RegisterPage />} />
                </Route>

                {/* Protected routes */}
                <Route element={<ProtectedRoute />}>
                    <Route element={<AppLayout />}>
                        <Route
                            path="/"
                            element={
                                <Suspense fallback={<DashboardSkeleton />}>
                                    <DashboardPage />
                                </Suspense>
                            }
                        />

                        <Route
                            path="/accounts"
                            element={
                                <Suspense fallback={<AccountsSkeleton />}>
                                    <AccountsPage />
                                </Suspense>
                            }
                        />

                        <Route
                            path="/categories"
                            element={
                                <Suspense fallback={<CategoriesSkeleton />}>
                                    <CategoriesPage />
                                </Suspense>
                            }
                        />

                        <Route
                            path="/transactions"
                            element={
                                <Suspense fallback={<TransactionsSkeleton />}>
                                    <TransactionsPage />
                                </Suspense>
                            }
                        />

                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Route>
                </Route>
            </Routes>
        </Suspense>
    );
};
