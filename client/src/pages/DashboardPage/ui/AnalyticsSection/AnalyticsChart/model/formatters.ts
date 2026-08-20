export const formatCurrency = (
    value: number,
    currency: string,
    locale = 'en-US',
) => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        maximumFractionDigits: 2,
    }).format(value);
};

export const formatMonth = (value: string, language = 'en') => {
    const [year, month] = value.split('-').map(Number);

    if (!year || !month) {
        return value;
    }

    const date = new Date(year, month - 1, 1);

    return new Intl.DateTimeFormat(language, {
        month: 'long',
        year: 'numeric',
    }).format(date);
};
