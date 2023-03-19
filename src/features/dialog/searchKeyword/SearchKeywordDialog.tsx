import { Backdrop, Box, Button, Card, CardContent, CardHeader, Divider, Stack, styled, TextField, Typography } from "@mui/material";
import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { dialogController } from "../../../controller/dialogController";
import { DialogNames } from "../../../define/names/dialogNames";
import Split from 'react-split';
import { ObjectViewer } from "../../../components/viewer/ObjectViewer";
import { MatchObjectsList } from "./components/MatchObjectsList";
import { FileSystemObject } from "../../../class/fileSystem/FileSystemObject";
import { SplitBoxHorizontal, SplitBoxVertical } from "../../../components/elements/SplitBox";
import { fileObjectContoller } from "../../../controller/fileObjectContoller";
import { selectionController } from "../../../controller/selectionController";

const GrassBackdrop = styled(Backdrop)(({theme})=>
(
    {
        backgroundColor: "rgba(111, 126, 140, 0.2)",
        zIndex: 1,
        backdropFilter: "blur(4px)"
    }
));

const MainContainer = styled("div")(({ theme }) => 
(
    {
        width: "100%",
        height: "100%",
    }
));

const GridContainer = styled("div")(({ theme }) => 
(
    {
        display: "grid",
        width: "100%",
        height: "100%",
        gridTemplateRows: "auto minmax(0, 1fr)",
    }
));

const InputField = styled(TextField)(({ theme }) =>
(
    {
        backgroundColor: theme.palette.common.white,
    }
));

const Board = styled("div")(({ theme }) =>
(
    {
        height: "100%",
        border: "solid 1px white",
        borderRadius: "6px",
        borderColor: theme.palette.divider,
    }
));

const BoardTitle = styled("div")(({ theme }) =>
(
    {
        padding: "8px",
        fontSize: "9pt",
        // borderColor: theme.palette.divider,
    }
));


const ResultContainer = styled("div")(({theme}) =>
(
    {
        display: "grid",
        gridTemplateRows: "auto auto minmax(0, 1fr)",
        height: "100%",
    }
))

type Props = 
{
    children?: React.ReactNode
}

export const DialogSearchFromKeyword = (props: Props) =>
{
    const [keyword, setKeyword] = useState("");
    const [selection, setSelection] = useState("");

    const fileSysObjMap = fileObjectContoller.useGetFileSysObjMap();
    const oselection = selectionController.useGetSelectionRange();
    const firstFileSysObj = oselection[0] ? fileSysObjMap.get(oselection[0]) : undefined;

    console.log(oselection);

    const target =  fileSysObjMap.filterFromKeyword(keyword, false, firstFileSysObj);

    const dialog = dialogController;
    const dialogActions = dialog.useActions();
    const dialogState = dialog.useCurrentState();

    const viewObject = selection != undefined && selection.length > 0 ? fileSysObjMap.get(selection) : undefined;

    const isOpen = dialogState.name == DialogNames.SearchFromKeywords;

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    }, []);

    const onSearchResultItemClick = useCallback((fileObj: FileSystemObject, index: number) => {
        setSelection(fileObj.getStringPath());
    }, []); 

    const selection_action = selectionController.useActions();

    const handleClickPath = useCallback(() =>
    {
        if (viewObject == undefined) return;
        console.log(viewObject.getStringRootPath());
        // selection_action.setSelection(['テンプレート', 'テンプレート/aaaaaa', 'テンプレート/aaaaaa/doc1', 'テンプレート/aaaaaa/doc1/test.md']);
        selection_action.setSelection(viewObject.getStringRootPath());
        dialogActions.close();

    }, [viewObject]);

    if (!isOpen) return <></>;
 
    return <>
    { !isOpen ? <></> :  
        <GrassBackdrop open={isOpen}>
        <Card sx={{ textAlign: "left", width: "90%", height: "90%", }}>
            <CardContent sx={{ height: "100%" }}>
            <GridContainer>
                    
                <Box sx={{ display: "flex", marginBottom: "6px", }}>
                    <InputField placeholder="検索キーワードを入力してください" autoFocus id="outlined-basic" fullWidth value={keyword} onInput={handleChange}/>
                    <Button sx={{ marginLeft: "auto" }} onClick={(e) => dialogActions.close()}>閉じる</Button>
                </Box>

                <MainContainer>

                    <Board>
                        <SplitBoxHorizontal sizes={[40, 60]}>
                            <ResultContainer>
                                <BoardTitle>検索結果 - {target.size}件</BoardTitle>
                                <Divider></Divider>
                                <MatchObjectsList 
                                key={keyword} 
                                objectMap={target} 
                                onClick={onSearchResultItemClick} 
                                keyword={keyword} 
                                selectedPath={selection}></MatchObjectsList>
                            </ResultContainer>
                            <Stack>
                                <BoardTitle>プレビュー中: <Button onClick={handleClickPath}>/{viewObject?.getStringPath()}</Button></BoardTitle>
                                <Divider></Divider>
                                <ObjectViewer object={viewObject} highlightKeyword={keyword}></ObjectViewer>
                            </Stack>
                        </SplitBoxHorizontal>
                    </Board>

                </MainContainer>

            </GridContainer>
            </CardContent>
        </Card>
        </GrassBackdrop>
    }
    </>
}