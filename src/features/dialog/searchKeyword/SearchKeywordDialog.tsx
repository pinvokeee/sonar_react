import { Backdrop, Box, Button, Card, CardContent, CardHeader, styled, TextField, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { dialogStates } from "../../../controller/dialog";
import { FileObject } from "../../../controller/fileObject";
import { DialogNames } from "../../../define/names/dialogNames";
import { NodeSelecter } from "../../viewer/templates/NodeSelecter";
import Split from 'react-split'
import { searchDialog } from "../../../controller/searchDialog";
import { TemplatesViewer } from "../../viewer/templates/templatesViewer";
import { ObjectViewer } from "../../viewer/templates/ObjectViewer";
import { MatchObjectsList } from "./components/MatchObjectsList";
import { selection } from "../../../controller/selectedNodes";
import { FileSystemObject } from "../../../class/fileSystem/FileSystemObject";

const GrassBackdrop = styled(Backdrop)(({theme})=>
(
    {
        backgroundColor: "rgba(111, 126, 140, 0.2)",
        zIndex: 1,
        // backdropFilter: "blur(4px)"
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
        height: "100%",
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


const utf8_decoder: TextDecoder = new TextDecoder();

export const DialogSearchFromKeyword = (props: Props) =>
{
    const dialogState = dialogStates.useCurrentState();
    const isOpen = dialogState.name == DialogNames.SearchFromKeywords;

    const [keyword, setKeyword] = useState("");
    const actions = searchDialog.useActions();

    const handles = FileObject.selectors.useFileNodesSelector();

    const handleChange = (value: string) =>
    {
        setKeyword(value);
    }

    // if (selectedNodes[0]?.path != undefined)
    // {
    //     const n = handles.get(selectedNodes[0].path) as FileSystemObject;
    //     console.log(FileObject.selectors.useGetSubNodes(n));
    // }

 
    return <>
    { !isOpen ? <></> :  
        <GrassBackdrop open={isOpen}>
        <Card sx={{ textAlign: "left", width: "90%", height: "90%", }}>
            <CardContent sx={{ height: "100%" }}>
            <GridContainer>
                    <Typography color="text.secondary" gutterBottom>
                        検索
                    </Typography>

                    <Box sx={{ display: "flex", }}>
                        <TextField id="outlined-basic" fullWidth value={keyword} onInput={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)} label="検索" />

                        <Button sx={{ marginLeft: "auto" }} onClick={(e) => actions.closeDialog()}>閉じる</Button>
                    </Box>

                    <MainContainer>
                        <VSplitBox direction="horizontal" sizes={[40, 60]} gutterAlign="center" gutterStyle={GutterStyle}>
                            <Box>
                                <MatchObjectsList objects={handles}></MatchObjectsList>
                            </Box>

                            <ObjectViewer object={undefined}></ObjectViewer>

                        </VSplitBox>


                    </MainContainer>
                    </GridContainer>

            </CardContent>
        </Card>
        </GrassBackdrop>
    }
    </>
}