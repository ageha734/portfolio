import { z } from "zod";
export declare const urlSchema: z.ZodString;
export declare const assetSchema: z.ZodObject<{
    url: z.ZodString;
}, z.core.$strip>;
export declare const tagSchema: z.ZodObject<{
    name: z.ZodString;
}, z.core.$strip>;
export declare const enumValueSchema: z.ZodObject<{
    name: z.ZodString;
}, z.core.$strip>;
export declare const typeInfoSchema: z.ZodObject<{
    enumValues: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export type Asset = z.infer<typeof assetSchema>;
export type Tag = z.infer<typeof tagSchema>;
export type EnumValue = z.infer<typeof enumValueSchema>;
export type TypeInfo = z.infer<typeof typeInfoSchema>;
//# sourceMappingURL=shared.d.ts.map