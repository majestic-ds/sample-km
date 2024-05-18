import { z } from "zod";

// Define Zod schema for users table
export const DepartmentSchema = z.object({
  id: z.number().optional(),
  description: z.string(),
  name: z.string().max(255),
});
