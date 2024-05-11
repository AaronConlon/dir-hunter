import { type ChildProcess, exec } from "node:child_process";
import { join } from "node:path";
import iconv from "iconv-lite";
import { bgRed } from "kleur";
import { getCommand } from "./getCommand";
import { rePickCommand } from "./pickAction";
import { selectDirectory } from "./selectDirectory";

export const executeCommand = async (
	dir: string,
	dirs: string[],
	windowsPowershell?: boolean,
) => {
	const command = await getCommand();
	const absolutePath = join(process.cwd(), dir);

	const isWindows = process.platform === "win32";

	let child: ChildProcess;
	if (isWindows) {
		child = exec(command, {
			maxBuffer: 1024 * 1024 * 10,
			encoding: "binary",
			shell: windowsPowershell ? "powershell" : "cmd",
		});
		child.stdout?.on("data", (data) => {
			console.log(iconv.decode(Buffer.from(data, "binary"), "cp936"));
		});
		child.stderr?.on("data", (data) => {
			let stdout = "";
			const t = iconv.decode(Buffer.from(data, "binary"), "utf-8");
			if (!t.includes("\uFFFD")) {
				stdout = t;
			} else {
				stdout = iconv.decode(Buffer.from(data, "binary"), "cp936");
			}
			console.log(`${bgRed("ERROR:")}\t${stdout.replace(/^.*?\:/, "")}`);
		});
	} else {
		child = exec(command, {
			cwd: absolutePath,
			shell: process.env.SHELL?.split("/")?.pop(),
		});
		child.stdout?.pipe(process.stdout);
		child.stderr?.on("data", (data) => {
			const msg = data.toString();
			console.log(`${bgRed("ERROR:")}\t${msg.replace(/^.*?\:/, "")}`);
		});
	}
	child.on("exit", async () => {
		try {
			// continue or re-pick directory
			const nextAction = await rePickCommand();
			if (nextAction === "re-pick") {
				const newDir = await selectDirectory(dirs);
				executeCommand(newDir, dirs, windowsPowershell);
			} else {
				executeCommand(dir, dirs, windowsPowershell);
			}
		} catch (_) {}
	});
};
