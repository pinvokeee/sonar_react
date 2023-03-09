type ContentInfo = {
    name: string;
    type: string;
    hasBlobUrl: boolean;
};

const utf8_decoder: TextDecoder = new TextDecoder();

export class FileInfo
{
    fileName: string = "";
    name: string = "";
    extension: string = "";
    bytes: ArrayBuffer | undefined = undefined;
    objectURL: string = "";

    constructor(fileName: string)
    {
        const [nm, ex] = FileInfo.getNameSection(fileName);

        this.fileName = fileName;
        this.name = nm;
        this.extension = ex;        
    }

    getContentType()
    {
        if (!FileInfo.fileTypes.has(this.extension))
            return FileInfo.fileTypes.get("");

        return FileInfo.fileTypes.get(this.extension);
    };

    getText(){
        if (this.bytes == undefined) return "";
        return utf8_decoder.decode(this.bytes);
    }

    static getNameSection = (fileName: string) => {
        const index = fileName.lastIndexOf(".");
        if (index == -1)
            return [fileName, ""];
        return [fileName.slice(0, index), fileName.slice(index + 1, fileName.length)];
    };

    private static fileTypes = new Map<string, ContentInfo>([
        ["txt", { name: "TEXT", type: "text/plain", hasBlobUrl: false },],
        ["csv", { name: "CSV", type: "text/csv", hasBlobUrl: false }],
        ["html", { name: "HTML", type: "text/html", hasBlobUrl: false },],
        ["pdf", { name: "PDF", type: "application/pdf", hasBlobUrl: true },],
        ["jpg", { name: "IMG", type: "image/jpeg", hasBlobUrl: true },],
        ["jpeg", { name: "IMG", type: "image/jpeg", hasBlobUrl: true },],
        ["png", { name: "IMG", type: "image/png", hasBlobUrl: true },],
        ["gif", { name: "IMG", type: "image/gif", hasBlobUrl: true },],
        ["bmp", { name: "IMG", type: "image/bmp", hasBlobUrl: true },],
        ["", { name: "UNKNOWN", type: "", hasBlobUrl: false }],
    ]);
}
