import { Backdrop, Card, CardContent, CardHeader, styled, TextField, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { dialogStates } from "../../../controller/dialog";
import { NodeHook } from "../../../controller/node";
import { DialogNames } from "../../../define/names/dialogNames";
import { NodeSelecter } from "../../viewer/templates/NodeSelecter";
export {}

const GrassBackdrop = styled(Backdrop)(({theme})=>
(
    {
        backgroundColor: "rgba(111, 126, 140, 0.2)",
        zIndex: 1,
        // backdropFilter: "blur(4px)"
    }
));

type Props = 
{
    children?: React.ReactNode
}

const utf8_decoder: TextDecoder = new TextDecoder();

export const DialogSearchFromKeyword = (props: Props) =>
{
    const [keyword, setKeyword] = useState("");

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
    <Card>
        <CardContent>
            <TextField id="outlined-basic" value={keyword} 
            onInput={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)} label="検索" />

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

        </CardContent>
    </Card>
    </GrassBackdrop>
    </>
}