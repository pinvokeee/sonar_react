import { FileInfo } from "./types";

type ObjectType = "file" | "directory";

export class FileSystemObject 
{
    name: string = "";
    path: string[] = [];
    kind: ObjectType = "directory";
    handle?: FileSystemFileHandle | FileSystemDirectoryHandle = undefined;
    file?: FileInfo;

    constructor(name: string, path: string[], kind: ObjectType, handle?: FileSystemFileHandle | FileSystemDirectoryHandle)
    {
        this.name = name;
        this.path = path;
        this.kind = kind;
        this.handle = handle;        
    }

    async load()
    {
        if (this.kind != "file") return ;

        handle.kind

        const handle = this.handle as FileSystemFileHandle;
        const fileInfo = this.file as FileInfo;
        const buffer = await (await handle.getFile())?.arrayBuffer();

        this.file = 
        {
            ...fileInfo,
            content: {
                binary: buffer,
                objectURL: "",
            }
        }
    }

    getStringPath()
    {
        return this.path.join("/") + "/";
    }
}
