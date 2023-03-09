import { Accordion, AccordionDetails, AccordionSummary, Button, ListItemButton, Typography } from "@mui/material"
import { useCallback, useState } from "react";
import { FileSystemTreeNode } from "../../../class/fileSystem/types"
import { FileSystemObject } from "../../../class/fileSystem/fileSystemObject";
import SplitButton from "../../../components/elements/toolbar/SplitButton";

type Props = 
{
    objects: Map<string, FileSystemObject>,
    targetNode: FileSystemTreeNode,
    onChange?: ((selectedNode: FileSystemTreeNode) => void),
    onClickAction?: (path: string) => void,
}

const menuItems = [
    "再読み込み", 
]

const reload = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, selectedNode: FileSystemTreeNode, newItem: any, action?: (path: string) => void) =>
{
    action?.call(this, selectedNode.path);
    e.stopPropagation();
};

export const NodeSelecterItem = (props: Props) =>
{
    const [mouseState, setState] = useState<boolean>(false);

    const mouseLeave = () =>
    {
        setState(false);
    }

    const mouseEnter = () =>
    {
        setState(true);
    }
    
    return (
    <ListItemButton key={props.targetNode.path} sx={{ boxSizing: "border-box" }} disableRipple={true} 
        onMouseLeave={mouseLeave}
        onMouseEnter={mouseEnter}
        onClick={() => props.onChange?.call(this, props.targetNode)}>
        
        {helper.getText(props.objects, props.targetNode.path) }

        {<SplitButton
            items={menuItems}
            sx={{ marginLeft: "auto", visibility: mouseState ? "visible" : "hidden" }} 
            onGetText={ (e) => e }
            onGetKey={ (e) => e }
            selectedItem={undefined}
            onChange={ (e, newItem) => reload(e, props.targetNode, newItem, props.onClickAction) }>
        </SplitButton>}
        
    </ListItemButton>
    );
}

const helper = 
{
    getText: (handles: Map<string, FileSystemObject>, path: string) => 
    {
        const item = handles.get(path);
        if (item == undefined) return "";
        if (item.kind == 'directory') return item.name;
        if (item.kind == 'file') return item.fileInfo?.name;
    },

    getFileType: (handles: Map<string, FileSystemObject>, path: string) => 
    {
        const item = handles.get(path);

        if (item?.kind == 'directory') return "フォルダ";
        if (item?.kind == "file") return `${item.fileInfo?.extension.toUpperCase()}`;
    }
}