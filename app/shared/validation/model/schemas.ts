import { z } from "zod";

export const slugSchema = z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/);

export const urlSchema = z.string().refine(
    (val) => {
        try {
            new URL(val);
            return true;
        } catch {
            return false;
        }
    },
    { message: "Invalid URL" },
);

export const emailSchema = z.string().refine(
    (val) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(val);
    },
    { message: "Invalid email" },
);
