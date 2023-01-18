import { useState } from "react";
import { FileNode } from "../types"

export type TemplateNode =
{
    name: string,
    kind: "directory" | "text" | "html" | "excel",
    text?: string,
    binary?: Uint8Array,
    children?: TemplateNode[],
}

export type TemplateStore =
{
    nodes: TemplateNode[],
}

export const useTemplates = (props: Prop) =>
{
    const [store, setStore] = useState<TemplateStore>({
        nodes: [],
    });

    return store;
}

const createTemplateStore = (topNode: FileNode) =>
{
    createTemplateNode(topNode).then(node => 
    {
        console.log(node);
    });


    
    // createTemplateNode(topNode, );

    /**
     * a-
     *  b-
     * c-
     *  d-
     */
}

const createTemplateNode = async (targetNode: FileNode, parentTemplateNode?: TemplateNode) : Promise<TemplateNode | null> =>
{
    return new Promise(async (resolve, reject) =>
    {
        if (targetNode.kind == "directory")
        {
            const parent : TemplateNode = {
                name: targetNode.name,
                kind: "directory",
            }

            if (targetNode.children != null)
            {
                for (const node of targetNode!.children)
                {
                    await createTemplateNode(node, parent);
                }
            }

            resolve(parent);
        }
        else
        {
            if (targetNode.file != null)
            {
                // if (targetNode.file?.extension != "txt" && targetNode.file?.extension != "html")
        
                const file_handle: FileSystemFileHandle = targetNode.handle as FileSystemFileHandle;

                let file_kind: "directory" | "text" | "html" | "excel";
                file_kind = targetNode.file?.extension as "directory" | "text" | "html" | "excel";
            
                const file = await file_handle.getFile();
                const bin = await file.arrayBuffer();

                const newNode : TemplateNode = 
                {
                    name: targetNode.name,
                    kind: file_kind,    
                }

                if (parentTemplateNode != null) parentTemplateNode.children?.push(newNode);

                resolve(newNode);
            }
        }
    });

}

type Prop = 
{
    TopFileNode: FileNode,
}