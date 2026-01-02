import { expect, test, describe, vi, beforeEach } from "vitest";
import { fetchFromGraphCMS, gql } from "./graphcms";

vi.mock("~/shared/config/settings", () => ({
    GRAPHCMS_URL: "https://api.graphcms.com",
    GRAPHCMS_TOKEN: "test-token",
}));

describe("graphcms", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        globalThis.fetch = vi.fn();
    });

    describe("fetchFromGraphCMS", () => {
        test("should call fetch with correct URL and headers", async () => {
            const query = "query { posts { id } }";
            const mockResponse = { json: vi.fn().mockResolvedValue({ data: {} }) };
            (globalThis.fetch as any).mockResolvedValue(mockResponse);

            await fetchFromGraphCMS(query);

            expect(globalThis.fetch).toHaveBeenCalledWith(
                "https://api.graphcms.com",
                expect.objectContaining({
                    method: "POST",
                    headers: {
                        Authorization: "Bearer test-token",
                        "Content-Type": "application/json",
                    },
                }),
            );
        });

        test("should include query in request body", async () => {
            const query = "query { posts { id } }";
            const mockResponse = { json: vi.fn().mockResolvedValue({ data: {} }) };
            (globalThis.fetch as any).mockResolvedValue(mockResponse);

            await fetchFromGraphCMS(query);

            const callArgs = (globalThis.fetch as any).mock.calls[0];
            const body = JSON.parse(callArgs[1].body);

            expect(body.query).toBe(query);
            expect(body.variables).toBeUndefined();
        });

        test("should include variables in request body when provided", async () => {
            const query = "query { post(id: $id) { id } }";
            const variables = { id: "123" };
            const mockResponse = { json: vi.fn().mockResolvedValue({ data: {} }) };
            (globalThis.fetch as any).mockResolvedValue(mockResponse);

            await fetchFromGraphCMS(query, variables);

            const callArgs = (globalThis.fetch as any).mock.calls[0];
            const body = JSON.parse(callArgs[1].body);

            expect(body.query).toBe(query);
            expect(body.variables).toEqual(variables);
        });

        test("should return fetch response", async () => {
            const query = "query { posts { id } }";
            const mockResponse = { json: vi.fn().mockResolvedValue({ data: {} }) };
            (globalThis.fetch as any).mockResolvedValue(mockResponse);

            const result = await fetchFromGraphCMS(query);

            expect(result).toBe(mockResponse);
        });
    });

    describe("gql", () => {
        test("should return string as-is", () => {
            const query = "query { posts { id } }";
            const result = gql`query { posts { id } }`;

            expect(result).toBe(query);
        });

        test("should work as template literal tag", () => {
            const result = gql`
                query {
                    posts {
                        id
                        title
                    }
                }
            `;

            expect(result).toBeTruthy();
            expect(typeof result).toBe("string");
            expect(result).toContain("query");
            expect(result).toContain("posts");
        });
    });
});
