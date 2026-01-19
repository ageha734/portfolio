import { z } from "zod";
export declare const errorLocationSchema: z.ZodObject<{
    line: z.ZodNumber;
    column: z.ZodNumber;
}, z.core.$strip>;
export declare const graphQLErrorSchema: z.ZodObject<{
    message: z.ZodString;
    locations: z.ZodOptional<z.ZodArray<z.ZodObject<{
        line: z.ZodNumber;
        column: z.ZodNumber;
    }, z.core.$strip>>>;
    path: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
export declare const graphQLRequestSchema: z.ZodObject<{
    query: z.ZodString;
    variables: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, z.core.$strip>;
export declare const graphQLResponseSchema: z.ZodObject<{
    data: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    errors: z.ZodOptional<z.ZodArray<z.ZodObject<{
        message: z.ZodString;
        locations: z.ZodOptional<z.ZodArray<z.ZodObject<{
            line: z.ZodNumber;
            column: z.ZodNumber;
        }, z.core.$strip>>>;
        path: z.ZodOptional<z.ZodArray<z.ZodString>>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export declare const errorResponseSchema: z.ZodObject<{
    message: z.ZodString;
    errors: z.ZodOptional<z.ZodArray<z.ZodObject<{
        message: z.ZodString;
        locations: z.ZodOptional<z.ZodArray<z.ZodObject<{
            line: z.ZodNumber;
            column: z.ZodNumber;
        }, z.core.$strip>>>;
        path: z.ZodOptional<z.ZodArray<z.ZodString>>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export type GraphQLRequest = z.infer<typeof graphQLRequestSchema>;
export type GraphQLResponse = z.infer<typeof graphQLResponseSchema>;
export type GraphQLError = z.infer<typeof graphQLErrorSchema>;
export type ErrorLocation = z.infer<typeof errorLocationSchema>;
export type ErrorResponse = z.infer<typeof errorResponseSchema>;
//# sourceMappingURL=graphql.d.ts.map