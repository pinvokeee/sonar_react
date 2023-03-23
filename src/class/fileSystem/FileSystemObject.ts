import { converter } from "../../util/converter";
import { FileInfo } from "./s";



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

        //Markdownの場合
        if (contentType?.name == "MARKDOWN") {
            const src = converter.toMarkdown(converter.toUTF8Text(this.fileInfo.bytes));
            this.fileInfo.cacheText = converter.toDocument(src).body.innerText;
        }

        //Markdownの場合
        if (contentType?.name == "HTML") {
            const src = converter.toUTF8Text(this.fileInfo.bytes);
            this.fileInfo.cacheText = converter.toDocument(src).body.innerText;
        }

        //PDFの場合
        if (contentType?.name == "PDF") {
            this.fileInfo.cacheText = await converter.createPdfTextList(this.fileInfo.objectURL);
        }
    }

    getStringPath()
    {
        return this.path.join("/");
    }

    getStringRootPath()
    {
        const file = this.path.slice(-1);
        const root = [];
        let lastPath = "";

        while (root.length < 4) root.push(undefined);

        for (let i = 0; i < this.path.length - 1; i++)
        {
            const p = `${lastPath}/${this.path[i]}`;
            root[i] = p.slice(1, p.length);
            lastPath = p;
        }

        const fpath = `${lastPath}/${this.path[this.path.length - 1]}`;
        root[root.length - 1] = fpath.slice(1, fpath.length);
        
        return root;
    }
}
