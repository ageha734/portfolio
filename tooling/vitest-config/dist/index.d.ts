export interface VitestConfigOptions {
    root?: string;
    tsconfigPath?: string;
    setupFiles?: string[];
    testDir?: string;
    coverageDir?: string;
    additionalAliases?: Record<string, string>;
    projectName?: string;
    test?: Record<string, any>;
    includeReact?: boolean;
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
            poolOptions: {
                threads: {
                    maxThreads: number;
                    minThreads: number;
                };
            };
            isolate: boolean;
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
        fileParallelism: boolean;
        isolate: boolean;
        pool: string;
        poolOptions: {
            threads: {
                singleThread: boolean;
            };
        };
        deps: {
            inline: string[];
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
                inline: string[];
            };
        };
    };
};
//# sourceMappingURL=index.d.ts.map