// src/index.ts
import { createPrismaClient } from "@portfolio/db";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { oAuthProxy } from "better-auth/plugins";
function initAuth(options) {
  const prisma = createPrismaClient({
    databaseUrl: options.databaseUrl
  });
  const config = {
    database: prismaAdapter(prisma, {
      provider: "mysql"
    }),
    baseURL: options.baseUrl,
    secret: options.secret,
    plugins: [
      oAuthProxy({
        productionURL: options.productionUrl
      }),
      ...options.extraPlugins ?? []
    ],
    socialProviders: {
      google: {
        clientId: options.googleClientId,
        clientSecret: options.googleClientSecret,
        redirectURI: `${options.productionUrl}/api/auth/callback/google`
      }
    },
    onAPIError: {
      onError(error, ctx) {
        console.error("BETTER AUTH API ERROR", error, ctx);
      }
    }
  };
  return betterAuth(config);
}
export {
  initAuth
};
