import type { DMMF } from "@prisma/generator-helper";
/**
 * supported function
 *
 * @export
 * @interface IField
 */
export interface FieldUtil {
    /**
     * @param formatString - Format string pattern: /[tsdnkr]/g
     */
    format(formatString?: string): string;
    data(): FieldData;
}
/**
 * FieldUtil
 *
 * @param {DMMF.Field} field
 * @param {boolean} [isFK]
 * @return {*}  {FieldUtil}
 */
export declare const field: (field: DMMF.Field, isFK?: boolean) => FieldUtil;
/**
 * process DMMF.Field
 *
 * @export
 * @interface IFieldData
 */
export interface FieldData {
    /**
     * prisma type
     *
     * @type {string}
     * @memberof fieldData
     */
    type: string;
    /**
     * prisma database mapping name
     *
     * @type {string}
     * @memberof fieldData
     */
    name: string;
    /**
     * format tag
     *
     * @type {null | string}
     * @memberof fieldData
     */
    format: null | string;
    /**
     * colunm type
     *
     * @type {null | string}
     * @memberof fieldData
     */
    nativeType: null | string;
    /**
     * column size
     *
     * @type {null | number}
     * @memberof fieldData
     */
    size: null | number;
    /**
     * "PK" | "UK" | "FK" expressed null, singly or mixed
     *
     * @type {null | string}
     * @memberof fieldData
     */
    constraint: null | string;
    /**
     * not null
     *
     * @type {boolean}
     * @memberof fieldData
     */
    nullable: boolean;
}
//# sourceMappingURL=field.d.ts.map