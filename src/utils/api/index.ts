import {ENV} from '../../enums';

// @ts-ignore
import {API as route} from '@env';

export const API_URI = 'https://258a-122-165-127-146.ngrok-free.app';

export const API = (query?: string): string => `${API_URI}${query ?? ''}`;
