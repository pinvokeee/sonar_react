import { HandleNode } from "./types";

export class File
{
    static getNameSection = (fileName : string) =>
    {
        const index = fileName.lastIndexOf(".");    
        if (index == -1) return [fileName, ""]    
        return [fileName.slice(0, index), fileName.slice(index + 1, fileName.length)];
    }   
}

export class Directory
{
    static asyncShowPickDialog = async () => await window.showDirectoryPicker();

    static getAllFileEntriesAmount = async (handle: FileSystemDirectoryHandle, onFilter?: (node: HandleNode) => boolean, current?: number) =>
    {
        let count = 0;

        for await (const [name, entry] of handle.entries())
        {
            const isTarget = onFilter ? onFilter.call(this, { name, kind: entry.kind, path: [] }) : true;

            if (isTarget)
            {
                if (entry.kind == "directory") count += await this.getAllFileEntriesAmount(entry, onFilter, count);
                if (entry.kind == "file") count++;
            }
        }

        return count;
    }

    static readFromHandle = (handle: FileSystemDirectoryHandle, isReading?: boolean, onProgress?: (e: HandleNode) => void) =>
    {
        return this.readEntries(handle, [], isReading, onProgress);
    }

    private static readEntries = async (targetHandle: FileSystemDirectoryHandle, currentPath: string[], isReading?: boolean, onProgress?: (e: HandleNode) => void, onFilter?: (node: HandleNode) => boolean) =>
    {
        return new Promise(async (resolve: (e: HandleNode[]) => void, reject) =>
        {
            const nodes: HandleNode[] = [];

            for await (const [name, entry] of targetHandle.entries())
            {
                const node : HandleNode = {
                    name: name,
                    kind: entry.kind,
                    path: [...currentPath, name],
                    handle: entry,
                }

                if (entry.kind == "directory") nodes.push(...(await this.readEntries(entry, node.path, isReading, onProgress)));

                if (entry.kind == "file")
                {
                    const [name, extension] = File.getNameSection(entry.name);
                    node.file = { name, extension, binary: undefined }
                }

                const isTarget = onFilter ? onFilter.call(this, node) : true;

                if (isTarget) 
                {
                    if (isReading && entry.kind == "file" && node.file != undefined)
                    {
                        node.file.binary = await (await entry.getFile()).arrayBuffer();
                    }

                    nodes.push(node);
                    onProgress?.call(this, node);
                }
            }
       
            resolve(nodes);
        })
    }
}
