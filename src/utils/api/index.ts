import {ENV} from '../../enums';

// @ts-ignore
import {API as route} from '@env';

export const API_URI = route;

export const API = (query?: string): string => `${API_URI}${query ?? ''}`;
