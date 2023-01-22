import { createContext, useState } from "react";
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





// 以下用途どうしよう----------------------------------------

type Context = {
    directories: FileNode[],
    setDirectories: (nodes: FileNode[]) => void,
}

export const DirectoryContext = createContext<Context>(
    {
        directories: [],
        setDirectories: (nodes: FileNode[]) => {},
    }
);

export const DirectoryProvider = (props: Prop) =>
{
    const hook = useDirectory();

    const context : Context = 
    {
        directories: hook.directories,
        setDirectories: hook.setDirectories,
    }

    return <>
        <DirectoryContext.Provider value={context}>
            {props.children}
        </DirectoryContext.Provider>
    </>
}