import {WorkSchema} from '../../validators/work';
import {z} from 'zod';

export type WorkType = z.infer<typeof WorkSchema>;
