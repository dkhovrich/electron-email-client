import { DateTime } from 'luxon';

export const formatDate = (date: Date, format: string): string => DateTime.fromJSDate(date).toFormat(format);
