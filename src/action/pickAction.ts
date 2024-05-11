import select from "@inquirer/select";
import { cyan } from "kleur";

export const rePickCommand = async () => {
	return select({
		message: cyan("Select next step:"),
		choices: [
			{
				name: "continue",
				value: "continue",
			},
			{
				name: "re-pick directory",
				value: "re-pick",
			},
		],
	});
};
