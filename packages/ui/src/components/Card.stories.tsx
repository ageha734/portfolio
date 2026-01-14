import { Button } from "./Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./Card";
import "~/tailwind.css";

export default {
    title: "components/Card",
    component: Card,
};

export const Default = () => (
    <Card>
        <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
            <p>Card content goes here.</p>
        </CardContent>
        <CardFooter>
            <Button>Action</Button>
        </CardFooter>
    </Card>
);

export const Simple = () => (
    <Card>
        <CardContent>
            <p>Simple card with just content.</p>
        </CardContent>
    </Card>
);

export const WithHeader = () => (
    <Card>
        <CardHeader>
            <CardTitle>Card with Header</CardTitle>
            <CardDescription>This card has a header section</CardDescription>
        </CardHeader>
        <CardContent>
            <p>Content section</p>
        </CardContent>
    </Card>
);
