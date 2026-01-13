import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuCheckboxItem,
    DropdownMenuRadioItem,
    DropdownMenuRadioGroup,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
} from "./DropdownMenu";
import { Button } from "./Button";
import "~/tailwind.css";

export default {
    title: "shared/ui/DropdownMenu",
};

export const Default = () => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button>Open Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuItem>Item 1</DropdownMenuItem>
            <DropdownMenuItem>Item 2</DropdownMenuItem>
            <DropdownMenuItem>Item 3</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
);

export const WithLabel = () => (
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

export const WithCheckbox = () => {
    const [showStatusBar, setShowStatusBar] = useState(true);
    const [showActivityBar, setShowActivityBar] = useState(false);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button>View Options</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>View</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
                    Status Bar
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={showActivityBar} onCheckedChange={setShowActivityBar}>
                    Activity Bar
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export const WithRadio = () => {
    const [position, setPosition] = useState("bottom");

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button>Position</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                    <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export const WithSubMenu = () => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button>Open Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuItem>New File</DropdownMenuItem>
            <DropdownMenuItem>Open File</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
                <DropdownMenuSubTrigger>More Options</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                    <DropdownMenuItem>Option 1</DropdownMenuItem>
                    <DropdownMenuItem>Option 2</DropdownMenuItem>
                </DropdownMenuSubContent>
            </DropdownMenuSub>
        </DropdownMenuContent>
    </DropdownMenu>
);

export const WithInset = () => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button>Open Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel inset>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem inset>Profile</DropdownMenuItem>
            <DropdownMenuItem inset>Settings</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
);

export const Complete = () => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button>Complete Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
                <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                    <DropdownMenuItem>Sub Item 1</DropdownMenuItem>
                    <DropdownMenuItem>Sub Item 2</DropdownMenuItem>
                </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
);
