// export type DirectoryObject = 
// {
//     nodes: FileSystemNode[],   
// }

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