type Rules = Map<number, Set<number>>;
type Updates = number[][];

class Puzzle {
    private static parseInput(input: string) {
        const lines = input.trim().split("\n");
        const rules: Rules = new Map();
        const updates: Updates = [];

        // Parse rules
        let i = 0;
        while (i < lines.length) {
            const line = lines[i];
            if (line.includes("|")) {
                const [before, after] = line.split("|").map(Number);
                if (!rules.has(before)) rules.set(before, new Set());
                rules.get(before)!.add(after);
            } else if (line.trim() === "") {
                break;
            }
            i++;
        }

        // Parse updates
        while (i < lines.length) {
            const line = lines[i].trim();
            if (line) {
                updates.push(line.split(",").map(Number));
            }
            i++;
        }

        return { rules, updates };
    }

    private static isValidOrder = (update: number[], rules: Rules): boolean => {
        for (let i = 0; i < update.length - 1; i++) {
            const current = update[i];
            const next = update[i + 1];
            if (rules.has(current) && !rules.get(current)!.has(next)) {
                return false;
            }
        }
        return true;
    };

    private static part1(rules: Rules, updates: Updates): number {
        const validUpdates = updates.filter((update) => this.isValidOrder(update, rules));

        const middlePageNumbers = validUpdates.map((update) => update[Math.floor((update.length - 1) / 2)]);

        return middlePageNumbers.reduce((sum, num) => sum + num, 0);
    }

    private static part2(rules: Rules, updates: Updates): number {
        const middleValues: number[] = [];

        const reorderUpdate = (update: number[], rules: Rules): number[] => {
            return update.slice().sort((a, b) => {
                if (rules.has(a) && rules.get(a)!.has(b)) return -1;
                if (rules.has(b) && rules.get(b)!.has(a)) return 1;
                return b - a; // Default to descending order
            });
        };

        for (const update of updates) {
            if (!this.isValidOrder(update, rules)) {
                const sortedUpdate = reorderUpdate(update, rules);
                const middleIndex = Math.floor(sortedUpdate.length / 2);
                middleValues.push(sortedUpdate[middleIndex]);
            }
        }

        return middleValues.reduce((sum, value) => sum + value, 0);
    }

    public static solve(input: string) {
        const { rules, updates } = this.parseInput(input);

        return {
            part1: this.part1(rules, updates),
            part2: this.part2(rules, updates)
        };
    }
}

const main = () => {
    const fileInput = Deno.readTextFileSync("./day05/input.txt").trim();

    const result = Puzzle.solve(fileInput);

    console.log("Part 1:", result.part1);
    console.log("Part 2:", result.part2);
};

main();
