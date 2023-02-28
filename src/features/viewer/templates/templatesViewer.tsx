import { Accordion, AccordionDetails, AccordionSummary, Box, List, ListItemButton, ListItemText, styled } from "@mui/material";
import { useCallback, useContext, useMemo, useState } from "react";
import Split from 'react-split'
import { NodeListBox } from "./NodeList";

import { TextViewer } from "../../../components/viewer/TextContent";
import { MarkdownView } from "../../../components/viewer/Markdown";
import { ThdimensionList } from "./threeSelecter";
import { selection } from "../../../controller/selectedNodes";
import { NodeHook } from "../../../controller/node";
import { FileSystemHandleData } from "../../../class/fileSystem/types";

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
        if (handle.file?.binary == undefined) actions.loadFile(handle);
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
        return helper.viewText(handle);
    },

    viewText: (handle: FileSystemHandleData) =>
    {
        const text = utf8_decoder.decode(handle.file?.binary);

        return <>
            <TextViewer text={text}></TextViewer>
        </>
    }
}