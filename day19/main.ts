interface Solved {
    part1: number;
    part2: number;
}

type Towels = string[];
type Patterns = string[];

class Puzzle {
    private static whichLineEndings(input: string) {
        const temp = input.indexOf("\n");
        if (input[temp - 1] === "\r") {
            return "CRLF";
        }

        return "LF";
    }

    private static parseInput(input: string): [Towels, Patterns] {
        const normalizedInput = this.whichLineEndings(input) == "CRLF" ? input.replace(/\r\n/g, "\n") : input;

        const blocks = normalizedInput.split("\n\n");

        return [blocks[0].split(", "), blocks[1].split("\n")];
    }

    public static solve(input: string): Solved {
        const [towels, patterns] = this.parseInput(input);

        const memo = new Map();
        memo.set("", 1);

        const solveRecurse = (pattern: string) => {
            if (memo.has(pattern)) {
                return memo.get(pattern);
            }

            if (pattern == "") {
                return true;
            }

            let count = 0;
            for (const towel of towels) {
                if (pattern.startsWith(towel)) {
                    if (solveRecurse(pattern.slice(towel.length))) {
                        count += memo.get(pattern.slice(towel.length));
                    }
                }
            }

            memo.set(pattern, count);
            return count > 0;
        };

        let part1 = 0;
        let part2 = 0;

        for (let i = 0; i < patterns.length; i++) {
            const pattern = patterns[i];

            solveRecurse(pattern);
            part1 += memo.get(pattern) > 0 ? 1 : 0;
            part2 += memo.get(pattern);
        }

        return {
            part1,
            part2
        };
    }
}

const main = () => {
    const fileInput: string = Deno.readTextFileSync("./day19/input.txt");

    const results = Puzzle.solve(fileInput);

    console.log("Part 1: " + results.part1);
    console.log("Part 2: " + results.part2);
};

main();
