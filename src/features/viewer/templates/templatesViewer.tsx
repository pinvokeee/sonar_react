import { Accordion, AccordionDetails, AccordionSummary, Box, List, ListItemButton, ListItemText, styled } from "@mui/material";
import { useCallback, useContext, useMemo, useState } from "react";
import Split from 'react-split'
import { NodeSelecter } from "./NodeSelecter";

import { TextViewer } from "../../../components/viewer/TextContent";
import { MarkdownView } from "../../../components/viewer/Markdown";
import { ThdimensionList } from "./threeSelecter";
import { selection } from "../../../controller/selectedNodes";
import { NodeHook } from "../../../controller/node";
import { FileSystemHandleData } from "../../../class/fileSystem/types";
import { Frame } from "../../../components/viewer/Frame";
import { ImageView } from "../../../components/viewer/ImageView";
import { PDFView } from "../../../components/viewer/PDFView";

export const HSplitBox = styled(Split)(({ theme }) => 
(
    {
        height: "100%",
    }
));

export const VSplitBox = styled(Split)(({ theme }) => 
(
    {
        // display: "grid",
        // gridTemplateRows: "auto auto minmax(0, 1fr)",
        display: "flex",
        flexDirection: "row",
        // width: "100%",
        height: "100%",
        // maxHeight: "100vh",
    }
));

export const GutterStyle = (dimension : "width" | "height", gutterSize : number) => 
{
    const bgcolor = "#eee";
    return {
        backgroundColor: bgcolor,
        [dimension]: gutterSize + "px",
    }
}

export const ScrollPanel = styled("div")(({ theme }) => 
(
    {
        overflow: "auto",
    }
));

export type Prop =
{

}

const utf8_decoder: TextDecoder = new TextDecoder();
const sjis_decoder = new TextDecoder("shift-jis");

export const TemplatesViewer = (props: Prop) =>
{
    const actions = NodeHook.useActions();
    
    const selectedNodes = selection.selectors.useGetSelectionTreeNode();
    const handle = selectedNodes[3] ? actions.toFileSystemHandleData(selectedNodes[3]) : undefined;

    if (handle != undefined && handle.kind == "file")
    {
        if (handle.file?.content.binary == undefined)
        {
            actions.loadFile(handle);
        }
    }

    return (
        <>
            <VSplitBox direction="horizontal" minSize={100} sizes={[20, 20, 60]} gutterAlign="center" gutterSize={6} gutterStyle={GutterStyle}>
                <ThdimensionList></ThdimensionList>
                <Box>
                {
                    handle ? helper.viewComponent(handle) : <></>
                    // a(h.selectedNodes.contentNode)
                    // createTemplateTextView(utf8_decoder.decode(props.templatesHook.selectedTemplate?.bytes))
                }
                </Box>                
            </VSplitBox>
        </>
    );
}

const helper = 
{
    viewComponent: (handle: FileSystemHandleData) =>
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

    viewText: (handle: FileSystemHandleData) =>
    {
        const text = utf8_decoder.decode(handle.file?.content.binary);

        return <>
            <TextViewer text={text}></TextViewer>
        </>
    },

    viewMarkdown: (handle: FileSystemHandleData) =>
    {
        const text = utf8_decoder.decode(handle.file?.content.binary);

        return <>
            <MarkdownView source={text}></MarkdownView>
        </>
    },

    viewHtmlView: (handle: FileSystemHandleData) =>
    {
        const text = utf8_decoder.decode(handle.file?.content.binary);
        return  <Frame source={text}></Frame>;
    },

    
    viewImg: (handle: FileSystemHandleData) =>
    {
        if (handle.file == undefined) return <></>

        const bin = handle.file?.content.binary as ArrayBuffer;
        return <ImageView binary={bin}></ImageView>
    },

    viewPDF: (handle: FileSystemHandleData) =>
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