import type { Directory, File } from "../src/filesystem/filesystemTypes";
import { FilesystemType }       from "../src/filesystem/filesystemTypes";

import fs from "node:fs";
import path from "node:path";

function buildTree(directory: string): Directory | File {
    const stats = fs.statSync(directory);

    if (stats.isDirectory()) {
        let node: Directory = {
            type: FilesystemType.directory,
            entries: {}
        };

        const entries = fs.readdirSync(directory);

        for (let entry of entries) {
            const entryPath = path.join(directory, entry);
            node.entries[entry] = buildTree(entryPath);
        }

        return node;
    } else {
        return {
            type: FilesystemType.file,
            content: fs.readFileSync(directory, "utf8")
        };
    }
}

const filesystem = buildTree("../content");
const root = { [FilesystemType.root]: filesystem };

fs.writeFileSync(
    "../src/filesystem/data/filesystem.json",
    JSON.stringify(root, null, 4)
);

