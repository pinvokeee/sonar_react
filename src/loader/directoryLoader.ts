import { FileNode } from "../types";

/**
 * 子ノードを再帰で走査して親ノードを割り当てる
 * @param node 対象の親ノード
 */
export const rootingParentNode = (node : FileNode) =>
{
    if (node.children == null) return ;

    for (const n of node.children)
    {
        n.parent = node;
        if (n.kind == "directory") rootingParentNode(n);
    }
}

/**
 * 渡されたディレクトリハンドルから読み込んだノードツリーを返す
 * @param handle 
 * @returns 
 */
export const loadFromDirectoryHandle = 
(
    handle : FileSystemDirectoryHandle, 
    onProgress? : (currentFile : string)  => void, 
    onGotMaxCount? : (count : number) => void) => 
{
    const firstNode : FileNode = {
        kind: "directory",
        parent: null,
        children: [],
        name: "top",
    }

    getEntriesCountFromDirectoryHandle(handle).then(c => onGotMaxCount?.call(this, c));

    return new Promise(async (resolve : (resultNode : FileNode) => void, reject) =>
    {
        // const templatesFolderHandle = await handle.getDirectoryHandle("テンプレート");

        await callLoadFromDirectoryHandle(handle, firstNode, "", onProgress);
        rootingParentNode(firstNode);

        console.log(firstNode);

        resolve(firstNode as FileNode);
    });
}

/**
 * loadFromDirectoryHandleの再帰関数（何をしているかわかりやすくするために分割）
 * @param handle 
 * @param parentNode 
 */
const callLoadFromDirectoryHandle = async (
    handle : FileSystemDirectoryHandle, 
    parentNode : FileNode, 
    currentPath? : string, 
    onProgress? : (currentFile : string) => void) =>
{
    let ccount = 0;

    for await (const [name, value] of handle.entries())
    {
        if (value.kind == "directory")
        {
            const newNode : FileNode = {
                name: name,
                kind: "directory",
                parent: parentNode,
                handle: value,
                children: [],
            }

            parentNode.children?.push(newNode);

            await callLoadFromDirectoryHandle(value, newNode, currentPath + "/" + name, onProgress);
        }
        else if (value.kind == "file")
        {
            const file = await value.getFile();

            onProgress?.call(this, currentPath + "/" + file.name);

            const filename = parseFromFileName(file.name);

            const newNode : FileNode =
            {
                name: name,
                kind: "file",
                parent: parentNode,
                handle: value,
                file: {
                    name: filename[0],
                    extension: filename[1],
                    // binary: (await file.arrayBuffer()),
                }
            }
            
            parentNode.children?.push(newNode);

            ccount++;
        }
    }
}

/**
 * ファイル数カウント用
 * @param handle 
 * @returns 
 */
export const getEntriesCountFromDirectoryHandle = async (handle : FileSystemDirectoryHandle) =>
{
    return new Promise(async (resolve : (resultCount : number) => void, reject) =>
    {
        let count = 0;
        await callGetEntriesCountFromDirectoryHandle(handle, () =>  count++ );
        resolve(count);
    });
}

const callGetEntriesCountFromDirectoryHandle = async (handle : FileSystemDirectoryHandle, progress : (count : number) => void) =>
{
    for await (const [name, value] of handle.entries())
    {
        if (value.kind == "directory")
        {
            await callGetEntriesCountFromDirectoryHandle(value, progress);
        }
        else if (value.kind == "file")
        {
            progress?.call(this, 1);
        }
    }
}

const parseFromFileName = (fileName : string) =>
{
    const index = fileName.lastIndexOf(".");

    if (index == -1) return [fileName, ""]    
    return [fileName.slice(0, index), fileName.slice(index + 1, fileName.length)];
}