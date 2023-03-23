import * as material from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import { fileObjectContoller, fileObjectContoller_odl } from "../../../controller/fileObjectContoller";
import SplitButton from "../../../components/elements/toolbar/SplitButton";
import { FileSystemTreeNode } from "../../../class/fileSystem/types";
import { selectionController } from "../../../controller/selectionController";
import { FileSystemObject } from "../../../class/fileSystem/FileSystemObject";

type Props = {
    sx?: material.SxProps<material.Theme>, 
}

const Flex = material.styled("div")(({theme}) => 
(
    {
        display: "flex",
    }
));

const getText = (item: FileSystemObject) => {
    if (item == undefined || item.path == undefined) return "";
    return item.name;
}

const getKey = (item: FileSystemObject) => {
    if (item == undefined || item.path == undefined) return "";
    return item.getStringPath();
}

export const ServiceSelecter = (props : Props) =>
{
    const fileSysMap = fileObjectContoller.useGetFileSysObjMap();

    const docObj = fileSysMap.getDirectoryFromName("ドキュメント");
    const selectable_service = useMemo(() => fileSysMap.getSubDirectories(docObj, false), [fileSysMap]);
    
    const selection = selectionController.useGetSelectionRange();
    const selectActions = selectionController.useActions();
    
    const selectedItem = useMemo(() => selection[1] ? fileSysMap.get(selection[1]) :  undefined, [selection]);
    
    const changeItem = useCallback((e: React.MouseEvent<HTMLLIElement, MouseEvent>, item: FileSystemObject) => {
        selectActions.setSelection(item.getStringRootPath());
    }, []);

    return (
        <SplitButton 
        sx={{ flex: "1" }}
        items={selectable_service} 
        selectedItem={selectedItem} 
        emptyText={"<第一階層>"}
        onGetKey={getKey} 
        onChange={changeItem} 
        onGetText={getText}>    
        </SplitButton>
    )
}
