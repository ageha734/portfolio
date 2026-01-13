export declare function getClipboardStore(): string;
export declare function resetClipboardStore(): void;

export declare class IntersectionObserverMock implements IntersectionObserver {
    readonly root: Element | Document | null;
    readonly rootMargin: string;
    readonly thresholds: ReadonlyArray<number>;
    constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit);
    observe(target: Element): void;
    unobserve(target: Element): void;
    disconnect(): void;
    takeRecords(): IntersectionObserverEntry[];
    triggerIntersect(entries: Partial<IntersectionObserverEntry>[]): void;
}

export declare class ResizeObserverMock implements ResizeObserver {
    constructor(callback: ResizeObserverCallback);
    observe(target: Element, options?: ResizeObserverOptions): void;
    unobserve(target: Element): void;
    disconnect(): void;
    triggerResize(entries: Partial<ResizeObserverEntry>[]): void;
}
