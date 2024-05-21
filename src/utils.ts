import readline from "node:readline";
import { bold, green } from "kleur";

export const clearScreen = () => {
	process.stdout.write("\x1B[2J\x1B[0f");
};

export function printBoxedString(str: string) {
	const width = process.stdout.columns;
	const line = "-".repeat(width);
	console.log(line);
	console.log(str);
	console.log(line);
}

export const dynamicSelect = async (rawOptions: string[]): Promise<string> => {
	return new Promise((resolve, reject) => {
		let inputString = "";
		let options = [...rawOptions];
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});

		let selectedIndex = 0;
		const printOptions = () => {
			clearScreen();
			console.log(
				`\ninput or pick an option with ${green("↑")} and ${green(
					"↓",
				)} keys and press ${green("Enter")} to select\n`,
			);
			options
				.filter((i) => i.trim().length !== 0)
				.slice(0, 15)
				.map((i) => i.replace(inputString, green(inputString)))
				.forEach((option, index) => {
					if (index === selectedIndex) {
						console.log(`${green(">")} ${option}`);
					} else {
						console.log(`  ${option}`);
					}
				});
			if (inputString === "") {
				console.log(green("\nType...\n"));
			} else {
				console.log(
					`\n${bold().underline().blue("Input")} ${bold().red("[")}${green(
						inputString,
					)}${bold().red("]")}\n`,
				);
			}
		};
		printOptions();

		const handleKeyPress = (
			str: string,
			key: { name: string; ctrl: boolean; sequence: string },
		) => {
			switch (key.name) {
				case "up":
					selectedIndex = Math.max(0, selectedIndex - 1);
					readline.clearScreenDown(process.stdout);
					printOptions();
					readline.cursorTo(process.stdout, Number.MAX_SAFE_INTEGER, 0);
					break;
				case "down":
					selectedIndex = Math.min(options.length - 1, selectedIndex + 1);
					readline.clearScreenDown(process.stdout);
					printOptions();
					readline.cursorTo(process.stdout, Number.MAX_SAFE_INTEGER, 0);
					break;
				case "return":
					if (inputString === "") {
						return;
					}
					rl.close();
					// @ts-ignore
					rl.input.off("keypress", handleKeyPress);
					resolve(options[selectedIndex]);
					break;
				case "backspace": {
					inputString = inputString.slice(0, -1);
					const filteredOptions = rawOptions.filter((option) =>
						option.toLowerCase().includes(inputString),
					);
					options = [inputString, ...filteredOptions];
					break;
				}
				case "escape":
					rl.close();
					// @ts-ignore
					rl.input.off("keypress", handleKeyPress);
					reject("User to back");
					break;
				default:
					if (key.sequence.length === 1) {
						selectedIndex = 0;
						const keyString = key.sequence;
						const input = keyString.toLowerCase();
						const filteredOptions = options.filter((option) =>
							option.toLowerCase().includes(input),
						);
						inputString += keyString;
						options = [inputString, ...filteredOptions];
						printOptions();
					}
					break;
			}
		};
		// @ts-ignore
		rl.input.on("keypress", handleKeyPress);
	});
};
