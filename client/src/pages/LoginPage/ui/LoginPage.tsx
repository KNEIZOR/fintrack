import { type FormEvent, useState } from 'react';


export const LoginPage = () => {
    const [email, setEmail] = useState('denis@fintrack.com');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        try {
            setIsLoading(true);
            setError(null);

            const response = await fetch(
                'http://localhost:4000/api/auth/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                },
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to login');
            }

        } catch (error) {
            console.error(error);

            setError(
                error instanceof Error ? error.message : 'Failed to login',
            );
        } finally {
            setIsLoading(false);
        }
    };




    return (
        <main>
            <h1>FinTrack</h1>

            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>

                    <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>

                <div>
                    <label>Password</label>

                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>

                {error && <p>{error}</p>}

                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </main>
    );
};
