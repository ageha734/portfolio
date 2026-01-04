import "./common.tsp";

namespace GraphCMS;

model GraphQLRequest {
  query: string;
  variables?: Record<unknown>;
}

model GraphQLResponse {
  data?: Record<unknown>;
  errors?: GraphQLError[];
}

model GraphQLError {
  message: string;
  locations?: ErrorLocation[];
  path?: string[];
}

model ErrorLocation {
  line: int32;
  column: int32;
}

model ErrorResponse {
  message: string;
  errors?: GraphQLError[];
}
