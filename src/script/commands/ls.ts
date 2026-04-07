import { FilesystemType }               from "../filesystem/filesystemTypes.js";
import { AmberLine, NormalGreenLine }   from "../formatting/terminalContent.js";
import { cwdFromFilesystem }            from "../filesystem/filesystem.js";
import { pushContent }                  from "../terminal/terminalWriter.js";

export async function executeLS(args: string[]): Promise<void> {
    if (args.length > 0) {
        await lsWithArguments(args);
    } else {
        await lsNoArguments();
    }
}

async function lsNoArguments(): Promise<void> {
    const cwd = cwdFromFilesystem();

    for (let entry of Object.keys(cwd.entries)) {
        if (entry == FilesystemType.file) {
            pushContent(new AmberLine(entry));
        } else {
            pushContent(new NormalGreenLine(entry));
        }
    }
}

// @ts-ignore
async function lsWithArguments(args: string[]): Promise<void> {

    // TODO: Handle Args.
    throw new Error("Not implemented!");
}

