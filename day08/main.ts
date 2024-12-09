type Antennas = Record<string, [number, number][]>;

const parseInput = (input: string): Antennas => {
    const antennas: Antennas = {};

    input.split("\n").forEach((line, y) => {
        line.split("").forEach((char, x) => {
            if (char !== ".") {
                if (!antennas[char]) antennas[char] = [];
                antennas[char].push([x, y]);
            }
        });
    });

    return antennas;
};

const part1 = (antennas: Antennas, width: number, height: number): number => {
    const calculateAntinodes = (antennas: Antennas, width: number, height: number): Set<string> => {
        const antinodes = new Set<string>();

        for (const freq in antennas) {
            const positions = antennas[freq];
            for (let i = 0; i < positions.length; i++) {
                for (let j = 0; j < positions.length; j++) {
                    if (i === j) continue;

                    const [x1, y1] = positions[i];
                    const [x2, y2] = positions[j];

                    // Calculate the vector between the two antennas
                    const dx = x2 - x1;
                    const dy = y2 - y1;

                    // Antinodes only form when the distance between antennas is twice the distance to one antinode
                    const antinode1: [number, number] = [x1 - dx, y1 - dy];
                    const antinode2: [number, number] = [x2 + dx, y2 + dy];

                    [antinode1, antinode2].forEach(([x, y]) => {
                        if (x >= 0 && x < width && y >= 0 && y < height) {
                            antinodes.add(`${x},${y}`);
                        }
                    });
                }
            }
        }

        return antinodes;
    };

    const antinodeSet = calculateAntinodes(antennas, width, height);
    return antinodeSet.size;
};

const main = () => {
    const fileInput: string = Deno.readTextFileSync("./day08/input.txt").trim();

    const antennas = parseInput(fileInput);

    const map = fileInput.split("\n");
    const width = map[0].length;
    const height = map.length;

    console.log("Part 1: " + part1(antennas, width, height));
};

main();
