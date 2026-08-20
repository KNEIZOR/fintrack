import type { MonthlyAnalytics } from '@/api/analytics.api';

import { useTranslation } from 'react-i18next';

import { formatCurrency, formatMonth } from '../model/formatters';

import styles from '../AnalyticsChart.module.scss';

interface Props {
    month: MonthlyAnalytics;

    x: number;

    y: number;

    width: number;

    height: number;

    currency: string;
}

const TOOLTIP_WIDTH = 170;

const TOOLTIP_HEIGHT = 120;

export const ChartTooltip = ({
    month,
    x,
    y,
    width,
    height,
    currency,
}: Props) => {
    const { t, i18n } = useTranslation();

    const safeX = Number.isFinite(x) ? x : 0;

    const safeY = Number.isFinite(y) ? y : 0;

    const safeWidth = Number.isFinite(width) && width > 0 ? width : 800;

    const safeHeight = Number.isFinite(height) && height > 0 ? height : 320;

    let tooltipX = safeX - TOOLTIP_WIDTH / 2;

    let tooltipY = safeY - TOOLTIP_HEIGHT - 20;

    // Если сверху недостаточно места,
    // показываем tooltip под точкой.
    if (tooltipY < 10) {
        tooltipY = safeY + 20;
    }

    // Если tooltip выходит за правую границу.
    if (tooltipX + TOOLTIP_WIDTH > safeWidth - 10) {
        tooltipX = safeWidth - TOOLTIP_WIDTH - 10;
    }

    // Если tooltip выходит за левую границу.
    if (tooltipX < 10) {
        tooltipX = 10;
    }

    // Финальная защита от NaN / Infinity.
    tooltipX = Number.isFinite(tooltipX) ? tooltipX : 10;

    tooltipY = Number.isFinite(tooltipY) ? tooltipY : 10;

    return (
        <>
            <line
                x1={safeX}
                y1={20}
                x2={safeX}
                y2={safeHeight - 45}
                className={styles.tooltipLine}
            />

            <foreignObject
                x={tooltipX}
                y={tooltipY}
                width={TOOLTIP_WIDTH}
                height={TOOLTIP_HEIGHT}
            >
                <div className={styles.tooltipCard}>
                    <strong>{formatMonth(month.month, i18n.language)}</strong>

                    <div>
                        <span>{t('analytics.income')}</span>

                        <strong>
                            {formatCurrency(month.income, currency)}
                        </strong>
                    </div>

                    <div>
                        <span>{t('analytics.expenses')}</span>

                        <strong>
                            {formatCurrency(month.expenses, currency)}
                        </strong>
                    </div>

                    <div>
                        <span>{t('analytics.net')}</span>

                        <strong>{formatCurrency(month.net, currency)}</strong>
                    </div>
                </div>
            </foreignObject>
        </>
    );
};
