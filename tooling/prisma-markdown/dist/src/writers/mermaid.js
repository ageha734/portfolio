import { field } from "../utils/field.js";
import { prisma } from "../utils/prisma.js";
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
        const arrow = buildArrow({
            scalar,
            oneToOne: scalar.isId || scalar.isUnique,
            isOptional: checkIsOptional(props.group, fieldParam, scalar),
            isMandatory: isMandatoryMany({ model: props.model, field: fieldParam, target }),
        });
        return [
            JSON.stringify(props.model.dbName ?? props.model.name),
            arrow,
            JSON.stringify(target.dbName ?? target.name),
            ":",
            fieldParam.name,
        ].join(" ");
    };
    const checkIsOptional = (group, fieldParam, scalar) => {
        const oneToOne = scalar.isId || scalar.isUnique;
        if (!oneToOne)
            return false;
        return group.some((m) => m.name === fieldParam.type &&
            m.fields.some((f) => f.relationName === fieldParam.relationName && !f.isRequired));
    };
    const buildArrow = (params) => {
        const leftCardinality = params.oneToOne ? "|" : "}";
        let middleCardinality;
        if (params.isOptional) {
            middleCardinality = "o";
        }
        else if (params.isMandatory) {
            middleCardinality = "|";
        }
        else {
            middleCardinality = "o";
        }
        const rightCardinality = params.scalar.isRequired ? "|" : "o";
        return [leftCardinality, middleCardinality, "--", rightCardinality, "|"].join("");
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
