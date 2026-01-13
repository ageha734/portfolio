import { createStorybookPreviewPreset } from "@portfolio/storybook-config/preview";
import "~/tailwind.css";

const preview = createStorybookPreviewPreset({
    tailwindCssPath: "~/tailwind.css",
});

export default preview;
