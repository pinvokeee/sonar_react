import { useCallback } from "react";
import { selector, selectorFamily, useRecoilCallback, useRecoilState, useRecoilValue } from "recoil";
import { FileSystemNode } from "../class/fileSystem/types";
import { AtomHandleNodes, AtomSelectedFileNodes } from "../define/recoil/atoms";
import { selectorKeys } from "../define/recoil/keys";
import { MapExt } from "../util/util";

export const handleNodes = 
{
    useActions: () =>
    {
        const [ns, setNodes] = useRecoilState(AtomHandleNodes);

        return {

            loadFile: (node: FileSystemNode) =>
            {
                return new Promise(async (resolve, reject) =>
                {
                    if (node.file != undefined)
                    {
                        const handle: FileSystemFileHandle = node.handle as FileSystemFileHandle;
                        node = { ...node, file: { ...node.file, binary: await (await handle.getFile()).arrayBuffer()} }

                        const top = util.getTopParent(node);

                        setNodes((nodes) => 
                        {
                            // node.name = "changed";
                            // const n = nodes.map(n => n.path == top.path ? top : n);
                            // console.log(n);
                            // // const n = nodes.map(n => n.path == getTopParent.path ? getTopParent : n);
                            // return [...n];

                            return nodes;
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
    getDirectoryObject: selector<Map<string, FileSystemNode>>({
        key: selectorKeys.SEL_FILENODES,
        get: ({get}) => get(AtomHandleNodes)
    }),

    getDirectoryNode: selectorFamily<FileSystemNode | undefined, string>({
        key: selectorKeys.SEL_FILENODE_ITEM,
        get: (name) => ({get}) => 
        {
            return MapExt.find(get(AtomHandleNodes), (value) => value.kind == "directory" && value.name == name);
        }
    }),
}

const util =
{
    getTopParent: (fsn: FileSystemNode): FileSystemNode =>
    {
        if (fsn.parent == undefined) return fsn;
        return util.getTopParent(fsn.parent);
    }
}