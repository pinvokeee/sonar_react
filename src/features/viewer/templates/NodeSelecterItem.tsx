import { Accordion, AccordionDetails, AccordionSummary, Button, ListItemButton, Typography } from "@mui/material"
import { useCallback } from "react";
import { FileSystemTreeNode } from "../../../class/fileSystem/types"
import { FileSystemObject } from "../../../class/fileSystem/FileSystemObject";
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

export const NodeSelecterItem = (props: Props) =>
{
    const reload = useCallback((e: React.MouseEvent<HTMLLIElement, MouseEvent>, newItem: any) =>
    {
        props.onClickAction?.call(this, props.targetNode.path);
        e.stopPropagation();

    }, [])
    
    return (
        <>
        <ListItemButton key={props.targetNode.path} sx={{ boxSizing: "border-box" }} disableRipple={true} 
            onClick={() => props.onChange?.call(this, props.targetNode)}>
            
            {helper.getText(props.objects, props.targetNode.path) }

            {/* <SplitButton
                items={menuItems}
                sx={{ marginLeft: "auto", }} 
                onGetText={ (e) => e }
                onGetKey={ (e) => e }
                selectedItem={undefined}
                onChange={ (e, newItem) => reload(e, newItem) }>
            </SplitButton> */}
            
        </ListItemButton>

    </>
    );
}

const helper = 
{
    getText: (handles: Map<string, FileSystemObject>, path: string) => 
    {
        const item = handles.get(path);
        if (item == undefined) return "";
        if (item.kind == 'directory') return item.name;
        if (item.kind == 'file') return item.file?.name;
    },

    getFileType: (handles: Map<string, FileSystemObject>, path: string) => 
    {
        const item = handles.get(path);

        if (item?.kind == 'directory') return "フォルダ";
        if (item?.kind == "file") return `${item.file?.extension.toUpperCase()}`;
    }
}