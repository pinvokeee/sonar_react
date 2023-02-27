// export type DirectoryObject = 
// {
//     nodes: FileSystemNode[],   
// }

export type FileSystemHandleData =
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
    path: string,
    children?: FileSystemNode[],
    parent?: FileSystemNode,
}

export type FileInfo =
{
    name: string,
    extension: string,
    binary: ArrayBuffer | undefined,
}