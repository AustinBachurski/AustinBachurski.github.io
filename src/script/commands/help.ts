import type { TerminalContent }         from "../formatting/terminalContent.js";
import { NormalGreenLine }              from "../formatting/terminalContent.js";
import { pushContent }                  from "../terminal/terminalWriter.js";
import { catHelpContent }               from "./helpContent/cat.js";
import { clearHelpContent }             from "./helpContent/clear.js";
import { cdHelpContent }                from "./helpContent/cd.js";
import { helpContent, helpHelpContent } from "./helpContent/help.js";
import { exitHelpContent }              from "./helpContent/exit.js";
import { lsHelpContent }                from "./helpContent/ls.js";

export async function executeHELP(args: string[]): Promise<void> {
    switch (args[0]) {
        case "cat":
            await display(catHelpContent);
        break;

        case "clear":
            await display(clearHelpContent);
        break;

        case "cd":
            await display(cdHelpContent);
            break;

        case "ls":
            await display(lsHelpContent);
        break;

        case "help":
            await display(helpHelpContent);
            break;

        case "exit":
            await display(exitHelpContent);
        break;

        case undefined:
            await display(helpContent);
            break;

        default:
            await pushContent(
                new NormalGreenLine(`help: no help topics match '${args[0]}'.`));
    }
}

async function display(content: TerminalContent[]): Promise<void> {
    for (let line of content) {
        await pushContent(line);
    }
}

