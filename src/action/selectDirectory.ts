import inquirer from "inquirer";
import { cyan, red } from "kleur";

export const selectDirectory = async (dirs: string[]) => {
	inquirer.registerPrompt("search-list", require("inquirer-search-list"));

	return inquirer
		.prompt([
			{
				type: "search-list",
				message: cyan("Select a directory:"),
				name: "dir",
				choices: dirs,
			},
		])
		.then(({ dir }: { dir: string }) => dir)
		.catch((_) => {
			console.log(red("Error: Invalid directory. Please try again."));
			process.exit(-1);
		});
};
