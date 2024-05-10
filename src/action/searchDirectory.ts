import { existsSync, readFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { fdir } from "fdir";
import ignore from "ignore";

// 123 22 222 22xx4 dsadas 33

export const searchDirectory = async (
	keyword: string,
	options?: {
		maxDepth?: number;
		gitignore?: boolean | string;
		skipHidden?: boolean | string;
	},
): Promise<string[]> => {
	const { maxDepth = 5, gitignore = true, skipHidden = true } = options ?? {};
	const currentPath = process.cwd();
	const isExistGitIgnore = existsSync(join(currentPath, ".gitignore"));
	let ignoreContent = "";
	const ig = ignore();
	if (isExistGitIgnore) {
		ignoreContent = readFileSync(join(currentPath, ".gitignore"), "utf-8");
		ig.add(ignoreContent);
	}

	const crawler = new fdir()
		.withRelativePaths()
		.onlyDirs()
		.exclude((dirName) => {
			let skip = false;
			if (gitignore === true || gitignore === "true") {
				if (!isExistGitIgnore) {
					skip = false;
				} else {
					skip = ig.ignores(dirName);
				}
			}
			if (skip === false && (skipHidden === true || skipHidden === "true")) {
				// check dirName is hidden
				skip = dirName.startsWith(".");
			}

			return skip;
		})
		.withMaxDepth(maxDepth)
		.filter((path: string) => {
			const _keyword = keyword.trim();
			if (_keyword === "") return true;
			return path.includes(_keyword);
		});

	const dirs = await crawler.crawl(currentPath).withPromise();
	// cover to relative path
	return dirs.map((i: string) =>
		resolve(i) === resolve(currentPath) ? "." : relative(currentPath, i),
	);
};
