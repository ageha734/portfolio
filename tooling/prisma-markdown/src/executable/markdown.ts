#!/usr/bin/env node
import * as fs from "node:fs";
import * as path from "node:path";
import { generatorHandler } from "@prisma/generator-helper";
import type { Config } from "~/config";
import { PrismaMarkdown } from "~/markdown";

const { version } = await import("../../package.json");

generatorHandler({
    onManifest: () => ({
        version,
        defaultOutput: "./ERD.md",
        prettyName: "prisma-markdown",
    }),

    onGenerate: async (options) => {
        const content: string = PrismaMarkdown.write(
            options.dmmf.datamodel,
            options.generator.config as Config | undefined,
        );
        const file: string = options.generator.output?.value ?? "./ERD.md";
        try {
            await fs.promises.mkdir(path.dirname(file), { recursive: true });
        } catch {
            // do nothing
        }
        await fs.promises.writeFile(file, content, "utf8");
    },
});
