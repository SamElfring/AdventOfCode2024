const part1 = (left: number[], right: number[]) => {
    const leftSorted = left.sort((a, b) => a - b);
    const rightSorted = right.sort((a, b) => a - b);

    let total = 0;

    for (let i = 0; i < left.length; i++) {
        const leftNumber = leftSorted[i];
        const rightNumber = rightSorted[i];

        total += Math.abs(leftNumber - rightNumber);
    }

    return total;
};

const part2 = (left: number[], right: number[]) => {
    let total = 0;

    for (let i = 0; i < left.length; i++) {
        const leftNumber = left[i];
        const amountOfTimesInRight = right.filter((x) => x === leftNumber).length;

        total += leftNumber * amountOfTimesInRight;
    }

    return total;
};

const main = () => {
    const fileInput: string = Deno.readTextFileSync("./day01/input.txt");

    // Normalize input
    const left: number[] = [];
    const right: number[] = [];

    for (const i of fileInput.split(/[ ,]+/).join().split("\n")) {
        const x: string[] = i.split(",");

        left.push(parseInt(x[0]));
        right.push(parseInt(x[1]));
    }

    // Calculate problems
    console.log("Part 1: " + part1(left, right));
    console.log("Part 2: " + part2(left, right));
};

main();
