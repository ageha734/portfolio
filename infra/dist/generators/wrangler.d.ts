interface WranglerConfig {
    name: string;
    type: "pages" | "worker";
    compatibilityDate: string;
    buildCommand?: string;
    outputDir?: string;
    watchDirs?: string[];
    main?: string;
    vars?: Record<string, string | boolean | number>;
}
export declare function generateWranglerToml(config: WranglerConfig, outputPath: string): void;
export declare function getProjectName(): string;
export declare function getCompatibilityDate(): string;
export {};
//# sourceMappingURL=wrangler.d.ts.map