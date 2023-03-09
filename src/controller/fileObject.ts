import { useCallback } from "react";
import { selector, selectorFamily, useRecoilCallback, useRecoilState, useRecoilValue } from "recoil";
import { Directory } from "../class/fileSystem/directory";
import { FileInfo } from "../class/fileSystem/fileInfo";
import { FileSystemTreeNode } from "../class/fileSystem/types";
import { FileSystemObject } from "../class/fileSystem/fileSystemObject";
import { AtomFileSystemTreeNodes, AtomFileObjects, AtomSelectedHandleNodes } from "../define/recoil/atoms";
import { selectorKeys } from "../define/recoil/keys";

/**
 * 読み込んだファイルの実態
 */
export const FileObject = 
{
    useActions: () =>
    {
        const [objects, setObjects] = useRecoilState(AtomFileObjects);
        const [node, setFileNodes] = useRecoilState(AtomFileSystemTreeNodes);

        return {

            assignFromMap: (nodes: Map<string, FileSystemObject>) =>
            {
                setObjects(nodes);
                setFileNodes(selectorHepler.a(nodes));
            },

            toFileSystemHandleData: (node: FileSystemTreeNode) =>
            {
                return objects.get(node.path);
            },

            getFileObject: async (path: string) =>
            {
                const obj = objects.get(path);
                return obj;    
            },

            load: (node: FileSystemObject) =>
            {
                return new Promise(async (resolve, reject) =>
                {
                    if (node != undefined)
                    {
                        await node.load();

                        setObjects((nodes) => new Map(nodes).set(node.getStringPath(), node));
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

        useFileHandles: () => useRecoilValue(AtomFileObjects),
        useFileNodes: () => useRecoilValue(AtomFileSystemTreeNodes),

        useGetSubNodes: (parentNode: FileSystemObject) =>
        {
            const path = parentNode.path.join("/");
            return useRecoilValue(Selector.getSubNodes(path));
        },

        useSearchFromKeyword: (keyword: string, subdir: string) => useRecoilValue(Selector.getFileObjectsFromKeyword({ keyword, subdir })),
    }
}

const Selector = 
{
    getDirectoryObject: selector<Map<string, FileSystemObject>>({
        key: selectorKeys.SEL_FILENODES,
        get: ({get}) => get(AtomFileObjects)
    }),

    getDirectoryNode: selectorFamily<FileSystemObject | undefined, string>({
        key: selectorKeys.SEL_FILENODE_ITEM,
        get: (name) => ({get}) => 
        {
            return Array.from(get(AtomFileObjects)).map(([k, n]) => n).find((n) => n.kind == "directory" && n.name == name);
        }
    }),

    getSubNodes: selectorFamily<FileSystemObject[], string>({

        key: selectorKeys.SEL_SUB_NODE,

        get: (path) => ({get}) => 
        {
            const objects = get(AtomFileObjects);
            return selectorHepler.getSubDirectroy(objects, objects.get(path) as FileSystemObject)
        }
    }),

    getFileObjectsFromKeyword: selectorFamily<FileSystemObject[], { keyword: string, subdir: string }>({

        key: selectorKeys.SELECTOR_SEARCH_OBJECT,

        get: (props) => ({get}) => 
        {
            // const a = Array.from(get(AtomFileObjects)).map(([key, obj]) => obj);            

            const fileobjects = get(AtomFileObjects);
            const a = props.subdir != undefined ? 
                selectorHepler.getSubDirectroy(fileobjects, fileobjects.get(props.subdir) as FileSystemObject) : 
                Array.from(fileobjects).map(([k, v]) => v);

            const b = a.filter(obj => 
            {
                if (obj.kind == "directory") return false;

                const file = obj.fileInfo as FileInfo;
                const contentType = obj.fileInfo?.getContentType();
                
                if (contentType?.name == "TEXT" && file.getText().indexOf(props.keyword) > -1) return true;

                return false;
            });

            console.log(b);

            return b;

            // return Array.from(get(AtomFileObjects)).map(([key, obj]) => obj).filter(obj => path.startsWith(obj.path.join("/") + "/"));
        }
    }),
}

const selectorHepler =
{
    getSubDirectroy: (fileobjects: Map<string, FileSystemObject>, parentNode: FileSystemObject) =>
    {
        return Array.from(fileobjects).map(([key, obj]) => obj).filter(obj => parentNode.getStringPath().startsWith(obj.path.join("/") + "/"));
    },

    loadFile: async (obj: FileSystemObject) =>
    {
        const ifile = obj.fileInfo;

        if (ifile == undefined) return undefined;

        const handle: FileSystemFileHandle = obj.handle as FileSystemFileHandle;
        const contentType = ifile.getContentType();
        let url = "";

        console.log("NEW LOADED");

        const buffer = await (await handle.getFile()).arrayBuffer();
        
        if (contentType?.hasBlobUrl && ifile.objectURL.length > 0) 
        {
            window.URL.revokeObjectURL(ifile.objectURL);
            ifile.objectURL = "";
        }

        if (contentType?.hasBlobUrl && ifile.objectURL.length == 0)
        {                            
            url = window.URL.createObjectURL(
                new Blob([new Uint8Array(buffer)], { type: contentType.type } ));
        }
        
        

        // const new_obj: FileSystemObject = 
        // {
        //      ...obj, 
        //     fileInfo: 
        //     { 
        //         ...ifile, 
        //         content: 
        //         {       
        //             objectURL: url,
        //             bytes: buffer,
        //         } 
        //     }
        // }

        // return new_obj;
    },

    a: (fileHandles: Map<string, FileSystemObject>) =>
    {
        console.time();

        const aa = new Map(Array.from(fileHandles).sort((a, b) =>
        {
            const [a_key, a_val] = a;
            const [b_key, b_val] = b;

            return a_val.path.length - b_val.path.length;
        }));    

        const test: FileSystemTreeNode[] = [];

        const bb = ([key, value]: [string, FileSystemObject]) =>
        {
            const cren: FileSystemTreeNode = {
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