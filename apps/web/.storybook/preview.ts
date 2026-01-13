import { createStorybookPreviewPreset } from "@portfolio/storybook-config/preview";
import "@portfolio/ui/tailwind.css";
import "~/tailwind.css";

const preview = createStorybookPreviewPreset({
    tailwindCssPath: "@portfolio/ui/tailwind.css",
});

export default preview;
