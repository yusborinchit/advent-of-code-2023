import fs from "fs";

function filterAndParse({ array }: { array: string[] }): number[] {
	return array.filter((s) => s !== "").map((s) => +s);
}

function solvePart1({ file_path }: { file_path: string }): number {
	const content = fs.readFileSync(file_path, "utf-8");

	const [seeds, ...maps] = content.split("\r\n\r\n");
	const seeds_id = filterAndParse({ array: seeds.split(":")[1].split(" ") });

	const lowest_location = seeds_id.reduce((acc, seed_id) => {
		let source_id = seed_id;

		for (const map of maps) {
			const [_, ...calibrations] = map.split("\r\n");

			let already_change = false;
			for (const calibration of calibrations) {
				if (already_change) continue;

				const [destination_start, source_start, length] = filterAndParse({
					array: calibration.split(" "),
				});

				const source_end = source_start + length - 1;
				const is_in_range = source_id >= source_start && source_id <= source_end;

				if (!is_in_range) continue;

				const id_offset = source_id - source_start;

				source_id = destination_start + id_offset;
				already_change = true;
			}
		}

		return source_id < acc ? source_id : acc;
	}, seeds_id[0]);

	return lowest_location;
}

function solvePart2({ file_path }: { file_path: string }): number {
	return 0;
}

export function getDay5Solutions({ file_path }: { file_path: string }) {
	return { part_1: solvePart1({ file_path }), part_2: solvePart2({ file_path }) };
}
