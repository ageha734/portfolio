import type { z } from "zod";

/**
 * Zodスキーマのバリデーション結果
 */
export interface ValidationResult<T> {
    success: boolean;
    data?: T;
    errors?: z.ZodError;
}

/**
 * データをZodスキーマでバリデーションする
 *
 * @param schema Zodスキーマ
 * @param data バリデーション対象のデータ
 * @returns バリデーション結果
 */
export function validate<T extends z.ZodType>(schema: T, data: unknown): ValidationResult<z.infer<T>> {
    const result = schema.safeParse(data);

    if (result.success) {
        return {
            success: true,
            data: result.data,
        };
    }

    return {
        success: false,
        errors: result.error,
    };
}

/**
 * データをZodスキーマでバリデーションし、成功時はデータを返し、失敗時はエラーを投げる
 *
 * @param schema Zodスキーマ
 * @param data バリデーション対象のデータ
 * @returns バリデーション済みのデータ
 * @throws ZodError バリデーション失敗時
 */
export function validateOrThrow<T extends z.ZodType>(schema: T, data: unknown): z.infer<T> {
    return schema.parse(data);
}
