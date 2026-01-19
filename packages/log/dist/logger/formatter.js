import { LogLevel } from "./levels";
export class JsonFormatter {
    format(entry) {
        const logObject = {
            timestamp: entry.timestamp,
            level: entry.level,
            message: entry.message,
        };
        if (entry.context) {
            logObject.context = entry.context;
        }
        if (entry.error) {
            logObject.error = {
                name: entry.error.name,
                message: entry.error.message,
                stack: entry.error.stack,
            };
        }
        if (entry.metadata) {
            logObject.metadata = entry.metadata;
        }
        return JSON.stringify(logObject);
    }
}
export class PlainTextFormatter {
    format(entry) {
        const parts = [
            `[${entry.timestamp}]`,
            `[${entry.level.toUpperCase()}]`,
            entry.message,
        ];
        if (entry.context) {
            parts.push(`Context: ${JSON.stringify(entry.context)}`);
        }
        if (entry.error) {
            parts.push(`Error: ${entry.error.name}: ${entry.error.message}`);
            if (entry.error.stack) {
                parts.push(`Stack: ${entry.error.stack}`);
            }
        }
        if (entry.metadata) {
            parts.push(`Metadata: ${JSON.stringify(entry.metadata)}`);
        }
        return parts.join(" ");
    }
}
export const defaultFormatter = new JsonFormatter();
