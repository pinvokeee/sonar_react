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
    bytes: ArrayBuffer | undefined,
    // blob: Blob | undefined,
    objectURL: string,    
}