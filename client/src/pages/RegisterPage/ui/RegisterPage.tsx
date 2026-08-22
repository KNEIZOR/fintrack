import { type FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import type { RegisterInput } from '@/api/auth.api';

import { register } from '@/api/auth.api';

import { ApiErrorMessage } from '@/shared/api/ApiErrorMessage';
import { LanguageSwitcher } from '@/widgets/header/ui/LanguageSwitcher';

import styles from './RegisterPage.module.scss';

export const RegisterPage = () => {
    const { t } = useTranslation();

    const navigate = useNavigate();

    const [form, setForm] = useState<RegisterInput>({
        name: '',
        email: '',
        password: '',
    });

    const [confirmPassword, setConfirmPassword] = useState('');

    const [error, setError] = useState<Error | null>(null);

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (field: keyof RegisterInput, value: string) => {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (form.password.length < 8) {
            setError(new Error(t('errors.passwordMinLength')));

            return;
        }

        if (form.password !== confirmPassword) {
            setError(new Error(t('errors.passwordsDoNotMatch')));

            return;
        }

        try {
            setIsLoading(true);
            setError(null);

            await register(form);

            navigate('/login', {
                replace: true,
                state: {
                    registered: true,
                },
            });
        } catch (error) {
            console.error(error);

            setError(
                error instanceof Error ? error : new Error(t('errors.unknown')),
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className={styles.register}>
            <div className={styles.card}>
                <div className={styles.language}>
                    <LanguageSwitcher />
                </div>

                <div className={styles.header}>
                    <div className={styles.logo}>F</div>

                    <h1 className={styles.title}>FinTrack</h1>

                    <p className={styles.subtitle}>
                        {t('auth.registerSubtitle')}
                    </p>
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="name">
                            {t('auth.name')}
                        </label>

                        <input
                            id="name"
                            className={styles.input}
                            type="text"
                            value={form.name}
                            onChange={(event) =>
                                handleChange('name', event.target.value)
                            }
                            placeholder={t('auth.namePlaceholder')}
                            autoComplete="name"
                            required
                        />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="email">
                            {t('auth.email')}
                        </label>

                        <input
                            id="email"
                            className={styles.input}
                            type="email"
                            value={form.email}
                            onChange={(event) =>
                                handleChange('email', event.target.value)
                            }
                            placeholder="you@example.com"
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="password">
                            {t('auth.password')}
                        </label>

                        <input
                            id="password"
                            className={styles.input}
                            type="password"
                            value={form.password}
                            onChange={(event) =>
                                handleChange('password', event.target.value)
                            }
                            placeholder="••••••••"
                            autoComplete="new-password"
                            minLength={8}
                            required
                        />
                    </div>

                    <div className={styles.field}>
                        <label
                            className={styles.label}
                            htmlFor="confirm-password"
                        >
                            {t('auth.confirmPassword')}
                        </label>

                        <input
                            id="confirm-password"
                            className={styles.input}
                            type="password"
                            value={confirmPassword}
                            onChange={(event) =>
                                setConfirmPassword(event.target.value)
                            }
                            placeholder="••••••••"
                            autoComplete="new-password"
                            minLength={8}
                            required
                        />
                    </div>

                    {error && <ApiErrorMessage error={error} />}

                    <button
                        className={styles.submit}
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? t('auth.registering') : t('auth.register')}
                    </button>

                    <p className={styles.loginText}>
                        {t('auth.haveAccount')}{' '}
                        <Link className={styles.loginLink} to="/login">
                            {t('auth.login')}
                        </Link>
                    </p>
                </form>
            </div>
        </main>
    );
};
