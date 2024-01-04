import { getDay1Solutions } from "./days/day-1";
import { getDay2Solutions } from "./days/day-2";
import { getDay3Solutions } from "./days/day-3";
import { getDay4Solutions } from "./days/day-4";
import { getDay5Solutions } from "./days/day-5";
import { printDay } from "./utils";

printDay({
	number_of_day: 1,
	...getDay1Solutions({ file_path: "src/inputs/day-1.txt" }),
});

printDay({
	number_of_day: 2,
	...getDay2Solutions({ file_path: "src/inputs/day-2.txt" }),
});

printDay({
	number_of_day: 3,
	...getDay3Solutions({ file_path: "src/inputs/day-3.txt" }),
});

printDay({
	number_of_day: 4,
	...getDay4Solutions({ file_path: "src/inputs/day-4.txt" }),
});

printDay({
	number_of_day: 5,
	...getDay5Solutions({ file_path: "src/inputs/day-5.txt" }),
});
