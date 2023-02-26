// export type DirectoryObject = 
// {
//     nodes: FileSystemNode[],   
// }

export type HandleNode =
{
    name: string,
    path: string[],
    kind: "file" | "directory",
    handle?: FileSystemFileHandle | FileSystemDirectoryHandle,
    file? : FileInfo,
}

export type FileSystemNode =
{
    name: string,
    kind: "file" | "directory",
    path: string,
    children?: FileSystemNode[],
    parent?: FileSystemNode,
    handle?: FileSystemFileHandle | FileSystemDirectoryHandle,
    file? : FileInfo,
}

export type FileInfo =
{
    name: string,
    extension: string,
    binary: ArrayBuffer | undefined,
}