import * as fs from "node:fs";

interface PackageJson {
	scripts?: Record<string, string>;
	[key: string]: unknown;
}

export function updateDeployScript(
	packageJsonPath: string,
	appType: "pages" | "worker",
	projectName: string,
	appSuffix: string,
): void {
	const content = fs.readFileSync(packageJsonPath, "utf-8");
	const pkg: PackageJson = JSON.parse(content);

	pkg.scripts ??= {};

	if (appType === "pages") {
		const buildDir = appSuffix === "web" ? "./build" : "./dist";
		pkg.scripts.deploy = `wrangler pages deploy ${buildDir} --project-name ${projectName}-${appSuffix} --branch master`;
	} else {
		pkg.scripts.deploy = `wrangler deploy --name ${projectName}-${appSuffix}`;
	}

	fs.writeFileSync(packageJsonPath, `${JSON.stringify(pkg, null, 2)}\n`, "utf-8");
}
