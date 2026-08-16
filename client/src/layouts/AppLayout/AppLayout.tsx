import { Outlet } from 'react-router-dom';

import { Sidebar } from '../../widgets/sidebar/ui/Sidebar';
import { LanguageSwitcher } from '../../widgets/header/ui/LanguageSwitcher/LanguageSwitcher';

import './AppLayout.scss';

export const AppLayout = () => {
    return (
        <div className="app-layout">
            <Sidebar />

            <div className="app-layout__content">
                <div className="app-layout__topbar">
                    <LanguageSwitcher />
                </div>

                <Outlet />
            </div>
        </div>
    );
};
