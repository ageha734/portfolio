import { expect, test, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { AppWysiwyg } from "./AppWysiwyg";
import type { AppWysiwygProps } from "./AppWysiwyg";

vi.mock("prismjs", () => ({
    default: {
        highlightAll: vi.fn(),
    },
}));

vi.mock("@graphcms/rich-text-react-renderer", () => ({
    RichText: ({ content }: { content: any }) => <div data-testid="rich-text">{JSON.stringify(content)}</div>,
}));

describe("AppWysiwyg Component", () => {
    let props: AppWysiwygProps;

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
        render(<AppWysiwyg {...props} />);

        const richText = screen.getByTestId("rich-text");
        expect(richText).toBeInTheDocument();
    });

    test("should call Prism.highlightAll on mount", async () => {
        const Prism = await import("prismjs");
        render(<AppWysiwyg {...props} />);

        expect(Prism.default.highlightAll).toHaveBeenCalled();
    });

    test("should render wysiwyg wrapper", () => {
        const { container } = render(<AppWysiwyg {...props} />);

        const wrapper = container.querySelector(".wysiwyg");
        expect(wrapper).toBeInTheDocument();
    });
});
