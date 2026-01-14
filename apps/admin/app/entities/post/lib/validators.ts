import type { PostFormData } from "../model/types";

export function validatePostFormData(data: PostFormData): boolean {
	return (
		data.title.length > 0 &&
		data.slug.length > 0 &&
		data.date.length > 0 &&
		data.content.html.length > 0 &&
		data.imageTemp.length > 0
	);
}
