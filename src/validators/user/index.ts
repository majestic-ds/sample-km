import { z } from "zod";

export const AccountStatusEnumSchema = z.enum([
  "inactive",
  "active",
  "dormant",
  "suspended",
]);

// Define Zod schema for users table
export const UserSchema = z.object({
  id: z.number().optional(),
  department_id: z.string(),
  first_name: z.string().max(255),
  middle_name: z.string().max(255),
  last_name: z.string().max(255),
  privilege: z.string().max(255),
  designation: z.string().max(255),
  username: z.string().max(255),
  email: z.string().max(255),
  password: z.string().max(255),
  account_status: AccountStatusEnumSchema.optional(),
});
