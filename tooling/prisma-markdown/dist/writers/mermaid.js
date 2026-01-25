import { field } from "../utils/field";
import { prisma } from "../utils/prisma";
export var mermaid;
(function (mermaid) {
    mermaid.write = (chapter) => [
        "```mermaid",
        "erDiagram",
        ...chapter.map(writeTable),
        ...chapter
            .flatMap((model) => model.fields.filter((f) => f.kind === "object").map(writeRelationship({ group: chapter, model })))
            .filter((str) => !!str.length),
        "```",
    ].join("\n");
    const writeTable = (model) => [
        `${JSON.stringify(model.dbName ?? model.name)} {`,
        ...model.fields
            .filter((f) => f.kind !== "object")
            .map(writeField(model))
            .map((str) => `  ${str}`),
        "}",
    ].join("\n");
    const writeField = (model) => (fieldParam) => {
        const isFK = model.fields.some((f) => f.kind === "object" && f.relationFromFields?.[0] === fieldParam.name);
        const targetField = field(fieldParam, isFK);
        return [
            targetField.data().size ? targetField.format("t(s)") : targetField.format("t"),
            targetField.format("n"),
            targetField.format("k"),
            targetField.format("r"),
        ]
            .filter((str) => !!str.length)
            .join(" ");
    };
    const writeRelationship = (props) => (fieldParam) => {
        if (!fieldParam.relationFromFields?.length)
            return "";
        const column = fieldParam.relationFromFields[0] ?? "";
        const scalar = props.model.fields.find((s) => column === s.dbName || column === s.name);
        if (scalar === undefined)
            return "";
        const target = props.group.find((t) => t.name === fieldParam.type);
        if (target === undefined)
            return "";
        const oneToOne = scalar.isId || scalar.isUnique;
        const isOptional = oneToOne &&
            props.group.some((m) => m.name === fieldParam.type &&
                m.fields.some((f) => f.relationName === fieldParam.relationName && !f.isRequired));
        const isMandatory = isMandatoryMany({ model: props.model, field: fieldParam, target });
        const arrow = [
            oneToOne ? "|" : "}",
            isOptional ? "o" : isMandatory ? "|" : "o",
            "--",
            scalar.isRequired ? "|" : "o",
            "|",
        ].join("");
        return [
            JSON.stringify(props.model.dbName ?? props.model.name),
            arrow,
            JSON.stringify(target.dbName ?? target.name),
            ":",
            fieldParam.name,
        ].join(" ");
    };
    const isMandatoryMany = (props) => {
        const opposite = props.target.fields.find((f) => f.relationName === props.field.relationName && f.type === props.model.name);
        if (opposite === undefined)
            return false;
        const values = prisma.tagValues("minItems")(opposite);
        if (values.length === 0)
            return false;
        const numeric = Number(values[0]);
        return !Number.isNaN(numeric) && numeric >= 1;
    };
})(mermaid || (mermaid = {}));
