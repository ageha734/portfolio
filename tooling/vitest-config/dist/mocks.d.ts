export declare const getClipboardStore: () => string;
export declare const resetClipboardStore: () => void;
export declare class IntersectionObserverMock implements IntersectionObserver {
    callback: IntersectionObserverCallback;
    options?: IntersectionObserverInit | undefined;
    readonly root: Element | Document | null;
    readonly rootMargin: string;
    readonly thresholds: ReadonlyArray<number>;
    private readonly observedElements;
    constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit | undefined);
    observe(target: Element): void;
    unobserve(target: Element): void;
    disconnect(): void;
    takeRecords(): IntersectionObserverEntry[];
    triggerIntersect(entries: Partial<IntersectionObserverEntry>[]): void;
}
export declare class ResizeObserverMock implements ResizeObserver {
    callback: ResizeObserverCallback;
    private readonly observedElements;
    constructor(callback: ResizeObserverCallback);
    observe(target: Element, _options?: ResizeObserverOptions): void;
    unobserve(target: Element): void;
    disconnect(): void;
    triggerResize(entries: Partial<ResizeObserverEntry>[]): void;
}
//# sourceMappingURL=mocks.d.ts.map