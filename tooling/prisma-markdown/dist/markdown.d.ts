import type { DMMF } from "@prisma/generator-helper";
import type { Chapter } from "./chapter";
import type { Config } from "./config";
export declare namespace PrismaMarkdown {
    const write: (schema: DMMF.Datamodel, configParam?: Config | undefined) => string;
    const writeChapter: (chapterParam: Chapter) => string;
    const writeDiagram: (diagrams: DMMF.Model[]) => string;
    const writeDescription: (model: DMMF.Model) => string;
    const categorize: (schema: DMMF.Datamodel) => Chapter[];
}
//# sourceMappingURL=markdown.d.ts.map