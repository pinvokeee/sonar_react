import { FileInfo } from "./fileInfo";
import { FileSystemObject } from "./fileSystemObject";

export class Directory
{
    static asyncShowPickDialog = async () => await window.showDirectoryPicker();

    static getSubDirectories = (target: [string, FileSystemObject][], source: FileSystemObject) =>
    {
        // const m = new Map<string, HandleNode>();
        const m: [string, FileSystemObject][] = [];

        target.forEach(([key, current]) => 
        {
            const aPath = `${current.path.join("/")}/`;
            const bPath = `${source.path.join("/")}/`;

            if ((current.path.length == (source.path.length + 1)) && aPath.startsWith(bPath)) m.push([key, current]);
        });

        return m;
    }

    static getSubDirectoriesForMap = (target: Map<string, FileSystemObject>, source: FileSystemObject) =>
    {
        const m = new Map<string, FileSystemObject>();

        target.forEach((current, key) => 
        {
            const aPath = `${current.path.join("/")}/`;
            const bPath = `${source.path.join("/")}/`;

            if ((current.path.length == (source.path.length + 1)) && aPath.startsWith(bPath)) m.set(key, current);
        });

        return m;
    }

    static getAllFileEntriesAmount = async (handle: FileSystemDirectoryHandle, onFilter?: (node: FileSystemObject) => boolean, current?: number) =>
    {
        let count = 0;

        for await (const [name, entry] of handle.entries())
        {
            const isTarget = onFilter ? onFilter.call(this, new FileSystemObject(name, [], entry.kind )): true;

            if (isTarget)
            {
                if (entry.kind == "directory") count += await this.getAllFileEntriesAmount(entry, onFilter, count);
                if (entry.kind == "file") count++;
            }
        }

        return count;
    }

    static readFromHandle = (handle: FileSystemDirectoryHandle, isReading?: boolean, onProgress?: (e: FileSystemObject) => void) =>
    {
        return this.readEntries(handle, [], new Map(), isReading, onProgress);
    }

    private static readEntries = async (targetHandle: FileSystemDirectoryHandle, currentPath: string[], outMap: Map<string, FileSystemObject>, isReading?: boolean, onProgress?: (e: FileSystemObject) => void, onFilter?: (node: FileSystemObject) => boolean) =>
    {
        for await (const [name, entry] of targetHandle.entries())
        {
            const node = new FileSystemObject(name, [...currentPath, name], entry.kind, entry);

            if (entry.kind == "directory") (await this.readEntries(entry, node.path, outMap, isReading, onProgress));

            const isTarget = onFilter ? onFilter.call(this, node) : true;

            if (isTarget) 
            {
                if (isReading && entry.kind == "file" && node.fileInfo != undefined)
                {
                    await node.load();
                }

                if (outMap.has(node.getStringPath()))
                {
                    console.error("キーの重複発生", node);
                }

                outMap.set(node.getStringPath(), node);

                onProgress?.call(this, node);
            }
        }

        return outMap;
    }


}
