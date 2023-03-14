import { useCallback } from "react";
import { selector, selectorFamily, useRecoilCallback, useRecoilState, useRecoilValue } from "recoil";
import { Directory } from "../class/fileSystem/_directory";
import { FileInfo } from "../class/fileSystem/fileInfo";
import { FileSystemTreeNode } from "../class/fileSystem/types";
import { FileSystemObject } from "../class/fileSystem/FileSystemObject";
import { AtomFileSystemTreeNodes, AtomFileObjects, AtomSelectedHandleNodes, AtomFileSysObjectMap } from "../define/recoil/atoms";
import { AtomKeys, selectorKeys } from "../define/recoil/keys";
import { FileSystemObjectMap } from "../class/fileSystem/FileSystemObjectMap";

export const fileObjectContoller = 
{
    useActions: () => {
        
        const [map, mapping] = useRecoilState(AtomFileObjects);

        return {
            assign: (newMap: FileSystemObjectMap) => mapping(newMap),
        }
    },

    useGetFileSysObjMap: () => useRecoilValue(cselector.getFileSysObjMap),
}

const cselector = {
    getFileSysObjMap: selector<FileSystemObjectMap>({
        key: AtomKeys.Selecter.FileSysObjectMap,
        get: ({get}) => get(AtomFileSysObjectMap)
    }),
}




/**
 * 読み込んだファイルの実態
 */
export const fileObjectContoller_odl = 
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
        useFileNodesSelector: () => useRecoilValue(Selector_old.getDirectoryObject),
        useTemplatesDirectoryNode: () => useRecoilValue(Selector_old.getDirectoryNode("テンプレート")),

        useFileHandles: () => useRecoilValue(AtomFileObjects),
        useFileNodes: () => useRecoilValue(AtomFileSystemTreeNodes),

        useGetSubNodes: (parentNode: FileSystemObject) =>
        {
            const path = parentNode.path.join("/");
            return useRecoilValue(Selector_old.getSubNodes(path));
        },

        useSearchFromKeyword: (keyword: string, subdir: string) => useRecoilValue(Selector_old.getFileObjectsFromKeyword({ keyword, subdir })),
    }
}

const Selector_old = 
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

        get: (props) => ({get}) => {
            // const a = Array.from(get(AtomFileObjects)).map(([key, obj]) => obj);            

            if (props.keyword.length == 0) return [];

            const fileobjects = get(AtomFileObjects);

  
            const a = props.subdir != undefined ? 
                selectorHepler.getSubDirectroy(fileobjects, fileobjects.get(props.subdir) as FileSystemObject) : 
                Array.from(fileobjects).map(([k, v]) => v);


            const b = a.filter(obj => 
            {
                if (obj.kind == "directory") return false;

                const file = obj.fileInfo as FileInfo;
                const contentType = obj.fileInfo?.getContentType();

                if (file.getText().indexOf(props.keyword) > -1) return true;

                return false;
            });

            return b;
        }
    }),
}

const selectorHepler =
{
    getSubDirectroy: (fileobjects: Map<string, FileSystemObject>, parentNode: FileSystemObject) =>
    {
        return Array.from(fileobjects).map(([key, obj]) => obj).filter(obj => 
            {
                console.log(parentNode.getStringPath(), obj.getStringPath());

                return obj.getStringPath().startsWith(parentNode.getStringPath() + "/");
            });
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