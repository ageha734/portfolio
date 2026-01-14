import type { Portfolio } from "@portfolio/api";
import { describe, expect, test } from "vitest";
import type { PortfoliosListProps } from "./types";

describe("PortfoliosListProps", () => {
    test("should have optional portfolios field", () => {
        const props: PortfoliosListProps = {
            portfolios: [
                {
                    id: "1",
                    title: "Test Portfolio",
                    slug: "test-portfolio",
                    company: "Test Company",
                    date: "2024-01-01",
                    current: false,
                },
            ],
        };

        expect(props.portfolios).toBeDefined();
        expect(props.portfolios?.length).toBe(1);
    });

    test("should allow portfolios to be undefined", () => {
        const props: PortfoliosListProps = {};

        expect(props.portfolios).toBeUndefined();
    });

    test("should have optional loading field", () => {
        const props: PortfoliosListProps = {
            loading: true,
        };

        expect(props.loading).toBe(true);
    });

    test("should allow loading to be undefined", () => {
        const props: PortfoliosListProps = {};

        expect(props.loading).toBeUndefined();
    });

    test("should have optional error field", () => {
        const error = new Error("Test error");
        const props: PortfoliosListProps = {
            error,
        };

        expect(props.error).toBe(error);
    });

    test("should allow error to be null", () => {
        const props: PortfoliosListProps = {
            error: null,
        };

        expect(props.error).toBeNull();
    });

    test("should allow error to be undefined", () => {
        const props: PortfoliosListProps = {};

        expect(props.error).toBeUndefined();
    });

    test("should allow all fields to be set together", () => {
        const portfolios: Portfolio[] = [
            {
                id: "1",
                title: "Test Portfolio",
                slug: "test-portfolio",
                company: "Test Company",
                date: "2024-01-01",
                current: false,
            },
        ];
        const props: PortfoliosListProps = {
            portfolios,
            loading: false,
            error: null,
        };

        expect(props.portfolios).toEqual(portfolios);
        expect(props.loading).toBe(false);
        expect(props.error).toBeNull();
    });
});
