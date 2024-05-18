export const API_URI = 'https://7d26-122-165-127-146.ngrok-free.app';

export const API = (query?: string): string => `${API_URI}${query ?? ''}`;
