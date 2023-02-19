import { TemplateNode } from "../loader/templateLoader"

export type FileNode =
{
    kind: "file" | "directory",
    children?: FileNode[],
    parent: FileNode | null,
    handle?: FileSystemFileHandle | FileSystemDirectoryHandle,
    name: string,
    file? : FileInfo,
    path?: string,

}

export type FileInfo =
{
    name: string,
    extension: string,
    binary?: ArrayBuffer,
}

export type LoadingState = 
{
    isProgress: boolean,
    maximum: number,
    current: number,
    file: string,
}

export type SelectedTemplates = 
{
    node1: TemplateNode | undefined,
    node2: TemplateNode | undefined,
    node3: TemplateNode | undefined,
    contentNode: TemplateNode | undefined,
}