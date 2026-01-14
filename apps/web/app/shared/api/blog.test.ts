import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { beforeEach, describe, expect, test, vi } from "vitest";
import * as graphcmsModule from "~/shared/api/graphcms";
import type { LoaderData } from "./blog";
import { loader } from "./blog";

vi.mock("~/shared/api/queries/getPosts", () => ({
	getPosts: "query { posts { id } }",
}));

describe("blog api", () => {
	const mockFetchFromGraphCMS = vi.spyOn(graphcmsModule, "fetchFromGraphCMS");

	beforeEach(() => {
		vi.clearAllMocks();
	});

	test("should return posts and tags", async () => {
		const mockResponse = {
			json: vi.fn().mockResolvedValue({
				data: {
					posts: [
						{
							id: "1",
							title: "Test Post",
							slug: "test-post",
							date: "2023-01-01",
							content: { html: "<p>Test</p>" },
							tags: ["Technical"],
							sticky: false,
							imageTemp: "",
						},
					],
					__type: {
						enumValues: [{ name: "Technical" }, { name: "DIY" }],
					},
				},
			}),
		};

		mockFetchFromGraphCMS.mockResolvedValue(
			mockResponse as unknown as Response,
		);

		const args = {} as LoaderFunctionArgs;
		const result = await loader(args);

		expect(result).toBeDefined();
		const jsonResult = await (result as Response).json();
		expect((jsonResult as LoaderData).posts).toBeInstanceOf(Array);
		expect((jsonResult as LoaderData).tags).toBeInstanceOf(Array);
	});

	test("should throw 404 if no posts found", async () => {
		const mockResponse = {
			json: vi.fn().mockResolvedValue({
				data: {
					posts: [],
					__type: {
						enumValues: [],
					},
				},
			}),
		};

		mockFetchFromGraphCMS.mockResolvedValue(
			mockResponse as unknown as Response,
		);

		const args = {} as LoaderFunctionArgs;

		await expect(loader(args)).rejects.toThrow();
	});

	test("should handle null posts data", async () => {
		const mockResponse = {
			json: vi.fn().mockResolvedValue({
				data: {
					posts: null,
					__type: {
						enumValues: [],
					},
				},
			}),
		};

		mockFetchFromGraphCMS.mockResolvedValue(
			mockResponse as unknown as Response,
		);

		const args = {} as LoaderFunctionArgs;

		await expect(loader(args)).rejects.toThrow();
	});

	test("should handle null enumValues data", async () => {
		const mockResponse = {
			json: vi.fn().mockResolvedValue({
				data: {
					posts: [
						{
							id: "1",
							title: "Test Post",
							slug: "test-post",
							date: "2023-01-01",
							content: { html: "<p>Test</p>" },
							tags: ["Technical"],
							sticky: false,
							imageTemp: "",
						},
					],
					__type: {
						enumValues: null,
					},
				},
			}),
		};

		mockFetchFromGraphCMS.mockResolvedValue(
			mockResponse as unknown as Response,
		);

		const args = {} as LoaderFunctionArgs;
		const result = await loader(args);
		const jsonResult = await (result as Response).json();

		expect((jsonResult as LoaderData).tags).toEqual([]);
	});

	test("should sort tags alphabetically", async () => {
		const mockResponse = {
			json: vi.fn().mockResolvedValue({
				data: {
					posts: [
						{
							id: "1",
							title: "Test Post",
							slug: "test-post",
							date: "2023-01-01",
							content: { html: "<p>Test</p>" },
							tags: ["Technical"],
							sticky: false,
							imageTemp: "",
						},
					],
					__type: {
						enumValues: [
							{ name: "DIY" },
							{ name: "Technical" },
							{ name: "Blog" },
						],
					},
				},
			}),
		};

		mockFetchFromGraphCMS.mockResolvedValue(
			mockResponse as unknown as Response,
		);

		const args = {} as LoaderFunctionArgs;
		const result = await loader(args);
		const jsonResult = await (result as Response).json();

		expect((jsonResult as LoaderData).tags).toEqual([
			"Blog",
			"DIY",
			"Technical",
		]);
	});

	test("should handle fetchFromGraphCMS error", async () => {
		mockFetchFromGraphCMS.mockRejectedValue(new Error("Network error"));

		const args = {} as LoaderFunctionArgs;

		await expect(loader(args)).rejects.toThrow("Network error");
	});

	test("should handle json parsing error", async () => {
		const mockResponse = {
			json: vi.fn().mockRejectedValue(new Error("Invalid JSON")),
		};

		mockFetchFromGraphCMS.mockResolvedValue(
			mockResponse as unknown as Response,
		);

		const args = {} as LoaderFunctionArgs;

		await expect(loader(args)).rejects.toThrow("Invalid JSON");
	});
});
