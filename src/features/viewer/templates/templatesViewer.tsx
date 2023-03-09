import { Accordion, AccordionDetails, AccordionSummary, Box, List, ListItemButton, ListItemText, styled } from "@mui/material";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import Split from 'react-split'
import { NodeSelecter } from "./NodeSelecter";

import { TextViewer } from "../../../components/viewer/TextContent";
import { MarkdownView } from "../../../components/viewer/Markdown";
import { ThdimensionList } from "./threeSelecter";
import { selection } from "../../../controller/selectedNodes";
import { FileObject } from "../../../controller/fileObject";
import { FileSystemObject } from "../../../class/fileSystem/fileSystemObject";
import { Frame } from "../../../components/viewer/Frame";
import { ImageView } from "../../../components/viewer/ImageView";
import { PDFView } from "../../../components/viewer/PDFView";
import { ObjectViewer } from "./ObjectViewer";
import { ObjectViewerWrap } from "./ObjectViewerWrap";

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
    // object: FileSystemHandleData,
}


export const TemplatesViewer = (props: Prop) =>
{
    return (
        <>
            <VSplitBox direction="horizontal" minSize={100} sizes={[20, 20, 60]} gutterAlign="center" gutterSize={6} gutterStyle={GutterStyle}>
                <ThdimensionList></ThdimensionList>
                <Box>
                    <ObjectViewerWrap></ObjectViewerWrap>
                </Box>                
            </VSplitBox>
        </>
    );
}
