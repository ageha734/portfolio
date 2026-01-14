import { ErrorPage } from "./Error";
import "~/tailwind.css";

export default {
    title: "widgets/error/Error",
};

export const NotFound404 = () => (
    <ErrorPage
        error={{
            status: 404,
            statusText: "Not Found",
        }}
    />
);

export const MethodNotAllowed405 = () => (
    <ErrorPage
        error={{
            status: 405,
            statusText: "Method Not Allowed",
            data: "This method is not allowed for this endpoint.",
        }}
    />
);

export const ServerError500 = () => (
    <ErrorPage
        error={{
            status: 500,
            statusText: "Internal Server Error",
            data: "An unexpected error occurred on the server.",
        }}
    />
);

export const GenericError = () => (
    <ErrorPage
        error={{
            status: 418,
            statusText: "I'm a teapot",
            data: "The server refuses to brew coffee because it is, permanently, a teapot.",
        }}
    />
);

export const Flatlined = () => (
    <ErrorPage
        error={{
            toString: () => "Unknown error occurred",
        }}
    />
);
