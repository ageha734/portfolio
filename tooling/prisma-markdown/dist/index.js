// src/utils/map.ts
var map;
((map) => {
  map.take = (dict) => (key, generator) => {
    const oldbie = dict.get(key);
    if (oldbie)
      return oldbie;
    const value = generator();
    dict.set(key, value);
    return value;
  };
})(map ||= {});

// src/utils/prisma.ts
var prisma;
((prisma) => {
  prisma.tagValues = (kind) => (model) => {
    if (!model.documentation?.length)
      return [];
    const output = [];
    const splitted = model.documentation.split(`\r
`).join(`
`).split(`
`);
    for (const line of splitted) {
      const first = line.indexOf(`@${kind} `);
      if (first === -1)
        continue;
      output.push(line.slice(first + kind.length + 2).trim());
    }
    return output.map((str) => str.trim()).filter((str) => !!str.length);
  };
})(prisma ||= {});

// src/writers/description.ts
var description;
((description) => {
  description.table = (model) => {
    const description2 = writeDescription(model);
    return [
      `### \`${model.dbName ?? model.name}\``,
      ...description2.length ? ["", description2] : [],
      "",
      "Properties as follows:",
      "",
      ...model.fields.filter((f) => f.kind !== "object").map(writeField)
    ].join(`
`);
  };
  const writeField = (field) => {
    const description2 = writeDescription(field);
    const lines = description2.split(`
`);
    const head = `- \`${field.dbName ?? field.name}\``;
    if (lines.length === 0)
      return head.trimEnd();
    else if (lines.length === 1)
      return `${head}: ${lines[0]}`.trimEnd();
    return [head, ...lines.map((line) => `  > ${line}`.trimEnd())].join(`
`);
  };
  const writeDescription = (target) => {
    const content = (target.documentation ?? "").split(`\r
`).join(`
`).split(`
`);
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
        return body.join(`
`);
      }
      if (body.length > 0) {
        return [summaryFirst, "", ...body].join(`
`);
      }
      return summaryFirst;
    }
    return body.join(`
`);
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
})(description ||= {});

// src/utils/field.ts
var field = (field2, isFK) => {
  return new Field(field2, isFK);
};

class Field {
  field;
  isFK;
  constructor(field2, isFK) {
    this.field = field2;
    this.isFK = isFK;
  }
  format(formatString) {
    if (!formatString)
      return this.field.type;
    const data = this.data();
    return formatString.replaceAll(/[tsdnkr]/g, (match) => {
      switch (match) {
        case "t":
          return this.field.type;
        case "s":
          return `${data.size ?? ""}`;
        case "d":
          return data.nativeType || this.field.type;
        case "n":
          return data.name;
        case "k":
          return `${data.constraint ?? ""}`;
        case "r":
          return data.nullable ? `"nullable"` : "";
        default:
          return "";
      }
    });
  }
  data() {
    const spec = {
      type: "",
      name: "",
      format: null,
      nativeType: null,
      size: null,
      constraint: null,
      nullable: false
    };
    spec.type = this.field.type;
    if (prisma.tagValues("format")(this.field).length > 0) {
      spec["format"] = prisma.tagValues("format")(this.field)[0] ?? null;
    }
    spec["nativeType"] = this.field.nativeType?.[0] ?? null;
    spec["size"] = this.field.nativeType?.[1]?.[0] ? Number.parseInt(this.field.nativeType?.[1]?.[0] ?? "0") : null;
    const keys = [];
    if (this.field.isId)
      keys.push("PK");
    if (this.isFK)
      keys.push("FK");
    if (this.field.isUnique)
      keys.push("UK");
    spec["constraint"] = keys.join(",");
    spec["nullable"] = !this.field.isRequired;
    spec["name"] = this.field.dbName ?? this.field.name;
    return spec;
  }
}

// src/writers/mermaid.ts
var mermaid;
((mermaid) => {
  mermaid.write = (chapter) => [
    "```mermaid",
    "erDiagram",
    ...chapter.map(writeTable),
    ...chapter.flatMap((model) => model.fields.filter((f) => f.kind === "object").map(writeRelationship({ group: chapter, model }))).filter((str) => !!str.length),
    "```"
  ].join(`
`);
  const writeTable = (model) => [
    `${JSON.stringify(model.dbName ?? model.name)} {`,
    ...model.fields.filter((f) => f.kind !== "object").map(writeField(model)).map((str) => `  ${str}`),
    "}"
  ].join(`
`);
  const writeField = (model) => (fieldParam) => {
    const isFK = model.fields.some((f) => f.kind === "object" && f.relationFromFields?.[0] === fieldParam.name);
    const targetField = field(fieldParam, isFK);
    return [
      targetField.data().size ? targetField.format("t(s)") : targetField.format("t"),
      targetField.format("n"),
      targetField.format("k"),
      targetField.format("r")
    ].filter((str) => !!str.length).join(" ");
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
      isMandatory: isMandatoryMany({ model: props.model, field: fieldParam, target })
    });
    return [
      JSON.stringify(props.model.dbName ?? props.model.name),
      arrow,
      JSON.stringify(target.dbName ?? target.name),
      ":",
      fieldParam.name
    ].join(" ");
  };
  const checkIsOptional = (group, fieldParam, scalar) => {
    const oneToOne = scalar.isId || scalar.isUnique;
    if (!oneToOne)
      return false;
    return group.some((m) => m.name === fieldParam.type && m.fields.some((f) => f.relationName === fieldParam.relationName && !f.isRequired));
  };
  const buildArrow = (params) => {
    const leftCardinality = params.oneToOne ? "|" : "}";
    let middleCardinality;
    if (params.isOptional) {
      middleCardinality = "o";
    } else if (params.isMandatory) {
      middleCardinality = "|";
    } else {
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
})(mermaid ||= {});

// src/markdown.ts
var PrismaMarkdown;
((PrismaMarkdown) => {
  PrismaMarkdown.write = (schema, configParam) => {
    const chapters = PrismaMarkdown.categorize(schema);
    const title = configParam?.title ?? "Prisma Markdown";
    const frontMatter = ["---", `title: "${title}"`, "---"].join(`
`);
    const preface = [
      `# ${title}`,
      "",
      "> Generated by [`prisma-markdown`](https://github.com/samchon/prisma-markdown)",
      "",
      ...chapters.map(({ name }) => `- [${name}](#${name.toLowerCase()})`)
    ].join(`
`);
    if (chapters.length === 0)
      return [frontMatter, "", preface].join(`
`);
    return [frontMatter, "", preface, "", chapters.map(PrismaMarkdown.writeChapter).join(`

`), ""].join(`
`);
  };
  PrismaMarkdown.writeChapter = (chapterParam) => [
    `## ${chapterParam.name}`,
    "",
    ...chapterParam.diagrams.length > 0 ? [mermaid.write(chapterParam.diagrams)] : [],
    ...chapterParam.diagrams.length > 0 && chapterParam.descriptions.length > 0 ? [""] : [],
    ...chapterParam.descriptions.length > 0 ? [chapterParam.descriptions.map((c) => description.table(c)).join(`

`)] : []
  ].join(`
`);
  PrismaMarkdown.writeDiagram = (diagrams) => mermaid.write(diagrams);
  PrismaMarkdown.writeDescription = (model) => description.table(model);
  PrismaMarkdown.categorize = (schema) => {
    const dict = new Map;
    const modelList = schema.models.filter((model) => !isHidden(model));
    findImplicits(modelList);
    const emplace = (name) => map.take(dict)(name, () => ({
      name,
      descriptions: new Set,
      diagrams: new Set
    }));
    for (const model of modelList) {
      const namespaces = takeTags("namespace")(model);
      if (namespaces.length === 0)
        continue;
      const top = namespaces[0];
      const chapterParam = emplace(top);
      chapterParam.descriptions.add(model);
      chapterParam.diagrams.add(model);
    }
    for (const model of modelList) {
      const namespaces = takeTags("namespace")(model);
      for (const name of namespaces.slice(1)) {
        const section = emplace(name);
        section.descriptions.add(model);
        section.diagrams.add(model);
      }
    }
    for (const model of modelList) {
      const describes = takeTags("describe")(model);
      for (const name of describes) {
        const chapterParam = map.take(dict)(name, () => ({
          name,
          descriptions: new Set,
          diagrams: new Set
        }));
        chapterParam.descriptions.add(model);
      }
    }
    for (const model of modelList) {
      const erdList = takeTags("erd")(model);
      for (const erd of erdList) {
        const chapterParam = map.take(dict)(erd, () => ({
          name: erd,
          descriptions: new Set,
          diagrams: new Set
        }));
        chapterParam.diagrams.add(model);
      }
    }
    for (const model of modelList) {
      const keywords = [
        ...takeTags("namespace")(model),
        ...takeTags("describe")(model),
        ...takeTags("erd")(model)
      ];
      if (keywords.length !== 0)
        continue;
      const basic = map.take(dict)("default", () => ({
        name: "default",
        descriptions: new Set,
        diagrams: new Set
      }));
      basic.descriptions.add(model);
      basic.diagrams.add(model);
    }
    return Array.from(dict.values()).filter((c) => !!c.descriptions.size || !!c.diagrams.size).map((chapter) => ({
      name: chapter.name,
      descriptions: Array.from(chapter.descriptions),
      diagrams: Array.from(chapter.diagrams)
    }));
  };
  const takeTags = (kind) => (model) => [
    ...new Set(prisma.tagValues(kind)(model).map((str) => str.split(" ")[0]).filter((s) => s !== undefined))
  ];
  const isHidden = (model) => model.documentation?.includes("@hidden") ?? false;
  const findImplicits = (modelList) => {
    const dict = new Map;
    for (const model of modelList) {
      for (const field2 of model.fields) {
        const implicitRelation = findImplicitRelation(model, field2, modelList);
        if (implicitRelation === null)
          continue;
        const table = implicitRelation.tableName;
        if (dict.has(table))
          continue;
        const newbie = implicitToExplicit(implicitRelation.model)(implicitRelation.opposite);
        modelList.push(newbie);
        dict.set(table, newbie);
      }
    }
  };
  const findImplicitRelation = (model, field2, modelList) => {
    if (!isImplicitRelationField(field2))
      return null;
    const opposite = modelList.find((m) => m.name === field2.type);
    if (opposite === undefined)
      return null;
    const oppositeField = opposite.fields.find((f) => f.kind === "object" && f.isList && f.type === model.name);
    if (oppositeField === undefined || model === opposite)
      return null;
    const relations = [model, opposite].sort((x, y) => x.name.localeCompare(y.name));
    const tableName = `_${relations[0]?.name ?? ""}To${relations[1]?.name ?? ""}`;
    return { model: relations[0], opposite: relations[1], tableName };
  };
  const isImplicitRelationField = (field2) => {
    return field2.kind === "object" && field2.isList === true && field2.isUnique === false;
  };
  const implicitToExplicit = (x) => (y) => {
    const name = `_${x.name}To${y.name}`;
    const tagger = (kind) => [...new Set([...takeTags(kind)(x), ...takeTags(kind)(y)])].map((value) => `@${kind} ${value}`);
    const description2 = [
      `Pair relationship table between {@link ${x.dbName ?? x.name}} and {@link ${y.dbName ?? y.name}}`,
      "",
      ...tagger("describe"),
      ...tagger("erd"),
      ...tagger("namespace")
    ];
    if (description2.length === 2)
      description2.splice(1, 1);
    const newbie = {
      name,
      dbName: null,
      schema: null,
      fields: [
        {
          kind: "scalar",
          name: "A",
          type: x.primaryKey?.fields?.[0] ?? "String",
          isRequired: true,
          isList: false,
          isUnique: false,
          isId: false,
          isReadOnly: false,
          hasDefaultValue: false
        },
        {
          kind: "scalar",
          name: "B",
          type: y.primaryKey?.fields?.[0] ?? "String",
          isRequired: true,
          isList: false,
          isUnique: false,
          isId: false,
          isReadOnly: false,
          hasDefaultValue: false
        },
        {
          kind: "object",
          name: x.name,
          type: x.name,
          isRequired: true,
          isList: false,
          isUnique: false,
          isId: false,
          isReadOnly: false,
          hasDefaultValue: false,
          relationToFields: [x.primaryKey?.fields?.[0] ?? "id"],
          relationFromFields: ["A"]
        },
        {
          kind: "object",
          name: y.name,
          type: y.name,
          isRequired: true,
          isList: false,
          isUnique: false,
          isId: false,
          isReadOnly: false,
          hasDefaultValue: false,
          relationToFields: [y.primaryKey?.fields?.[0] ?? "id"],
          relationFromFields: ["B"]
        }
      ],
      uniqueFields: [["A", "B"]],
      uniqueIndexes: [],
      primaryKey: null,
      documentation: description2.join(`
`)
    };
    x.fields.push({
      kind: "object",
      name,
      type: name,
      isRequired: true,
      isList: true,
      isUnique: false,
      isId: false,
      isReadOnly: false,
      hasDefaultValue: false,
      relationToFields: ["A"]
    });
    y.fields.push({
      kind: "object",
      name,
      type: name,
      isRequired: true,
      isList: true,
      isUnique: false,
      isId: false,
      isReadOnly: false,
      hasDefaultValue: false,
      relationToFields: ["B"]
    });
    return newbie;
  };
})(PrismaMarkdown ||= {});
export {
  PrismaMarkdown
};
