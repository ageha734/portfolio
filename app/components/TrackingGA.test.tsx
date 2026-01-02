import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import { TrackingGA } from "./TrackingGA";
import type { TrackingGAProps } from "./TrackingGA";

describe("TrackingGA Component", () => {
    let props: TrackingGAProps;

    beforeEach(() => {
        props = {
            id: "GA-123456",
        };
    });

    test("should render script tags", () => {
        const { container } = render(<TrackingGA {...props} />);

        const scripts = container.querySelectorAll("script");
        expect(scripts.length).toBe(2);
    });

    test("should include GA ID in script src", () => {
        const { container } = render(<TrackingGA {...props} />);

        const script = container.querySelector('script[src]') as HTMLScriptElement;
        expect(script).toBeTruthy();
        if (script) {
            expect(script.src).toContain(props.id);
        }
    });

    test("should include GA ID in inline script", () => {
        const { container } = render(<TrackingGA {...props} />);

        const inlineScript = container.querySelector('script:not([src])') as HTMLScriptElement;
        expect(inlineScript).toBeTruthy();
        if (inlineScript) {
            expect(inlineScript.innerHTML).toContain(props.id);
        }
    });

    test("should set async and defer attributes", () => {
        const { container } = render(<TrackingGA {...props} />);

        const script = container.querySelector('script[src]') as HTMLScriptElement;
        expect(script).toBeTruthy();
        if (script) {
            expect(script.async).toBe(true);
            expect(script.defer).toBe(true);
        }
    });
});
