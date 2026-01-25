function getEnvironmentFromBaseUrl(baseUrl: string): string {
    if (baseUrl.includes("ageha734.jp") && !baseUrl.includes("dev.")) {
        return "production";
    }
    if (baseUrl.includes("dev.ageha734.jp")) {
        return "development";
    }
    if (baseUrl.includes("localhost")) {
        return "test";
    }
    return "development";
}

function getPortFromBaseUrl(baseUrl: string): string {
    try {
        const url = new URL(baseUrl);
        return url.port || "3000";
    } catch {
        return "3000";
    }
}

const baseUrl = process.env.VITE_BASE_URL ?? process.env.BASE_URL ?? "http://localhost:3000";
process.env.BASE_URL = baseUrl;
process.env.PORT = getPortFromBaseUrl(baseUrl);
process.env.ENVIRONMENT = getEnvironmentFromBaseUrl(baseUrl);
process.env.NODE_ENV = process.env.NODE_ENV ?? "test";
process.env.GOOGLE_ANALYTICS = process.env.GOOGLE_ANALYTICS ?? "G-TEST123";
process.env.GOOGLE_TAG_MANAGER = process.env.GOOGLE_TAG_MANAGER ?? "GTM-TEST123";
process.env.TZ = "UTC";
