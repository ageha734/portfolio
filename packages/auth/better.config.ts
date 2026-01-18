import { initAuth } from "./src/index";

export const auth = initAuth({
    baseUrl: "http://localhost:3000",
    productionUrl: "http://localhost:3000",
    secret: "secret",
    googleClientId: "1234567890",
    googleClientSecret: "1234567890",
});
