export type FileNode =
{
    kind: "file" | "directory",
    children?: FileNode[],
    parent: FileNode | null,
    handle?: FileSystemFileHandle | FileSystemDirectoryHandle,
    name: string,
    file? : FileInfo,
}

export type FileInfo =
{
    name: string,
    extension: string,
    binary?: ArrayBuffer,
}