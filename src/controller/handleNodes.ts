import { useCallback } from "react";
import { selector, selectorFamily, useRecoilCallback, useRecoilState, useRecoilValue } from "recoil";
import { FileSystemNode } from "../class/fileSystem/types";
import { AtomHandleNodes, AtomSelectedHandleNodes } from "../define/recoil/atoms";
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

                        const p = helper.updateParentNode(node);

                        setNodes((nodes) => 
                        {
                            const n = nodes.map(n => n.path == p.path ? p : n);
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

const helper =
{
    updateParentNode: (source: FileSystemNode, target?: FileSystemNode): FileSystemNode =>
    {

        // console.log(source);
        if (source.parent == undefined) return source;

        source.name = "changed";

        const children = source.parent.children?.map(a => a.path == source.path ? source : a);
        source.parent = { ...source.parent, children }
        
        return helper.updateParentNode(source.parent);
    },

    getTopParent: (fsn: FileSystemNode): FileSystemNode =>
    {
        console.log("T!", fsn);
        if (fsn.parent == undefined) return fsn;
        return helper.getTopParent(fsn.parent);

        // let getTopParent = node;
                
        // while (getTopParent?.parent != null) 
        // {
        //     getTopParent = getTopParent.parent;
        // }   
    }
}