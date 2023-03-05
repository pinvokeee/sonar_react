import { FileSystemHandleData } from "./types";

type ContentInfo =
{
    name: string,
    type: string,
    hasBlobUrl: boolean,
}

export class FileInfo
{
    static getNameSection = (fileName : string) =>
    {
        const index = fileName.lastIndexOf(".");    
        if (index == -1) return [fileName, ""]    
        return [fileName.slice(0, index), fileName.slice(index + 1, fileName.length)];
    }

    static getContentType = (extension: string) =>
    {
        if (!this.fileTypes.has(extension)) return this.fileTypes.get("unknown");

        return this.fileTypes.get(extension);
    }

    private static fileTypes = new Map<string, ContentInfo>([
        ["txt", { name: "TEXT", type: "text/plain", hasBlobUrl: false },],
        ["csv", { name: "CSV", type: "text/csv", hasBlobUrl: false }],
        ["html", { name: "HTML", type: "text/html", hasBlobUrl: false },],
        ["pdf", { name: "PDF", type: "application/pdf", hasBlobUrl: true}, ],
        ["jpg", { name: "IMG", type: "image/jpeg" , hasBlobUrl: true},],
        ["jpeg", { name: "IMG", type: "image/jpeg" , hasBlobUrl: true},],
        ["png", { name: "IMG", type: "image/png" , hasBlobUrl: true},],
        ["gif", { name: "IMG", type: "image/gif" , hasBlobUrl: true},],
        ["bmp", { name: "IMG", type: "image/bmp" , hasBlobUrl: true},],
        ["unknown", { name: "UNKNOWN", type: "", hasBlobUrl: false } ],
    ]);
}

export class Directory
{
    static asyncShowPickDialog = async () => await window.showDirectoryPicker();

    static getSubDirectories = (target: [string, FileSystemHandleData][], source: FileSystemHandleData) =>
    {
        // const m = new Map<string, HandleNode>();
        const m: [string, FileSystemHandleData][] = [];

        target.forEach(([key, current]) => 
        {
            const aPath = `${current.path.join("/")}/`;
            const bPath = `${source.path.join("/")}/`;

            if ((current.path.length == (source.path.length + 1)) && aPath.startsWith(bPath)) m.push([key, current]);
        });

        return m;
    }

    static getSubDirectoriesForMap = (target: Map<string, FileSystemHandleData>, source: FileSystemHandleData) =>
    {
        const m = new Map<string, FileSystemHandleData>();

        target.forEach((current, key) => 
        {
            const aPath = `${current.path.join("/")}/`;
            const bPath = `${source.path.join("/")}/`;

            if ((current.path.length == (source.path.length + 1)) && aPath.startsWith(bPath)) m.set(key, current);
        });

        return m;
    }

    static getAllFileEntriesAmount = async (handle: FileSystemDirectoryHandle, onFilter?: (node: FileSystemHandleData) => boolean, current?: number) =>
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

    static readFromHandle = (handle: FileSystemDirectoryHandle, isReading?: boolean, onProgress?: (e: FileSystemHandleData) => void) =>
    {
        return this.readEntries(handle, [], new Map(), isReading, onProgress);
    }

    private static readEntries = async (targetHandle: FileSystemDirectoryHandle, currentPath: string[], outMap: Map<string, FileSystemHandleData>, isReading?: boolean, onProgress?: (e: FileSystemHandleData) => void, onFilter?: (node: FileSystemHandleData) => boolean) =>
    {
        for await (const [name, entry] of targetHandle.entries())
        {
            const node : FileSystemHandleData = {
                name: name,
                kind: entry.kind,
                path: [...currentPath, name],
                handle: entry,
            }

            if (entry.kind == "directory") (await this.readEntries(entry, node.path, outMap, isReading, onProgress));
            // if (entry.kind == "directory") nodes.push(...(await this.readEntries(entry, node.path, isReading, onProgress)));

            if (entry.kind == "file")
            {
                const [name, extension] = FileInfo.getNameSection(entry.name);
                node.file = { name, extension, content: { binary: undefined, objectURL: "", }  }
            }

            const isTarget = onFilter ? onFilter.call(this, node) : true;

            if (isTarget) 
            {
                if (isReading && entry.kind == "file" && node.file != undefined)
                {
                    node.file.content.binary = await (await entry.getFile()).arrayBuffer();
                }

                if (outMap.has(node.path.join("/")))
                {
                    console.error("キーの重複発生", node);
                }

                outMap.set(node.path.join("/"), node);

                // if (node.kind == "directory")
                // {
                //     console.log("OUTTEST", node, Directory.getSubDirectories(outMap, node));
                // }

                onProgress?.call(this, node);
            }
        }

        return outMap;
    }


}
