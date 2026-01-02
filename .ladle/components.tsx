import React from "react";
import type { GlobalProvider } from "@ladle/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import "~/styles/tailwind.css";

export const Provider: GlobalProvider = ({ children, globalState }) => {
    const router = createMemoryRouter(
        [
            {
                path: "*",
                element: <>{children}</>,
            },
        ],
        {
            initialEntries: ["/"],
        }
    );

    return <RouterProvider router={router} />;
};
