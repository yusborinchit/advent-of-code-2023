import fs from "fs";

export function getDay2Part1Solution({ file_path }: { file_path: string }): number {
	const content = fs.readFileSync(file_path, "utf-8");

	const total_cubes: { [key: string]: number } = {
		red: 12,
		green: 13,
		blue: 14,
	};

	const result = content.split("\r\n").reduce((acc, line) => {
		const [name, game] = line.split(":");
		const [_, id] = name.split(" ");

		const sets = game.split(";").map((set) => set.split(","));
		const is_valid = sets.every((cubes) =>
			cubes.every((cube) => {
				const [count, color] = cube.split(" ").slice(1);
				return +count <= total_cubes[color];
			})
		);

		const number_id = +id;

		return is_valid ? acc + number_id : acc;
	}, 0);

	return result;
}

export function getDay2Part2Solution({ file_path }: { file_path: string }): number {
	const content = fs.readFileSync(file_path, "utf-8");

	const result = content.split("\r\n").reduce((acc, line) => {
		const [_, game] = line.split(":");

		const current_cubes: { [key: string]: number } = {
			red: -1,
			green: -1,
			blue: -1,
		};

		const sets = game.split(";").map((set) => set.split(","));
		sets.forEach((cubes) =>
			cubes.forEach((cube) => {
				const [count, color] = cube.split(" ").slice(1);

				const is_greater = +count > current_cubes[color];
				const is_first_value = current_cubes[color] === -1;

				current_cubes[color] = is_greater || is_first_value ? +count : current_cubes[color];
			})
		);

		const power = current_cubes["red"] * current_cubes["green"] * current_cubes["blue"];

		return acc + power;
	}, 0);

	return result;
}
