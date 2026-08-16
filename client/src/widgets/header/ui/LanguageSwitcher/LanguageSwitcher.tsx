import { useTranslation } from 'react-i18next';

import './LanguageSwitcher.scss';

export const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const language = event.target.value;

        i18n.changeLanguage(language);

        localStorage.setItem('fintrack-language', language);
    };

    return (
        <div className="language-switcher">
            <span className="language-switcher__label">
                {i18n.language.toUpperCase()}
            </span>

            <select
                className="language-switcher__select"
                value={i18n.language}
                onChange={handleChange}
                aria-label="Language"
            >
                <option value="en">EN</option>
                <option value="ru">RU</option>
            </select>
        </div>
    );
};
