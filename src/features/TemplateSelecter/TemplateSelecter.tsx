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

export const Content = styled(Box)(({ theme }) => 
(
    {
        display: "flex",
        flexDirection: "column",
        justifyContent: "stretch",
        width: "100%",
        // height: "100vh",
        // maxHeight: "100vh",
    }
));

export const VSplitView = styled(Split)(({ theme }) => 
(
    {
        display: "flex",
        flexDirection: "row",
        // width: "100%",
        height: "100%",
        // maxHeight: "100vh",
    }
));

export const HSplitView = styled(Split)(({ theme }) => 
(
    {
        display: "flex",
        flexDirection: "column",
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
            {/* <Split
                sizes={[25, 75]}
                minSize={100}
                expandToMin={false}
                gutterSize={10}
                gutterAlign="center"
                snapOffset={30}
                dragInterval={1}
                direction="horizontal"
                cursor="col-resize"
            >
                <div>aa</div>
                <div>bbb</div>
            </Split> */}


            {/* <div style={{ width: "100%", height: "100vh",  }}> */}
            <Content>
                <VSplitView  minSize={100} sizes={[20, 20, 60]} gutterAlign="center" gutterSize={6} gutterStyle={GutterStyle}>
                    <Box>
                        <HSplitView direction="vertical" sizes={[50, 50]} gutterSize={6} gutterStyle={GutterStyle}>
                            <ScrollPanel>
                                <NodeListBox targetNode={selectedContext.current as ITemplateNode}></NodeListBox>
                            </ScrollPanel>
                            <div>D</div>
                        </HSplitView>
                    </Box>
                    <Box>bb</Box>
                    <Box>cc</Box>
                </VSplitView>
            </Content>

             {/* </div> */}
    
            {/* <ChildTemplateSelecter node={targetNode as ITemplateDirectoryNode}/> */}
        </>
    );
}

