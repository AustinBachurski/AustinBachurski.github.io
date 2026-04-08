import { NormalGreenLine }              from "../formatting/terminalContent.js";
import { clearTerminal, pushContent }   from "../terminal/terminalWriter.js";
import { executeCAT }                   from "./cat.js";
import { executeCD }                    from "./cd.js";
import { executeEXIT }                  from "./exit.js";
import { executeHELP }                  from "./help.js";
import { executeLS }                    from "./ls.js";

export async function handleTerminalCommand(input: string): Promise<void> {
    const args = input.split(' ').filter(Boolean);
    const command = args.shift();

    if (!command) {
        throw new Error("Splitting the input string resulted in an empty args array?");
    }

    switch (command) {
        case "clear":
            clearTerminal();
            break;

        case "cat":
            await executeCAT(args);
            break;

        case "cd":
            await executeCD(args);
            break;

        case "exit":
            await executeEXIT(args);
            break;

        case "help":
            await executeHELP(args);
            break;

        case "ls":
            await executeLS(args);
            break;

        default:
            await pushContent(new NormalGreenLine(
                `${command.split(' ').filter(Boolean)[0]}: command not found`));
            break;
    }
}

