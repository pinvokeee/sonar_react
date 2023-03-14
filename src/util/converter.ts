import markdown from "markdown-it";
import MarkdownItContainer from "markdown-it-container";
import { code } from "../components/viewer/markdown/customRender";

export class converter {
    private static utf8_decoder: TextDecoder = new TextDecoder();
    private static domparser: DOMParser = new DOMParser();

    private static md = new markdown(
    {
        html: true,
        xhtmlOut: true,
        linkify: true,
    })
    .use(MarkdownItContainer, "node", code);

    static toUTF8Text = (bytes: ArrayBuffer) => this.utf8_decoder.decode(bytes);
    static toDocument = (source: string) => this.domparser.parseFromString(source, "text/html");
    static toMarkdown = (source: string) => this.md.render(source);
}
