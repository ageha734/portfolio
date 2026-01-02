export interface GraphQLRequest {
    query: string;
    variables?: Record<string, unknown>;
}

export interface GraphQLResponse {
    data?: Record<string, unknown>;
    errors?: GraphQLError[];
}

export interface GraphQLError {
    message: string;
    locations?: ErrorLocation[];
    path?: string[];
}

export interface ErrorLocation {
    line: number;
    column: number;
}

export interface ErrorResponse {
    message: string;
    errors?: GraphQLError[];
}

export interface Asset {
    url: string;
}

export interface Tag {
    name: string;
}

export interface EnumValue {
    name: string;
}

export interface TypeInfo {
    enumValues?: EnumValue[];
}

export interface PostContent {
    html: string;
    raw?: unknown;
}

export interface PortfolioContent {
    html: string;
}
