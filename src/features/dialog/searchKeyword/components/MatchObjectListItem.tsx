import { Chip, Divider, ListItem, ListItemButton, Stack, styled } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FileInfo } from "../../../../class/fileSystem/s";
import { FileSystemObject } from "../../../../class/fileSystem/FileSystemObject";
import { Highlight } from "../../../../components/elements/Highlight";
import { fileObjectContoller_odl } from "../../../../controller/fileObjectContoller";
import { TextParser } from "../../../../util/textParser";

type Props =
{
    index: number,
    fileObj: FileSystemObject,
    keyword: string,
    isSelected: boolean,
    onClick: (selectedFileObj: FileSystemObject, index: number) => void,
}

const TitleLabel = styled(Typography)(({theme}) =>
(
    {
        fontSize: "10pt",
        fontWeight: "bold",
        overflowWrap: "anywhere",   
    }
)
)

const PathLabel = styled(Typography)(({theme}) =>
(
    {
        overflowWrap: "anywhere",   
        fontSize: "10pt",
        margin: "6px 0 6px 0",
    }
)
)

const WrapBox = styled("div")(({theme}) =>
(
    {
        // display: "flex",
        // flexWrap: "wrap",
        // overflowWrap: "anywhere",
    }
))

const getMatchedText = (src: string, keyword: string) => {

    if (src != undefined && src?.length > 0) {

        const len = 60;
        const herf = len / 2;
        const index = src.indexOf(keyword);
        const firstIndex = src.length > herf ? (index - herf < 0) ? 0 : index : 0;
        const lastIndex = index + herf < src.length ? index + herf : src.length;

        return `${index > 0 ? "..." : ""}${src.slice(firstIndex, lastIndex)}${lastIndex != src.length ? "..." : ""}`;
    }

    return "";
}

const createMatchedElement = (src: string, keyword: string) => {
    return TextParser.parseMatchedText(src, keyword).map((item) => {
        if (item.type == "matched") return <Highlight>{item.text}</Highlight>;
        return <>{item.text}</>
    });
}

export const MatchObjectListItem = (props: Props) =>
{
    const fileInfo = props.fileObj?.fileInfo as FileInfo;

    const src = fileInfo.getText() as string;

    const match_text = useMemo(() => getMatchedText(src, props.keyword), [props.keyword]);
    const title = useMemo(() => createMatchedElement(fileInfo.name, props.keyword), [props.keyword]);
    const a = useMemo(() => createMatchedElement(match_text, props.keyword), [props.keyword]);

    const onClick = useCallback(() => 
    props.onClick(props.fileObj, props.index), []);

    if (fileInfo == undefined) return <>ファイル情報を読み込めませんでした</>;

    return (
        <ListItem>
            <ListItemButton selected={props.isSelected} sx={{flexDirection: "row"}} onClick={onClick}>
                <Stack>
                    <TitleLabel>{title}</TitleLabel>
                    <WrapBox>
                        {a}
                    </WrapBox>
                    <Stack direction="row">
                        <Chip 
                        label={props.fileObj.fileInfo?.getContentType()?.jname} 
                        variant="outlined" 
                        size="small" 
                        color="primary"></Chip>
                    </Stack>
                </Stack>
            </ListItemButton>
        </ListItem>
    )
}