interface Registers {
    a: number;
    b: number;
    c: number;
}

interface Solved {
    part1: string;
    part2: number;
}

type Program = number[];

class Puzzle {
    private static format(input: string): [Registers, Program] {
        const fullProgram = input.split("\n");

        const registerStrings = fullProgram.slice(0, 3);
        const registers: Registers = {
            a: parseInt(registerStrings[0].split(": ")[1]),
            b: parseInt(registerStrings[1].split(": ")[1]),
            c: parseInt(registerStrings[2].split(": ")[1])
        };

        const program: Program = fullProgram
            .slice(-1)[0]
            .split(": ")[1]
            .split(",")
            .map((v) => parseInt(v));

        return [registers, program];
    }

    private static mod(n: number, m: number): number {
        return ((n % m) + m) % m;
    }

    private static getComboValue(operand: number, registers: Registers): number {
        if ([0, 1, 2, 3].includes(operand)) return operand;
        if (operand === 4) return registers.a;
        if (operand === 5) return registers.b;
        if (operand === 6) return registers.c;
        return operand; // For case 7, return the operand itself
    }

    private static runProgram(registers: Registers, program: Program): string {
        const out: number[] = [];
        let ptr = 0;

        while (program[ptr] !== undefined) {
            const code = program[ptr];
            const operand = program[ptr + 1];
            const combo = this.getComboValue(operand, registers);

            let jumped = false;

            switch (code) {
                case 0: // adv
                    registers.a = Math.trunc(registers.a / Math.pow(2, combo));
                    break;
                case 1: // bxl
                    registers.b = (registers.b ^ operand) >>> 0;
                    break;
                case 2: // bst
                    registers.b = this.mod(combo, 8);
                    break;
                case 3: // jnz
                    if (registers.a !== 0) {
                        ptr = operand;
                        jumped = true;
                    }
                    break;
                case 4: // bxc
                    registers.b = (registers.b ^ registers.c) >>> 0;
                    break;
                case 5: // out
                    out.push(this.mod(combo, 8));
                    break;
                case 6: // bdv
                    registers.b = Math.trunc(registers.a / Math.pow(2, combo));
                    break;
                case 7: // cdv
                    registers.c = Math.trunc(registers.a / Math.pow(2, combo));
                    break;
                default:
                    throw new Error(`Unknown opcode: ${code}`);
            }

            if (!jumped) ptr += 2;
        }

        return out.join(",");
    }

    private static part1(registers: Registers, program: Program): string {
        return this.runProgram(registers, program);
    }

    private static part2(registers: Registers, program: Program): number {
        interface QueueItem {
            result: string;
            len: number;
        }

        const Q: QueueItem[] = [{ result: "", len: 0 }];

        while (Q.length > 0) {
            const q = Q.shift()!;

            if (q.len === program.length) {
                return parseInt(q.result, 2);
            }

            const from = parseInt(q.result + "000", 2);
            const to = parseInt(q.result + "111", 2);
            const expect = program.slice((q.len + 1) * -1).join(",");

            for (let a = from; a <= to; a++) {
                const testRegisters: Registers = {
                    a,
                    b: registers.b,
                    c: registers.c
                };

                const r = this.runProgram(testRegisters, program);

                if (r === expect) {
                    Q.push({
                        result: a.toString(2),
                        len: q.len + 1
                    });
                }
            }
        }

        return 0; // No solution found
    }

    public static solve(input: string): Solved {
        const [registers, program] = this.format(input);

        return {
            part1: this.part1(registers, program),
            part2: this.part2(registers, program)
        };
    }
}

const main = (): void => {
    const fileInput: string = Deno.readTextFileSync("./day17/input.txt").trim();

    const results = Puzzle.solve(fileInput);

    console.log("Part 1:", results.part1);
    console.log("Part 2:", results.part2);
};

main();
