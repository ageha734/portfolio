import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./Card";
import { Button } from "./Button";
import "~/tailwind.css";

export default {
    title: "shared/ui/Card",
};

export const Default = () => (
    <Card>
        <CardContent>Card content</CardContent>
    </Card>
);

export const WithHeader = () => (
    <Card>
        <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card description goes here</CardDescription>
        </CardHeader>
        <CardContent>Card content</CardContent>
    </Card>
);

export const Complete = () => (
    <Card>
        <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card description</CardDescription>
        </CardHeader>
        <CardContent>
            <p>This is the main content of the card.</p>
        </CardContent>
        <CardFooter>
            <Button>Action</Button>
        </CardFooter>
    </Card>
);

export const WithCustomContent = () => (
    <Card>
        <CardHeader>
            <CardTitle>Featured Post</CardTitle>
            <CardDescription>Published on January 1, 2024</CardDescription>
        </CardHeader>
        <CardContent>
            <p>This is a sample blog post content that goes inside the card.</p>
        </CardContent>
        <CardFooter className="justify-between">
            <Button variant="outline">Read More</Button>
            <Button>Share</Button>
        </CardFooter>
    </Card>
);

export const MultipleCards = () => (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
            <CardHeader>
                <CardTitle>Card 1</CardTitle>
            </CardHeader>
            <CardContent>Content 1</CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Card 2</CardTitle>
            </CardHeader>
            <CardContent>Content 2</CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Card 3</CardTitle>
            </CardHeader>
            <CardContent>Content 3</CardContent>
        </Card>
    </div>
);
