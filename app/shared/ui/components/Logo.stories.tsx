import { Logo } from "./Logo";
import "~/tailwind.css";

export default {
    title: "shared/ui/Logo",
};

export const Default = () => <Logo />;

export const CustomHeight = () => <Logo height={100} />;

export const CustomFill = () => <Logo fill="#3b82f6" />;

export const WithClassName = () => <Logo className="opacity-50" />;

export const AllProps = () => <Logo className="transition-opacity hover:opacity-80" fill="#ef4444" height={80} />;
