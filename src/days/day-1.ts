import fs from "fs";

const ORIGINAL_NUMBERS: string[] = [
	"one",
	"two",
	"three",
	"four",
	"five",
	"six",
	"seven",
	"eight",
	"nine",
];

const REVERSE_NUMBERS: string[] = [
	"eno",
	"owt",
	"eerht",
	"ruof",
	"evif",
	"xis",
	"neves",
	"thgie",
	"enin",
];

function searchNumberInLine({
	line,
	start,
	numbers_to_search,
}: {
	line: string;
	start: number;
	numbers_to_search: string[];
}): number | null {
	if (line[start].match(/\d/)) return +line[start];

	if (!numbers_to_search.some((num) => num.startsWith(line[start]))) return null;

	let acc = line[start];
	for (let i = start + 1; i < line.length; i++) {
		if (!numbers_to_search.some((num) => num.startsWith(acc))) return null;

		const number = numbers_to_search.findIndex((num) => num === acc);
		if (number !== -1) return number + 1;

		acc += line[i];
	}

	return null;
}

function solvePart1({ file_path }: { file_path: string }): number {
	const content = fs.readFileSync(file_path, "utf-8");

	const result = content.split("\r\n").reduce((acc, line) => {
		const reverse_line = line.split("").reverse().join("");

		let i = 0;
		while (!line[i].match(/\d/)) i++;

		let j = 0;
		while (!reverse_line[j].match(/\d/)) j++;

		const number = +`${line[i]}${reverse_line[j]}`;

		return acc + number;
	}, 0);

	return result;
}

function solvePart2({ file_path }: { file_path: string }): number {
	const content = fs.readFileSync(file_path, "utf-8");

	const result = content.split("\r\n").reduce((acc, line) => {
		const reverse_line = line.split("").reverse().join("");

		let first_digit: number | null = null;
		let last_digit: number | null = null;

		let i = 0;
		while (first_digit === null) {
			first_digit = searchNumberInLine({
				line,
				start: i,
				numbers_to_search: ORIGINAL_NUMBERS,
			});
			i++;
		}

		let j = 0;
		while (last_digit === null) {
			last_digit = searchNumberInLine({
				line: reverse_line,
				start: j,
				numbers_to_search: REVERSE_NUMBERS,
			});
			j++;
		}

		const number = +`${first_digit}${last_digit}`;

		return acc + number;
	}, 0);

	return result;
}

export function getDay1Solutions({ file_path }: { file_path: string }) {
	return { part_1: solvePart1({ file_path }), part_2: solvePart2({ file_path }) };
}
