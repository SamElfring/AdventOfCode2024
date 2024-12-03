const part1 = (corruptedMemory: string) => {
    // Regex to match valid `mul(X,Y)` instructions
    const mulRegex = /mul\(\s*(\d+)\s*,\s*(\d+)\s*\)/g;

    let total = 0;
    let match = null;

    while ((match = mulRegex.exec(corruptedMemory)) !== null) {
        const left = parseInt(match[1]);
        const right = parseInt(match[2]);
        total += left * right;
    }

    return total;
};

const part2 = (corruptedMemory: string) => {
    let total = 0;
    let isEnabled = true;
    let lastIndex = 0;

    while (lastIndex < corruptedMemory.length) {
        // Try to find the next instruction
        const doMatch = corruptedMemory.slice(lastIndex).match(/do\(\)/);
        const dontMatch = corruptedMemory.slice(lastIndex).match(/don't\(\)/);
        const mulMatch = corruptedMemory.slice(lastIndex).match(/mul\(\s*(\d+)\s*,\s*(\d+)\s*\)/);

        // Helper function to get safe index or Infinity if not found
        const getSafeIndex = (match: RegExpMatchArray | null) => (match ? match.index ?? Infinity : Infinity);

        // Find the next instruction
        const doIndex = getSafeIndex(doMatch);
        const dontIndex = getSafeIndex(dontMatch);
        const mulIndex = getSafeIndex(mulMatch);

        if (doIndex <= dontIndex && doIndex <= mulIndex) {
            // do() instruction
            isEnabled = true;
            lastIndex += doIndex + (doMatch?.[0].length ?? 0);
        } else if (dontIndex <= doIndex && dontIndex <= mulIndex) {
            // don't() instruction
            isEnabled = false;
            lastIndex += dontIndex + (dontMatch?.[0].length ?? 0);
        } else if (mulIndex <= doIndex && mulIndex <= dontIndex) {
            // mul() instruction
            if (isEnabled && mulMatch) {
                const x = parseInt(mulMatch[1], 10);
                const y = parseInt(mulMatch[2], 10);
                total += x * y;
            }
            lastIndex += mulIndex + (mulMatch?.[0].length ?? 0);
        } else {
            // No more instructions found
            break;
        }
    }

    return total;
};

const main = () => {
    const fileInput: string = Deno.readTextFileSync("./day03/input.txt");

    console.log("Part 1: " + part1(fileInput));
    console.log("Part 2: " + part2(fileInput));
};

main();
