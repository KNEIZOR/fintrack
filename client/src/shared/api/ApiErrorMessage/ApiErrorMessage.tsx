import { getApiErrorMessage } from '@/shared/api/apiError';

interface ApiErrorMessageProps {
    error: unknown;
}

export const ApiErrorMessage = ({ error }: ApiErrorMessageProps) => {
    return <>{getApiErrorMessage(error)}</>;
};
