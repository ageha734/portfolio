import type { PrismaClient } from "@prisma/client";
export declare function seedUser(prisma: PrismaClient): Promise<{
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string | null;
    bio: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
//# sourceMappingURL=user.d.ts.map