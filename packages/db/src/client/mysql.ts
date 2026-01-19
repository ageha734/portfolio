import { PrismaClient } from "@prisma/client";

export interface CreatePrismaClientOptions {
	databaseUrl?: string;
}

let prismaInstance: PrismaClient | null = null;

export function createPrismaClient(
	options: CreatePrismaClientOptions = {},
): PrismaClient {
	const { databaseUrl } = options;

	if (prismaInstance) {
		return prismaInstance;
	}

	prismaInstance = new PrismaClient({
		datasources: {
			db: {
				url: databaseUrl || process.env.DATABASE_URL,
			},
		},
	});

	return prismaInstance;
}

export type PrismaClientType = ReturnType<typeof createPrismaClient>;
