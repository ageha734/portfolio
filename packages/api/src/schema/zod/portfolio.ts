import { z } from "zod";
import { assetSchema } from "./common";

export const portfolioContentSchema = z.object({
    html: z.string(),
});

export const portfolioSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(1),
    slug: z.string().min(1),
    company: z.string().min(1),
    date: z.string().min(1),
    current: z.boolean(),
    overview: z.string().optional(),
    description: z.string().optional(),
    content: portfolioContentSchema.optional(),
    thumbnailTemp: z.string().optional(),
    images: z.array(assetSchema).optional(),
    intro: z.string().optional(),
});

export type Portfolio = z.infer<typeof portfolioSchema>;
export type PortfolioContent = z.infer<typeof portfolioContentSchema>;
