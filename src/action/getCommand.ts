import inquirer from "inquirer";
import { cyan, red } from "kleur";

export const getCommand = () => {
	return inquirer
		.prompt([
			{
				type: "input",
				message: cyan("Run your command:"),
				name: "task",
				validate: (value: string) => {
					if (value.length) {
						return true;
					}
					return "Please enter a command";
				},
			},
		])
		.then(({ task }: { task: string }) => task)
		.catch((_) => {
			console.log(red("Error: Invalid command. Please try again."));
			process.exit(-1);
		});
};
