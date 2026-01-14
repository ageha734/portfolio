import { Logo } from "./Logo";
import "~/tailwind.css";

export default {
	title: "components/Logo",
	component: Logo,
};

export const Default = () => <Logo />;

export const CustomHeight = () => <Logo height={100} />;

export const CustomFill = () => <Logo fill="#ff0000" />;

export const CustomClassName = () => <Logo className="h-20 w-20" />;
