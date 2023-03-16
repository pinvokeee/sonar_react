import { Accordion, AccordionDetails, AccordionSummary, Button, ListItemButton, Typography } from "@mui/material"
import { useCallback, useState } from "react";
import { FileSystemObject } from "../../../class/fileSystem/FileSystemObject";
import { FileSystemObjectMap } from "../../../class/fileSystem/FileSystemObjectMap";
import SplitButton from "../../../components/elements/toolbar/SplitButton";

type Props = 
{
    fileSysObjMap: FileSystemObjectMap,
    targetFileSysObj: FileSystemObject,
    onChange?: ((changedFileSysObject: FileSystemObject) => void),
    onClickAction?: (selectedFileSysObject: FileSystemObject) => void,
}

const menuItems = [
    "再読み込み", 
]

const reload = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, selectedFileSysObj: FileSystemObject, newItem: any, action?: (selectedFileSysObject: FileSystemObject) => void) =>
{
    action?.call(this, selectedFileSysObj);
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
    <ListItemButton key={props.targetFileSysObj.getStringPath()} sx={{ boxSizing: "border-box" }} disableRipple={true} 
        onMouseLeave={mouseLeave}
        onMouseEnter={mouseEnter}
        onClick={() => props.onChange?.call(this, props.targetFileSysObj)}>
        
        {helper.getText(props.fileSysObjMap, props.targetFileSysObj.getStringPath()) }

        {<SplitButton
            items={menuItems}
            sx={{ marginLeft: "auto", visibility: mouseState ? "visible" : "hidden" }} 
            onGetText={ (e) => e }
            onGetKey={ (e) => e }
            selectedItem={undefined}
            onChange={ (e, newItem) => reload(e, props.targetFileSysObj, newItem, props.onClickAction) }>
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