import readline from "node:readline";
import { green } from "kleur";

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
	clearScreen();
	// @ts-ignore
	global?.__rl__?.close();
	return new Promise((resolve, reject) => {
		let inputString = "";
		let options = [...rawOptions];
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});
		// @ts-ignore
		global.__rl__ = rl;

		let selectedIndex = 0;
		const printOptions = () => {
			console.log("\n\n");
			console.log(
				`input or pick an option with ${green("↑")} and ${green(
					"↓",
				)} keys and press ${green("Enter")} to select`,
			);
			console.log("\n");

			options
				.filter((i) => i.trim().length !== 0)
				.slice(0, 15)
				.map((i) => i.replace(inputString, green(inputString)))
				.forEach((option, index) => {
					if (index === selectedIndex) {
						console.log(`${green(">")} ${option}\n`);
					} else {
						console.log(`  ${option}\n`);
					}
				});
			if (inputString === "") {
				console.log(green("\nType...\n"));
			}
		};

		printOptions();
		// @ts-ignore
		rl.input.on(
			"keypress",
			(str: string, key: { name: string; ctrl: boolean }) => {
				switch (key.name) {
					case "up":
						selectedIndex = Math.max(0, selectedIndex - 1);
						break;
					case "down":
						selectedIndex = Math.min(options.length - 1, selectedIndex + 1);
						break;
					case "return":
						rl.close();
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
						reject("User to back");
						break;
					default:
						if (key.ctrl) {
							rl.close();
							process.exit(0);
						}
						if (/^.$/.test(key.name) || key.name === "space") {
							selectedIndex = 0;
							// filter options by input
							const keyString = key.name === "space" ? " " : key.name;
							const input = keyString.toLowerCase();
							const filteredOptions = options.filter((option) =>
								option.toLowerCase().includes(input),
							);
							inputString += keyString;
							options = [inputString, ...filteredOptions];
						} else {
							rl.close();
							process.exit(0);
						}
						break;
				}
				readline.clearScreenDown(process.stdout);
				printOptions();
				readline.cursorTo(process.stdout, Number.MAX_SAFE_INTEGER, 0);
			},
		);
	});
};
