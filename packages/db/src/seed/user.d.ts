import type { PrismaClient, User } from "@prisma/client";

export declare function seedUser(prisma: PrismaClient): Promise<User>;
