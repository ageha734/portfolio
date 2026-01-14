import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "./NavigationMenu";
import "~/tailwind.css";

export default {
	title: "components/NavigationMenu",
	component: NavigationMenu,
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
				<NavigationMenuTrigger>Products</NavigationMenuTrigger>
				<NavigationMenuContent>
					<NavigationMenuLink href="/products/1">Product 1</NavigationMenuLink>
					<NavigationMenuLink href="/products/2">Product 2</NavigationMenuLink>
				</NavigationMenuContent>
			</NavigationMenuItem>
		</NavigationMenuList>
	</NavigationMenu>
);
