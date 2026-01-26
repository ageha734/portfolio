/**
 * HTMLコンテンツをサニタイズする
 * サーバーサイド（Cloudflare Workers）ではそのまま返し、クライアントサイドでのみサニタイズする
 * @param html - サニタイズするHTML文字列
 * @returns サニタイズされたHTML文字列
 */
export declare const sanitizeHtml: (html: string) => string;
//# sourceMappingURL=sanitize.d.ts.map