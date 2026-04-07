import { FilesystemType }               from "../filesystem/filesystemTypes";
import { AmberLine, NormalGreenLine }   from "../formatting/terminalContent";
import { cwdFromFilesystem }            from "../filesystem/filesystem";
import { pushContent }                  from "../terminal/terminalWriter";

export async function executeLS(args: string[]): Promise<void> {
    if (args) {
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

async function lsWithArguments(args: string[]): Promise<void> {

    // TODO: Handle Args.
    throw new Error("Not implemented!");
}

