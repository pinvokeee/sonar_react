import { Paper, styled } from "@mui/material";
import { useMemo } from "react";
import Split from 'react-split'
import { FileSystemObjectMap } from "../../../class/fileSystem/FileSystemObjectMap";
import { SplitBoxVertical } from "../../../components/elements/SplitBox";
import { WindowCase } from "../../../components/elements/WindowCase";
import { fileObjectContoller, fileObjectContoller_odl } from "../../../controller/fileObjectContoller";
import { selectionController } from "../../../controller/selectionController";
import { Explorer } from "./Explorer";

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

const getSubDirMap = (map: FileSystemObjectMap, key: string | undefined) => {
    if (key == undefined) return undefined;
    return map.getSubDirectoriesMap(map.get(key), false);
}

const getFilesMap = (map: FileSystemObjectMap, key: string | undefined) => {
    if (key == undefined) return undefined;
    return map.getFilesMap(map.get(key), false);
}

const Division = styled("div")(({ theme }) =>
(
    {
        borderRight: `solid 1px ${theme.palette.divider}`,
    }
));

const Container = styled(WindowCase)(({ theme }) =>
(
    {
        backgroundColor: theme.palette.primary.light,
        // display: "flex",
        // flexDirection: "row",
        // borderRight: `solid 1px ${theme.palette.divider}`,
    }
));

export const ThdimensionList = (props: Prop) =>
{   
    const fileSysObjMap = fileObjectContoller.useGetFileSysObjMap();
    const selection = selectionController.useGetSelectionRange();
    const selectAction = selectionController.useActions();

    const currentNest = selection.indexOf(undefined) - 1;
    const index = currentNest <= -1 || currentNest > selection.length -1 ? selection.length - 2 : currentNest;
    
    const d1 = getSubDirMap(fileSysObjMap, selection[0]);
    const d2 = getSubDirMap(fileSysObjMap, selection[1]);
    const d3 = getFilesMap(fileSysObjMap, selection[index]);

    return <>
        <SplitBoxVertical sizes={[50, 50]} gutterSize={6}>
            <Container title="第二階層">
                <Explorer 
                pathes={d1}
                selection={selection[1]}
                current={ undefined }
                placeHolder="<第二階層>" 
                onChange={ (obj) => selectAction.setSelectionIndex(1, obj.getStringPath()) }/>
            </Container>
            
            <Container title="第三階層">
                <Explorer 
                pathes={d2}
                selection={selection[2]}
                current={ undefined }
                placeHolder="<第三階層>" 
                onChange={ (obj) => selectAction.setSelectionIndex(2, obj.getStringPath()) }/>
            </Container>

        </SplitBoxVertical>
        <SplitBoxVertical gutterSize={6}>
            <Container title="ファイル一覧">
                <Explorer 
                pathes={d3}
                selection={selection[3]}
                current={ undefined }
                placeHolder="ファイル一覧" 
                onChange={ (obj) => selectAction.setSelectionIndex(3, obj.getStringPath()) }/>
            </Container>
        </SplitBoxVertical>
    </>
}