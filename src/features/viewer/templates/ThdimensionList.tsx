import { styled } from "@mui/material";
import { useMemo } from "react";
import Split from 'react-split'
import { FileSystemObjectMap } from "../../../class/fileSystem/FileSystemObjectMap";
import { SplitBoxVertical } from "../../../components/elements/SplitBox";
import { fileObjectContoller, fileObjectContoller_odl } from "../../../controller/fileObjectContoller";
import { selectionController } from "../../../controller/selectionController";
import { NodeSelecter } from "./NodeSelecter";

// const HSplitBox = styled(Split)(({ theme }) => 
// (
//     {
//         height: "100%",
//     }
// ));

type Prop =
{
}

const isDirectory = (s: string) => s == "directory";
const isFile = (s: string) => s != "directory";

const getSubDir = (map: FileSystemObjectMap, key: string | undefined) => {
    if (key == undefined) return undefined;
    return map.getSubDirectories(map.get(key), false);
}

const getFiles = (map: FileSystemObjectMap, key: string | undefined) => {
    if (key == undefined) return undefined;
    return map.getFiles(map.get(key), false);
}

export const ThdimensionList = (props: Prop) =>
{   
    const fileSysObjMap = fileObjectContoller.useGetFileSysObjMap();
    const selection = selectionController.useGetSelectionRange();
    const selectAction = selectionController.useActions();

    const currentNest = selection.indexOf(undefined) - 1;
    const index = currentNest <= -1 || currentNest > selection.length -1 ? selection.length - 2 : currentNest;
    
    const d1 = getSubDir(fileSysObjMap, selection[0]);
    const d2 = getSubDir(fileSysObjMap, selection[1]);
    const d3 = getFiles(fileSysObjMap, selection[index]);

    return <>
        <SplitBoxVertical sizes={[50, 50]} gutterSize={6}>
            <NodeSelecter 
                handles={d1}
                selection={selection[1]}
                current={ undefined }
                placeHolder="<第二階層>" 
                onChange={ (obj) => selectAction.setSelectionIndex(1, obj.getStringPath()) }/>

            <NodeSelecter 
                handles={d2}
                selection={selection[2]}
                current={ undefined }
                placeHolder="<第三階層>" 
                onChange={ (obj) => selectAction.setSelectionIndex(2, obj.getStringPath()) }/>

        </SplitBoxVertical>
        <SplitBoxVertical gutterSize={6}>
            <div>
                <NodeSelecter 
                handles={d3}
                selection={selection[3]}
                current={ undefined }
                placeHolder="ファイル一覧" 
                onChange={ (obj) => selectAction.setSelectionIndex(3, obj.getStringPath()) }/>
            </div>
        </SplitBoxVertical>
    </>
}