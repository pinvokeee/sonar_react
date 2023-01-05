import { Accordion, AccordionDetails, AccordionSummary, Box, List, ListItemButton, ListItemText, styled } from "@mui/material";
import { useContext, useState } from "react";
import Split from 'react-split'
import { selectedNodeContext, templatesNodeContext } from "../../context/contextTemplates";
import { ITemplateNode } from "../../types";
import { NodeListBox } from "./NodeList/NodeList";

const getFirstNode = (node : ITemplateNode) : ITemplateNode | null =>
{
    if (node?.children == null) return null;
    return node.children[0];
}

export interface IPropsTemplateSelecter
{
    node : ITemplateNode,
}

export const ChildTemplateSelecter = (props : IPropsTemplateSelecter) =>
{
    const [expanded, setExpanded] = useState<string | false>("");

    const handleAcordion = (text : string) =>
    {
        return  (event: React.SyntheticEvent, newExpanded: boolean) => 
        {
            return setExpanded(newExpanded ? text : false);
        };
    }

    return (
        <>
        {
            props.node?.children?.map(n => 
            {
                return (
                <Accordion expanded={ expanded == n?.name } onChange={ handleAcordion(n?.name) }>
                    <AccordionSummary>{n?.name}</AccordionSummary>
                    <AccordionDetails>
                        <ChildTemplateSelecter node={n}></ChildTemplateSelecter>
                    </AccordionDetails>
                </Accordion>
                );
            })
        }
        </>

    );
}

export const SplitContainer = styled(Box)(({ theme }) => 
(
    {
        width: 1,
        height: 1,
    }
));

export const Content = styled("div")(({ theme }) => 
(
    {
        // display: "grid",
        // gridTemplateColumns: "auto auto minmax(0, 1fr)",
        height: "100%",


        // display: "flex",
        // flexDirection: "column",
        // justifyContent: "stretch",
        // width: "100%",
        // height: "100vh",
        // maxHeight: "100vh",
    }
));

export const VSplitContainer = styled(Split)(({ theme }) => 
(
    {
        display: "grid",
        gridTemplateColumns: "auto auto minmax(0, 1fr)",
        // display: "flex",
        // flexDirection: "row",
        // width: "100%",
        height: "100%",
        // maxHeight: "100vh",
    }
));

export const VSplitContent = styled("div")(({ theme }) => 
(
    {
        display: "flex",
        flexDirection: "row",
        height: "100%",
    }
));

export const HSplitContainer = styled(Split)(({ theme }) => 
(
    {
        display: "grid",
        gridTemplateColumns: "auto auto minmax(0, 1fr)",
        // display: "flex",
        // flexDirection: "row",
        // width: "100%",
        height: "100%",
        // maxHeight: "100vh",
    }
));

export const HSplitContent = styled("div")(({ theme }) => 
(
    {
        display: "flex",
        flexDirection: "row",
        height: "100%",
    }
));


export const HSplitView = styled(Split)(({ theme }) => 
(
    {
        display: "grid",
        gridTemplateRows: "minmax(0, 1fr) minmax(0, 1fr)",
        // display: "flex",
        // flexDirection: "column",
        height: "100%",
        // maxHeight: "100vh",
    }
));

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

export const TemplateSelecter = () =>
{
    const context = useContext(templatesNodeContext);
    const selectedContext = useContext(selectedNodeContext);

    const useSelectedNodes = useState({ node1 : null, node2: null, node3: null });
    
    const targetNode = selectedContext.current as ITemplateNode;
    const firstNode : ITemplateNode | null = getFirstNode(targetNode);

    return (
        <>
            <VSplitBox direction="horizontal" minSize={100} sizes={[20, 20, 60]} gutterAlign="center" gutterSize={6} gutterStyle={GutterStyle}>
                <HSplitBox direction="vertical" sizes={[50, 50]} gutterSize={6} gutterStyle={GutterStyle}>
                    <NodeListBox targetNode={selectedContext.current as ITemplateNode}></NodeListBox>
                    <div>D</div>
                </HSplitBox>
                <Box>bb</Box>
                <Box>cc</Box>
            </VSplitBox>
        </>
    );
}

