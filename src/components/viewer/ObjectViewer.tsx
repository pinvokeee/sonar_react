import { createTheme, styled, SxProps, Theme, ThemeProvider } from "@mui/material";
import { FileSystemObject } from "../../class/fileSystem/FileSystemObject";
import { Frame } from "./Frame";
import { ImageView } from "./ImageView";
import { MarkdownView } from "./markdown/Markdown";
import { PDFView } from "./PDFView";
import { TextViewer } from "./TextContent";
import { repositoryController } from "../../controller/repositoryController";
import { XlsxView } from "./XlsxView";

const utf8_decoder: TextDecoder = new TextDecoder();
const sjis_decoder = new TextDecoder("shift-jis");

type Props =
{
    sx?: SxProps<Theme>, 
    object: FileSystemObject | undefined,
    highlightKeyword?: string,
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
    return (
        <DummyView>
            { props.object ? helper.viewComponent(props.object, props.highlightKeyword) : <></> }        
        </DummyView>
    );
}


const helper = 
{
    viewComponent: (handle: FileSystemObject, highlightKeyword?: string) =>
    {
        if (handle.kind == "file" && handle.fileInfo?.bytes != undefined)
        {
            if (handle.fileInfo.extension == "xlsx") return helper.viewExcel(handle);
            if (handle.fileInfo.extension == "txt") return helper.viewText(handle, highlightKeyword);
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

    viewText: (handle: FileSystemObject, highlightKeyword?: string) =>
    {
        const text = utf8_decoder.decode(handle.fileInfo?.bytes);

        return <>
            <TextViewer text={text} keyword={highlightKeyword}></TextViewer>
        </>
    },

    viewMarkdown: (handle: FileSystemObject) =>
    {
        const repoName = repositoryController.useSelectionRepositoryName();
        const text = utf8_decoder.decode(handle.fileInfo?.bytes);

        return <>
            <MarkdownView path={[repoName, ...handle.path]} source={text}></MarkdownView>
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
    },

    viewExcel: (handle: FileSystemObject) => {

        if (handle.fileInfo == undefined) return <></>
        if (handle.fileInfo?.bytes == undefined) return <></>


        console.log(handle);
        return <XlsxView objectUrl={handle.fileInfo.objectURL}></XlsxView>
    }
}