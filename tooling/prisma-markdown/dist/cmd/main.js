#!/usr/bin/env node
import * as fs from "node:fs";
import * as path from "node:path";
import pkg from "@prisma/generator-helper";
import { PrismaMarkdown } from "../src/markdown.js";
const { generatorHandler } = pkg;
const packageJson = await import("../package.json", { with: { type: "json" } });
const { version } = packageJson.default;
generatorHandler({
    onManifest: () => ({
        version,
        defaultOutput: "./ERD.md",
        prettyName: "prisma-markdown",
    }),
    onGenerate: async (options) => {
        const content = PrismaMarkdown.write(options.dmmf.datamodel, options.generator.config);
        const file = options.generator.output?.value ?? "./ERD.md";
        try {
            await fs.promises.mkdir(path.dirname(file), { recursive: true });
        }
        catch {
            // do nothing
        }
        await fs.promises.writeFile(file, content, "utf8");
    },
});
