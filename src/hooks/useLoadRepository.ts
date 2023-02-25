import { useState } from "react";
import { FileSystemNode } from "../class/fileSystem/types";

type UseLoadRepository =
{
    state: {
        isProgress: boolean,
        currentProgress: number,
        maximumProgress: number,
        currentNode: FileSystemNode | undefined,
    },

    actions:{
        setProgressState: (value: boolean) => void,
        setCurrentMaximumProgress: (value: number) => void,
        setCurrentNode: (value: FileSystemNode | undefined) => void,
        stepCurrentProgress: () => void,
    }
}

export const useLoadRepository = () : UseLoadRepository =>
{
    const [isProgress, setProgressState] = useState<boolean>(false);
    const [maximumProgress, setCurrentMaximumProgress] = useState<number>(0);
    const [currentProgress, setCurrentProgress] = useState<number>(0);
    const [currentNode, setCurrentNode] = useState<FileSystemNode | undefined>(undefined);

    const stepCurrentProgress = () =>
    {
        setCurrentProgress(count => count++);
    }

    return {
       state: {
        isProgress, maximumProgress, currentProgress, currentNode,
       },

       actions: {
        setProgressState, setCurrentMaximumProgress, stepCurrentProgress, setCurrentNode,
       }
    }
}