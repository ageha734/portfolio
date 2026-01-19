import { LogLevel } from "./levels";
export interface LogEntry {
    timestamp: string;
    level: LogLevel;
    message: string;
    context?: Record<string, unknown>;
    error?: Error;
    metadata?: Record<string, unknown>;
}
export interface LogFormatter {
    format(entry: LogEntry): string;
}
export declare class JsonFormatter implements LogFormatter {
    format(entry: LogEntry): string;
}
export declare class PlainTextFormatter implements LogFormatter {
    format(entry: LogEntry): string;
}
export declare const defaultFormatter: JsonFormatter;
//# sourceMappingURL=formatter.d.ts.map