import type { ChangelogFunctions } from "@changesets/types";
import { getInfo, getInfoFromPullRequest } from "@changesets/get-github-info";

const changelogFunctions: ChangelogFunctions = {
    async getReleaseLine(changeset, _type, options) {
        if (!options?.repo) {
            throw new Error(
                'Please provide a repo to this changelog generator like this:\n"changelog": ["@portfolio/changelog-config", { "repo": "org/repo" }]',
            );
        }

        const summaryLines = changeset.summary.split("\n").map((l) => l.trimEnd());
        const firstLine = summaryLines[0] ?? "";
        const futureLines = summaryLines.slice(1);

        let prFromSummary: number | undefined;
        const replacedFirstLine = firstLine.replace(/^\s*(?:pr|pull|pull\s+request):\s*#?(\d+)/i, (_, pr) => {
            const num = Number.parseInt(pr, 10);
            if (!Number.isNaN(num)) prFromSummary = num;
            return "";
        });

        const [commit] = changeset.commit?.split(",") ?? [];
        const commitToFetch = commit ?? changeset.id;

        let links: { commit?: string } = {};
        let user: string | undefined;
        try {
            const info = await getInfo({
                repo: options.repo,
                commit: commitToFetch,
            });
            links = info.links;
            user = info.user ?? undefined;
        } catch (error) {
            console.warn(
                `Failed to fetch GitHub info for commit ${commitToFetch}:`,
                error instanceof Error ? error.message : String(error),
            );
        }

        let prInfo: Awaited<ReturnType<typeof getInfoFromPullRequest>> | null = null;
        if (prFromSummary !== undefined) {
            try {
                prInfo = await getInfoFromPullRequest({
                    repo: options.repo,
                    pull: prFromSummary,
                });
            } catch (error) {
                console.warn(
                    `Failed to fetch GitHub info for PR #${prFromSummary}:`,
                    error instanceof Error ? error.message : String(error),
                );
            }
        }

        const changelogLines = [`- ${replacedFirstLine || changeset.summary}`, ...futureLines.map((l) => `  ${l}`)];

        if (links.commit) {
            changelogLines[0] += ` (${links.commit})`;
        }

        if (prInfo?.links.pull) {
            changelogLines[0] += ` (${prInfo.links.pull})`;
        }

        if (user) {
            changelogLines[0] += ` (${user})`;
        }

        return changelogLines.join("\n");
    },
    async getDependencyReleaseLine(changesets, dependenciesUpdated, options) {
        if (!options?.repo) {
            throw new Error(
                'Please provide a repo to this changelog generator like this:\n"changelog": ["@portfolio/changelog-config", { "repo": "org/repo" }]',
            );
        }

        if (dependenciesUpdated.length === 0) return "";

        const changesetLinks = changesets.map((cs) => {
            const commitLink = cs.commit ? ` (${cs.commit})` : "";
            return `- Updated dependencies${commitLink}`;
        });

        const updatedDepenenciesList = dependenciesUpdated.map((dep) => `  - ${dep.name}@${dep.newVersion}`);

        return [...changesetLinks, ...updatedDepenenciesList].join("\n");
    },
};

export default changelogFunctions;
