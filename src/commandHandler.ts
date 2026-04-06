import { DivStyle }                             from "./types/styles";
import { TextContent, type TerminalContent }    from "./types/terminalContent";
import { clearTerminal, pushContent }           from "./terminalWriter";

export async function handleTerminalCommand(command: string): void {
    switch (command.split(' ')[0]) {
        case "clear":
            clearTerminal();
            break;

        case "help":
            await displayHelpText();
            break;

        case "cd":
            await executeCD(command);
            break;

        case "ls":
            await executeLS(command);
            break;

        case "cat":
            break;

        case "exit":
            break;

        default:
            await pushContent(generateCommandNotFoundLine(command));
            break;
    }
}

function generateCommandNotFoundLine(command: string): TerminalContent {
    return new TextContent(
        DivStyle.greenTextNormal,
        command.split(' ')[0] + ": command not found"
    );
}

