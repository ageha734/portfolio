import type { DMMF } from "@prisma/generator-helper";

export interface Chapter {
    name: string;
    descriptions: DMMF.Model[];
    diagrams: DMMF.Model[];
}
