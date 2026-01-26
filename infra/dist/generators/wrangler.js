import * as fs from "node:fs";
import * as path from "node:path";
function generatePagesWrangler(config) {
    const lines = [];
    lines.push(`name = "${config.name}"`);
    if (config.watchDirs && config.watchDirs.length > 0) {
        const watchDirsList = config.watchDirs.map((d) => `"${d}"`).join(", ");
        lines.push(`build.watch_dir = [${watchDirsList}]`);
    }
    lines.push(`compatibility_date = "${config.compatibilityDate}"`);
    if (config.buildCommand) {
        lines.push(`build.command = "${config.buildCommand}"`);
    }
    if (config.outputDir) {
        lines.push(`pages_build_output_dir = "${config.outputDir}"`);
    }
    if (config.vars && Object.keys(config.vars).length > 0) {
        lines.push("", "[vars]");
        for (const [key, value] of Object.entries(config.vars)) {
            if (typeof value === "string") {
                lines.push(`${key} = "${value}"`);
            }
            else {
                lines.push(`${key} = ${value}`);
            }
        }
    }
    lines.push("");
    return lines.join("\n");
}
function generateWorkerWrangler(config) {
    const lines = [
        `name = "${config.name}"`,
        `compatibility_date = "${config.compatibilityDate}"`,
        'compatibility_flags = ["nodejs_compat"]',
    ];
    if (config.main) {
        lines.push(`main = "${config.main}"`);
    }
    if (config.vars && Object.keys(config.vars).length > 0) {
        lines.push("", "[vars]");
        for (const [key, value] of Object.entries(config.vars)) {
            if (typeof value === "string") {
                lines.push(`${key} = "${value}"`);
            }
            else {
                lines.push(`${key} = ${value}`);
            }
        }
    }
    lines.push("");
    return lines.join("\n");
}
export function generateWranglerToml(config, outputPath) {
    const content = config.type === "pages" ? generatePagesWrangler(config) : generateWorkerWrangler(config);
    fs.writeFileSync(outputPath, content, "utf-8");
}
export function getProjectName() {
    const pulumiYamlPath = path.join(process.cwd(), "Pulumi.yaml");
    if (!fs.existsSync(pulumiYamlPath)) {
        throw new Error(`Pulumi.yaml not found at ${pulumiYamlPath}`);
    }
    const content = fs.readFileSync(pulumiYamlPath, "utf-8");
    const regex = /^name:\s*(.+)$/m;
    const projectMatch = regex.exec(content);
    if (!projectMatch?.[1]) {
        throw new Error("Project name not found in Pulumi.yaml");
    }
    return projectMatch[1].trim();
}
export function getCompatibilityDate() {
    return "2025-11-17";
}
//# sourceMappingURL=wrangler.js.map