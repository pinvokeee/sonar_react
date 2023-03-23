import { converter } from "../../util/converter";

type ContentInfo = {
    name: string;
    jname: string,
    type: string;
    hasBlobUrl: boolean;
};

export class FileInfo
{
    fileName: string = "";
    name: string = "";
    extension: string = "";
    bytes: ArrayBuffer | undefined = undefined;
    objectURL: string = "";
    cacheText: string = "";

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

    getText() {

        if (this.bytes == undefined) return "";    

        const contentType = this.getContentType() as ContentInfo;

        if (contentType.name == "TEXT") return converter.toUTF8Text(this.bytes);
        // if (contentType.name == "PDF") return this.cacheText;

        return this.cacheText;
    }

    static getNameSection = (fileName: string) => {
        const index = fileName.lastIndexOf(".");
        if (index == -1)
            return [fileName, ""];
        return [fileName.slice(0, index), fileName.slice(index + 1, fileName.length)];
    };

    private static fileTypes = new Map<string, ContentInfo>([
        ["txt", { name: "TEXT", jname: "テキスト", type: "text/plain", hasBlobUrl: false },],
        ["csv", { name: "CSV", jname: "CSV", type: "text/csv", hasBlobUrl: false }],
        ["html", { name: "HTML", jname: "HTML形式", type: "text/html", hasBlobUrl: false },],
        ["pdf", { name: "PDF", jname: "PDF", type: "application/pdf", hasBlobUrl: true },],
        ["jpg", { name: "IMG", jname: "画像/JPG",  type: "image/jpeg", hasBlobUrl: true },],
        ["jpeg", { name: "IMG", jname: "画像/JPEG", type: "image/jpeg", hasBlobUrl: true },],
        ["png", { name: "IMG", jname: "画像/PNG", type: "image/png", hasBlobUrl: true },],
        ["gif", { name: "IMG", jname: "画像/GIF", type: "image/gif", hasBlobUrl: true },],
        ["bmp", { name: "IMG", jname: "画像/BMP", type: "image/bmp", hasBlobUrl: true },],
        ["xlsx", { name: "XLSX", jname: "Excel", type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", hasBlobUrl: true },],
        ["md", { name: "MARKDOWN", jname: "Mardkdown", type: "", hasBlobUrl: false }],
        ["", { name: "UNKNOWN", jname: "不明", type: "", hasBlobUrl: false }],
    ]);

    static registedFileTypes() {
        return FileInfo.fileTypes;
    };

}
