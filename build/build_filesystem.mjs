import fs from "node:fs";
import path from "node:path";

function buildTree(directory) {
    const stats = fs.statSync(directory);
    const node = { name: path.basename(directory) };

    if (stats.isDirectory()) {
        node.type = "directory";
        node.children = fs.readdirSync(directory).map(child => 
            buildTree(path.join(directory, child))
        );
    } else {
        node.type = "file";
        node.content = fs.readFileSync(directory, "utf8");
    }

    return node;
}

const filesystem = buildTree("../content");

fs.writeFileSync("../src/filesystem.json", JSON.stringify(filesystem));

