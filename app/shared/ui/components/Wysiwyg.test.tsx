import { expect, test, describe, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Wysiwyg } from "./Wysiwyg";
import type { WysiwygProps } from "./Wysiwyg";

vi.mock("prismjs", () => ({
    default: {
        highlightAll: vi.fn(),
    },
}));

vi.mock("@graphcms/rich-text-react-renderer", () => ({
    RichText: ({ content }: { content: any }) => <div data-testid="rich-text">{JSON.stringify(content)}</div>,
}));

describe("Wysiwyg Component", () => {
    let props: WysiwygProps;

    beforeEach(() => {
        vi.clearAllMocks();
        props = {
            content: {
                children: [
                    {
                        type: "paragraph",
                        children: [{ text: "Test content" }],
                    },
                ],
            },
        };
    });

    test("should render RichText component", () => {
        render(<Wysiwyg {...props} />);

        const richText = screen.getByTestId("rich-text");
        expect(richText).toBeInTheDocument();
    });

    test("should call Prism.highlightAll on mount", async () => {
        const Prism = await import("prismjs");
        render(<Wysiwyg {...props} />);

        expect(Prism.default.highlightAll).toHaveBeenCalled();
    });

    test("should render wysiwyg wrapper", () => {
        const { container } = render(<Wysiwyg {...props} />);

        const wrapper = container.querySelector(".wysiwyg");
        expect(wrapper).toBeInTheDocument();
    });

    test("should pass content to RichText", () => {
        render(<Wysiwyg {...props} />);

        const richText = screen.getByTestId("rich-text");
        expect(richText).toHaveTextContent(JSON.stringify(props.content));
    });
});
