import { execSync } from "node:child_process";
import { dynamicSelect } from "../utils";

export const getCommand = async (): Promise<string> => {
	// @ts-ignore
	global?.__rl__?.close();
	const shell = process.env.SHELL?.split("/")?.pop();
	const rawString = execSync("history", {
		encoding: "utf-8",
		shell,
	});
	const history = rawString
		.toString()
		.split("\n")
		.filter((i) => i.trim() !== "");
	const choices = [...new Set(history)];

	return dynamicSelect(choices);
};
