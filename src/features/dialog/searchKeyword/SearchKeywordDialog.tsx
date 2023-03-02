import { Backdrop, Box, Button, Card, CardContent, CardHeader, styled, TextField, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { dialogStates } from "../../../controller/dialog";
import { NodeHook } from "../../../controller/node";
import { DialogNames } from "../../../define/names/dialogNames";
import { NodeSelecter } from "../../viewer/templates/NodeSelecter";
import Split from 'react-split'
import { searchDialog } from "../../../controller/searchDialog";
import { TemplatesViewer } from "../../viewer/templates/templatesViewer";

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
    const [keyword, setKeyword] = useState("");

    const actions = searchDialog.useActions();

    const dialogState = dialogStates.useCurrentState();
    const isOpen = dialogState.name == DialogNames.SearchFromKeywords;

    const handles = NodeHook.selectors.useFileNodesSelector();
    const acitons = NodeHook.useActions();

    const handleChange = (value: string) =>
    {
        // const [name, value] = e.target;
        setKeyword(value);
    }

    return <>
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
                        {
                        isOpen ? Array.from(handles).map(h =>
                        {
                            const [path, handle] = h;

                            if (handle.kind == "directory" || handle.file == undefined) return undefined; 
                            if (handle.file.extension != "txt") return undefined;

                            if (handle.file.binary == undefined) acitons.loadFile(handle);
                            
                            if (utf8_decoder.decode(handle.file.binary).indexOf(keyword) > -1)
                            {
                                return <div>{ handle.file.name }</div>
                            }

                        }).filter(h => h != undefined) : <></>
                    }
                        </Box>

                        <TemplatesViewer></TemplatesViewer>

                    </VSplitBox>


                </MainContainer>
                </GridContainer>

        </CardContent>
    </Card>
    </GrassBackdrop>
    </>
}