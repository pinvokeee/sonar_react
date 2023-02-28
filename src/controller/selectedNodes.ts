import { useCallback } from "react";
import { selector, useRecoilState, useRecoilValue } from "recoil";
import { FileSystemNode } from "../class/fileSystem/types";
import { AtomFileSystemNodes, AtomHandleNodes, AtomSelectedHandleNodes } from "../define/recoil/atoms";
import { selectorKeys } from "../define/recoil/keys";

export const selection = 
{
    useActions: () =>
    {
        const [nodes, setNodes] = useRecoilState(AtomSelectedHandleNodes);

        return {
            setSelection: useCallback((n: (string | undefined)[]) =>
            {
                setNodes(n);
            }, []),

            setSelectionIndex: useCallback((index: number, path: string | undefined) => 
            {
                setNodes((ns) => 
                {
                    const new_nodes = [...ns];
                    new_nodes[index] = path;
                    return new_nodes;
                });

            }, []),
        }
    },

    selectors:
    {
        useGetSelectionPaths: () => useRecoilValue(Selector.getSelectionNodes),

        useGetSelectionTreeNode: () =>
        {
            const selectPath = useRecoilValue(Selector.getSelectionNodes);
            const nodes = useRecoilValue(AtomFileSystemNodes);

            let lastNodes = selectPath[0] ? nodes : [];

            const sel = selectPath.map((path): FileSystemNode | undefined => 
            {
                if (path == undefined || lastNodes == undefined) return undefined;
                const node = helper.getNode(path, lastNodes);
                lastNodes = node?.children ? node?.children : [];
                return node;
            });

            return sel;
        },

 
    }
}

const Selector = 
{    
    getSelectionNodes: selector<(string | undefined)[]>({
        key: selectorKeys.SEL_SELECTION_FILE_NODES,
        get: ({get}) => get(AtomSelectedHandleNodes)
    }),
}

const helper = 
{
    getNode: (targetPath: string, parentNodes: FileSystemNode[]) => parentNodes.find(n => n.path == targetPath),


}