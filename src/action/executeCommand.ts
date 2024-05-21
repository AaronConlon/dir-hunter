import { execSync } from "node:child_process";
import { join } from "node:path";
// import confirm from "@inquirer/confirm";
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
		const command = await getCommand(windowsPowershell);
		const absolutePath = join(process.cwd(), dir);
		const shell = process.env.SHELL?.split("/")?.pop();
		const isWindows = process.platform === "win32";
		clearScreen();
		console.log(`\n${bold().underline().green("Execute:")} ${command}\n`);
		execSync(command, {
			shell: isWindows ? (windowsPowershell ? "powershell" : "cmd") : shell,
			cwd: absolutePath,
			stdio: "inherit",
		});
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		(global as any).__pause__ = true;
		console.log(
			bold()
				.underline()
				.green(
					"\nKeep going?Type new command or press ESC to re-pick directory.\n",
				),
		);
		executeCommand(dir, dirs, windowsPowershell, rePickDirs);
	} catch (_) {
		clearScreen();
		console.log(_);
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		(global as any).__pause__ = false;
		rePickDirs();
	}
};
