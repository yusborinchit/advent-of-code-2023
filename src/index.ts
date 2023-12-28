import { getDay1Part1Solution, getDay1Part2Solution } from "./days/day-1";

function printDay({
    number_of_day,
    part_1,
    part_2,
}: {
  number_of_day: number;
  part_1: number;
  part_2: number;
}): void {
    console.log(`
    ${"*".repeat(16)}
    🎄 Day ${number_of_day}
    ${"-".repeat(16)}
    Part 1 Solution: ${part_1}
    Part 2 Solution: ${part_2}
  `);
}

const day_1 = {
    number_of_day: 1,
    part_1: getDay1Part1Solution({ file_path: "src/inputs/day-1.txt" }),
    part_2: getDay1Part2Solution({ file_path: "src/inputs/day-1.txt" }),
}; 

printDay(day_1);
