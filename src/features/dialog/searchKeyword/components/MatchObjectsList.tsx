import { List, styled } from "@mui/material";
import { useCallback, useState } from "react";
import { FileSystemObject } from "../../../../class/fileSystem/FileSystemObject";
import { fileObjectContoller_odl } from "../../../../controller/fileObjectContoller";
import { selectionController } from "../../../../controller/selectionController";
import { MatchObjectListItem } from "./MatchObjectListItem";

const ScrollList = styled(List)(({theme}) =>
(
    {
        width: "100%",
        height: "100%",
        overflow: "auto",
    }
))

type Props =
{
    keyword: string,
    onClick: (fileObj: FileSystemObject) => void,
}

export const MatchObjectsList = (props: Props) =>
{    
    const select = selectionController.selectors.useGetSelectionPaths();
    const h = fileObjectContoller_odl.selectors.useSearchFromKeyword(props.keyword, select[0] as string);

    const onClick = useCallback((fileObj: FileSystemObject) =>
    {
        props.onClick(fileObj);

    }, [])

    const [selectedPath, setSelectedPath] = useState();

    return (
        <ScrollList>
            {
                h.map((obj) =>
                {
                    return <MatchObjectListItem onClick={onClick} fileObj={obj}></MatchObjectListItem>
                })
            }
        </ScrollList>
    )
}