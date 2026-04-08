import { cwdFromFilesystem } from "../filesystem/filesystem.js";
import { FilesystemType } from "../filesystem/filesystemTypes.js";
import { NormalGreenLine } from "../formatting/terminalContent.js";
import { pushContent } from "../terminal/terminalWriter.js";

export async function executeCAT(args: string[]): Promise<void> {
    const cwd = cwdFromFilesystem();

    for (let target of args) {
        const file = cwd.entries[target];
        if (!file) {
            pushContent(
                new NormalGreenLine(`cat: ${target}: No such file or directory`));
            continue;
        }

        if (file.type == FilesystemType.directory) {
            pushContent(new NormalGreenLine(`cat: ${target}: Is a directory`));
        } else {
            pushContent(new NormalGreenLine(file.content));
        }
    }
}

