import * as material from "@mui/material";
import React, { useState } from "react";
import { FileObject } from "../../../controller/fileObject";
import SplitButton from "../../../components/elements/toolbar/SplitButton";
import { FileSystemTreeNode } from "../../../class/fileSystem/types";
import { selection } from "../../../controller/selectedNodes";

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

const getText = (item: FileSystemTreeNode) =>
{
    if (item == undefined) return "";
    return item.name;
}

const getKey = (item: FileSystemTreeNode) =>
{
    if (item == undefined || item.path == undefined) return "";
    return item.path;
}

export const ServiceSelecter = (props : Props) =>
{
    const actions = FileObject.useActions();

    const selectionPaths = selection.selectors.useGetSelectionPaths();
    const selectedAction = selection.useActions();

    const nodes = FileObject.selectors.useFileNodesSelector();

    const fsnodes = FileObject.selectors.useFileNodes();
    const topNodes = fsnodes.filter(node => nodes.get(node.path)?.kind == "directory");

    const item = selectionPaths[0] ? nodes.get(selectionPaths[0]) : undefined;

    const changeItem = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, item: FileSystemTreeNode) =>
    {
        selectedAction.setSelection([item.path, undefined, undefined, undefined]);
    }

    return (
        <SplitButton 
        sx={{ flex: "1" }}
        items={topNodes} 
        selectedItem={item} 
        onGetKey={getKey} 
        onChange={changeItem} 
        onGetText={getText}>    
        </SplitButton>
    )
}
