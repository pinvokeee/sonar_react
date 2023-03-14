import { List, styled } from "@mui/material";
import { useCallback, useState } from "react";
import { FileSystemObject } from "../../../../class/fileSystem/FileSystemObject";
import { fileObjectContoller, fileObjectContoller_odl } from "../../../../controller/fileObjectContoller";
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
    const fileSysObjMap = fileObjectContoller.useGetFileSysObjMap();
    const selection = selectionController.useGetSelectionRange();
    const firstFileSysObj = selection[0] ? fileSysObjMap.get(selection[0]) : undefined;

    const h = fileSysObjMap.filterFromKeyword(props.keyword, firstFileSysObj);

    const onClick = useCallback((fileObj: FileSystemObject) => {
        props.onClick(fileObj);
    }, [])

    const list: JSX.Element[] = [];

    h.forEach((obj) => {
        list.push(<MatchObjectListItem onClick={onClick} fileObj={obj}></MatchObjectListItem>);
    });

    return (
        <ScrollList>{list}</ScrollList>
    )
}