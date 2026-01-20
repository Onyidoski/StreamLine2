import { z } from 'zod'

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

export const signupSchema = z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    terms: z.boolean().refine((val) => val === true, "You must agree to terms and conditions"),
})

export const leadSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  status: z.enum(["New", "Contacted", "Qualified", "Proposal", "Closed"]).default("New"),
  value: z.coerce.number().min(0, "Value must be positive").default(0),
})