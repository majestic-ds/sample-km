import {z} from 'zod';

export const WorkSchema = z.object({
  id: z.number().optional(),
  handler_dept: z.string().min(3).max(255),
  from_department: z.string(),
  work_creator: z.string(),
  handler_id: z.string().min(1, 'please login'),
  document_id: z.string(),
  date: z.string().date(),
  sensitivity: z.enum([
    'public',
    'internal use only',
    'confidential',
    'restricted',
    'top secret',
  ]),
  priority: z.enum([
    'low priority',
    'normal priority',
    'high priority',
    'urgent priority',
    'critical priority',
  ]),
  acknowledged: z.enum(['yes', 'no']),
  keywords: z.array(z.string()).min(1, 'add atleast one keyword'),
  description: z.string().min(1, 'please add a description'),
  key_words: z.array(z.string()),
  work_title: z.string().min(1, 'please add a title'),
  is_reassignment: z.string(),
});
