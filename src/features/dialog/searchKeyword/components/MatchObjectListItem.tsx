import { ListItem, ListItemButton, Stack, styled } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useCallback, useEffect, useState } from "react";
import { FileSystemObject } from "../../../../class/fileSystem/FileSystemObject";
import { fileObjectContoller_odl } from "../../../../controller/fileObjectContoller";

type Props =
{
    fileObj: FileSystemObject,
    keyword: string,
    onClick: (selectedFileObj: FileSystemObject) => void,
}

const TitleLabel = styled(Typography)(({theme}) =>
(
    {
        fontWeight: "bold",
        overflowWrap: "anywhere",   
    }
)
)

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
    const match_text = useCallback(() => {

        const text = props.fileObj?.fileInfo?.getText();

        if (text != undefined && text?.length > 0) {

            const len = 60;
            const herf = len / 2;
            const index = text.indexOf(props.keyword);
            const firstIndex = text.length > herf ? (index - herf < 0) ? 0 : index : 0;
            const lastIndex = index + herf < text.length ? index + herf : text.length;

            console.log(text.slice(firstIndex, lastIndex), index, firstIndex, lastIndex);

            return `${index > 0 ? "..." : ""}${text.slice(firstIndex, lastIndex)}${lastIndex != text.length ? "..." : ""}`;
        }

        return "テキスト情報なし";

    }, []);

    return (
        <ListItem disablePadding>
            <ListItemButton onClick={() => props.onClick(props.fileObj)}>
                <Stack>
                <TitleLabel>{props.fileObj.fileInfo?.name}</TitleLabel>
                {<PathLabel>{match_text()}</PathLabel>}

                {/* <PathLabel>{props.fileObj.getStringPath()}</PathLabel> */}
                </Stack>
            </ListItemButton>
        </ListItem>
    )
}