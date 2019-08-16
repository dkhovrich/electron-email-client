import { DateTime } from 'luxon';

export const formatDate = (date: Date): string => DateTime.fromJSDate(date).toFormat('LLL d t');
