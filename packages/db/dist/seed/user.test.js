import { describe, expect, test, vi } from "vitest";
import { seedUser } from "./user";
describe("seedUser", () => {
    test("should create user, experience, and social links", async () => {
        const mockPrisma = {
            user: {
                upsert: vi.fn().mockResolvedValue({
                    id: "user-1",
                    name: "Admin User",
                    email: "admin@example.com",
                }),
            },
            userExperience: {
                upsert: vi.fn().mockResolvedValue({
                    id: "exp-1",
                    userId: "user-1",
                    company: "Example Company",
                }),
            },
            userSocial: {
                upsert: vi.fn().mockResolvedValue({
                    id: "social-1",
                    userId: "user-1",
                    icon: "github",
                }),
            },
        };
        const result = await seedUser(mockPrisma);
        expect(mockPrisma.user.upsert).toHaveBeenCalledTimes(1);
        expect(mockPrisma.userExperience.upsert).toHaveBeenCalledTimes(1);
        expect(mockPrisma.userSocial.upsert).toHaveBeenCalledTimes(2);
        expect(result).toBeDefined();
    });
});
