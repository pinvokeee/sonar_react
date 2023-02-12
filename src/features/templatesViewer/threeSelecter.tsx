import { styled } from "@mui/material";
import { useCallback } from "react";
import Split from 'react-split'
import { HookTemplates } from "../../hooks/contextTemplates";
import { TemplateNode } from "../../loader/templateLoader";
import { NodeListBox } from "./NodeList/NodeList";

const HSplitBox = styled(Split)(({ theme }) => 
(
    {
        height: "100%",
    }
));

const GutterStyle = (dimension : "width" | "height", gutterSize : number) => 
{
    const bgcolor = "#eee";
    return {
        backgroundColor: bgcolor,
        [dimension]: gutterSize + "px",
    }
}

type Prop =
{
    templatesHook: HookTemplates,
}

const isDirectory = (s: string) => s == "directory";
const isNotDirectory = (s: string) => s != "directory";

export const ThreeSelecter = (props: Prop) =>
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

    const node1 = props.templatesHook?.node1, node2 = props.templatesHook?.node2, node3 = props.templatesHook?.node3;

    const node1_children = node1?.children;
    const node2_children = node2?.children;
    const node3_children = node3?.children;
    const template = props.templatesHook.selectedTemplate;

    const files = node3 != null ? node3_children : node2 != null ? node2_children : node1 != null ? node1_children : [];

    return <>
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
    </>
}