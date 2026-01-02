import { useState } from "react";
import { NavToggle } from "./NavToggle";
import "~/styles/index.css";
import "./NavToggle.module.css";

export default {
    title: "widgets/navbar/NavToggle",
};

export const Closed = () => <NavToggle menuOpen={false} />;

export const Open = () => <NavToggle menuOpen={true} />;

export const Interactive = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <div className="flex flex-col items-center gap-4">
            <NavToggle menuOpen={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />
            <p className="text-sm text-gray-500">
                Menu is: {menuOpen ? "Open" : "Closed"}
            </p>
        </div>
    );
};
