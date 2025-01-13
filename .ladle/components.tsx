import type { GlobalProvider } from "@ladle/react";
import "~/styles/tailwind.css";

export const Provider: GlobalProvider = ({ children, globalState }) => <>{children}</>;
