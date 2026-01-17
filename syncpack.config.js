const config = {
    $schema: "https://raw.githubusercontent.com/JamieMason/syncpack/main/config.schema.json",
    source: [
        "package.json",
        "apps/*/package.json",
        "packages/*/package.json",
        "testing/*/package.json",
        "tooling/*/package.json",
    ],
    dependencyTypes: ["dev", "peer", "prod"],
    semverGroups: [
        {
            label: "Use workspace protocol for local packages",
            packages: ["**"],
            dependencies: ["@portfolio/**"],
            dependencyTypes: ["dev", "prod", "peer"],
            range: "workspace:*",
        },
        {
            label: "Use exact versions for external packages",
            packages: ["**"],
            dependencies: ["!@portfolio/**"],
            range: "",
        },
    ],
    versionGroups: [],
    semverRange: "",
    sortFirst: [
        "private",
        "version",
        "name",
        "description",
        "files",
        "type",
        "types",
        "exports",
        "scripts",
        "dependencies",
        "devDependencies",
        "peerDependencies",
    ],
    sortAz: ["exports", "scripts", "dependencies", "devDependencies", "peerDependencies"],
};

export default config;
