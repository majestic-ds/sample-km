import {z} from 'zod';

const userSchema = z.object({
  id: z.number(),
  incharge_id: z.number().nullable(),
  first_name: z.string(),
  department_id: z.number(),
  middle_name: z.string(),
  last_name: z.string(),
  privilege: z.enum(['level 1', 'level 2', 'level 3', 'level 4']),
  designation: z.string(),
  username: z.string(),
  email: z.string().email(),
  password: z.string().optional(),
  account_status: z.enum(['active', 'banned', 'blocked', 'dormant']),
  user_role: z.enum([
    'head_of_the_department',
    'secretary',
    'manager',
    'investigator',
  ]),
});

export default userSchema;
