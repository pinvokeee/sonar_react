import { styled } from "@mui/material";
import Split from 'react-split'
import { FileSystemNode } from "../../../class/fileSystem/types";
import { NodeHook } from "../../../controller/node";
import { selection } from "../../../controller/selectedNodes";
import { NodeListBox } from "./NodeList";

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
}

const isDirectory = (s: string) => s == "directory";
const isFile = (s: string) => s != "directory";

export const ThdimensionList = (props: Prop) =>
{   
    const handles = NodeHook.selectors.useFileNodesSelector();

    const selectAction = selection.useActions();
    const selectedNodes = selection.selectors.useGetSelectionTreeNode();
    const filerNode = [...selectedNodes].splice(0, selectedNodes.length - 1).reverse().find((v, index) => v != undefined);

    return <>
        <HSplitBox direction="vertical" sizes={[50, 50]} gutterSize={6} gutterStyle={GutterStyle}>
            <NodeListBox 
                filter={isDirectory} 
                handles={handles}
                nodes={ selectedNodes[0]?.children ? selectedNodes[0]?.children : [] }
                onChange={ (node) => selectAction.setSelectionIndex(1, node.path) }/>

            <NodeListBox 
                filter={isDirectory} 
                handles={handles}
                nodes={ selectedNodes[1]?.children ? selectedNodes[1]?.children : [] }
                onChange={ (node) => selectAction.setSelectionIndex(2, node.path) } />

        </HSplitBox>
        <HSplitBox direction="vertical"  gutterSize={6} gutterStyle={GutterStyle}>
            <div>
                <NodeListBox 
                handles={handles} 
                nodes={ filerNode?.children ? filerNode?.children : [] } 
                filter={isFile}
                onChange={ (node) => selectAction.setSelectionIndex(3, node.path) }  ></NodeListBox>
            </div>
        </HSplitBox>
    </>
}