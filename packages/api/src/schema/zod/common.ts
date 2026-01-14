import { z } from "zod";

export const urlSchema = z.string().url();

export const assetSchema = z.object({
	url: urlSchema,
});

export const tagSchema = z.object({
	name: z.string().min(1),
});

export const enumValueSchema = z.object({
	name: z.string().min(1),
});

export const typeInfoSchema = z.object({
	enumValues: z.array(enumValueSchema).optional(),
});

export type Asset = z.infer<typeof assetSchema>;
export type Tag = z.infer<typeof tagSchema>;
export type EnumValue = z.infer<typeof enumValueSchema>;
export type TypeInfo = z.infer<typeof typeInfoSchema>;
