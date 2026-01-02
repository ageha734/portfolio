export const BASE_URL = process.env.BASE_URL ?? "__undefined__";
export const GOOGLE_ANALYTICS = process.env.GOOGLE_ANALYTICS ?? "__undefined__";
export const GOOGLE_TAG_MANAGER = process.env.GOOGLE_TAG_MANAGER ?? "__undefined__";
export const GOOGLE_ANALYTICS_ENABLED = process.env.GOOGLE_ANALYTICS_ENABLED === "true";
export const GOOGLE_TAG_MANAGER_ENABLED = process.env.GOOGLE_TAG_MANAGER_ENABLED === "true";

export const GRAPHCMS_ADMIN = process.env.GRAPHCMS_ADMIN ?? "__undefined__";
export const GRAPHCMS_TOKEN = process.env.GRAPHCMS_TOKEN ?? "__undefined__";
export const GRAPHCMS_URL = process.env.GRAPHCMS_URL ?? "__undefined__";

export const XSTATE_INSPECTOR_ENABLED = process.env.XSTATE_INSPECTOR_ENABLED === "true";

export const SENTRY_DSN = process.env.SENTRY_DSN ?? "__undefined__";
export const SENTRY_ENVIRONMENT = process.env.SENTRY_ENVIRONMENT ?? "development";
export const SENTRY_TRACES_SAMPLE_RATE = process.env.SENTRY_TRACES_SAMPLE_RATE
    ? Number.parseFloat(process.env.SENTRY_TRACES_SAMPLE_RATE)
    : 1;
export const SENTRY_REPLAY_SAMPLE_RATE = process.env.SENTRY_REPLAY_SAMPLE_RATE
    ? Number.parseFloat(process.env.SENTRY_REPLAY_SAMPLE_RATE)
    : 0.1;
export const SENTRY_REPLAY_ON_ERROR_SAMPLE_RATE = process.env.SENTRY_REPLAY_ON_ERROR_SAMPLE_RATE
    ? Number.parseFloat(process.env.SENTRY_REPLAY_ON_ERROR_SAMPLE_RATE)
    : 1;
