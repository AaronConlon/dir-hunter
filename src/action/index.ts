import type { OptionValues } from "commander";
import { executeCommand } from "./executeCommand";
import { searchDirectory } from "./searchDirectory";
import { selectDirectory } from "./selectDirectory";

export const defaultAction = async (keyword: string, options: OptionValues) => {
	const dirs = await searchDirectory(keyword ?? "", {
		maxDepth: options.depth,
		gitignore: options.gitignore,
		skipHidden: options.skipHidden,
	});
	const dir = await selectDirectory(dirs);
	executeCommand(dir, dirs, options.windows === "powershell", () =>
		defaultAction(keyword, options),
	);
};
