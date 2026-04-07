export class FilesystemCwdError extends Error {
    constructor() {
        super("Root node doesn't exist in filesystem?");
        this.name = "FilesystemCwdError";
    }
}

