export const enum FilesystemType {
    root        = "/",
    file        = "file",
    directory   = "directory",
};

export type Root = {
    [path: string]: Directory;
};

export type File = {
    type:       FilesystemType.file;
    content:    string;
};

export type Directory = {
    type:       FilesystemType.directory;
    entries:    { [key: string]: Directory | File };
};

