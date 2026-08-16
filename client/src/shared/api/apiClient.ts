import { API_URL } from './api';

interface ApiRequestOptions {
    method?: string;
    headers?: HeadersInit;
    body?: unknown;
}

export const apiClient = async <T>(
    endpoint: string,
    options: ApiRequestOptions = {},
): Promise<T> => {
    const { body, headers, method = 'GET' } = options;

    const response = await fetch(`${API_URL}${endpoint}`, {
        method,
        credentials: 'include',

        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },

        body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
        let message = 'Something went wrong';

        try {
            const data = await response.json();

            message = data.message || message;
        } catch {
            // Response does not contain JSON
        }

        throw new Error(message);
    }

    return response.json();
};
