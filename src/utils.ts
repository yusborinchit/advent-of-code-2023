export function printDay({
	number_of_day,
	part_1,
	part_2,
}: {
	number_of_day: number;
	part_1: number;
	part_2: number;
}): void {
	console.log("*".repeat(16));
	console.log(`🎄 Day ${number_of_day}`);
	console.log("-".repeat(16));
	console.log(`Part 1 Solution: ${part_1}`);
	console.log(`Part 2 Solution: ${part_2}`);
}
