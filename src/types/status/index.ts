import {z} from 'zod';
import {statusSchema} from '../../validators/status';

export type StatusType = z.infer<typeof statusSchema>;
