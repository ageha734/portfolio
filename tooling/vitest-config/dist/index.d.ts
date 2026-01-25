export interface VitestConfigOptions {
    root?: string;
    tsconfigPath?: string;
    setupFiles?: string[];
    testDir?: string;
    coverageDir?: string;
    additionalAliases?: Record<string, string>;
    projectName?: string;
    test?: Record<string, any>;
}
export declare function createVitestConfig(options?: VitestConfigOptions): {
    plugins: any[];
    resolve: {
        alias: {
            [x: string]: string;
        };
    };
    optimizeDeps: {
        disabled: boolean;
    };
    test: {
        coverage: {
            exclude: string[];
            reporter: string[];
            reportsDirectory: string;
            thresholds: {
                lines: number;
                functions: number;
                branches: number;
                statements: number;
            };
        };
        reporters: (string | (string | {
            outputDir: string;
            projectName: string;
            coverageDir: string;
        })[])[];
        globals: boolean;
        environment: string;
        include: string[];
        setupFiles: string[];
        testTimeout: number;
        pool: string;
        poolOptions: {
            forks: {
                singleFork: boolean;
            };
        };
        deps: {
            inline: boolean;
            optimizer: {
                web: {
                    enabled: boolean;
                };
                ssr: {
                    enabled: boolean;
                };
            };
        };
        server: {
            deps: {
                inline: boolean;
            };
        };
    };
};
//# sourceMappingURL=index.d.ts.map