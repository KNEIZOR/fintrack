import React from 'react';
import ReactDOM from 'react-dom/client';

import App from '@/app/App';
import '@/app/styles/index.css';
import '@/shared/i18n';

import { AuthProvider } from '@/shared/auth';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>,
);
