import { useCallback } from "react";
import { selector, useRecoilCallback, useRecoilState, useRecoilValue } from "recoil";
import { FileSystemTreeNode } from "../class/fileSystem/types";
import { AtomFileSystemTreeNodes, AtomFileObjects, AtomSelectedHandleNodes, AtomSelection } from "../define/recoil/atoms";
import { AtomKeys, selectorKeys } from "../define/recoil/keys";

export const selectionController = 
{
    useActions: () =>
    {
        return {

            setSelection: useRecoilCallback(({ snapshot, set }) => async (n: (string | undefined)[]) => {     
                set(AtomSelection, n);
            }, []),

            setSelectionIndex: useRecoilCallback(({ snapshot, set}) => async (index: number, path: string | undefined) => 
            {
                set(AtomSelection, (ns) => {

                    const new_nodes = [...ns];
                    new_nodes[index] = path;

                    for (let i = index + 1; i < new_nodes.length; i++) new_nodes[i] = undefined; 

                    return new_nodes;
                });

            }, []),
        }
    },

    useGetSelectionRange: () => useRecoilValue(cselector.getSelection),

    selectors:
    {
        

        useGetSelectionPaths: () => useRecoilValue(cselector.getSelection),

        useGetSelectionTreeNode: () =>
        {
            const selectPath = useRecoilValue(cselector.getSelection);
            const nodes = useRecoilValue(AtomFileSystemTreeNodes);

            let lastNodes = selectPath[0] ? nodes : [];

            const sel = selectPath.map((path): FileSystemTreeNode | undefined => 
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

const cselector = 
{    
    getSelection: selector<(string | undefined)[]>({
        key: AtomKeys.Selecter.Selection,
        get: ({get}) => get(AtomSelection)
    }),

    // getSelectableList: selector<number>({
    //     key: AtomKeys.Selecter.Selection,
    //     get: ({get}) => get(AtomSelection)
    // }),
}

const helper = 
{
    getNode: (targetPath: string, parentNodes: FileSystemTreeNode[]) => parentNodes.find(n => n.path == targetPath),


}