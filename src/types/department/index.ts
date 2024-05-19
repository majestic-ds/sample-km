import {DepartmentSchema} from '../../validators/department';
import {z} from 'zod';

export type DepartmentType = z.infer<typeof DepartmentSchema>;
