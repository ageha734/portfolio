import { z } from "zod";
export declare const portfolioContentSchema: z.ZodObject<{
    html: z.ZodString;
}, z.core.$strip>;
export declare const portfolioSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    title: z.ZodString;
    slug: z.ZodString;
    company: z.ZodString;
    date: z.ZodString;
    current: z.ZodBoolean;
    overview: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodObject<{
        html: z.ZodString;
    }, z.core.$strip>>;
    thumbnailTemp: z.ZodOptional<z.ZodString>;
    images: z.ZodOptional<z.ZodArray<z.ZodObject<{
        url: z.ZodString;
    }, z.core.$strip>>>;
    intro: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type Portfolio = z.infer<typeof portfolioSchema>;
export type PortfolioContent = z.infer<typeof portfolioContentSchema>;
//# sourceMappingURL=portfolio.d.ts.map