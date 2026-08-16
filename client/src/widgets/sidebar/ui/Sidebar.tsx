import {
    ArrowRightLeft,
    FolderTree,
    LayoutDashboard,
    LogOut,
    Wallet,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { useAuth } from '@/shared/auth';

import styles from './Sidebar.module.scss';

export const Sidebar = () => {
    const { t } = useTranslation();

    const { user, logout } = useAuth();

    const navigation = [
        {
            to: '/',
            label: t('navigation.dashboard'),
            icon: LayoutDashboard,
        },
        {
            to: '/accounts',
            label: t('navigation.accounts'),
            icon: Wallet,
        },
        {
            to: '/categories',
            label: t('navigation.categories'),
            icon: FolderTree,
        },
        {
            to: '/transactions',
            label: t('navigation.transactions'),
            icon: ArrowRightLeft,
        },
    ];

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>
                <div className={styles.logoIcon}>F</div>

                <span className={styles.logoText}>FinTrack</span>
            </div>

            <nav className={styles.nav}>
                {navigation.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.to === '/'}
                            className={({ isActive }) =>
                                `${styles.link} ${
                                    isActive ? styles.linkActive : ''
                                }`
                            }
                        >
                            <Icon
                                className={styles.icon}
                                size={20}
                                strokeWidth={2}
                            />

                            <span>{item.label}</span>
                        </NavLink>
                    );
                })}
            </nav>

            <div className={styles.bottom}>
                {user && (
                    <div className={styles.user}>
                        <div className={styles.userAvatar}>
                            {user.email.charAt(0).toUpperCase()}
                        </div>

                        <div className={styles.userInfo}>
                            <span className={styles.userName}>
                                {user.email.split('@')[0]}
                            </span>

                            <span className={styles.userEmail}>
                                {user.email}
                            </span>
                        </div>
                    </div>
                )}

                <button
                    type="button"
                    className={styles.logout}
                    onClick={handleLogout}
                >
                    <LogOut size={20} strokeWidth={2} />

                    <span>{t('auth.logout')}</span>
                </button>
            </div>
        </aside>
    );
};
