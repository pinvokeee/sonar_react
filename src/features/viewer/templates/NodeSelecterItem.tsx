import { Accordion, AccordionDetails, AccordionSummary, Badge, Button, Chip, ListItemButton, Stack, styled, Typography } from "@mui/material"
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
    isSelected: boolean,
}

const menuItems = [
    "再読み込み", 
]

const reload = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, selectedFileSysObj: FileSystemObject, newItem: any, action?: (selectedFileSysObject: FileSystemObject) => void) =>
{
    action?.call(this, selectedFileSysObj);
    e.stopPropagation();
};

// const Badge = styled("span")(({theme}) =>
// (
//     {
//         borderRadius: "4px",
//         padding: "0 8px 0 8px",
//         display: "inline",
//         backgroundColor: theme.palette.info.main,
//         color: theme.palette.info.contrastText,
//         fontSize: "10pt",
//     }
// )
// )

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
    <ListItemButton
        selected={props.isSelected}
        key={props.targetFileSysObj.getStringPath()} sx={{ boxSizing: "border-box" }} disableRipple={true} 
        onMouseLeave={mouseLeave}
        onMouseEnter={mouseEnter}
        onClick={() => props.onChange?.call(this, props.targetFileSysObj)}>
        
        <Stack direction="column" gap={1}>
            {helper.getText(props.fileSysObjMap, props.targetFileSysObj.getStringPath()) }
            {
                props.targetFileSysObj.kind == "file" ? 
                <Stack direction="row">
                    <Chip label={props.targetFileSysObj.fileInfo?.getContentType()?.jname} 
                    color="primary" 
                    size="small" 
                    variant="outlined" />
                </Stack> : <></>
            }
        </Stack>

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