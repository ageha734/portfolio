// src/index.ts
export * from "@prisma/client";

// src/client/mysql.ts
import { PrismaClient } from "@prisma/client";
var prismaInstance = null;
function createPrismaClient(options = {}) {
  const { databaseUrl } = options;
  if (prismaInstance) {
    return prismaInstance;
  }
  prismaInstance = new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl || process.env.DATABASE_URL
      }
    }
  });
  return prismaInstance;
}
export {
  createPrismaClient
};
