import { useState } from "react";
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetFooter,
    SheetTitle,
    SheetDescription,
    SheetClose,
} from "./Sheet";
import { Button } from "./Button";
import "~/tailwind.css";

export default {
    title: "shared/ui/Sheet",
};

export const Default = () => {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button>Open Sheet</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Sheet Title</SheetTitle>
                    <SheetDescription>This is a sheet description.</SheetDescription>
                </SheetHeader>
                <div className="py-4">Sheet content goes here.</div>
            </SheetContent>
        </Sheet>
    );
};

export const RightSide = () => {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button>Open Right</Button>
            </SheetTrigger>
            <SheetContent side="right">
                <SheetHeader>
                    <SheetTitle>Right Side Sheet</SheetTitle>
                    <SheetDescription>This sheet opens from the right.</SheetDescription>
                </SheetHeader>
                <div className="py-4">Content</div>
            </SheetContent>
        </Sheet>
    );
};

export const LeftSide = () => {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button>Open Left</Button>
            </SheetTrigger>
            <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle>Left Side Sheet</SheetTitle>
                    <SheetDescription>This sheet opens from the left.</SheetDescription>
                </SheetHeader>
                <div className="py-4">Content</div>
            </SheetContent>
        </Sheet>
    );
};

export const TopSide = () => {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button>Open Top</Button>
            </SheetTrigger>
            <SheetContent side="top">
                <SheetHeader>
                    <SheetTitle>Top Side Sheet</SheetTitle>
                    <SheetDescription>This sheet opens from the top.</SheetDescription>
                </SheetHeader>
                <div className="py-4">Content</div>
            </SheetContent>
        </Sheet>
    );
};

export const BottomSide = () => {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button>Open Bottom</Button>
            </SheetTrigger>
            <SheetContent side="bottom">
                <SheetHeader>
                    <SheetTitle>Bottom Side Sheet</SheetTitle>
                    <SheetDescription>This sheet opens from the bottom.</SheetDescription>
                </SheetHeader>
                <div className="py-4">Content</div>
            </SheetContent>
        </Sheet>
    );
};

export const WithFooter = () => {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button>Open with Footer</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Sheet with Footer</SheetTitle>
                    <SheetDescription>This sheet includes a footer section.</SheetDescription>
                </SheetHeader>
                <div className="py-4">Main content area</div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </SheetClose>
                    <Button>Save</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};

export const Complete = () => {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button>Open Complete Sheet</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Complete Sheet Example</SheetTitle>
                    <SheetDescription>This is a complete example with all components.</SheetDescription>
                </SheetHeader>
                <div className="py-4 space-y-4">
                    <p>This is the main content area.</p>
                    <p>You can add any content here.</p>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button variant="outline">Close</Button>
                    </SheetClose>
                    <Button>Submit</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};
