import { expect, test, vi, beforeEach, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useIntro } from "./useIntro";

describe("useIntro", () => {
    let consoleGroupSpy: ReturnType<typeof vi.spyOn>;
    let consoleLogSpy: ReturnType<typeof vi.spyOn>;
    let consoleGroupEndSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
        consoleGroupSpy = vi.spyOn(console, "group").mockImplementation(() => {});
        consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});
        consoleGroupEndSpy = vi.spyOn(console, "groupEnd").mockImplementation(() => {});
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    test("should log intro message", () => {
        renderHook(() => useIntro());

        expect(consoleGroupSpy).toHaveBeenCalledWith("👀 Thank you for looking, lets connect!");
        expect(consoleLogSpy).toHaveBeenCalled();
        expect(consoleGroupEndSpy).toHaveBeenCalled();
    });
});
