export declare enum LogLevel {
    DEBUG = "debug",
    INFO = "info",
    WARN = "warn",
    ERROR = "error"
}
export declare const LogLevelPriority: Record<LogLevel, number>;
export declare function compareLogLevel(level1: LogLevel, level2: LogLevel): number;
//# sourceMappingURL=levels.d.ts.map