import { useCallback } from "react";
import { selector, useRecoilState, useRecoilValue } from "recoil";
import { FileSystemNode } from "../class/fileSystem/types";
import { AtomSelectedFileNodes } from "../define/recoil/atoms";
import { selectorKeys } from "../define/recoil/keys";

export type SelectedHandleNode = (FileSystemNode | undefined);

export const selectedHandleNodes = 
{
    useActions: () =>
    {
        const [nodes, setNodes] = useRecoilState(AtomSelectedFileNodes);

        return {
            setSelectedObject: (n: SelectedHandleNode[]) => setNodes(n)
        }
    },

    selectors:
    {
        useSelectedObject: () => useRecoilValue(Selector.getSelectionNodes),
    }
}

const Selector = 
{    
    getSelectionNodes: selector<SelectedHandleNode[]>({
        key: selectorKeys.SEL_SELECTION_FILE_NODES,
        get: ({get}) => get(AtomSelectedFileNodes)
    }),
}