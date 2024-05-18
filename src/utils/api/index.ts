export const API_URI = 'https://noeljose.in';

export const API = (query?: string): string => `${API_URI}${query ?? ''}`;
