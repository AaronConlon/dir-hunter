import inquirer from "inquirer";

export const inputCommand = async () => {
	const command = (await inquirer.prompt({
		type: "input",
		name: "command",
		message: "Enter command to execute:",
	})) as Promise<string>;
	return command;
};
