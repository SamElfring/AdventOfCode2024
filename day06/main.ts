const part1 = (puzzleInput: string): number => {
    const grid = puzzleInput.split("\n");
    const m = grid.length;
    const n = grid[0].length;

    let r = 0;
    let c = 0;

    // Find the starting position
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === "^") {
                r = i;
                c = j;
                break;
            }
        }
    }

    const directions: [number, number][] = [
        [-1, 0], // Up
        [0, 1], // Right
        [1, 0], // Down
        [0, -1] // Left
    ];

    let directionIndex = 0; // Start with the first direction
    const visited = new Set<string>();
    visited.add(`${r},${c}`);

    while (true) {
        const d = directions[directionIndex];
        const newR = r + d[0];
        const newC = c + d[1];

        // Check boundary
        if (newR < 0 || newR >= m || newC < 0 || newC >= n) {
            break;
        }

        if (grid[newR][newC] === "#") {
            // Change direction if hitting a wall
            directionIndex = (directionIndex + 1) % directions.length;
        } else {
            // Move to the new position
            r = newR;
            c = newC;
            visited.add(`${r},${c}`);
        }
    }

    return visited.size;
};

const main = () => {
    const fileInput: string = Deno.readTextFileSync("./day06/input.txt");

    console.log("Part 1: " + part1(fileInput));
};

main();
