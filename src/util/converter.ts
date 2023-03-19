import markdown from "markdown-it";
import MarkdownItContainer from "markdown-it-container";
import { code, markdownItPlugin } from "../components/viewer/markdown/customRender";

export class converter {

    // @ts-ignore
    private static pdf = pdfjsLib;
    private static utf8_decoder: TextDecoder = new TextDecoder();
    private static domparser: DOMParser = new DOMParser();

    private static md = new markdown(
    {
        html: true,
        xhtmlOut: true,
        linkify: true,
    })
    .use(MarkdownItContainer, "node", code)
    .use(markdownItPlugin);

    static toUTF8Text = (bytes: ArrayBuffer) => this.utf8_decoder.decode(bytes);
    static toDocument = (source: string) => this.domparser.parseFromString(source, "text/html");
    static toMarkdown = (source: string, currentPath?: string) => this.md.render(source, { path: this.RepoPath });

    static createPdfTextList = async (blobUrl: string) => {

        const texts: string[] = [];
        const doc = await (this.pdf.getDocument(blobUrl)).promise;

        for (let i = 1; i < doc.numPages; i++) {
            const items = await (await doc.getPage(i)).getTextContent();
            items.items.forEach((item: any) => texts.push(item.str))
        }

        return texts.join("");
    }

    private static RepoPath: string;

    static setPath(path: string) {

        this.RepoPath = path;
    }
}