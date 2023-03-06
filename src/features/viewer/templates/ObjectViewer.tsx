import { FileSystemObject } from "../../../class/fileSystem/FileSystemObject";
import { Frame } from "../../../components/viewer/Frame";
import { ImageView } from "../../../components/viewer/ImageView";
import { MarkdownView } from "../../../components/viewer/Markdown";
import { PDFView } from "../../../components/viewer/PDFView";
import { TextViewer } from "../../../components/viewer/TextContent";

const utf8_decoder: TextDecoder = new TextDecoder();
const sjis_decoder = new TextDecoder("shift-jis");

export type Props =
{
    object: FileSystemObject | undefined,
}

export const ObjectViewer = (props: Props) =>
{
    if (props.object == undefined) <></>;

    return <>
        {
            props.object ? helper.viewComponent(props.object) : <></>
        // a(h.selectedNodes.contentNode)
        // createTemplateTextView(utf8_decoder.decode(props.templatesHook.selectedTemplate?.bytes))
        }
    </>
}


const helper = 
{
    viewComponent: (handle: FileSystemObject) =>
    {
        if (handle.kind == "file" && handle.file?.content.binary != undefined)
        {
            if (handle.file.extension == "txt") return helper.viewText(handle);
            if (handle.file.extension == "md") return helper.viewMarkdown(handle);
            if (handle.file.extension == "html" || handle.file.extension == "htm" || handle.file.extension == "mht") return helper.viewHtmlView(handle);
            if (handle.file.extension == "png" 
            || handle.file.extension == "jpg" 
            || handle.file.extension == "gif"
            || handle.file.extension == "jpeg") return helper.viewImg(handle);

            if (handle.file.extension == "pdf") return helper.viewPDF(handle);
        }

        return <></>
    },

    viewText: (handle: FileSystemObject) =>
    {
        const text = utf8_decoder.decode(handle.file?.content.binary);

        return <>
            <TextViewer text={text}></TextViewer>
        </>
    },

    viewMarkdown: (handle: FileSystemObject) =>
    {
        const text = utf8_decoder.decode(handle.file?.content.binary);

        return <>
            <MarkdownView source={text}></MarkdownView>
        </>
    },

    viewHtmlView: (handle: FileSystemObject) =>
    {
        const text = utf8_decoder.decode(handle.file?.content.binary);
        return  <Frame source={text}></Frame>;
    },

    
    viewImg: (handle: FileSystemObject) =>
    {
        if (handle.file == undefined) return <></>

        const bin = handle.file?.content.binary as ArrayBuffer;
        return <ImageView binary={bin}></ImageView>
    },

    viewPDF: (handle: FileSystemObject) =>
    {
        if (handle.file == undefined) return <></>
        if (handle.file?.content.binary == undefined) return <></>

        const arr = handle.file?.content.binary as ArrayBuffer;

        return <PDFView objectUrl={handle.file.content.objectURL}></PDFView>

        // const bytes = new Uint8Array(arr);
        // const bin = new Array(bytes.length);
        
        // bytes.forEach((b, index) => bin[index] = String.fromCharCode(b));
        
        // // URL.createObjectURL(blob)

        // return <embed type={"application/pdf"} src={`data:application/pdf;base64,${window.btoa(bin.join(""))}`}></embed>

        // // return <iframe src={`data:application/pdf;base64, ${window.btoa(bin.join(""))}`}></iframe>
    }
}