export const _a = "";

// import React, { useState } from "react";
// import { FileNode } from "../types"

// export type TemplateType = "directory" | "text" | "html" | "excel";

// export type TemplateNode =
// {
//     name: string,
//     kind: TemplateType,
//     text?: string,
//     binary?: Uint8Array,
//     children?: TemplateNode[],
// }

// export type TemplateStore =
// {
//     nodes: TemplateNode[],
// }

// export const useTemplates = (props: Prop) =>
// {
//     const [store, setStore] = useState<TemplateStore>({
//         nodes: [],
//     });

//     createTemplateStore(props.TopFileNode).then((n)=>
//     {
//         console.log(n);
//     });

//     return {
//         store
//     };
// }

// const createTemplateStore = (topNode: FileNode) =>
// {
//     return createTemplateNode(topNode);
// }

// const createTemplateNode = async (targetNode: FileNode, parentTemplateNode?: TemplateNode) =>
// {
//     const arr = [];

//     if (targetNode.kind == "directory")
//     {
//         const parent : TemplateNode = {
//             name: targetNode.name,
//             kind: "directory",
//             children: [],
//         }

//         if (targetNode.children != null)
//         {
//             for (const node of targetNode!.children)
//             {
//                 await createTemplateNode(node, parent);
//             }
//         }

//         arr.push(parent);
//     }
//     else
//     {
//         if (targetNode.file != null)
//         {
//             // if (targetNode.file?.extension != "txt" && targetNode.file?.extension != "html")
    
//             const file_handle: FileSystemFileHandle = targetNode.handle as FileSystemFileHandle;
//             const file_kind: TemplateType = targetNode.file?.extension as TemplateType;
        
//             const file = await file_handle.getFile();
//             const bin = await file.arrayBuffer();

//             const newNode : TemplateNode = 
//             {
//                 name: targetNode.name,
//                 kind: file_kind,    
//             }

//             if (parentTemplateNode != null) parentTemplateNode.children?.push(newNode);

//             arr.push(newNode);
//         }
//     }

//     console.log(arr);

//     return arr;
// }

// type Prop = 
// {
//     TopFileNode: FileNode,
// }