import type { PrismaClient } from "@prisma/client";
export declare function seedUser(prisma: PrismaClient): Promise<{
    id: string;
    email: string;
    name: string;
    emailVerified: boolean;
    image: string | null;
    bio: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
//# sourceMappingURL=user.d.ts.map