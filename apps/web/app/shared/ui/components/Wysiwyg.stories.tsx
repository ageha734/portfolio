import { Wysiwyg } from "./Wysiwyg";
import "~/tailwind.css";

export default {
    title: "shared/ui/Wysiwyg",
};

const sampleContent = {
    children: [
        {
            type: "heading-two",
            children: [{ text: "Sample Heading" }],
        },
        {
            type: "paragraph",
            children: [
                { text: "This is a sample paragraph with " },
                { text: "bold text", bold: true },
                { text: " and " },
                { text: "italic text", italic: true },
                { text: "." },
            ],
        },
        {
            type: "bulleted-list",
            children: [
                {
                    type: "list-item",
                    children: [{ type: "list-item-child", children: [{ text: "First item" }] }],
                },
                {
                    type: "list-item",
                    children: [{ type: "list-item-child", children: [{ text: "Second item" }] }],
                },
                {
                    type: "list-item",
                    children: [{ type: "list-item-child", children: [{ text: "Third item" }] }],
                },
            ],
        },
        {
            type: "code-block",
            children: [{ text: "const greeting = 'Hello, World!';\nconsole.log(greeting);" }],
        },
    ],
};

export const Default = () => <Wysiwyg content={sampleContent} />;

export const WithCodeBlock = () => {
    const codeContent = {
        children: [
            {
                type: "paragraph",
                children: [{ text: "Here is a code example:" }],
            },
            {
                type: "code-block",
                children: [
                    {
                        text: `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`,
                    },
                ],
            },
        ],
    };
    return <Wysiwyg content={codeContent} />;
};

export const WithHeadings = () => {
    const headingContent = {
        children: [
            {
                type: "heading-one",
                children: [{ text: "Main Title (H1)" }],
            },
            {
                type: "heading-two",
                children: [{ text: "Section Title (H2)" }],
            },
            {
                type: "heading-three",
                children: [{ text: "Subsection Title (H3)" }],
            },
            {
                type: "paragraph",
                children: [{ text: "Regular paragraph text here." }],
            },
        ],
    };
    return <Wysiwyg content={headingContent} />;
};
