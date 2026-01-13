import { Separator } from "./Separator";
import "~/tailwind.css";

export default {
    title: "components/Separator",
    component: Separator,
};

export const Horizontal = () => (
    <div className="space-y-4">
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
