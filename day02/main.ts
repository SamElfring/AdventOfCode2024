class LevelValidator {
    private static isLevelValid(level: number[]): boolean {
        const isIncreasing = level.every((val, i) => i === 0 || val > level[i - 1]);
        const isDecreasing = level.every((val, i) => i === 0 || val < level[i - 1]);
        const isValidAdjacent = level.every(
            (val, i) => i === 0 || (Math.abs(val - level[i - 1]) >= 1 && Math.abs(val - level[i - 1]) <= 3)
        );
        return (isIncreasing || isDecreasing) && isValidAdjacent;
    }

    private static part1(reports: number[][]): number {
        return reports.filter((level) => this.isLevelValid(level)).length;
    }

    private static part2(reports: number[][]): number {
        const canBeMadeValid = (level: number[]): boolean => {
            for (let i = 0; i < level.length; i++) {
                const newRow = level.slice(0, i).concat(level.slice(i + 1)); // Remove one level
                if (this.isLevelValid(newRow)) return true;
            }
            return false;
        };

        return reports.reduce((safeCount, level) => {
            const isValid = this.isLevelValid(level);
            const canFix = isValid || canBeMadeValid(level);
            return safeCount + (canFix ? 1 : 0);
        }, 0);
    }

    public static processInput(fileInput: string): { part1: number; part2: number } {
        // Normalize input
        const reports: number[][] = fileInput.split("\n").map((x) => x.split(" ").map((y) => parseInt(y)));

        // Calculate problems
        return {
            part1: this.part1(reports),
            part2: this.part2(reports)
        };
    }
}

const main = () => {
    const fileInput = Deno.readTextFileSync("./day02/input.txt");
    const results = LevelValidator.processInput(fileInput);

    console.log("Part 1:", results.part1);
    console.log("Part 2:", results.part2);
};

main();
