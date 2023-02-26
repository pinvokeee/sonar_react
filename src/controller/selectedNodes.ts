import { useCallback } from "react";
import { selector, useRecoilState, useRecoilValue } from "recoil";
import { FileSystemNode } from "../class/fileSystem/types";
import { AtomSelectedHandleNodes } from "../define/recoil/atoms";
import { selectorKeys } from "../define/recoil/keys";

export type SelectedNodes = (FileSystemNode | undefined)[];

// const [nodes, setNodes] = useRecoilState(selectedFileNodes);

// const a = useCallback((n: SelectedNodes) =>
// {
//     setNodes(n);
// }, []);

// return { a }

export const selectedHandleNodes = 
{
    useActions: () =>
    {
        const [nodes, setNodes] = useRecoilState(AtomSelectedHandleNodes);

        return {

            setSelectedObject: useCallback((n: SelectedNodes) =>
            {
                setNodes(n);
            }, []),

            
        }
    },

    selectors:
    {
        useSelectedObject: () => useRecoilValue(Selector.getSelectionNodes),
    }
}

const Selector = 
{    
    getSelectionNodes: selector<SelectedNodes>({
        key: selectorKeys.SEL_SELECTION_FILE_NODES,
        get: ({get}) => get(AtomSelectedHandleNodes)
    }),
}