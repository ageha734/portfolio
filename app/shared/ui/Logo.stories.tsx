import { Logo } from "./Logo";
import "~/styles/index.css";

export default {
    title: "shared/ui/Logo",
};

export const Default = () => <Logo />;

export const CustomHeight = () => <Logo height={100} />;

export const CustomFill = () => <Logo fill="#3b82f6" />;

export const WithClassName = () => <Logo className="opacity-50" />;

export const AllProps = () => (
    <Logo className="hover:opacity-80 transition-opacity" fill="#ef4444" height={80} />
);
