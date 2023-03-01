import { styled } from "@mui/material";
import Split from 'react-split'
import { NodeHook } from "../../../controller/node";
import { selection } from "../../../controller/selectedNodes";
import { NodeSelecter } from "./NodeSelecter";

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
            <NodeSelecter 
                filter={isDirectory} 
                handles={handles}
                nodes={ selectedNodes[0]?.children ? selectedNodes[0]?.children : [] }
                onChange={ (node) => selectAction.setSelectionIndex(1, node.path) }/>

            <NodeSelecter 
                filter={isDirectory} 
                handles={handles}
                nodes={ selectedNodes[1]?.children ? selectedNodes[1]?.children : [] }
                onChange={ (node) => selectAction.setSelectionIndex(2, node.path) } />

        </HSplitBox>
        <HSplitBox direction="vertical"  gutterSize={6} gutterStyle={GutterStyle}>
            <div>
                <NodeSelecter 
                handles={handles} 
                nodes={ filerNode?.children ? filerNode?.children : [] } 
                filter={isFile}
                onChange={ (node) => selectAction.setSelectionIndex(3, node.path) }  ></NodeSelecter>
            </div>
        </HSplitBox>
    </>
}