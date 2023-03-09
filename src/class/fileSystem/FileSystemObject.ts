import { FileInfo } from "./fileInfo";

type ObjectType = "file" | "directory";

export class FileSystemObject 
{
    name: string = "";
    path: string[] = [];
    kind: ObjectType = "directory";
    handle?: FileSystemFileHandle | FileSystemDirectoryHandle = undefined;
    fileInfo?: FileInfo;

    constructor(name: string, path: string[], kind: ObjectType, handle?: FileSystemFileHandle | FileSystemDirectoryHandle)
    {
        this.name = name;
        this.path = path;
        this.kind = kind;
        this.handle = handle;

        this.fileInfo = new FileInfo(this.name);
    }

    async load()
    {
        if (this.kind != "file") return ;
        if (this.fileInfo == undefined) this.fileInfo = new FileInfo(this.name);

        const handle = this.handle as FileSystemFileHandle;
        const buffer = await (await handle.getFile())?.arrayBuffer();
        const contentType = this.fileInfo.getContentType();

        if (this.fileInfo.objectURL.length > 0) URL.revokeObjectURL(this.fileInfo.objectURL);

        this.fileInfo.bytes = buffer;
        this.fileInfo.objectURL = contentType?.hasBlobUrl ? URL.createObjectURL(new Blob([buffer], { type: contentType.type })) : "";        

        console.log(this.fileInfo.objectURL);
    }

    getStringPath()
    {
        return this.path.join("/");
    }
}
