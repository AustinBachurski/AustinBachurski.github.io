import type { Directory, File, Root }            from "./filesystemTypes";
import { FilesystemType }       from "./filesystemTypes";
import { assertElementExists }  from "../utilities/utilities";

export function cwdFromFilesystem(): Directory {
    const path = cwdDisplay.textContent.split('/').filter(Boolean);

    let cwd = filesystem[FilesystemType.root];


    for (let dir of path) {
        if (!cwd) {
            throw new Error("Root node doesn't exist in filesystem?");
        }

        let next: Directory | File | undefined = cwd.entries[dir];

        if (!next || next.type == FilesystemType.file) {
            throw new Error("Current working directory display is corrupted.")
        };

        cwd = next;
    }

    if (!cwd) {
        throw new Error("Current working directory display is corrupted.")
    }

    return cwd;
}

const cwdDisplay = assertElementExists<HTMLSpanElement>("#terminal-cwd-display");
const filesystem = await readFilesystem("./data/filesystem.json");

async function readFilesystem(pathToFilesystem: string): Promise<Root> {
    const response = await fetch(pathToFilesystem);
    const data = await response.json() as Root;
    return data;
}

