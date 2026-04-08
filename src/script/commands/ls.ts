import type { Directory }               from "../filesystem/filesystemTypes.js";
import { FilesystemCwdError }           from "../filesystem/errors.js";
import { FilesystemType }               from "../filesystem/filesystemTypes.js";
import { BlankLine, NormalGreenLine }   from "../formatting/terminalContent.js";
import { WriteDelay }                   from "../terminal/writeDelay.js";
import { assertElementExists }          from "../utilities/utilities.js";
import { cwdFromFilesystem }            from "../filesystem/filesystem.js";
import { pushContent }                  from "../terminal/terminalWriter.js";

export async function executeLS(args: string[]): Promise<void> {
    let flags: string[] = [];
    let paths: string[] = [];

    for (let arg of args) {
        if (arg.startsWith('-')) {
            flags.push(arg.replace('-', ''));
        } else {
            paths.push(arg);
        }
    }

    if (await unsupportedFlag(flags)) {
        return;
    }

    if (paths.length > 1) {
        const validPaths = await purgeInvalidPaths(paths);

        let firstArg = true;
        for (let path of validPaths) {
            if (!firstArg) {
                await pushContent(new BlankLine());
            }

            await pushContent(new NormalGreenLine(`${path}:`));
            await exec(flags.join(""), path);
            firstArg = false;
        }
    } else {
        await exec(flags.join(""), paths.join(""));
    }
}

const cwdDisplay = assertElementExists<HTMLSpanElement>("#terminal-cwd-display");
const supportedFlags = ["l"];

async function unsupportedFlag(flags: string[]): Promise<Boolean> {
    for (let flag of flags) {
        if (!supportedFlags.includes(flag)) {
            await pushContent(new NormalGreenLine(
                `ls: invalid option -- '${flag}'`, WriteDelay.ms_0));
            return true;
        }
    }

    return false;
}

async function purgeInvalidPaths(args: string[]): Promise<string[]> {
    let validPaths: string[] = [];

    for (let target of args) {
        const dirs = target.split('/').filter(Boolean);

        let cwd = cwdFromFilesystem();
        let path = cwdDisplay.textContent.split('/').filter(Boolean);
        let ok = true;
        let fileHit = false;

        for (let dir of dirs) {
            if (fileHit) {
                // If a file was found and there's still content in the path
                // then the argument is invalid.
                reportError(target, "Not a directory");
                ok = false;
                break;
            }

            if (dir == "..") {
                path.pop();
                cwd = cwdFromFilesystem(path);
                continue;
            }

            if (!(dir in cwd.entries)) {
                reportError(target, "No such file or directory");
                ok = false;
                break;
            }

            const next = cwd.entries[dir];

            if (!next || next.type == FilesystemType.file) {
                fileHit = true;
                continue;
            }

            path.push(dir);
            cwd = next;
        }

        if (ok) {
            validPaths.push(target);
        }
    }

    return validPaths;
}

async function reportError(target: string, message: string): Promise<void> {
    await pushContent(new NormalGreenLine(
        `ls: cannot access '${target}': ${message}`, WriteDelay.ms_0));
}

async function findTargetDirectory(args: string): Promise<Directory | undefined> {
    let cwd = cwdFromFilesystem();

    if (!args) {
        return cwd;
    }

    const dirs = args.split('/').filter(Boolean);
    let path = cwdDisplay.textContent.split('/').filter(Boolean);

    for (let dir of dirs) {
        if (dir == "..") {
            path.pop();
            cwd = cwdFromFilesystem(path);
            continue;
        }

        if (!(dir in cwd.entries)) {
            reportError(args, "No such file or directory");
            return undefined;
        }

        if ((cwd.entries[dir]!).type != FilesystemType.directory) {
            await pushContent(new NormalGreenLine(dir));
            return undefined;
        }

        const next = cwd.entries[dir];

        if (!next || next.type == FilesystemType.file) {
            throw new FilesystemCwdError();
        }

        path.push(dir);
        cwd = next;
    }

    return cwd;
}

async function ls(args: string): Promise<void> {
    const directory = await findTargetDirectory(args);

    if (!directory) { return; }

    let items: string[] = [];

    for (let entry of Object.keys(directory.entries)) {
        if (directory.entries[entry]!.type == FilesystemType.file) {
            items.push(entry);
        } else {
            items.push(`${entry}/`);
        }
    }

    await pushContent(new NormalGreenLine(items.join(' ')));
}

async function ls_l(args: string): Promise<void> {
    const directory = await findTargetDirectory(args);

    if (!directory) { return; }

    for (let entry of Object.keys(directory.entries)) {
        if (directory.entries[entry]!.type == FilesystemType.file) {
            await pushContent(new NormalGreenLine(entry));
        } else {
            await pushContent(new NormalGreenLine(`${entry}/`));
        }
    }
}

async function exec(flags: string, args: string): Promise<void> {
    switch (flags) {
        case "":
            await ls(args);
            break;
        case "l":
            await ls_l(args);
            break;
    }
}

