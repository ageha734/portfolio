process.env.BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
process.env.PORT = process.env.PORT ?? "3000";
process.env.ENVIRONMENT = process.env.ENVIRONMENT ?? "test";
process.env.NODE_ENV = process.env.NODE_ENV ?? "test";
process.env.GOOGLE_ANALYTICS = process.env.GOOGLE_ANALYTICS ?? "G-TEST123";
process.env.GOOGLE_TAG_MANAGER = process.env.GOOGLE_TAG_MANAGER ?? "GTM-TEST123";
process.env.GRAPHCMS_ADMIN =
    process.env.GRAPHCMS_ADMIN ?? "https://api.graphcms.com/graphql";
process.env.GRAPHCMS_TOKEN = process.env.GRAPHCMS_TOKEN ?? "test-token";
process.env.GRAPHCMS_URL =
    process.env.GRAPHCMS_URL ?? "https://api.graphcms.com/v2/test/master";
process.env.TZ = "UTC";
