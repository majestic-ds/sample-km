import {z} from 'zod';
import {UserSchema} from '../../validators/user';

export type UserType = z.infer<typeof UserSchema>;
