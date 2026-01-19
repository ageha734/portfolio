import { AppError } from "../errors/app-error";
import { sentryClient } from "../sentry/client";
import { compareLogLevel, LogLevel } from "./levels";
import { defaultFormatter } from "./formatter";
export class Logger {
    minLevel;
    formatter;
    sendToSentry;
    sentryMinLevel;
    defaultContext;
    constructor(config = {}) {
        this.minLevel = config.minLevel ?? LogLevel.INFO;
        this.formatter = config.formatter ?? defaultFormatter;
        this.sendToSentry = config.sendToSentry ?? false;
        this.sentryMinLevel = config.sentryMinLevel ?? LogLevel.ERROR;
        this.defaultContext = config.defaultContext;
    }
    log(level, message, options) {
        if (compareLogLevel(level, this.minLevel) < 0) {
            return;
        }
        const entry = {
            timestamp: new Date().toISOString(),
            level,
            message,
            context: this.defaultContext,
            error: options?.error,
            metadata: options?.metadata,
        };
        const formatted = this.formatter.format(entry);
        this.writeLog(level, formatted);
        if (this.sendToSentry && compareLogLevel(level, this.sentryMinLevel) >= 0) {
            if (options?.error) {
                sentryClient.captureError(options.error, {
                    level,
                    message,
                    ...options.metadata,
                });
            }
            else {
                const sentryLevel = this.getSentryLevel(level);
                sentryClient.captureMessage(message, sentryLevel, {
                    level,
                    ...options?.metadata,
                });
            }
        }
    }
    writeLog(level, formatted) {
        switch (level) {
            case LogLevel.DEBUG:
                console.debug(formatted);
                break;
            case LogLevel.INFO:
                console.info(formatted);
                break;
            case LogLevel.WARN:
                console.warn(formatted);
                break;
            case LogLevel.ERROR:
                console.error(formatted);
                break;
        }
    }
    getSentryLevel(level) {
        switch (level) {
            case LogLevel.DEBUG:
                return "debug";
            case LogLevel.INFO:
                return "info";
            case LogLevel.WARN:
                return "warning";
            case LogLevel.ERROR:
                return "error";
        }
    }
    debug(message, metadata) {
        this.log(LogLevel.DEBUG, message, { metadata });
    }
    info(message, metadata) {
        this.log(LogLevel.INFO, message, { metadata });
    }
    warn(message, metadata) {
        this.log(LogLevel.WARN, message, { metadata });
    }
    error(message, error, metadata) {
        this.log(LogLevel.ERROR, message, { error, metadata });
    }
    logError(error, metadata) {
        this.error(error.message, error, {
            ...error.metadata,
            code: error.code,
            category: error.category,
            httpStatus: error.httpStatus,
            ...metadata,
        });
    }
    child(context) {
        return new Logger({
            minLevel: this.minLevel,
            formatter: this.formatter,
            sendToSentry: this.sendToSentry,
            sentryMinLevel: this.sentryMinLevel,
            defaultContext: {
                ...this.defaultContext,
                ...context,
            },
        });
    }
}
export const defaultLogger = new Logger();
