import { Outlet } from 'react-router-dom';

import { LanguageSwitcher } from '@/widgets/header/ui/LanguageSwitcher/LanguageSwitcher';
import { Sidebar } from '@/widgets/sidebar';

import styles from './AppLayout.module.scss';

export const AppLayout = () => {
    return (
        <div className={styles.appLayout}>
            <Sidebar />

            <div className={styles.content}>
                <div className={styles.topbar}>
                    <LanguageSwitcher />
                </div>

                <Outlet />
            </div>
        </div>
    );
};
