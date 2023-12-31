import fs from "fs";

function getMatchingNumbers({ card }: { card: string }): number {
	const [_, game] = card.split(":");
	const [raw_winning_numbers, raw_game_numbers] = game.split("|");

	const winning_numbers = raw_winning_numbers.split(" ").filter((n) => n !== "");
	const game_numbers = raw_game_numbers.split(" ").filter((n) => n !== "");

	const matching_numbers = game_numbers.reduce((acc, number) => {
		const is_winner = winning_numbers.includes(number);
		return is_winner ? acc + 1 : acc;
	}, 0);

	return matching_numbers;
}

function solvePart1({ file_path }: { file_path: string }): number {
	const content = fs.readFileSync(file_path, "utf-8");
	const cards = content.split("\r\n");

	const result = cards.reduce((acc, card) => {
		const wins = getMatchingNumbers({ card });
		const points = wins > 0 ? Math.pow(2, wins - 1) : wins;
		return acc + points;
	}, 0);

	return result;
}

function solvePart2({ file_path }: { file_path: string }): number {
	const content = fs.readFileSync(file_path, "utf-8");
	const cards = content.split("\r\n");

	const matching_numbers = cards.map((card) => getMatchingNumbers({ card }));

	const card_copies = cards.map(() => 1);
	for (let i = 0; i < cards.length; i++)
		for (let j = 0; j < card_copies[i]; j++)
			for (let k = 1; k <= matching_numbers[i]; k++) card_copies[i + k] += 1;

	return card_copies.reduce((acc, copies) => acc + copies, 0);
}

export function getDay4Solutions({ file_path }: { file_path: string }) {
	return { part_1: solvePart1({ file_path }), part_2: solvePart2({ file_path }) };
}
