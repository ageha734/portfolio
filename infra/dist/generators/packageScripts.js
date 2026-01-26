import * as fs from "node:fs";
export function updateDeployScript(packageJsonPath, appType, projectName) {
    const content = fs.readFileSync(packageJsonPath, "utf-8");
    const pkg = JSON.parse(content);
    pkg.scripts ??= {};
    if (appType === "pages") {
        pkg.scripts.deploy = `doppler run -- wrangler pages deploy --project-name ${projectName} --branch master`;
    }
    else {
        pkg.scripts.deploy = `doppler run -- wrangler deploy --name ${projectName}`;
    }
    fs.writeFileSync(packageJsonPath, `${JSON.stringify(pkg, null, 2)}\n`, "utf-8");
}
//# sourceMappingURL=packageScripts.js.map