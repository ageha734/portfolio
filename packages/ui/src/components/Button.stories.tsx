import { useState } from "react";
import { Button } from "./Button";
import "~/tailwind.css";

export default {
    title: "components/Button",
    component: Button,
};

export const Default = () => <Button>Button</Button>;

export const Destructive = () => <Button variant="destructive">Destructive</Button>;

export const Outline = () => <Button variant="outline">Outline</Button>;

export const Secondary = () => <Button variant="secondary">Secondary</Button>;

export const Ghost = () => <Button variant="ghost">Ghost</Button>;

export const Link = () => <Button variant="link">Link</Button>;

export const Small = () => <Button size="sm">Small</Button>;

export const Large = () => <Button size="lg">Large</Button>;

export const Icon = () => (
    <Button size="icon">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <title>Arrow Right Icon</title>
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    </Button>
);

export const Disabled = () => <Button disabled>Disabled</Button>;

export const Interactive = () => {
    const [count, setCount] = useState(0);
    return (
        <div className="flex flex-col items-center gap-4">
            <Button onClick={() => setCount(count + 1)}>Click me: {count}</Button>
            <Button onClick={() => setCount(0)} variant="outline">
                Reset
            </Button>
        </div>
    );
};
