import { execSync } from "node:child_process";
import { join } from "node:path";
import confirm from "@inquirer/confirm";
import { bold } from "kleur";
import { clearScreen } from "../utils";
import { getCommand } from "./getCommand";

export const executeCommand = async (
	dir: string,
	dirs: string[],
	windowsPowershell?: boolean,
	rePickDirs = () => {},
) => {
	try {
		clearScreen();
		const command = await getCommand();
		const absolutePath = join(process.cwd(), dir);
		const shell = process.env.SHELL?.split("/")?.pop();
		console.log(`\n${bold().green("Execute:")} ${command}\n`);
		execSync(command, {
			shell,
			cwd: absolutePath,
			stdio: "inherit",
		});
		// @ts-ignore
		global?.__rl__?.close();
		const answer = await confirm({
			message: bold().green("\n\t\tContinue?"),
		});
		if (!answer) {
			clearScreen();
			execSync("clear", {
				shell,
				cwd: absolutePath,
				stdio: "inherit",
			});
		} else {
			executeCommand(dir, dirs, windowsPowershell, rePickDirs);
		}
	} catch (_) {
		clearScreen();
		console.log(_);
		rePickDirs();
	}
};
