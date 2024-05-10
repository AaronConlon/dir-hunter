#!/usr/bin/env node
import { Command } from "commander";
import figlet from "figlet";
import gradient from "gradient-string";
import { defaultAction } from "./action";

console.log(
	gradient(
		"orange",
		"red",
		"cyan",
		"pink",
	)(`${figlet.textSync("Dir Hunter")}\n`),
);

const program = new Command();

try {
	program
		.name("directory-hunter")
		.version("0.0.7")
		.description(
			"A simple CLI tool to search for directories and execute commands in your system",
		)
		.argument("[keyword]", "Directory keyword to search for")
		.option(
			"-d, --depth <value>",
			"Search scope about the max depth of dir,default value is 5",
		)
		.option(
			"-g, --gitignore <value>",
			"Ignore directories listed in the .gitignore file",
			true,
		)
		.option(
			"-w, --windows-powershell <value>",
			"Use windows powershell: cmd or powershell",
			"powershell",
		)
		.option("-s, --skip-hidden <value>", "Skip hidden directories", true)
		.action(defaultAction)
		.parse(process.argv);
} catch (_) {}
