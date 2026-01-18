import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, } from "./NavigationMenu";
import "~/tailwind.css";
export default {
    title: "components/NavigationMenu",
    component: NavigationMenu,
};
export const Default = () => (_jsx(NavigationMenu, { children: _jsxs(NavigationMenuList, { children: [_jsx(NavigationMenuItem, { children: _jsx(NavigationMenuLink, { href: "/", children: "Home" }) }), _jsx(NavigationMenuItem, { children: _jsx(NavigationMenuLink, { href: "/about", children: "About" }) }), _jsxs(NavigationMenuItem, { children: [_jsx(NavigationMenuTrigger, { children: "Products" }), _jsxs(NavigationMenuContent, { children: [_jsx(NavigationMenuLink, { href: "/products/1", children: "Product 1" }), _jsx(NavigationMenuLink, { href: "/products/2", children: "Product 2" })] })] })] }) }));
