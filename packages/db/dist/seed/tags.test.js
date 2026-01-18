import { describe, expect, test, vi } from "vitest";
import { seedTags } from "./tags";
describe("seedTags", () => {
    test("should create tags", async () => {
        const mockPrisma = {
            tag: {
                upsert: vi.fn().mockResolvedValue({ id: "tag-1", name: "TypeScript" }),
            },
        };
        const result = await seedTags(mockPrisma);
        expect(mockPrisma.tag.upsert).toHaveBeenCalledTimes(2);
        expect(result.tagTypescript).toBeDefined();
        expect(result.tagReact).toBeDefined();
    });
});
