import { Button, ListItemButton } from "@mui/material"
import { FileSystemHandleData, FileSystemNode } from "../../../class/fileSystem/types"

type Props = 
{
    objects: Map<string, FileSystemHandleData>,
    targetNode: FileSystemNode,
    onChange?: ((selectedNode: FileSystemNode) => void),
    onClickAction?: (path: string) => void,
}

export const NodeSelecterItem = (props: Props) =>
{
    return (
    <ListItemButton 
        key={props.targetNode.path} 
        sx={{ boxSizing: "border-box" }}  
        disableRipple={true} 
        onClick={() => props.onChange?.call(this, props.targetNode)}>
        { 
            helper.getText(props.objects, props.targetNode.path) 
        }

        <Button sx={{ marginLeft: "auto", }} 
            onClick={ () => props.onClickAction?.call(this, props.targetNode.path) }>
            {helper.getFileType(props.objects, props.targetNode.path)}
        </Button>

    </ListItemButton>);
}

const helper = 
{
    getText: (handles: Map<string, FileSystemHandleData>, path: string) => 
    {
        const item = handles.get(path);
        if (item == undefined) return "";
        if (item.kind == 'directory') return item.name;
        if (item.kind == 'file') return item.file?.name;
    },

    getFileType: (handles: Map<string, FileSystemHandleData>, path: string) => 
    {
        const item = handles.get(path);

        if (item?.kind == 'directory') return "フォルダ";
        if (item?.kind == "file") return `${item.file?.extension.toUpperCase()}`;
    }
}