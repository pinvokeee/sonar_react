export type FileSystemTreeNode =
{
    name: string,
    path: string,
    children?: FileSystemTreeNode[],
    parent?: FileSystemTreeNode,
}

export type FileInfo =
{
    name: string,
    extension: string,
    content: Content,
}

export type Content = 
{
    binary: ArrayBuffer | undefined,
    // blob: Blob | undefined,
    objectURL: string,    
}