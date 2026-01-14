import { Button } from "./Button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./DropdownMenu";
import "~/tailwind.css";

export default {
	title: "components/DropdownMenu",
	component: DropdownMenu,
};

export const Default = () => (
	<DropdownMenu>
		<DropdownMenuTrigger asChild>
			<Button>Open Menu</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent>
			<DropdownMenuLabel>My Account</DropdownMenuLabel>
			<DropdownMenuSeparator />
			<DropdownMenuItem>Profile</DropdownMenuItem>
			<DropdownMenuItem>Settings</DropdownMenuItem>
			<DropdownMenuItem>Logout</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
);
