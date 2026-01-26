import * as fs from "node:fs";

interface PackageJson {
    scripts?: Record<string, string>;
    [key: string]: unknown;
}

export function updateDeployScript(
    packageJsonPath: string,
    appType: "pages" | "worker",
    projectName: string,
): void {
    const content = fs.readFileSync(packageJsonPath, "utf-8");
    const pkg: PackageJson = JSON.parse(content);

    pkg.scripts ??= {};

    if (appType === "pages") {
        const isWebApp = projectName.includes("-web");
        const buildDir = isWebApp ? "./build" : "./dist";
        pkg.scripts.deploy = `wrangler pages deploy ${buildDir} --project-name ${projectName} --branch master`;
    } else {
        pkg.scripts.deploy = `wrangler deploy --name ${projectName}`;
    }

    fs.writeFileSync(packageJsonPath, `${JSON.stringify(pkg, null, 2)}\n`, "utf-8");
}
