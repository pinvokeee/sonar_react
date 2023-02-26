import { FileSystemNode } from "./types";

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

    static getAllFileEntriesAmount = async (handle: FileSystemDirectoryHandle, onFilter?: (node: FileSystemNode) => boolean, current?: number) =>
    {
        let count = 0;

        for await (const [name, entry] of handle.entries())
        {
            const isTarget = onFilter ? onFilter.call(this, { name, kind: entry.kind, path: "" }) : true;

            if (isTarget)
            {
                if (entry.kind == "directory") count += await this.getAllFileEntriesAmount(entry, onFilter, count);
                if (entry.kind == "file") count++;
            }
        }

        return count;
    }

    static readFromHandle = (handle: FileSystemDirectoryHandle, isReading?: boolean, onProgress?: (e: FileSystemNode) => void) =>
    {
        return this.readEntries(handle, undefined, isReading, onProgress);
    }

    private static readEntries = async (targetHandle: FileSystemDirectoryHandle, parentNode? : FileSystemNode, 
        isReading?: boolean,
        onProgress?: (e: FileSystemNode) => void, 
        onFilter?: (node: FileSystemNode) => boolean) =>
    {
        return new Promise(async (resolve: (e: FileSystemNode[]) => void, reject) =>
        {
            const nodes: FileSystemNode[] = [];
            const parentPath = parentNode ? parentNode.path : "";

            for await (const [name, entry] of targetHandle.entries())
            {
                const node : FileSystemNode = {
                    name: name,
                    kind: entry.kind,
                    parent: parentNode,
                    handle: entry,
                    path: `${parentPath}/${name}`,
                }

                if (entry.kind == "directory") node.children = await this.readEntries(entry, node, isReading, onProgress);

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
