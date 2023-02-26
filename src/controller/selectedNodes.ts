import { useCallback } from "react";
import { selector, useRecoilState, useRecoilValue } from "recoil";
import { FileSystemNode } from "../class/fileSystem/types";
import { selectedFileNodes } from "../define/recoil/atoms";
import { selectorKeys } from "../define/recoil/keys";

export type SelectedNodes = 
{
    nodes: (FileSystemNode | undefined)[],
}


// const [nodes, setNodes] = useRecoilState(selectedFileNodes);

// const a = useCallback((n: SelectedNodes) =>
// {
//     setNodes(n);
// }, []);

// return { a }

export const selectedFileNode = 
{
    useActions: () =>
    {
        const [nodes, setNodes] = useRecoilState(selectedFileNodes);

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
        get: ({get}) => get(selectedFileNodes)
    }),
}