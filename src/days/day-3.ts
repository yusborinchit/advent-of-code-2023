import fs from "fs";

interface EngineCore {
	x: number;
	y: number;
}

interface EnginePart {
	start_x: number;
	start_y: number;
	end_y: number;
	number: string;
}

const MATRIX_DIR = [
	[-1, -1],
	[-1, 0],
	[-1, 1],
	[0, -1],
	[0, 1],
	[1, -1],
	[1, 0],
	[1, 1],
];

function isPartInRange({
	x,
	y,
	start_x,
	start_y,
	end_y,
}: {
	x: number;
	y: number;
	start_x: number;
	start_y: number;
	end_y: number;
}): boolean {
	const is_in_same_x = x === start_x;
	const is_in_same_y = y >= start_y && y <= end_y;
	return is_in_same_x && is_in_same_y;
}

function getPosiblePartsAndCores({
	engine,
	isCore,
}: {
	engine: string[][];
	isCore: ({ char }: { char: string }) => boolean;
}): {
	cores: EngineCore[];
	posible_parts: EnginePart[];
} {
	const cores: EngineCore[] = [];
	const posible_parts: EnginePart[] = [];

	let part_aux: EnginePart = { start_x: -1, start_y: -1, end_y: -1, number: "" };
	for (let x = 0; x < engine.length; x++) {
		for (let y = 0; y < engine[x].length; y++) {
			const char = engine[x][y];

			const is_number = /\d/.test(char);
			const is_final_char = y === engine[x].length - 1;

			if (isCore({ char })) cores.push({ x, y });

			if (is_number) part_aux.number += char;
			if (is_number && part_aux.start_y === -1) {
				part_aux.start_y = y;
				part_aux.start_x = x;
			}

			if ((!is_number && part_aux.number) || (is_number && is_final_char)) {
				part_aux.end_y = y - 1;
				posible_parts.push({ ...part_aux });
				part_aux = { start_x: -1, start_y: -1, end_y: -1, number: "" };
			}
		}
	}

	return {
		cores,
		posible_parts,
	};
}

function solvePart1({ file_path }: { file_path: string }): number {
	const content = fs.readFileSync(file_path, "utf-8");
	const engine = content.split("\r\n").map((line) => line.split(""));

	const { cores, posible_parts } = getPosiblePartsAndCores({
		engine,
		isCore: ({ char }: { char: string }) => !/[\d.]/.test(char),
	});

	const result = cores.reduce((acc, { x, y }) => {
		const total_parts = MATRIX_DIR.reduce((acc, [dir_x, dir_y]) => {
			const new_x = dir_x + x;
			const new_y = dir_y + y;

			const part_index = posible_parts.findIndex(({ start_x, start_y, end_y }) => {
				return isPartInRange({ x: new_x, y: new_y, start_x, start_y, end_y });
			});

			if (part_index === -1) return acc;

			const [part] = posible_parts.splice(part_index, 1);
			const part_number = +part.number;

			return acc + part_number;
		}, 0);
		return acc + total_parts;
	}, 0);

	return result;
}

function solvePart2({ file_path }: { file_path: string }): number {
	const content = fs.readFileSync(file_path, "utf-8");
	const engine = content.split("\r\n").map((line) => line.split(""));

	const { cores, posible_parts } = getPosiblePartsAndCores({
		engine,
		isCore: ({ char }: { char: string }) => char === "*",
	});

	const result = cores.reduce((acc, { x, y }) => {
		const total_parts = MATRIX_DIR.reduce((acc, [dir_x, dir_y]) => {
			const new_x = dir_x + x;
			const new_y = dir_y + y;

			const part_index = posible_parts.findIndex(({ start_x, start_y, end_y }) => {
				return isPartInRange({ x: new_x, y: new_y, start_x, start_y, end_y });
			});

			if (part_index === -1) return acc;

			const [part] = posible_parts.splice(part_index, 1);
			const part_number = +part.number;

			acc.push(part_number);
			return acc;
		}, []);

		const [first_part, second_part] = total_parts;

		return total_parts.length !== 2 ? acc : acc + first_part * second_part;
	}, 0);

	return result;
}

export function getDay3Solutions({ file_path }: { file_path: string }) {
	return { part_1: solvePart1({ file_path }), part_2: solvePart2({ file_path }) };
}
