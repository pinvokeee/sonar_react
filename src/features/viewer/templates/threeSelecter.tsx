import { styled } from "@mui/material";
import Split from 'react-split'
import { FileSystemNode } from "../../../class/fileSystem/types";
import { handleNodes } from "../../../controller/handleNodes";
import { selectedHandleNodes } from "../../../controller/selectedNodes";
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
}

const isDirectory = (s: string) => s == "directory";
const isFile = (s: string) => s != "directory";

export const ThdimensionList = (props: Prop) =>
{
    // const h = useSelectedTemplates();

    const selObj = selectedHandleNodes.selectors.useSelectedObject();
    const fileTargetNode = selObj.find((v) => v != null);

    const fileNodes = fileTargetNode?.children ? fileTargetNode.children : [];

    // console.log(fileNodes);
    const nodes = handleNodes.selectors.useFileNodesSelector();

    console.log("RENDER", nodes, fileNodes);

    return <>
        <HSplitBox direction="vertical" sizes={[50, 50]} gutterSize={6} gutterStyle={GutterStyle}>
            {/* <div>
                <NodeListBox filter={isDirectory} 
                targetNode={h.selectedNodes.node1} 
                selectedNode={h.selectedNodes.node2} 
                onChange={ (node) => h.setNode2(node) }></NodeListBox>
            </div>
            <div>
                <NodeListBox filter={isDirectory} 
                    targetNode={h.selectedNodes.node2} 
                    selectedNode={h.selectedNodes.node3} 
                    onChange={ (node) => h.setNode3(node) }></NodeListBox>
            </div> */}
            <div></div>
            <div></div>
        </HSplitBox>
        <HSplitBox direction="vertical"  gutterSize={6} gutterStyle={GutterStyle}>
            <div>
                <NodeListBox handleNodes={fileNodes} filter={isFile} ></NodeListBox>

                {/* <NodeListBox filter={isFile} 
                    targetNode={h.n()} 
                    selectedNode={h.selectedNodes.contentNode} 
                    onChange={ (node) => h.setContentNode(node) }></NodeListBox> */}
            </div>
        </HSplitBox>
    </>
}