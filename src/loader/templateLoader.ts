import { FileNode } from "../types";

type TemplateNodeType = "directory" | "unknown" | "text" | "excelbook" | "html";

export type TemplateNode = 
{
    name: string,
    type: TemplateNodeType,
    bytes?: ArrayBuffer,
    children?: TemplateNode[],
}

export const createTemplateTree = async (sourceFileNode: FileNode[]) =>
{
    return await callCreateTemplateTree(sourceFileNode);
}

const callCreateTemplateTree = async (sourceFileNode: FileNode[], parentNode?: TemplateNode) =>
{
    const temp : TemplateNode[] = [];

    for (const n of sourceFileNode)
    {
        if (n.kind == "file")
        {
            const handle : FileSystemFileHandle = n.handle as FileSystemFileHandle;
            const file = await handle.getFile();

            const type = getTemplateType(n.file?.extension as string);

            const node : TemplateNode = 
            {
                name: n.file?.name as string,
                bytes: type != "unknown" ? (await file.arrayBuffer()) : undefined,
                type
            }

            temp.push(node);
        }
        else
        {
            const node : TemplateNode = 
            {
                name: n.name,
                type: "directory",
                children: [],
            }

            if (n.children != null) node.children?.push(...await callCreateTemplateTree(n.children, node));
            
            temp.push(node);
        }
    }

    return temp;
}

const getTemplateType = (extension: string) : TemplateNodeType => 
{
    if (extension == "txt") return "text";
    if (extension == "xlsx") return "excelbook";
    if (extension == "html") return "html";

    return "unknown";
}