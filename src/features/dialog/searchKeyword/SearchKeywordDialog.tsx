import { Backdrop, Box, Button, Card, CardContent, CardHeader, Divider, styled, TextField, Typography } from "@mui/material";
import { ChangeEvent, useCallback, useRef, useState } from "react";
import { dialogController } from "../../../controller/dialogController";
import { DialogNames } from "../../../define/names/dialogNames";
import Split from 'react-split';
import { ObjectViewer } from "../../viewer/templates/ObjectViewer";
import { MatchObjectsList } from "./components/MatchObjectsList";
import { FileSystemObject } from "../../../class/fileSystem/FileSystemObject";

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
        // display: "grid",
        width: "100%",
        height: "100%",
        // gridTemplateColumns: "auto minmax(0, 1fr)",
    }
));

const GridContainer = styled("div")(({ theme }) => 
(
    {
        display: "grid",
        width: "100%",
        height: "100%",
        gridTemplateRows: "auto auto minmax(0, 1fr)",
    }
));


const VSplitBox = styled(Split)(({ theme }) => 
(
    {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "100%",
    }
));

const Divider2 = styled(Divider)(({ theme }) =>
(
    {
        padding: "4px 0px 4px 0px",   
    }
));

const GutterStyle = (dimension : "width" | "height", gutterSize : number) => 
{
    const bgcolor = "#eee";
    return {
        backgroundColor: bgcolor,
        [dimension]: gutterSize + "px",
    }
}

type Props = 
{
    children?: React.ReactNode
}

const dialogName = DialogNames.SearchFromKeywords;

const utf8_decoder: TextDecoder = new TextDecoder();

export const DialogSearchFromKeyword = (props: Props) =>
{
    const dialog = dialogController;
    const dialogActions = dialog.useActions();
    const dialogState = dialog.useCurrentState();
    // const actions = searchDialog.useActions();
    
    const [viewObject, setViewObject] = useState<FileSystemObject | undefined>(undefined);
    const [keyword, setKeyword] = useState("");

    const input = useRef<HTMLInputElement>(null);

    const isOpen = dialogState.name == DialogNames.SearchFromKeywords;

    if (isOpen) {
        console.log(input);
        input?.current?.focus();
    }

    const handleChange = useCallback((value: string) => {
        setKeyword(value);

    }, []);

    const onSearchResultItemClick = useCallback((fileObj: FileSystemObject) => {
        setViewObject(fileObj);
    }, []);

    if (!isOpen) return <></>;
 
    return <>
    { !isOpen ? <></> :  
        <GrassBackdrop open={isOpen}>
        <Card sx={{ textAlign: "left", width: "90%", height: "90%", }}>
            <CardContent sx={{ height: "100%" }}>
            <GridContainer>
                    <Box sx={{ display: "flex", }}>
                        <TextField autoFocus ref={input} id="outlined-basic" fullWidth value={keyword} onInput={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)} label="検索" />
                        <Button sx={{ marginLeft: "auto" }} onClick={(e) => dialogActions.close()}>閉じる</Button>
                    </Box>

                    <Divider2 />

                    <MainContainer>
                        <VSplitBox direction="horizontal" sizes={[40, 60]} gutterAlign="center" gutterStyle={GutterStyle}>
                            <MatchObjectsList onClick={onSearchResultItemClick} keyword={keyword}></MatchObjectsList>
                            <ObjectViewer object={viewObject}></ObjectViewer>
                        </VSplitBox>
                    </MainContainer>

            </GridContainer>
            </CardContent>
        </Card>
        </GrassBackdrop>
    }
    </>
}