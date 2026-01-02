import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import { TrackingGTMIFrame } from "./TrackingGTMIFrame";
import type { TrackingGTMIFrameProps } from "./TrackingGTMIFrame";

describe("TrackingGTMIFrame Component", () => {
    let props: TrackingGTMIFrameProps;

    beforeEach(() => {
        props = {
            id: "GTM-123456",
        };
    });

    test("should render noscript tag", () => {
        const { container } = render(<TrackingGTMIFrame {...props} />);

        const noscript = container.querySelector("noscript");
        expect(noscript).toBeInTheDocument();
    });

    test("should render iframe", () => {
        const { container } = render(<TrackingGTMIFrame {...props} />);

        const noscript = container.querySelector("noscript");
        expect(noscript).toBeInTheDocument();

        const iframe = noscript?.querySelector("iframe");
        expect(iframe).toBeInTheDocument();
    });

    test("should include GTM ID in iframe src", () => {
        const { container } = render(<TrackingGTMIFrame {...props} />);

        const noscript = container.querySelector("noscript");
        const iframe = noscript?.querySelector("iframe") as HTMLIFrameElement;
        expect(iframe).toBeTruthy();
        if (iframe) {
            expect(iframe.src).toContain(props.id);
        }
    });

    test("should have correct iframe attributes", () => {
        const { container } = render(<TrackingGTMIFrame {...props} />);

        const iframe = container.querySelector("iframe") as HTMLIFrameElement;
        expect(iframe).toBeTruthy();
        if (iframe) {
            expect(iframe.getAttribute("height")).toBe("0");
            expect(iframe.getAttribute("width")).toBe("0");
            expect(iframe.getAttribute("title")).toBe("GTM Container");
        }
    });
});
