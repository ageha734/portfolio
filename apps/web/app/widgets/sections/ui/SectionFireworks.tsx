import * as React from "react";
import { fireworks } from "../lib/esm-modules";

type FireworksModule = typeof import("@fireworks-js/react");

export const SectionFireworks = () => {
    const [Component, setComponent] = React.useState<FireworksModule | undefined>();
    const [loaded, setLoaded] = React.useState(false);

    React.useEffect(() => {
        fireworks().then((module) => {
            setComponent(module);
            setLoaded(true);
        });
    }, []);

    if (!loaded || !Component) {
        return null;
    }

    return (
        <Component.Fireworks
            options={
                {
                    autoresize: true,
                    boundaries: {
                        visible: process.env.NODE_ENV !== "production",
                    },
                    intensity: 0,
                    mouse: {
                        click: true,
                    },
                } as Parameters<typeof Component.Fireworks>[0]["options"]
            }
            style={{
                bottom: 0,
                cursor: "crosshair",
                inset: 0,
                height: "100%",
                left: 0,
                position: "absolute",
                top: 0,
                right: 0,
                zIndex: 1,
            }}
        />
    );
};

export default SectionFireworks;
