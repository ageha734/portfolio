import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import { TrackingGTMScript } from "./TrackingGTMScript";
import type { TrackingGTMScriptProps } from "./TrackingGTMScript";

describe("TrackingGTMScript Component", () => {
    let props: TrackingGTMScriptProps;

    beforeEach(() => {
        props = {
            id: "GTM-123456",
        };
    });

    test("should render script tag", () => {
        const { container } = render(<TrackingGTMScript {...props} />);

        const script = container.querySelector("script");
        expect(script).toBeInTheDocument();
    });

    test("should include GTM ID in script", () => {
        const { container } = render(<TrackingGTMScript {...props} />);

        const script = container.querySelector("script");
        expect(script?.innerHTML).toContain(props.id);
    });

    test("should have correct script type", () => {
        const { container } = render(<TrackingGTMScript {...props} />);

        const script = container.querySelector("script");
        expect(script).toHaveAttribute("type", "text/javascript");
    });
});
