import { z } from "zod";
export declare const postContentSchema: z.ZodObject<{
    html: z.ZodString;
    raw: z.ZodOptional<z.ZodUnknown>;
}, z.core.$strip>;
export declare const postSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    slug: z.ZodString;
    date: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    content: z.ZodObject<{
        html: z.ZodString;
        raw: z.ZodOptional<z.ZodUnknown>;
    }, z.core.$strip>;
    imageTemp: z.ZodString;
    tags: z.ZodArray<z.ZodString>;
    sticky: z.ZodBoolean;
    intro: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodOptional<z.ZodString>;
    updatedAt: z.ZodOptional<z.ZodString>;
    images: z.ZodOptional<z.ZodArray<z.ZodObject<{
        url: z.ZodString;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export declare const blogDataSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        slug: z.ZodString;
        date: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        content: z.ZodObject<{
            html: z.ZodString;
            raw: z.ZodOptional<z.ZodUnknown>;
        }, z.core.$strip>;
        imageTemp: z.ZodString;
        tags: z.ZodArray<z.ZodString>;
        sticky: z.ZodBoolean;
        intro: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodOptional<z.ZodString>;
        updatedAt: z.ZodOptional<z.ZodString>;
        images: z.ZodOptional<z.ZodArray<z.ZodObject<{
            url: z.ZodString;
        }, z.core.$strip>>>;
    }, z.core.$strip>>;
    featured: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        slug: z.ZodString;
        date: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        content: z.ZodObject<{
            html: z.ZodString;
            raw: z.ZodOptional<z.ZodUnknown>;
        }, z.core.$strip>;
        imageTemp: z.ZodString;
        tags: z.ZodArray<z.ZodString>;
        sticky: z.ZodBoolean;
        intro: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodOptional<z.ZodString>;
        updatedAt: z.ZodOptional<z.ZodString>;
        images: z.ZodOptional<z.ZodArray<z.ZodObject<{
            url: z.ZodString;
        }, z.core.$strip>>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type Post = z.infer<typeof postSchema>;
export type PostContent = z.infer<typeof postContentSchema>;
export type BlogData = z.infer<typeof blogDataSchema>;
//# sourceMappingURL=post.d.ts.map