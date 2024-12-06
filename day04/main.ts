const part1 = (grid: string[][]) => {
    const WORD = "XMAS";

    // Directions: right, down-right, down, down-left, left, up-left, up, up-right
    const DIRECTIONS = [
        [0, 1], // right
        [1, 1], // down-right
        [1, 0], // down
        [1, -1], // down-left
        [0, -1], // left
        [-1, -1], // up-left
        [-1, 0], // up
        [-1, 1] // up-right
    ];

    const checkWordFromPosition = (
        grid: string[][],
        startRow: number,
        startCol: number,
        deltaRow: number,
        deltaCol: number
    ): number => {
        const rows = grid.length;
        const cols = grid[0].length;
        let count = 0;

        // Check if we can fit the entire word in this direction
        if (
            startRow + deltaRow * (WORD.length - 1) >= 0 &&
            startRow + deltaRow * (WORD.length - 1) < rows &&
            startCol + deltaCol * (WORD.length - 1) >= 0 &&
            startCol + deltaCol * (WORD.length - 1) < cols
        ) {
            // Check if the word matches
            let match = true;
            for (let i = 0; i < WORD.length; i++) {
                const r = startRow + i * deltaRow;
                const c = startCol + i * deltaCol;
                if (grid[r][c] !== WORD[i]) {
                    match = false;
                    break;
                }
            }

            // If match found, increment count
            if (match) {
                count++;
            }
        }

        return count;
    };

    const findXMAS = (grid: string[][]): number => {
        const rows = grid.length;
        const cols = grid[0].length;
        let count = 0;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                for (const [dr, dc] of DIRECTIONS) {
                    count += checkWordFromPosition(grid, r, c, dr, dc);
                }
            }
        }

        return count;
    };

    return findXMAS(grid);
};

const part2 = (grid: string[][]) => {
    const rows = grid.length;
    const cols = grid[0].length;
    let xmasCount = 0;

    const check = (r: number, c: number): boolean => {
        if (grid[r][c] !== "A") return false;

        // Ensure all diagonal positions are within bounds
        if (
            r - 1 >= 0 &&
            c - 1 >= 0 && // Upper-left
            r - 1 >= 0 &&
            c + 1 < cols && // Upper-right
            r + 1 < rows &&
            c - 1 >= 0 && // Down-left
            r + 1 < rows &&
            c + 1 < cols // Down-right
        ) {
            // Get diagonal values
            const ul = grid[r - 1][c - 1]; // Upper-left
            const ur = grid[r - 1][c + 1]; // Upper-right
            const dl = grid[r + 1][c - 1]; // Down-left
            const dr = grid[r + 1][c + 1]; // Down-right

            // Check if diagonals form the correct pattern
            const diagonals = [ul, ur, dl, dr].sort();
            return diagonals.join("") === "MMSS" && ul !== dr;
        }

        return false; // Out of bounds
    };

    // Iterate over the grid, skipping edges
    for (let r = 1; r < rows - 1; r++) {
        for (let c = 1; c < cols - 1; c++) {
            if (check(r, c)) {
                xmasCount++;
            }
        }
    }

    return xmasCount;
};

const main = () => {
    const fileInput: string = Deno.readTextFileSync("./day04/input.txt");

    const grid = fileInput.split("\n").map((line) => line.split(""));

    console.log("Part 1: " + part1(grid));
    console.log("Part 2: " + part2(grid));
};

main();
