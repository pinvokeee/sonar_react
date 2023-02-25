import { Accordion, AccordionDetails, AccordionSummary, Box, List, ListItemButton, ListItemText, styled } from "@mui/material";
import { useCallback, useContext, useMemo, useState } from "react";
import Split from 'react-split'
import { HookTemplates } from "../../../hooks/contextTemplates";
import { TemplateNode } from "../../../loader/templateLoader";
import { NodeListBox } from "./NodeList/NodeList";

import { TextViewer } from "../../../components/viewer/TextContent";
import { MarkdownView } from "../../../components/viewer/Markdown";
import { ThreeSelecter } from "./threeSelecter";
import { useSelectedTemplates } from "../../../hooks/useLoader";
import { repositorySelector } from "../../../controller/repository";

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
    // const h = useSelectedTemplates();

    const files = repositorySelector.useFileNodesSelector();

    console.log(files);

    const a = (node: TemplateNode | undefined) =>
    {
        console.log(node);

        if (node == null) return <></>;
        if (node.type == "text") return <TextViewer text={utf8_decoder.decode(node.bytes)}></TextViewer>;
        if (node.type == "markdown") return <MarkdownView source={utf8_decoder.decode(node.bytes)}></MarkdownView>;

        // if (bytes == undefined) return <></>

        // console.log(bytes);/
        // aaaa(bytes);        


        return <>
        </>
    }


    return (
        <>
            <VSplitBox direction="horizontal" minSize={100} sizes={[20, 20, 60]} gutterAlign="center" gutterSize={6} gutterStyle={GutterStyle}>
                <ThreeSelecter></ThreeSelecter>
                <Box>
                {
                    // a(h.selectedNodes.contentNode)
                    // createTemplateTextView(utf8_decoder.decode(props.templatesHook.selectedTemplate?.bytes))
                }
                </Box>                
            </VSplitBox>
        </>
    );
}

