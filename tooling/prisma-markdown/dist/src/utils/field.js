import { prisma } from "./prisma";
/**
 * FieldUtil
 *
 * @param {DMMF.Field} field
 * @param {boolean} [isFK]
 * @return {*}  {FieldUtil}
 */
export const field = (field, isFK) => {
    return new Field(field, isFK);
};
/**
 * DMMF Field Paser
 *
 * @class Field
 */
class Field {
    field;
    isFK;
    constructor(field, isFK) {
        this.field = field;
        this.isFK = isFK;
    }
    /**
     * t: type
     * s: size
     * d: native type
     * n: name
     * k: constant
     * r: nullable
     *
     * @param {string} [formatString] - Format string pattern: /[tsdnkr]/g
     * @memberof Field
     */
    format(formatString) {
        if (!formatString)
            return this.field.type;
        const data = this.data();
        return formatString.replaceAll(/[tsdnkr]/g, (match) => {
            switch (match) {
                case "t": // type
                    return this.field.type;
                case "s": // size
                    return `${data.size ?? ""}`;
                case "d": // databaseType
                    return data.nativeType || this.field.type;
                case "n": // name
                    return data.name;
                case "k": // PK, FK, UK
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
            nullable: false,
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
