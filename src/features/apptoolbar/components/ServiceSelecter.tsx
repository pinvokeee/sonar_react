import * as material from "@mui/material";
import React, { useState } from "react";
import { handleNodes } from "../../../controller/handleNodes";
import SplitButton from "../../../components/elements/toolbar/SplitButton";
import { FileSystemNode } from "../../../class/fileSystem/types";
import { selectedHandleNodes } from "../../../controller/selectedNodes";

type Props =
{
    sx?: material.SxProps<material.Theme>, 
}

const Flex = material.styled("div")(({theme}) => 
(
    {
        display: "flex",
    }
));

const getText = (item: FileSystemNode) =>
{
    if (item == undefined) return "";
    return item.name;
}

const getKey = (item: FileSystemNode) =>
{
    if (item == undefined || item.path == undefined) return "";
    return item.path;
}

export const ServiceSelecter = (props : Props) =>
{
    const actions = handleNodes.useActions();

    const sel = selectedHandleNodes.selectors.useSelectedObject();
    const selectedAction = selectedHandleNodes.useActions();

    const [selectionItem, setSelectionItem] = useState<FileSystemNode | undefined>(undefined);

    const nodes = handleNodes.selectors.useFileNodesSelector();
    const topNodes = Array.from(nodes).map(([k, v]) => v).filter((v) => v.path.length == 1 && v.kind == "directory");
    
    const changeItem = (item: FileSystemNode) =>
    {
        selectedAction.setSelectedObject([item, undefined, undefined, undefined]);
        setSelectionItem(item);
        console.log(sel);
    }

    return (
        <SplitButton 
        sx={{ flex: "1" }}
        // sx={{ width: "30%", }}
        // items={topNodes}
        items={topNodes} 
        selectedItem={selectionItem} 
        onGetKey={getKey} 
        onChange={changeItem} 
        onGetText={getText}>    
        </SplitButton>
    )
}
