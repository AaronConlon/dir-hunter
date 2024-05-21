import { execSync } from "node:child_process";
import { dynamicSelect } from "../utils";
import { inputCommand } from "./inputCommand";

export const getCommand = async (isPowershell?: boolean): Promise<string> => {
	const shell = process.env.SHELL?.split("/")?.pop();
	const isWindows = process.platform === "win32";
	if (isWindows && !isPowershell) {
		return inputCommand();
	}
	const rawString = execSync("history", {
		encoding: "utf-8",
		shell: isWindows ? "powershell" : shell,
	});
	const history = rawString
		.toString()
		.split("\n")
		.filter((i) => i.trim() !== "");
	const choices = [...new Set(history)];

	return dynamicSelect(choices);
};
