import { createRouterWrapper } from "@portfolio/testing-vitest/render";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Sandbox, { meta } from "./sandbox";

describe("sandbox route", () => {
	test("should render Sandbox component", () => {
		const wrapper = createRouterWrapper({ route: "/sandbox" });
		render(<Sandbox />, { wrapper });

		expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
	});

	test("should render hero section", () => {
		const wrapper = createRouterWrapper({ route: "/sandbox" });
		render(<Sandbox />, { wrapper });

		expect(screen.getByText(/Developer sandbox/i)).toBeInTheDocument();
	});

	test("meta function should return correct metadata", () => {
		const result = meta({} as Parameters<typeof meta>[0]);

		expect(result).toBeDefined();
		expect(result).toBeInstanceOf(Array);
		const titleItem = result?.find(
			(item): item is { title: string } => "title" in item,
		);
		expect(titleItem?.title).toBeDefined();
	});
});
