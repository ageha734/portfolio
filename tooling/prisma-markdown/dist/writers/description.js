import { prisma } from "../utils/prisma";
export var description;
(function (description_1) {
    description_1.table = (model) => {
        const description = writeDescription(model);
        return [
            `### \`${model.dbName ?? model.name}\``,
            ...(description.length ? ["", description] : []),
            "",
            "Properties as follows:",
            "",
            ...model.fields.filter((f) => f.kind !== "object").map(writeField),
        ].join("\n");
    };
    const writeField = (field) => {
        const description = writeDescription(field);
        const lines = description.split("\n");
        const head = `- \`${field.dbName ?? field.name}\``;
        if (lines.length === 0)
            return head.trimEnd();
        else if (lines.length === 1)
            return `${head}: ${lines[0]}`.trimEnd();
        return [head, ...lines.map((line) => `  > ${line}`.trimEnd())].join("\n");
    };
    const writeDescription = (target) => {
        const content = (target.documentation ?? "").split("\r\n").join("\n").split("\n");
        let first = 0;
        let last = content.length - 1;
        const empty = (str) => str.trim() === "" || str.trim().startsWith("@");
        while (first < content.length && content[first] !== undefined && empty(content[first]))
            ++first;
        while (last >= 0 && content[last] !== undefined && empty(content[last]))
            --last;
        const summary = prisma.tagValues("summary")(target);
        const body = content.slice(first, last + 1).map(replaceLinks);
        if (summary.length > 0) {
            const summaryFirst = summary[0];
            if (summaryFirst === undefined) {
                return body.join("\n");
            }
            if (body.length > 0) {
                return [summaryFirst, "", ...body].join("\n");
            }
            return summaryFirst;
        }
        return body.join("\n");
    };
    const replaceLinks = (content) => {
        const rejoined = [];
        let i = 0;
        while (true) {
            const first = content.indexOf("{@link ", i);
            if (first === -1)
                break;
            const last = content.indexOf("}", first + 7);
            if (last === -1)
                break;
            const part = content.slice(first + 7, last).trim();
            const space = part.indexOf(" ");
            rejoined.push(content.slice(i, first));
            if (space === -1)
                rejoined.push(`[${part}](#${part.split(".")[0]})`);
            else
                rejoined.push(`[${part.slice(space + 1)}](#${part.slice(0, space).split(".")[0]})`);
            i = last + 1;
        }
        rejoined.push(content.slice(i));
        return rejoined.join("");
    };
})(description || (description = {}));
