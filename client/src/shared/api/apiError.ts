import i18n from '@/shared/i18n';

import { ApiError } from './apiClient';

const ERROR_CODE_TO_TRANSLATION_KEY: Record<string, string> = {
    AUTHENTICATION_REQUIRED: 'errors.authenticationRequired',
    VALIDATION_FAILED: 'errors.validationFailed',

    ACCOUNT_NOT_FOUND: 'errors.accountNotFound',
    ACCOUNT_HAS_TRANSACTIONS: 'errors.accountHasTransactions',
    FAILED_TO_CREATE_ACCOUNT: 'errors.failedToCreateAccount',
    FAILED_TO_GET_ACCOUNTS: 'errors.failedToGetAccounts',
    FAILED_TO_UPDATE_ACCOUNT: 'errors.failedToUpdateAccount',
    FAILED_TO_DELETE_ACCOUNT: 'errors.failedToDeleteAccount',

    CATEGORY_NOT_FOUND: 'errors.categoryNotFound',
    CATEGORY_NAME_ALREADY_EXISTS: 'errors.categoryNameAlreadyExists',
    CATEGORY_HAS_TRANSACTIONS: 'errors.categoryHasTransactions',
    INVALID_CATEGORY_ID: 'errors.invalidCategoryId',
    FAILED_TO_CREATE_CATEGORY: 'errors.failedToCreateCategory',
    FAILED_TO_GET_CATEGORIES: 'errors.failedToGetCategories',
    FAILED_TO_UPDATE_CATEGORY: 'errors.failedToUpdateCategory',
    FAILED_TO_DELETE_CATEGORY: 'errors.failedToDeleteCategory',

    TRANSACTION_NOT_FOUND: 'errors.transactionNotFound',
    CATEGORY_TYPE_MISMATCH: 'errors.categoryTypeMismatch',
    FAILED_TO_CREATE_TRANSACTION: 'errors.failedToCreateTransaction',
    FAILED_TO_GET_TRANSACTIONS: 'errors.failedToGetTransactions',
    FAILED_TO_UPDATE_TRANSACTION: 'errors.failedToUpdateTransaction',
    FAILED_TO_DELETE_TRANSACTION: 'errors.failedToDeleteTransaction',
};

export const getApiErrorMessage = (error: unknown): string => {
    if (!(error instanceof ApiError)) {
        if (error instanceof Error) {
            return error.message;
        }

        return i18n.t('errors.unknown');
    }

    if (error.code) {
        const translationKey = ERROR_CODE_TO_TRANSLATION_KEY[error.code];

        if (translationKey) {
            return i18n.t(translationKey);
        }
    }

    switch (error.statusCode) {
        case 401:
            return i18n.t('errors.unauthorized');

        case 403:
            return i18n.t('errors.forbidden');

        case 404:
            return i18n.t('errors.notFound');

        case 400:
            return i18n.t('errors.validation');

        case 500:
        case 502:
        case 503:
            return i18n.t('errors.server');

        default:
            return i18n.t('errors.default');
    }
};
