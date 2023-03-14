import { styled, SxProps, Theme } from "@mui/material";
import { FileSystemObject } from "../../../class/fileSystem/FileSystemObject";
import { Frame } from "../../../components/viewer/Frame";
import { ImageView } from "../../../components/viewer/ImageView";
import { MarkdownView } from "../../../components/viewer/markdown/Markdown";
import { PDFView } from "../../../components/viewer/PDFView";
import { TextViewer } from "../../../components/viewer/TextContent";

const utf8_decoder: TextDecoder = new TextDecoder();
const sjis_decoder = new TextDecoder("shift-jis");

type Props =
{
    sx?: SxProps<Theme>, 
    object: FileSystemObject | undefined,
}

const DummyView = styled("div")(({theme}) =>
(
    {
        // width: "100%",
        height: "100%",
    }
));

export const ObjectViewer = (props: Props) =>
{
    if (props.object == undefined) <DummyView></DummyView>;
    return <DummyView>{ props.object ? helper.viewComponent(props.object) : <></> }</DummyView>;
}


const helper = 
{
    viewComponent: (handle: FileSystemObject) =>
    {
        if (handle.kind == "file" && handle.fileInfo?.bytes != undefined)
        {
            if (handle.fileInfo.extension == "txt") return helper.viewText(handle);
            if (handle.fileInfo.extension == "md") return helper.viewMarkdown(handle);
            if (handle.fileInfo.extension == "html" || handle.fileInfo.extension == "htm" || handle.fileInfo.extension == "mht") return helper.viewHtmlView(handle);
            if (handle.fileInfo.extension == "png" 
            || handle.fileInfo.extension == "jpg" 
            || handle.fileInfo.extension == "gif"
            || handle.fileInfo.extension == "jpeg") return helper.viewImg(handle);

            if (handle.fileInfo.extension == "pdf") return helper.viewPDF(handle);
        }

        return <DummyView></DummyView>
    },

    viewText: (handle: FileSystemObject) =>
    {
        const text = utf8_decoder.decode(handle.fileInfo?.bytes);

        return <>
            <TextViewer text={text}></TextViewer>
        </>
    },

    viewMarkdown: (handle: FileSystemObject) =>
    {
        const text = utf8_decoder.decode(handle.fileInfo?.bytes);

        return <>
            <MarkdownView source={text}></MarkdownView>
        </>
    },

    viewHtmlView: (handle: FileSystemObject) =>
    {
        const text = utf8_decoder.decode(handle.fileInfo?.bytes);
        return  <Frame source={text}></Frame>;
    },

    
    viewImg: (handle: FileSystemObject) =>
    {
        if (handle.fileInfo == undefined) return <></>
        return <ImageView blobUrl={handle.fileInfo.objectURL}></ImageView>
    },

    viewPDF: (handle: FileSystemObject) =>
    {
        if (handle.fileInfo == undefined) return <></>
        if (handle.fileInfo?.bytes == undefined) return <></>

        const arr = handle.fileInfo?.bytes as ArrayBuffer;

        return <PDFView objectUrl={handle.fileInfo.objectURL}></PDFView>

        // const bytes = new Uint8Array(arr);
        // const bin = new Array(bytes.length);
        
        // bytes.forEach((b, index) => bin[index] = String.fromCharCode(b));
        
        // // URL.createObjectURL(blob)

        // return <embed type={"application/pdf"} src={`data:application/pdf;base64,${window.btoa(bin.join(""))}`}></embed>

        // // return <iframe src={`data:application/pdf;base64, ${window.btoa(bin.join(""))}`}></iframe>
    }
}