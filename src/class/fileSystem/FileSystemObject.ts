import { FileInfo } from "./fileInfo";

type ObjectType = "file" | "directory";

// @ts-ignore
const pdf = pdfjsLib;

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

        if (this.kind == "file") this.fileInfo = new FileInfo(this.name);
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

        //PDFの場合
        if (contentType?.name == "PDF"){

            const texts: string[] = [];
            const doc = await (pdf.getDocument(this.fileInfo.objectURL)).promise;

            for (let i = 1; i < doc.numPages; i++)
            {
                const items = await (await doc.getPage(i)).getTextContent();
                items.items.forEach((item: any) => texts.push(item.str))
            }

            this.fileInfo.cacheText = texts.join("");
        }
    }

    getStringPath()
    {
        return this.path.join("/");
    }
}
