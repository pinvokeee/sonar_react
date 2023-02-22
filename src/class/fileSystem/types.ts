export type FileSystemNode =
{
    name: string,
    kind: "file" | "directory",
    children?: FileSystemNode[],
    parent?: FileSystemNode,
    handle?: FileSystemFileHandle | FileSystemDirectoryHandle,
    file? : FileInfo,
    path?: string,
}

export type FileInfo =
{
    name: string,
    extension: string,
    binary?: ArrayBuffer,
}