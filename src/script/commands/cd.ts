import { FilesystemCwdError }   from "../filesystem/errors.js";
import { FilesystemType }       from "../filesystem/filesystemTypes.js";
import { NormalGreenLine }      from "../formatting/terminalContent.js";
import { assertElementExists }  from "../utilities/utilities.js";
import { cwdFromFilesystem }    from "../filesystem/filesystem.js";
import { pushContent }          from "../terminal/terminalWriter.js";

export async function executeCD(args: string[]): Promise<void> {
    if (args.length == 0) {
        cwdDisplay.textContent = '~';
        return;
    }

    if (args.length > 1) {
        pushContent(new NormalGreenLine("cd: too many arguments"));
        return;
    }

    traverseFilesystem(args[0]!);
}

const cwdDisplay = assertElementExists<HTMLSpanElement>("#terminal-cwd-display");

async function traverseFilesystem(target: string): Promise<void> {
    const args = target.split('/').filter(Boolean);

    let cwd = cwdFromFilesystem();
    let path = cwdDisplay.textContent.split('/').filter(Boolean);

    for (let dir of args) {
        if (dir == "..") {
            path.pop();
            cwd = cwdFromFilesystem(path);
            continue;
        }

        if (!(dir in cwd.entries)) {
            reportError(target, "No such file or directory");
            return;
        }

        if ((cwd.entries[dir]!).type != FilesystemType.directory) {
            reportError(target, "Not a directory");
            return;
        }

        const next = cwd.entries[dir];

        if (!next || next.type == FilesystemType.file) {
            throw new FilesystemCwdError();
        }

        path.push(dir);
        cwd = next;
    }

    const result = path.join('/');
    cwdDisplay.textContent = result.length > 0 ? result : '/';
}

function reportError(target: string, message: string): void {
    pushContent(new NormalGreenLine(`cd: ${target}: ${message}`));
}

