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
export declare function validate<T extends z.ZodType>(schema: T, data: unknown): ValidationResult<z.infer<T>>;
/**
 * データをZodスキーマでバリデーションし、成功時はデータを返し、失敗時はエラーを投げる
 *
 * @param schema Zodスキーマ
 * @param data バリデーション対象のデータ
 * @returns バリデーション済みのデータ
 * @throws ZodError バリデーション失敗時
 */
export declare function validateOrThrow<T extends z.ZodType>(schema: T, data: unknown): z.infer<T>;
//# sourceMappingURL=validation.d.ts.map