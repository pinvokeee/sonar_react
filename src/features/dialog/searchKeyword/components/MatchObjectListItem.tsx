import { ListItem, ListItemButton, Stack, styled } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { FileSystemObject } from "../../../../class/fileSystem/FileSystemObject";
import { fileObjectContoller_odl } from "../../../../controller/fileObjectContoller";

type Props =
{
    fileObj: FileSystemObject,

    onClick: (selectedFileObj: FileSystemObject) => void,
}

const PathLabel = styled(Typography)(({theme}) =>
(
    {
        fontSize: "10pt",
        overflowWrap: "anywhere",   
    }
)
)

export const MatchObjectListItem = (props: Props) =>
{
    return (
        <ListItem disablePadding>
            <ListItemButton onClick={() => props.onClick(props.fileObj)}>
                <Stack>
                <div>{props.fileObj.fileInfo?.name}</div>
                <PathLabel>{props.fileObj.getStringPath()}</PathLabel>
                </Stack>
            </ListItemButton>
        </ListItem>
    )
}