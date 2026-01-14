import type { ZodError, ZodType } from "zod";

export type ValidationResult<T> =
	| { success: true; data: T }
	| { success: false; error: ZodError };

export function safeParse<T>(
	schema: ZodType<T>,
	data: unknown,
): ValidationResult<T> {
	const result = schema.safeParse(data);
	return result.success
		? { success: true, data: result.data }
		: { success: false, error: result.error };
}

export function formatValidationError(
	error: ZodError,
): Record<string, string[]> {
	const fieldErrors: Record<string, string[]> = {};
	for (const issue of error.issues) {
		const path = issue.path.join(".");
		if (!fieldErrors[path]) {
			fieldErrors[path] = [];
		}
		fieldErrors[path].push(issue.message);
	}
	return fieldErrors;
}
