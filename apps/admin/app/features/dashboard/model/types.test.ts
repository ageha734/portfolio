import { FileText } from "lucide-react";
import { describe, expect, test } from "vitest";
import type { DashboardStats, StatCard } from "./types";

describe("Dashboard types", () => {
	describe("DashboardStats", () => {
		test("should have all required fields", () => {
			const stats: DashboardStats = {
				posts: 10,
				portfolios: 5,
				totalViews: 1000,
				users: 50,
			};

			expect(stats.posts).toBe(10);
			expect(stats.portfolios).toBe(5);
			expect(stats.totalViews).toBe(1000);
			expect(stats.users).toBe(50);
		});

		test("should allow zero values", () => {
			const stats: DashboardStats = {
				posts: 0,
				portfolios: 0,
				totalViews: 0,
				users: 0,
			};

			expect(stats.posts).toBe(0);
			expect(stats.portfolios).toBe(0);
			expect(stats.totalViews).toBe(0);
			expect(stats.users).toBe(0);
		});
	});

	describe("StatCard", () => {
		test("should have all required fields", () => {
			const card: StatCard = {
				title: "Total Posts",
				value: 10,
				description: "Published blog posts",
				icon: FileText,
			};

			expect(card.title).toBe("Total Posts");
			expect(card.value).toBe(10);
			expect(card.description).toBe("Published blog posts");
			expect(card.icon).toBe(FileText);
		});

		test("should allow optional trend field", () => {
			const card: StatCard = {
				title: "Total Posts",
				value: 10,
				description: "Published blog posts",
				icon: FileText,
				trend: "+12%",
			};

			expect(card.trend).toBe("+12%");
		});

		test("should allow trend to be undefined", () => {
			const card: StatCard = {
				title: "Total Posts",
				value: 10,
				description: "Published blog posts",
				icon: FileText,
			};

			expect(card.trend).toBeUndefined();
		});
	});
});
