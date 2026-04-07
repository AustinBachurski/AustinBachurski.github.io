import { NormalGreenLine, type TerminalContent }    from "../formatting/terminalContent";
import { clearTerminal, pushContent }               from "../terminal/terminalWriter";
import { displayHelpText }                          from "../commands/help";
import { executeCD }                                from "../commands/cd";
import { executeLS }                                from "../commands/ls";
import { executeCAT }                               from "../commands/cat";
import { executeEXIT }                              from "../commands/exit";

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
    return new NormalGreenLine( command.split(' ')[0] + ": command not found");
}

