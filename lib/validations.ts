import { z } from "zod";

export const applicationSchema = z.object({
  companyName: z
    .string()
    .trim()
    .min(1, "Company name is required")
    .max(100, "Company name is too long"),
  role: z
    .string()
    .trim()
    .min(1, "Role is required")
    .max(100, "Role is too long"),
  status: z.enum(["APPLIED", "INTERVIEWING", "OFFER", "REJECTED"], {
    message: "Invalid status",
  }),
  interviewDate: z.string().optional().nullable(),
  notes: z.string().trim().max(2000, "Notes are too long").optional().nullable(),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;