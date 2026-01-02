import { expect, test, describe, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { TrackingGTMIFrame } from "./TrackingGTMIFrame";
import type { TrackingGTMIFrameProps } from "./TrackingGTMIFrame";

describe("TrackingGTMIFrame Component", () => {
    let props: TrackingGTMIFrameProps;

    beforeEach(() => {
        props = {
            id: "GTM-123456789",
        };
    });

    test("should render noscript tag", () => {
        const { container } = render(<TrackingGTMIFrame {...props} />);

        const noscript = container.querySelector("noscript");
        expect(noscript).toBeInTheDocument();
    });

    test("should render iframe with correct src", () => {
        const { container } = render(<TrackingGTMIFrame {...props} />);

        const iframe = container.querySelector("iframe");
        expect(iframe).toBeInTheDocument();
        expect(iframe?.getAttribute("src")).toBe(`https://www.googletagmanager.com/ns.html?id=${props.id}`);
    });

    test("should set iframe dimensions to 0", () => {
        const { container } = render(<TrackingGTMIFrame {...props} />);

        const iframe = container.querySelector("iframe");
        expect(iframe?.getAttribute("width")).toBe("0");
        expect(iframe?.getAttribute("height")).toBe("0");
    });

    test("should set iframe style to hidden", () => {
        const { container } = render(<TrackingGTMIFrame {...props} />);

        const iframe = container.querySelector("iframe");
        expect(iframe).toHaveStyle({ display: "none", visibility: "hidden" });
    });
});
