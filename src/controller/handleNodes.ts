import { useCallback } from "react";
import { selector, selectorFamily, useRecoilCallback, useRecoilState, useRecoilValue } from "recoil";
import { FileSystemNode } from "../class/fileSystem/types";
import { AtomHandleNodes, selectedFileNodes } from "../define/recoil/atoms";
import { selectorKeys } from "../define/recoil/keys";

export const handleNodes = 
{
    useActions: () =>
    {
        const [ns, setNodes] = useRecoilState(AtomHandleNodes);

        return {

            setNEwNodes: () =>
            {
                setNodes((dirObj) => ({ ...dirObj, nodes: [] }));
            },

            loadFile: (node: FileSystemNode) =>
            {
                return new Promise(async (resolve, reject) =>
                {
                    if (node.file != undefined)
                    {
                        const handle: FileSystemFileHandle = node.handle as FileSystemFileHandle;
                        node = { ...node, file: { ...node.file, binary: await (await handle.getFile()).arrayBuffer()} }

                        const top = util.getTopParent(node);
                        console.log(node, top);

                        setNodes((nodes) => 
                        {
                            node.name = "changed";
                            const n = nodes.map(n => n.path == top.path ? top : n);
                            // const n = nodes.map(n => n.path == getTopParent.path ? getTopParent : n);
                            return [...n];
                        });                        

                        resolve(node);
                    }
                });
    
            }
        }
    },

    selectors:
    {
        useFileNodesSelector: () => useRecoilValue(Selector.getDirectoryObject),
        useTemplatesDirectoryNode: () => useRecoilValue(Selector.getDirectoryNode("テンプレート")),
    }
}

const Selector = 
{
    getDirectoryObject: selector<FileSystemNode[]>({
        key: selectorKeys.SEL_FILENODES,
        get: ({get}) => get(AtomHandleNodes)
    }),

    getDirectoryNode: selectorFamily<FileSystemNode | undefined, string>({
        key: selectorKeys.SEL_FILENODE_ITEM,
        get: (name) => ({get}) => 
        {
            return get(AtomHandleNodes).find((n) => n.kind == "directory" && n.name == name);
        }
    }),
}

const util =
{
    getTopParent: (fsn: FileSystemNode): FileSystemNode =>
    {
        console.log("T!", fsn);
        if (fsn.parent == undefined) return fsn;
        return util.getTopParent(fsn.parent);

        // let getTopParent = node;
                
        // while (getTopParent?.parent != null) 
        // {
        //     getTopParent = getTopParent.parent;
        // }   
    }
}