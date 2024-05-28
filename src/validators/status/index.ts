import {z} from 'zod';

export const statusSchema = z.object({
  attachments: z.string(),
  work_id: z.string(),
  handler_id: z.string(),
  status_name: z.string(),
  status_description: z.string(),
  id: z.number().optional(),
});
