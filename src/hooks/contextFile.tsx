import { createContext, useCallback, useState } from "react";
import { useRecoilState } from "recoil";
import { getEntriesCountFromDirectoryHandle, loadFromDirectoryHandle } from "../loader";
import { currentDirectoryState } from "../recoil/atoms/atomCurrentDirectory";
import { FileNode } from "../types";

type Prop = 
{
    children: React.ReactNode,
}

export type HookDirectory =
{
    directories: FileNode[],
    setDirectories: (nodes: FileNode[]) => void,
}

/**
 * ディレクトリを扱うカスタムフック
 */
export const useDirectory = () : HookDirectory =>
{
    const [directories, setDirectories] = useState<FileNode[]>([]);

    return {
        directories, 
        setDirectories,
    }
}

type State = 
{
    isProgress: boolean,
    maximum: number,
    current: number,
    file: string,
}

type UseCurrentDirectory = 
{
    state: State,
    asyncPickDirectory: () => void,
}

/**
 * ディレクトリ選択・読み込み関連のカスタムフック
 */
export const useCurrentDirectory = () : UseCurrentDirectory => 
{
    const [isProgress, setIsProgress] = useState<boolean>(false);
    const [maximum, setMaximum] = useState<number>(0);
    const [current, setCurrent] = useState<number>(0);
    const [file, setFile] = useState<string>("");

    const [directory, setDirectory] = useRecoilState(currentDirectoryState);

    const asyncPickDirectory = useCallback(async () =>
    {
        const handle = await window.showDirectoryPicker();
        const max = await getEntriesCountFromDirectoryHandle(handle);

        setMaximum(max);
        setIsProgress(true);

        await loadFromDirectoryHandle(handle, (e) =>
        {
            console.log(e);
            setCurrent((count) => count++);
            setFile(e);
        })

        setIsProgress(false);
  
        return ;

    }, []);

    // const loadFromHandle = useCallback((handle: ) =>
    // {
    //     // setDirectory()

    // }, []);


    return {
        asyncPickDirectory,
        state: {
            isProgress,
            maximum,
            current,
            file
        }
    }
}