import { useCallback, useState } from "react";
import { useRecoilState } from "recoil";
import { FileSystemNode } from "../class/fileSystem/types";
import { getEntriesCountFromDirectoryHandle, loadFromDirectoryHandle } from "../loader";
import { createTemplateTree, reloadTemplateData, TemplateNode } from "../loader/templateLoader";
import { selectedTemplateNodes, templateLibrary } from "../recoil/atomCurrentDirectory";
import { LoadingState, SelectedTemplates } from "../types";

type UseLoader = 
{
    loadingState: LoadingState,
    templates: TemplateNode[],
    pickTargetFolder: () => void,
}

export const useLoader = () : UseLoader =>
{
    const currentDirectory = useCurrentDirectory();
    const templates = useTemplates2();

    const pickTargetFolder = async () =>
    {
        const dir = await currentDirectory.asyncPickDirectory();
        const temp = await createTemplateTree(dir);

        templates.setTemplates(temp);
        console.log(dir, temp);
    }

    return {
        loadingState: currentDirectory.state,
        templates: templates.templates,
        pickTargetFolder,
    }
}

type UseTemplates = 
{
    templates: TemplateNode[],
    setTemplates: (nodes: TemplateNode[]) => void,
    reload: (targetNode: TemplateNode) => void,
}

export const useTemplates2 = () : UseTemplates =>
{
    const [templates, setTemplates] = useRecoilState(templateLibrary);

    const utf8_decoder: TextDecoder = new TextDecoder();

    const reload = useCallback(async (targetNode: TemplateNode) =>
    {
        console.log(templates);
        await reloadTemplateData(targetNode);

        console.log(utf8_decoder.decode(targetNode.bytes));

        console.log(templates, targetNode);
        // setTemplates((temp) => [...temp]);

    }, []);

    return {
        templates,
        setTemplates,
        reload,
    }
}


type UseCurrentDirectory = 
{
    state: LoadingState,
    asyncPickDirectory: () => Promise<FileSystemNode[]>,
    asyncLoadDirectory: (handle: FileSystemDirectoryHandle) => Promise<FileSystemNode[]>,
    directory: FileSystemNode[],
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

    const [directory, setDirectory] = useState<FileSystemNode[]>([]);

    const asyncPickDirectory = useCallback(async () =>
    {
        const handle = await window.showDirectoryPicker();
        return await asyncLoadDirectory(handle);

    }, []);

    const asyncLoadDirectory = useCallback(async (handle: FileSystemDirectoryHandle) =>
    {
        const max = await getEntriesCountFromDirectoryHandle(handle);

        setMaximum(max);
        setIsProgress(true);

        const files = await loadFromDirectoryHandle(handle, (e) =>
        {
            setCurrent((count) => count++);
            setFile(e);
        });

        setDirectory(files);
        setIsProgress(false);
        
        return files;

    }, []);

    return {
        asyncPickDirectory,
        asyncLoadDirectory,
        directory,
        state: {
            isProgress,
            maximum,
            current,
            file
        }
    }
}

type UseSelectedTemplates =
{
    selectedNodes: SelectedTemplates,
    setNode1: (node: TemplateNode) => void,
    setNode2: (node: TemplateNode) => void,
    setNode3: (node: TemplateNode) => void,
    setContentNode: (node: TemplateNode) => void,
    n: () => TemplateNode | undefined,
}

export const useSelectedTemplates = (): UseSelectedTemplates =>
{
    const [selectedNodes, setSelectedNodes] = useRecoilState(selectedTemplateNodes);

    const n = () =>
    {
        if (selectedNodes.node1 == null) return undefined;
        if (selectedNodes.node2 == null) return selectedNodes.node1;
        if (selectedNodes.node3 == null) return selectedNodes.node2;

        return selectedNodes.node3;
    }

    const setNode1 = (node: TemplateNode) =>
    {
        setSelectedNodes((nodes) => ({ node1: node, node2: undefined, node3: undefined, contentNode: undefined }));
    }

    const setNode2 = (node: TemplateNode) =>
    {
        setSelectedNodes((nodes) => ({ ...nodes, node2: node, node3: undefined, contentNode: undefined }));
    }

    const setNode3 = (node: TemplateNode) =>
    {
        setSelectedNodes((nodes) => ({ ...nodes, node3: node, contentNode: undefined }));
    }

    const setContentNode = (node: TemplateNode) =>
    {
        setSelectedNodes((nodes) => ({ ...nodes, contentNode: node }));
    }

    return {
        selectedNodes,
        setNode1,
        setNode2,
        setNode3,
        setContentNode,
        n,
    }
}