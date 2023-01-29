import { Accordion, AccordionDetails, AccordionSummary, Box, List, ListItemButton, ListItemText, styled } from "@mui/material";
import { useCallback, useContext, useMemo, useState } from "react";
import Split from 'react-split'
import { HookTemplates } from "../../hooks/contextTemplates";
import { TemplateNode } from "../../loader/templateLoader";
import { FileNode } from "../../types";
import { NodeListBox } from "./NodeList/NodeList";

import {aaaa} from "./excel";
import { TextViewer } from "./textViewer";

// import XlsxPopulate from "xlsx-populate";


// const getFirstNode = (node : FileNode) : FileNode | undefined =>
// {
//     if (node?.children == undefined) return undefined;
//     return node.children[0];
// }

// type Props = 
// {
//     node : FileNode,
// }

// export const ChildTemplatesViewer = (props : Props) =>
// {
//     const [expanded, setExpanded] = useState<string | false>("");

//     const handleAcordion = useCallback((text : string | undefined) =>
//     {
//         return (event: React.SyntheticEvent, newExpanded: boolean) =>
//         {
//             setExpanded(newExpanded ? (text != undefined ? text : "" ) : false);
//         }

//     }, []);
    
//     return (
//         <>
//         {
//             props.node?.children?.map(n => 
//             {
//                 return (
//                 <Accordion expanded={ expanded == n?.file?.name } onChange={ handleAcordion(n?.file?.name) }>
//                     <AccordionSummary>{n?.file?.name}</AccordionSummary>
//                     <AccordionDetails>
//                         <ChildTemplatesViewer node={n}></ChildTemplatesViewer>
//                     </AccordionDetails>
//                 </Accordion>
//                 );
//             })
//         }
//         </>

//     );
// }

// export const SplitContainer = styled(Box)(({ theme }) => 
// (
//     {
//         width: 1,
//         height: 1,
//     }
// ));

// export const Content = styled("div")(({ theme }) => 
// (
//     {
//         // display: "grid",
//         // gridTemplateColumns: "auto auto minmax(0, 1fr)",
//         height: "100%",


//         // display: "flex",
//         // flexDirection: "column",
//         // justifyContent: "stretch",
//         // width: "100%",
//         // height: "100vh",
//         // maxHeight: "100vh",
//     }
// ));

// export const VSplitContainer = styled(Split)(({ theme }) => 
// (
//     {
//         display: "grid",
//         gridTemplateColumns: "auto auto minmax(0, 1fr)",
//         // display: "flex",
//         // flexDirection: "row",
//         // width: "100%",
//         height: "100%",
//         // maxHeight: "100vh",
//     }
// ));

// export const VSplitContent = styled("div")(({ theme }) => 
// (
//     {
//         display: "flex",
//         flexDirection: "row",
//         height: "100%",
//     }
// ));

// export const HSplitContainer = styled(Split)(({ theme }) => 
// (
//     {
//         display: "grid",
//         gridTemplateColumns: "auto auto minmax(0, 1fr)",
//         // display: "flex",
//         // flexDirection: "row",
//         // width: "100%",
//         height: "100%",
//         // maxHeight: "100vh",
//     }
// ));

// export const HSplitContent = styled("div")(({ theme }) => 
// (
//     {
//         display: "flex",
//         flexDirection: "row",
//         height: "100%",
//     }
// ));


// export const HSplitView = styled(Split)(({ theme }) => 
// (
//     {
//         display: "grid",
//         gridTemplateRows: "minmax(0, 1fr) minmax(0, 1fr)",
//         // display: "flex",
//         // flexDirection: "column",
//         height: "100%",
//         // maxHeight: "100vh",
//     }
// ));

export const HSplitBox = styled(Split)(({ theme }) => 
(
    {
        // display: "grid",
        // gridTemplateRows: "auto auto minmax(0, 1fr)",
        // display: "flex",
        // flexDirection: "row",
        // width: "100%",
        height: "100%",
        // maxHeight: "100vh",
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
    templatesHook: HookTemplates,
}

const utf8_decoder: TextDecoder = new TextDecoder();
const sjis_decoder = new TextDecoder("shift-jis");

const isDirectory = (s: string) => s == "directory";
const isNotDirectory = (s: string) => s != "directory";

export const TemplatesViewer = (props: Prop) =>
{
    const node1_change = useCallback((node: TemplateNode) => 
    {
        props.templatesHook.setNode2(node);
    }, []);

    const node2_change = useCallback((node: TemplateNode) => 
    {
        props.templatesHook.setNode3(node);
    }, []);

    const node3_change = useCallback((node: TemplateNode) => 
    {
        props.templatesHook.setSelectedTemplate(node);
        // props.templatesHook.setNode3(node);
    }, []);

    const a = (node: TemplateNode | undefined) =>
    {
        if (node == null) return <></>


        if (node.type == "text")
        {
            return <TextViewer text={utf8_decoder.decode(node.bytes)}></TextViewer>;
        }

        // if (bytes == undefined) return <></>

        // console.log(bytes);/
        // aaaa(bytes);        


        return <>
        </>
    }

    const node1 = props.templatesHook?.node1, node2 = props.templatesHook?.node2, node3 = props.templatesHook?.node3;

    const node1_children = node1?.children;
    const node2_children = node2?.children;
    const node3_children = node3?.children;
    const template = props.templatesHook.selectedTemplate;

    const files = node3 != null ? node3_children : node2 != null ? node2_children : node1 != null ? node1_children : [];

    return (
        <>
            <VSplitBox direction="horizontal" minSize={100} sizes={[20, 20, 60]} gutterAlign="center" gutterSize={6} gutterStyle={GutterStyle}>
                <HSplitBox direction="vertical" sizes={[50, 50]} gutterSize={6} gutterStyle={GutterStyle}>
                    <div>
                        <NodeListBox filter={isDirectory} targetNode={node2} nodes={node1_children} onChange={node1_change}></NodeListBox>
                    </div>
                    <div>
                        <NodeListBox filter={isDirectory} targetNode={node3} nodes={node2_children} onChange={node2_change}></NodeListBox>
                    </div>
                </HSplitBox>
                <HSplitBox direction="vertical"  gutterSize={6} gutterStyle={GutterStyle}>
                    <div>
                        <NodeListBox filter={isNotDirectory} nodes={files} targetNode={template} onChange={node3_change}></NodeListBox>
                    </div>
                </HSplitBox>
                {/* <Box> */}
                <Box>
                {
                    a(props.templatesHook.selectedTemplate)
                    // createTemplateTextView(utf8_decoder.decode(props.templatesHook.selectedTemplate?.bytes))
                }
                </Box>
                {/* </Box> */}


            </VSplitBox>
        </>
    );
}

