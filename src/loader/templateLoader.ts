import { FileSystemNode } from "../class/fileSystem/types";

type TemplateNodeType = "directory" | "unknown" | "text" | "excelbook" | "html" | "markdown";

export type TemplateNode = 
{
    name: string,
    fullName: string,
    type: TemplateNodeType,
    bytes?: ArrayBuffer,
    children?: TemplateNode[],
    fileNode: FileSystemNode,
    handle: FileSystemFileHandle | FileSystemDirectoryHandle | undefined,
    path?: string,
}

export const createTemplateTree = async (sourceFileNode: FileSystemNode[]) =>
{
    return await callCreateTemplateTree(sourceFileNode);
}

export const reloadTemplateData = async (node: TemplateNode) =>
{
    await readFileHandle(node.fileNode);
}

const readFileHandle = async (n: FileSystemNode) =>
{
    if (n.kind == "file")
    {
        const handle : FileSystemFileHandle = n.handle as FileSystemFileHandle;
        const file = await handle.getFile();

        const type = getTemplateType(n.file?.extension as string);

        const node : TemplateNode = 
        {
            name: n.file?.name as string,
            fullName: `${n.file?.name}.${n.file?.extension}`,
            bytes: type != "unknown" ? (await file.arrayBuffer()) : undefined,
            handle,
            type,
            fileNode: n,
            path: n.path,
        }

        return node;
    }
    else
    {
        const node : TemplateNode = 
        {
            name: n.name,
            fullName: `${n.name}`,
            type: "directory",
            handle: n.handle,
            children: [],
            fileNode: n,
            path: n.path,
        }

        if (n.children != undefined) node.children?.push(...await callCreateTemplateTree(n.children, node));
        
        return node;
    }
}

const callCreateTemplateTree = async (sourceFileNode: FileSystemNode[], parentNode?: TemplateNode) =>
{
    const temp : TemplateNode[] = [];

    for (const n of sourceFileNode)
    {
        const node = await readFileHandle(n);
        temp.push(node);
    }

    return temp;
}

const getTemplateType = (extension: string) : TemplateNodeType => 
{
    if (extension == "txt") return "text";
    if (extension == "xlsx") return "excelbook";
    if (extension == "html") return "html";
    if (extension == "md") return "markdown";

    return "unknown";
}