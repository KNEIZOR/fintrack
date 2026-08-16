import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './Sidebar.scss';

export const Sidebar = () => {
    const { t } = useTranslation();

    return (
        <aside className="sidebar">
            <div className="sidebar__logo">FinTrack</div>

            <nav className="sidebar__nav">
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                        isActive
                            ? 'sidebar__link sidebar__link--active'
                            : 'sidebar__link'
                    }
                >
                    {t('navigation.dashboard')}
                </NavLink>

                <NavLink
                    to="/accounts"
                    className={({ isActive }) =>
                        isActive
                            ? 'sidebar__link sidebar__link--active'
                            : 'sidebar__link'
                    }
                >
                    {t('navigation.accounts')}
                </NavLink>

                <NavLink
                    to="/categories"
                    className={({ isActive }) =>
                        isActive
                            ? 'sidebar__link sidebar__link--active'
                            : 'sidebar__link'
                    }
                >
                    {t('navigation.categories')}
                </NavLink>

                <NavLink
                    to="/transactions"
                    className={({ isActive }) =>
                        isActive
                            ? 'sidebar__link sidebar__link--active'
                            : 'sidebar__link'
                    }
                >
                    {t('navigation.transactions')}
                </NavLink>
            </nav>
        </aside>
    );
};
