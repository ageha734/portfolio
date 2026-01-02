import { Separator } from "./Separator";
import "~/tailwind.css";

export default {
    title: "shared/ui/Separator",
};

export const Horizontal = () => (
    <div>
        <div>Content above</div>
        <Separator />
        <div>Content below</div>
    </div>
);

export const Vertical = () => (
    <div className="flex h-20 items-center gap-4">
        <div>Left</div>
        <Separator orientation="vertical" />
        <div>Right</div>
    </div>
);

export const WithText = () => (
    <div className="space-y-4">
        <div>Section 1</div>
        <Separator />
        <div>Section 2</div>
        <Separator />
        <div>Section 3</div>
    </div>
);

export const InList = () => (
    <div className="w-64 space-y-2">
        <div className="p-2">Item 1</div>
        <Separator />
        <div className="p-2">Item 2</div>
        <Separator />
        <div className="p-2">Item 3</div>
    </div>
);

export const CustomClassName = () => (
    <div>
        <div>Above</div>
        <Separator className="my-8" />
        <div>Below</div>
    </div>
);
