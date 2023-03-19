import { FileInfo } from "./FileInfo";
import { FileSystemObject } from "./FileSystemObject";
import { FileSystemObjectMap } from "./FileSystemObjectMap";

export class Directory
{
    static asyncShowPickDialog = async () => await window.showDirectoryPicker();

    static async getAllFileEntriesAmount(handle: FileSystemDirectoryHandle, onFilter?: (node: FileSystemObject) => boolean, current?: number) {
        
        let count = 0;

        for await (const [name, entry] of handle.entries()) {
            const isTarget = onFilter ? onFilter.call(this, new FileSystemObject(name, [], entry.kind)): true;

            if (isTarget) {
                if (entry.kind == "directory") count += await this.getAllFileEntriesAmount(entry, onFilter, count);
                if (entry.kind == "file") count++;
            }
        }

        return count;
    }

    static readFromHandle(handle: FileSystemDirectoryHandle, isBuffered?: boolean, onProgress?: (e: FileSystemObject) => void, onFilter?: (node: FileSystemObject) => boolean) {
        return this.readEntries(handle, [], new FileSystemObjectMap(), isBuffered, onProgress, onFilter);
    }

    private static async readEntries( 
        targetHandle: FileSystemDirectoryHandle,
        currentPath: string[], 
        outMap: FileSystemObjectMap, 
        isReading?: boolean, 
        onProgress?: (e: FileSystemObject) => void, 
        onFilter?: (node: FileSystemObject) => boolean) {

        for await (const [name, entry] of targetHandle.entries()) {
            
            const node = new FileSystemObject(name, [...currentPath, name], entry.kind, entry);

            if (entry.kind == "directory") (await this.readEntries(entry, node.path, outMap, isReading, onProgress, onFilter));

            const isTarget = onFilter ? onFilter.call(this, node) : true;

            if (isTarget) {
                if (isReading && entry.kind == "file" && node.fileInfo != undefined) await node.load();
                if (outMap.has(node.getStringPath())) console.error("キーの重複発生", node);

                outMap.set(node.getStringPath(), node);
                onProgress?.call(this, node);
            }
        }

        return outMap;
    }
}
