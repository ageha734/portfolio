import type { Preview } from "@storybook/react";
import type { ReactElement } from "react";
export interface StorybookPreviewPresetOptions {
    tailwindCssPath?: string;
    additionalDecorators?: Array<(Story: () => ReactElement) => ReactElement>;
    additionalParameters?: Preview["parameters"];
}
export declare function createStorybookPreviewPreset(options?: StorybookPreviewPresetOptions): Preview;
//# sourceMappingURL=preview.preset.d.ts.map