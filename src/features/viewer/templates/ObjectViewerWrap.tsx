import { useMemo, useState } from "react";
import { FileSystemObject } from "../../../class/fileSystem/FileSystemObject";
import { fileObjectContoller, fileObjectContoller_odl } from "../../../controller/fileObjectContoller";
import { selectionController } from "../../../controller/selectionController";
import { ObjectViewer } from "../../../components/viewer/ObjectViewer";

export const ObjectViewerWrap = () => {

    const fileSysObj = fileObjectContoller.useGetFileSysObjMap();
    const selection = selectionController.useGetSelectionRange();

    const h = useMemo(() => {
        if (selection[3] == undefined) return;
        return fileSysObj.get(selection[3]);
    }, [selection[3]])

    return <ObjectViewer object={h}></ObjectViewer>

}