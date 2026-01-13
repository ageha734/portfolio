import { Button } from "./Button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./Sheet";
import "~/tailwind.css";

export default {
    title: "components/Sheet",
    component: Sheet,
};

export const Default = () => (
    <Sheet>
        <SheetTrigger asChild>
            <Button>Open Sheet</Button>
        </SheetTrigger>
        <SheetContent>
            <SheetHeader>
                <SheetTitle>Sheet Title</SheetTitle>
                <SheetDescription>This is a sheet description.</SheetDescription>
            </SheetHeader>
            <div className="mt-4">
                <p>Sheet content goes here.</p>
            </div>
        </SheetContent>
    </Sheet>
);

export const LeftSide = () => (
    <Sheet>
        <SheetTrigger asChild>
            <Button>Open Left Sheet</Button>
        </SheetTrigger>
        <SheetContent side="left">
            <SheetHeader>
                <SheetTitle>Left Sheet</SheetTitle>
                <SheetDescription>This sheet opens from the left.</SheetDescription>
            </SheetHeader>
        </SheetContent>
    </Sheet>
);
