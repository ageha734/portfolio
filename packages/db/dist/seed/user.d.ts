import type { PrismaClient } from "@prisma/client";
export declare function seedUser(prisma: PrismaClient): Promise<{
    email: string;
    id: string;
    image: string | null;
    name: string;
    emailVerified: boolean;
    bio: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
//# sourceMappingURL=user.d.ts.map