import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContent,
    NavigationMenuLink,
} from "./NavigationMenu";
import "~/tailwind.css";

export default {
    title: "shared/ui/NavigationMenu",
};

export const Default = () => (
    <NavigationMenu>
        <NavigationMenuList>
            <NavigationMenuItem>
                <NavigationMenuLink href="/">Home</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavigationMenuLink href="/about">About</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavigationMenuLink href="/contact">Contact</NavigationMenuLink>
            </NavigationMenuItem>
        </NavigationMenuList>
    </NavigationMenu>
);

export const WithTrigger = () => (
    <NavigationMenu>
        <NavigationMenuList>
            <NavigationMenuItem>
                <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                <NavigationMenuContent>
                    <div className="p-4 w-64">
                        <h3 className="font-semibold mb-2">Product Categories</h3>
                        <ul className="space-y-2">
                            <li>
                                <NavigationMenuLink href="/products/web">Web Development</NavigationMenuLink>
                            </li>
                            <li>
                                <NavigationMenuLink href="/products/mobile">Mobile Apps</NavigationMenuLink>
                            </li>
                            <li>
                                <NavigationMenuLink href="/products/design">Design</NavigationMenuLink>
                            </li>
                        </ul>
                    </div>
                </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavigationMenuLink href="/about">About</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavigationMenuLink href="/contact">Contact</NavigationMenuLink>
            </NavigationMenuItem>
        </NavigationMenuList>
    </NavigationMenu>
);

export const MultipleTriggers = () => (
    <NavigationMenu>
        <NavigationMenuList>
            <NavigationMenuItem>
                <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                    <div className="p-4 w-64">
                        <h3 className="font-semibold mb-2">Our Services</h3>
                        <ul className="space-y-2">
                            <li>
                                <NavigationMenuLink href="/services/consulting">Consulting</NavigationMenuLink>
                            </li>
                            <li>
                                <NavigationMenuLink href="/services/development">Development</NavigationMenuLink>
                            </li>
                        </ul>
                    </div>
                </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                    <div className="p-4 w-64">
                        <h3 className="font-semibold mb-2">Resources</h3>
                        <ul className="space-y-2">
                            <li>
                                <NavigationMenuLink href="/resources/docs">Documentation</NavigationMenuLink>
                            </li>
                            <li>
                                <NavigationMenuLink href="/resources/blog">Blog</NavigationMenuLink>
                            </li>
                        </ul>
                    </div>
                </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavigationMenuLink href="/contact">Contact</NavigationMenuLink>
            </NavigationMenuItem>
        </NavigationMenuList>
    </NavigationMenu>
);

export const WithCustomContent = () => (
    <NavigationMenu>
        <NavigationMenuList>
            <NavigationMenuItem>
                <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
                <NavigationMenuContent>
                    <div className="p-6 w-80">
                        <h3 className="text-lg font-semibold mb-4">Our Solutions</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h4 className="font-medium mb-2">Enterprise</h4>
                                <p className="text-sm text-muted-foreground">Scalable solutions for large organizations</p>
                            </div>
                            <div>
                                <h4 className="font-medium mb-2">Startup</h4>
                                <p className="text-sm text-muted-foreground">Fast-track solutions for growing businesses</p>
                            </div>
                        </div>
                    </div>
                </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavigationMenuLink href="/pricing">Pricing</NavigationMenuLink>
            </NavigationMenuItem>
        </NavigationMenuList>
    </NavigationMenu>
);

export const SimpleLinks = () => (
    <NavigationMenu>
        <NavigationMenuList>
            <NavigationMenuItem>
                <NavigationMenuLink href="/">Home</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavigationMenuLink href="/products">Products</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavigationMenuLink href="/services">Services</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavigationMenuLink href="/about">About</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavigationMenuLink href="/contact">Contact</NavigationMenuLink>
            </NavigationMenuItem>
        </NavigationMenuList>
    </NavigationMenu>
);
