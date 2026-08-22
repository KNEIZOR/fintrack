import { API_URL } from './api';

interface ApiRequestOptions {
    method?: string;
    headers?: HeadersInit;
    body?: unknown;
}

export interface ApiErrorResponse {
    status?: string;
    message?: string;
    code?: string;
    errors?: Record<string, string[]>;
}

export class ApiError extends Error {
    readonly statusCode: number;
    readonly code?: string;
    readonly errors?: Record<string, string[]>;

    constructor(
        message: string,
        statusCode: number,
        code?: string,
        errors?: Record<string, string[]>,
    ) {
        super(message);

        this.name = 'ApiError';
        this.statusCode = statusCode;
        this.code = code;
        this.errors = errors;
    }
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

        let code: string | undefined;

        let errors: Record<string, string[]> | undefined;

        try {
            const data: ApiErrorResponse = await response.json();

            console.error('API error:', {
                endpoint,
                status: response.status,
                data,
            });

            code = data.code;

            errors = data.errors;

            if (data.errors) {
                const validationErrors = Object.entries(data.errors)
                    .flatMap(([field, messages]) =>
                        messages.map(
                            (errorMessage) => `${field}: ${errorMessage}`,
                        ),
                    )
                    .join(', ');

                message = validationErrors || data.message || message;
            } else {
                message = data.message || message;
            }
        } catch {
            // Response does not contain JSON
        }

        throw new ApiError(message, response.status, code, errors);
    }

    return response.json();
};
