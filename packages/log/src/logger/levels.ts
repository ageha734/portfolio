export enum LogLevel {
    DEBUG = "debug",
    INFO = "info",
    WARN = "warn",
    ERROR = "error",
}

export const LogLevelPriority: Record<LogLevel, number> = {
    [LogLevel.DEBUG]: 0,
    [LogLevel.INFO]: 1,
    [LogLevel.WARN]: 2,
    [LogLevel.ERROR]: 3,
};

export function compareLogLevel(level1: LogLevel, level2: LogLevel): number {
    return LogLevelPriority[level1] - LogLevelPriority[level2];
}
