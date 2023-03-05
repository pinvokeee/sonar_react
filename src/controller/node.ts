import { useCallback } from "react";
import { selector, selectorFamily, useRecoilCallback, useRecoilState, useRecoilValue } from "recoil";
import { Directory, FileInfo } from "../class/fileSystem/directory";
import { FileSystemNode, FileSystemHandleData } from "../class/fileSystem/types";
import { AtomFileSystemNodes, AtomHandleNodes, AtomSelectedHandleNodes } from "../define/recoil/atoms";
import { selectorKeys } from "../define/recoil/keys";

export const NodeHook = 
{
    useActions: () =>
    {
        const [fsnodes, setNodes] = useRecoilState(AtomHandleNodes);
        const [node, setFileNodes] = useRecoilState(AtomFileSystemNodes);

        return {

            assignFileHandles: (nodes: Map<string, FileSystemHandleData>) =>
            {
                setNodes(nodes);
                setFileNodes(helper.a(nodes));
            },

            toFileSystemHandleData: (node: FileSystemNode) =>
            {
                return fsnodes.get(node.path);
            },

            loadFile: (node: FileSystemHandleData) =>
            {
                return new Promise(async (resolve, reject) =>
                {
                    if (node.file != undefined)
                    {
                        const handle: FileSystemFileHandle = node.handle as FileSystemFileHandle;
                        const contentType = FileInfo.getContentType(node.file.extension);
                        let url = "";

                        console.log("NEW LOADED");

                        const buffer = await (await handle.getFile()).arrayBuffer();
                        
                        if (contentType?.hasBlobUrl && node.file.content.objectURL.length > 0) 
                        {
                            window.URL.revokeObjectURL(node.file.content.objectURL);
                            node.file.content.objectURL = "";
                        }

                        if (contentType?.hasBlobUrl && node.file.content.objectURL.length == 0)
                        {                            
                            url = window.URL.createObjectURL(
                                new Blob([new Uint8Array(buffer)], { type: contentType.type } ));
                        }

                        node = { ...node, 
                                file: 
                                    { 
                                        ...node.file, 
                                        content: 
                                        {       
                                            objectURL: url,
                                            binary: buffer,
                                        } 
                                    }
                                }

                        setNodes((nodes) => 
                        {
                            const newMap = new Map(nodes);
                            newMap.set(node.path.join("/"), node);

                            console.log(node);

                            return newMap;
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

        useFileHandles: () => useRecoilValue(AtomHandleNodes),
        useFileNodes: () => useRecoilValue(AtomFileSystemNodes),
    }
}

const Selector = 
{
    getDirectoryObject: selector<Map<string, FileSystemHandleData>>({
        key: selectorKeys.SEL_FILENODES,
        get: ({get}) => get(AtomHandleNodes)
    }),

    getDirectoryNode: selectorFamily<FileSystemHandleData | undefined, string>({
        key: selectorKeys.SEL_FILENODE_ITEM,
        get: (name) => ({get}) => 
        {
            return Array.from(get(AtomHandleNodes)).map(([k, n]) => n).find((n) => n.kind == "directory" && n.name == name);
        }
    }),


}

const helper =
{
    a: (fileHandles: Map<string, FileSystemHandleData>) =>
    {
        console.time();

        const aa = new Map(Array.from(fileHandles).sort((a, b) =>
        {
            const [a_key, a_val] = a;
            const [b_key, b_val] = b;

            return a_val.path.length - b_val.path.length;
        }));    

        const test: FileSystemNode[] = [];

        const bb = ([key, value]: [string, FileSystemHandleData]) =>
        {
            const cren: FileSystemNode = {
                name: value.name,
                path: key,
                parent: undefined,
                children: Directory.getSubDirectories(Array.from(aa), value).map(m => bb(m)),
            }

            aa.delete(key);

            return cren;
        }

        aa.forEach((n, key) => 
        {
            test.push(bb([key, n]));
        });

        console.timeEnd();

        return test;
    },
}