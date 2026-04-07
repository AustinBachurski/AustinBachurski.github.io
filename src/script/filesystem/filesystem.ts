import type { Directory, File, Root }   from "./filesystemTypes.js";
import { FilesystemCwdError }           from "./errors.js";
import { FilesystemType }               from "./filesystemTypes.js";
import { assertElementExists }          from "../utilities/utilities.js";

export async function initializeFilesystem(): Promise<void> {
    cwdDisplay = assertElementExists<HTMLSpanElement>("#terminal-cwd-display");
    filesystem = await readFilesystem("/data/filesystem.json");
}

export function cwdFromFilesystem(path = cwdDisplay.textContent.split('/')): Directory {
    let cwd = filesystem[FilesystemType.root];

    for (let dir of path) {
        if (!cwd) {
            throw new FilesystemCwdError();
        }

        let next: Directory | File | undefined = cwd.entries[dir];

        if (!next || next.type == FilesystemType.file) {
            throw new Error("Current working directory display is corrupted.")
        };

        cwd = next;
    }

    if (!cwd) {
        throw new FilesystemCwdError();
    }

    return cwd;
}

let cwdDisplay: HTMLSpanElement;
let filesystem: Root;

async function readFilesystem(pathToFilesystem: string): Promise<Root> {
    const response = await fetch(pathToFilesystem);
    const data = await response.json() as Root;
    return data;
}

