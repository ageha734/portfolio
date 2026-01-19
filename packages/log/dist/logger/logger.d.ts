import { AppError } from "../errors/app-error";
import { LogLevel } from "./levels";
import { type LogFormatter } from "./formatter";
export interface LoggerConfig {
    minLevel?: LogLevel;
    formatter?: LogFormatter;
    sendToSentry?: boolean;
    sentryMinLevel?: LogLevel;
    defaultContext?: Record<string, unknown>;
}
export declare class Logger {
    private readonly minLevel;
    private readonly formatter;
    private readonly sendToSentry;
    private readonly sentryMinLevel;
    private readonly defaultContext?;
    constructor(config?: LoggerConfig);
    private log;
    protected writeLog(level: LogLevel, formatted: string): void;
    private getSentryLevel;
    debug(message: string, metadata?: Record<string, unknown>): void;
    info(message: string, metadata?: Record<string, unknown>): void;
    warn(message: string, metadata?: Record<string, unknown>): void;
    error(message: string, error?: Error, metadata?: Record<string, unknown>): void;
    logError(error: AppError, metadata?: Record<string, unknown>): void;
    child(context: Record<string, unknown>): Logger;
}
export declare const defaultLogger: Logger;
//# sourceMappingURL=logger.d.ts.map