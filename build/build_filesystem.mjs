import fs from "node:fs";
import path from "node:path";

function buildTree(directory) {
    let node;
    const stats = fs.statSync(directory);

    if (stats.isDirectory()) {
        node = { type: "directory" };
        node.entries = {};
        
        const entries = fs.readdirSync(directory);

        for (let entry of entries) {
            const entryPath = path.join(directory, entry);
            node.entries[entry] = buildTree(entryPath);
        }
    } else {
        node = { type: "file" };
        node.content = fs.readFileSync(directory, "utf8");
    }

    return node;
}

const filesystem = buildTree("../content");
const root = {
    "/": filesystem
};

fs.writeFileSync("../src/filesystem.json", JSON.stringify(root, null, 4));

