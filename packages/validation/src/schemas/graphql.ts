import { z } from "zod";

export const errorLocationSchema = z.object({
    line: z.number().int(),
    column: z.number().int(),
});

export const graphQLErrorSchema = z.object({
    message: z.string(),
    locations: z.array(errorLocationSchema).optional(),
    path: z.array(z.string()).optional(),
});

export const graphQLRequestSchema = z.object({
    query: z.string(),
    variables: z.record(z.string(), z.unknown()).optional(),
});

export const graphQLResponseSchema = z.object({
    data: z.record(z.string(), z.unknown()).optional(),
    errors: z.array(graphQLErrorSchema).optional(),
});

export const errorResponseSchema = z.object({
    message: z.string(),
    errors: z.array(graphQLErrorSchema).optional(),
});

export type GraphQLRequest = z.infer<typeof graphQLRequestSchema>;
export type GraphQLResponse = z.infer<typeof graphQLResponseSchema>;
export type GraphQLError = z.infer<typeof graphQLErrorSchema>;
export type ErrorLocation = z.infer<typeof errorLocationSchema>;
export type ErrorResponse = z.infer<typeof errorResponseSchema>;
