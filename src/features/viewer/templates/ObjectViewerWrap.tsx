import { useMemo, useState } from "react";
import { FileSystemObject } from "../../../class/fileSystem/FileSystemObject";
import { fileObjectContoller, fileObjectContoller_odl } from "../../../controller/fileObjectContoller";
import { selectionController } from "../../../controller/selectionController";
import { ObjectViewer } from "../../../components/viewer/ObjectViewer";

export const ObjectViewerWrap = () => {

    const fileSysObj = fileObjectContoller.useGetFileSysObjMap();
    const selection = selectionController.useGetSelectionRange();

    const h = useMemo(() => {
        if (fileSysObj.get(selection[selection.length - 1])?.kind == "directory") return;
        return fileSysObj.get(selection[selection.length - 1]);
    }, [selection]);

    return <ObjectViewer object={h}></ObjectViewer>

}