import { MemoryRouter } from "react-router-dom";
import { SandboxSidebar } from "./SandboxSidebar";
import "~/styles/index.css";

export default {
    title: "widgets/sandbox/SandboxSidebar",
};

export const Default = () => (
    <MemoryRouter>
        <SandboxSidebar />
    </MemoryRouter>
);

export const WithCustomClassName = () => (
    <MemoryRouter>
        <SandboxSidebar className="custom-class" />
    </MemoryRouter>
);
