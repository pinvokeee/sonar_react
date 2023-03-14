import { FileSystemObject } from "./FileSystemObject";
import { FileInfo } from "./types";

export class FileSystemObjectMap extends Map<string, FileSystemObject>
{
    getSubDirectroy(parentNode: FileSystemObject) {

        const result: FileSystemObjectMap = new FileSystemObjectMap();

        this.forEach((val, key, map) => {
            if (val.getStringPath().startsWith(parentNode.getStringPath() + "/")) {
                result.set(key, val);
            }
        });

        return result;
    }

    filterFromKeyword(keyword: string, targetParentFileSystemObj?: FileSystemObject) {
        
        if (keyword.length == 0) return this;

        const map = targetParentFileSystemObj != undefined ? 
            this.getSubDirectroy(targetParentFileSystemObj) :
            this;

        const result = new FileSystemObjectMap();

        this.forEach((val, key) => {

            if (val.kind == "directory") return;
            if (val.fileInfo == undefined) return;
            
            const info = val.fileInfo;
            if (info.getText().indexOf(keyword) > -1) result.set(key, val);
        });

        return result;
    }
}