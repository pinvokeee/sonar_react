import { FileSystemTreeNode } from "../../class/fileSystem/types"

export type DialogState = 
{ 
    name: string,
}

export type LoadingState =
{
    isProgress: boolean,
    currentProgress: number,
    maximumProgress: number,
    currentNode: FileSystemTreeNode | undefined,
}