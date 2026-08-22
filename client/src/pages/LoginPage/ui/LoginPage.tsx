import { type FormEvent, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ApiErrorMessage } from '@/shared/api/ApiErrorMessage';
import { useAuth } from '@/shared/auth';

import styles from './LoginPage.module.scss';

export const LoginPage = () => {
    const { t } = useTranslation();

    const { login } = useAuth();

    const navigate = useNavigate();

    const location = useLocation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState<Error | null>(null);

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            setIsLoading(true);
            setError(null);

            await login({
                email,
                password,
            });

            const from = location.state?.from?.pathname || '/';

            navigate(from, {
                replace: true,
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
        <main className={styles.login}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <div className={styles.logo}>F</div>

                    <h1 className={styles.title}>FinTrack</h1>

                    <p className={styles.subtitle}>{t('auth.loginSubtitle')}</p>
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="email">
                            {t('auth.email')}
                        </label>

                        <input
                            id="email"
                            className={styles.input}
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
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
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            placeholder="••••••••"
                            autoComplete="current-password"
                            required
                        />
                    </div>

                    {error && <ApiErrorMessage error={error} />}

                    <button
                        className={styles.submit}
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? t('auth.loggingIn') : t('auth.login')}
                    </button>

                    <p className={styles.registerText}>
                        {t('auth.noAccount')}{' '}
                        <Link className={styles.registerLink} to="/register">
                            {t('auth.register')}
                        </Link>
                    </p>
                </form>
            </div>
        </main>
    );
};
