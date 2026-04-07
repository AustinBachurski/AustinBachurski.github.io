import { NormalGreenLine, type TerminalContent }    from "../formatting/terminalContent.js";
import { clearTerminal, pushContent }               from "../terminal/terminalWriter.js";
import { displayHelpText }                          from "../commands/help.js";
import { executeCD }                                from "../commands/cd.js";
import { executeLS }                                from "../commands/ls.js";
import { executeCAT }                               from "../commands/cat.js";
import { executeEXIT }                              from "../commands/exit.js";

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

        case "help":
            await displayHelpText();
            break;

        case "cd":
            await executeCD(args);
            break;

        case "ls":
            await executeLS(args);
            break;

        case "cat":
            await executeCAT(args);
            break;

        case "exit":
            await executeEXIT(args);
            break;

        default:
            await pushContent(generateCommandNotFoundLine(command));
            break;
    }
}

function generateCommandNotFoundLine(command: string): TerminalContent {
    return new NormalGreenLine(
        `${command.split(' ').filter(Boolean)[0]}: command not found`);
}

