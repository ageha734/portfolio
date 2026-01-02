import { vi } from "vitest";

globalThis.IntersectionObserver = class IntersectionObserver {
    private readonly observedElements = new Set<Element>();

    constructor(
        public callback: IntersectionObserverCallback,
        public options?: IntersectionObserverInit,
    ) {}

    disconnect(): void {
        this.observedElements.clear();
    }

    observe(target: Element): void {
        this.observedElements.add(target);
    }

    takeRecords(): IntersectionObserverEntry[] {
        return [];
    }

    unobserve(target: Element): void {
        this.observedElements.delete(target);
    }
} as unknown as typeof IntersectionObserver;

globalThis.ResizeObserver = class ResizeObserver {
    private readonly observedElements = new Set<Element>();

    constructor(public callback: ResizeObserverCallback) {}

    disconnect(): void {
        this.observedElements.clear();
    }

    observe(target: Element, options?: ResizeObserverOptions): void {
        this.observedElements.add(target);
    }

    unobserve(target: Element): void {
        this.observedElements.delete(target);
    }
} as unknown as typeof ResizeObserver;

Object.defineProperty(globalThis, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});

Object.defineProperty(globalThis, "scrollTo", {
    writable: true,
    value: vi.fn(),
});

Element.prototype.scrollIntoView = vi.fn();

Element.prototype.getBoundingClientRect = vi.fn(() => ({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    x: 0,
    y: 0,
    toJSON: vi.fn(),
}));

Object.defineProperty(navigator, "share", {
    writable: true,
    value: vi.fn().mockResolvedValue(undefined),
});

Object.defineProperty(navigator, "clipboard", {
    writable: true,
    value: {
        writeText: vi.fn().mockResolvedValue(undefined),
        readText: vi.fn().mockResolvedValue(""),
    },
});

globalThis.requestAnimationFrame = vi.fn((cb) => {
    setTimeout(cb, 0);
    return 0;
});

globalThis.cancelAnimationFrame = vi.fn();
