import { FileSystemObject } from "./FileSystemObject";
import { FileInfo } from "./types";

export class FileSystemObjectMap extends Map<string, FileSystemObject>
{
    getEntries(parentNode: FileSystemObject | undefined, hasChildDirectory: boolean, kind: "file" | "directory" | "all") {

        const result: FileSystemObjectMap = new FileSystemObjectMap();

        if (parentNode == undefined) {
            this.forEach((val, key, map) => {
                if (val.kind == kind && val.path.length == 1) result.set(key, val);
            });
            
            return result;
        }

        this.forEach((val, key, map) => {

            if (hasChildDirectory) {
                if (val.kind == kind && val.getStringPath().startsWith(parentNode.getStringPath() + "/")) result.set(key, val);
            }
            else {
                if (
                    val.kind == kind && 
                    val.getStringPath().startsWith(parentNode.getStringPath() + "/") && 
                    parentNode.path.length + 1 == val.path.length) result.set(key, val);
            }
        });

        return result;
    }

    getSubDirectories(parentNode: FileSystemObject | undefined, hasChildDirectory: boolean) {
        const list = Array.from(this.getEntries(parentNode, hasChildDirectory, "directory")).sort();
        return list.map(([key, obj]) => obj);
    }

    getSubDirectoryPaths(parentNode: FileSystemObject | undefined, hasChildDirectory: boolean) {
        const list = Array.from(this.getEntries(parentNode, hasChildDirectory, "directory")).sort();
        return list.map(([key, obj]) => key);
    }

    getFiles(parentNode: FileSystemObject | undefined, hasChildDirectory: boolean) {
        const list = Array.from(this.getEntries(parentNode, hasChildDirectory, "file")).sort();
        return list.map(([key, obj]) => obj);
    }

    getFilePaths(parentNode: FileSystemObject | undefined, hasChildDirectory: boolean) {
        const list = Array.from(this.getEntries(parentNode, hasChildDirectory, "file")).sort();
        return list.map(([key, obj]) => key);
    }

    getDirectoryFromName(name: string, parentNode?: FileSystemObject | undefined) {
        const list = Array.from(this.getEntries(parentNode, false, "directory")).sort();
        const item = list.find(([key, val]) => val.path[0] == name);
        console.log(item);
        return item ? item[1] : undefined;
    }

    filterFromKeyword(keyword: string, isContentOnly: boolean, targetParentFileSystemObj?: FileSystemObject) {
        
        if (keyword.length == 0) return new FileSystemObjectMap();

        const map = targetParentFileSystemObj != undefined ? 
            this.getFiles(targetParentFileSystemObj, true) :
            this;

        const result = new FileSystemObjectMap();

        this.forEach((val, key) => {

            if (val.kind == "directory") return;
            if (val.fileInfo == undefined) return;
            
            const info = val.fileInfo;
            if ((!isContentOnly && val.name.indexOf(keyword) > -1) || info.getText().indexOf(keyword) > -1) result.set(key, val);
        });

        return result;
    }
}